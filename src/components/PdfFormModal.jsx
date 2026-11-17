import { useEffect, useMemo, useRef, useState } from 'react'
import { pdfLocate } from '../utils/pdf.js'
import { planFills } from '../utils/pdfFill.js'
import { loadFields, renderFilledPage } from '../utils/pdfRender.js'
import { makeDrugRow } from '../utils/dose.js'

// Preview the original order-form page(s) of a regimen. Every dotted blank on the form is an editable box
// laid over the page image; computed values (BW, BSA, doses, …) are pre-filled and can be changed by hand.
// Printing composes the page image with the current values, one page per sheet.
export default function PdfFormModal({ reg, rows, pt, ord, bsa, ccr, onClose }) {
  const loc = useMemo(() => pdfLocate(reg), [reg])
  const [pages, setPages] = useState(() => loc ? [loc.page] : [])
  const [fieldMap, setFieldMap] = useState(null)       // fields.json
  const [baseImgs, setBaseImgs] = useState({})          // page → unfilled image (preview background)
  const [vals, setVals] = useState({})                  // page → { fieldIndex: text }
  const [printImgs, setPrintImgs] = useState(null)      // page → filled image, only while printing
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const printAfterRender = useRef(false)

  const candidates = useMemo(() => {
    if (!loc) return []
    const out = []
    for (let p = loc.page; p <= Math.min(loc.page + 3, loc.sectionTo); p++) out.push(p)
    return out
  }, [loc])

  // Doses recomputed from the current BSA/weight/CrCl, keeping checkbox state and hand-edited doses.
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

  useEffect(() => { loadFields().then(setFieldMap) }, [])

  const fieldsOf = p => fieldMap?.[String(p)]?.f || []
  const dimsOf = p => fieldMap?.[String(p)] || { w: 595, h: 842 }

  // automatic values for a page
  const autoVals = p => {
    const out = {}
    for (const f of planFills({ fields: fieldsOf(p), rows: effRows, pt, ord, bsa, ccr })) out[f.idx] = f.text
    return out
  }

  // render the unfilled page once per page; seed its values the first time it appears
  useEffect(() => {
    if (!loc || !fieldMap) return
    let cancelled = false
    const missing = pages.filter(p => !baseImgs[p])
    setVals(v => {
      const next = { ...v }
      for (const p of pages) if (!next[p]) next[p] = autoVals(p)
      return next
    })
    if (missing.length === 0) return
    setBusy(true); setErr('')
    ;(async () => {
      try {
        const next = {}
        for (const p of missing) {
          const canvas = await renderFilledPage(loc.file, p - loc.sectionFrom + 1, [], 1.5)
          if (cancelled) return
          next[p] = canvas.toDataURL('image/jpeg', 0.92)
        }
        if (!cancelled) setBaseImgs(b => ({ ...b, ...next }))
      } catch (e) {
        if (!cancelled) setErr('โหลด PDF ไม่ได้: ' + (e?.message || e))
      } finally {
        if (!cancelled) setBusy(false)
      }
    })()
    return () => { cancelled = true }
  }, [loc, fieldMap, pages])  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const togglePage = p => setPages(ps => ps.includes(p) ? (ps.length > 1 ? ps.filter(x => x !== p) : ps) : [...ps, p].sort((a, b) => a - b))
  const setVal = (p, i, text) => setVals(v => ({ ...v, [p]: { ...(v[p] || {}), [i]: text } }))
  const refill = () => setVals(v => { const next = { ...v }; for (const p of pages) next[p] = autoVals(p); return next })
  const clearAll = () => setVals(v => { const next = { ...v }; for (const p of pages) next[p] = {}; return next })

  // print: compose filled pages at full resolution, then open the print dialog
  const doPrint = async () => {
    if (!loc) return
    setBusy(true)
    try {
      const out = {}
      for (const p of pages) {
        const fs = fieldsOf(p)
        const fills = Object.entries(vals[p] || {})
          .filter(([, t]) => String(t || '').trim())
          .map(([i, t]) => ({ ...fs[+i], text: String(t).trim() }))
        const canvas = await renderFilledPage(loc.file, p - loc.sectionFrom + 1, fills, 2)
        out[p] = canvas.toDataURL('image/png')
      }
      printAfterRender.current = true
      setPrintImgs(out)
    } catch (e) {
      setErr('เตรียมหน้าพิมพ์ไม่ได้: ' + (e?.message || e))
    } finally {
      setBusy(false)
    }
  }
  useEffect(() => {
    if (!printImgs || !printAfterRender.current) return
    printAfterRender.current = false
    document.body.classList.add('print-pdf')
    const done = () => { document.body.classList.remove('print-pdf'); window.removeEventListener('afterprint', done) }
    window.addEventListener('afterprint', done)
    // let the print-root images attach before printing
    setTimeout(() => { window.print(); setTimeout(done, 60000) }, 150)
  }, [printImgs])

  if (!loc) return null
  const ready = pages.every(p => baseImgs[p]) && !!fieldMap

  return (
    <div className="pdf-modal no-print" role="dialog" aria-label="พิมพ์ฟอร์มต้นฉบับ">
      <div className="pdf-modal-bar">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>📄 {reg.name}</div>
          <div style={{ fontSize: 11, opacity: .8 }}>{loc.label} · PDF หน้า {loc.page} · คลิกที่ช่องบนฟอร์มเพื่อแก้ตัวเลขได้</div>
        </div>
        <button className="btn-sm" onClick={onClose} style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: 'none' }}>✕ ปิด</button>
      </div>

      <div className="pdf-modal-tools">
        <button className="btn-sm" onClick={refill} title="เติมค่าที่คำนวณได้ลงช่องใหม่ (ทับที่แก้ไว้)">🔄 เติมค่าอัตโนมัติ</button>
        <button className="btn-sm" onClick={clearAll} title="ล้างทุกช่องในหน้าที่เลือก">🧹 ล้างช่อง</button>
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
        {!ready && !err && <div className="loading">⏳ กำลังเตรียมหน้า PDF…</div>}
        {pages.map(p => baseImgs[p] && (
          <PageEditor key={p} img={baseImgs[p]} dims={dimsOf(p)} fields={fieldsOf(p)}
            values={vals[p] || {}} onChange={(i, t) => setVal(p, i, t)} />
        ))}
      </div>

      <div className="pdf-print-root">
        {printImgs && pages.map(p => printImgs[p] && <img key={p} src={printImgs[p]} alt="" className="pdf-print-page" />)}
      </div>
    </div>
  )
}

// One page image with absolutely positioned inputs over each blank. Positions are percentages of the
// page size, so they follow the image whatever width it is displayed at.
function PageEditor({ img, dims, fields, values, onChange }) {
  const ref = useRef(null)
  const [scale, setScale] = useState(1)  // displayed px per PDF point, for font sizing
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setScale(el.clientWidth / dims.w)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [dims.w])
  return (
    <div className="pdf-page-wrap" ref={ref}>
      <img src={img} alt="" className="pdf-page-img" draggable={false} />
      {fields.map((f, i) => (
        <input key={i} className={`pdf-field${values[i] ? ' filled' : ''}`} value={values[i] || ''}
          onChange={e => onChange(i, e.target.value)}
          title={f.ctx || f.k}
          style={{
            left: `${(f.x / dims.w) * 100}%`, top: `${(f.y / dims.h) * 100}%`,
            width: `${(f.w / dims.w) * 100}%`, height: `${(f.h / dims.h) * 100}%`,
            fontSize: Math.max(7, Math.min(f.h * scale * 0.68, 13)),
          }} />
      ))}
    </div>
  )
}
