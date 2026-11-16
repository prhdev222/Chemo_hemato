import { useEffect, useMemo, useState } from 'react'
import { pdfLocate } from '../utils/pdf.js'
import { planFills } from '../utils/pdfFill.js'
import { loadFields, renderFilledPage } from '../utils/pdfRender.js'
import { makeDrugRow } from '../utils/dose.js'

// Preview the original order-form page(s) of a regimen with the computed values written into the blanks, then print them.
export default function PdfFormModal({ reg, rows, pt, ord, bsa, ccr, onClose }) {
  const loc = useMemo(() => pdfLocate(reg), [reg])
  const [pages, setPages] = useState(() => loc ? [loc.page] : [])
  const [autoFill, setAutoFill] = useState(true)
  const [imgs, setImgs] = useState({})
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  // Doses recomputed from the current BSA/weight/CrCl (the order table only recalculates on demand),
  // keeping the user's checkbox state and any dose they typed in by hand.
  const effRows = useMemo(() => {
    const byKey = new Map((rows || []).map(r => [r.key, r]))
    return (reg.drugs || []).map((d, i) => {
      const fresh = makeDrugRow(d, bsa, pt.wt, ccr, i)
      const cur = byKey.get(fresh.key)
      if (!cur) return fresh
      const edited = cur.dose && cur.dose !== '0' && cur.dose !== fresh.dose
      return { ...fresh, checked: cur.checked, name: cur.name || fresh.name, dose: edited ? cur.dose : fresh.dose }
    })
  }, [reg, rows, bsa, pt.wt, ccr])

  // candidate pages: the form's first page and up to 3 following pages inside the same section
  const candidates = useMemo(() => {
    if (!loc) return []
    const out = []
    for (let p = loc.page; p <= Math.min(loc.page + 3, loc.sectionTo); p++) out.push(p)
    return out
  }, [loc])

  useEffect(() => {
    if (!loc) return
    let cancelled = false
    setBusy(true); setErr('')
    ;(async () => {
      try {
        const all = await loadFields()
        const next = {}
        for (const p of pages) {
          const fields = all[String(p)]?.f || []
          const fills = autoFill ? planFills({ fields, rows: effRows, pt, ord, bsa, ccr }) : []
          const canvas = await renderFilledPage(loc.file, p - loc.sectionFrom + 1, fills, 2)
          if (cancelled) return
          next[p] = canvas.toDataURL('image/png')
        }
        if (!cancelled) setImgs(next)
      } catch (e) {
        if (!cancelled) setErr('โหลด PDF ไม่ได้: ' + (e?.message || e))
      } finally {
        if (!cancelled) setBusy(false)
      }
    })()
    return () => { cancelled = true }
  }, [loc, pages, autoFill, effRows, pt, ord, bsa, ccr])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const togglePage = p => setPages(ps => ps.includes(p) ? (ps.length > 1 ? ps.filter(x => x !== p) : ps) : [...ps, p].sort((a, b) => a - b))

  const doPrint = () => {
    document.body.classList.add('print-pdf')
    const done = () => { document.body.classList.remove('print-pdf'); window.removeEventListener('afterprint', done) }
    window.addEventListener('afterprint', done)
    window.print()
    setTimeout(done, 60000)
  }

  if (!loc) return null
  const ready = pages.every(p => imgs[p])

  return (
    <div className="pdf-modal no-print" role="dialog" aria-label="พิมพ์ฟอร์มต้นฉบับ">
      <div className="pdf-modal-bar">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>📄 {reg.name}</div>
          <div style={{ fontSize: 11, opacity: .8 }}>{loc.label} · PDF หน้า {loc.page}</div>
        </div>
        <button className="btn-sm" onClick={onClose} style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: 'none' }}>✕ ปิด</button>
      </div>

      <div className="pdf-modal-tools">
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <input type="checkbox" checked={autoFill} onChange={e => setAutoFill(e.target.checked)} style={{ width: 16, height: 16 }} />
          เติมค่าที่คำนวณลงในช่อง (BW, Ht, BSA, CrCl, lab, D1, ขนาดยา, แพทย์)
        </label>
        {candidates.length > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', fontSize: 13 }}>
            <span>หน้าที่พิมพ์:</span>
            {candidates.map(p => (
              <button key={p} className={`pill${pages.includes(p) ? ' active' : ''}`} onClick={() => togglePage(p)}>หน้า {p}</button>
            ))}
          </div>
        )}
        <button className="btn-primary btn-lg" onClick={doPrint} disabled={!ready || busy}>🖨️ พิมพ์ {pages.length > 1 ? `${pages.length} หน้า` : ''}</button>
      </div>

      <div className="pdf-modal-body">
        {err && <div style={{ color: '#c62828', padding: 12 }}>{err}</div>}
        {busy && !ready && <div className="loading">⏳ กำลังเตรียมหน้า PDF…</div>}
        {pages.map(p => imgs[p] && (
          <img key={p} src={imgs[p]} alt={`หน้า ${p}`} className="pdf-page-img" />
        ))}
      </div>

      {/* print-only copy: one page per sheet */}
      <div className="pdf-print-root">
        {pages.map(p => imgs[p] && <img key={p} src={imgs[p]} alt="" className="pdf-print-page" />)}
      </div>
    </div>
  )
}
