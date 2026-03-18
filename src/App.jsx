import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchRegimens } from './utils/api.js'
import { calcBSA, makeDrugRow, buildCopyText } from './utils/dose.js'
import PrintArea from './components/PrintArea.jsx'

export default function App() {
  const [regimens, setRegimens] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('search')
  const [selReg, setSelReg] = useState(null)
  const [search, setSearch] = useState('')
  const [catF, setCatF] = useState('ทั้งหมด')
  const [pt, setPt] = useState({ name:'',hn:'',an:'',ward:'',right:'',wt:'',ht:'',cr:'',tb:'',ast:'',alt:'',ccr:'' })
  const [ord, setOrd] = useState({ cycle:'1',day1:'',drName:'',drCode:'' })
  const [rows, setRows] = useState([])
  const [toast, setToast] = useState(null)

  const bsa = useMemo(() => calcBSA(pt.wt, pt.ht), [pt.wt, pt.ht])
  const cats = useMemo(() => ['ทั้งหมด', ...new Set(regimens.map(r => r.cat))], [regimens])
  const filtered = useMemo(() => {
    let r = regimens
    if (catF !== 'ทั้งหมด') r = r.filter(x => x.cat === catF)
    if (search.trim()) r = r.filter(x => (x.name + x.abbr).toLowerCase().includes(search.toLowerCase()))
    return r
  }, [regimens, catF, search])

  useEffect(() => {
    fetchRegimens()
      .then(setRegimens)
      .catch(() => showToast('โหลดข้อมูลไม่ได้', '#c62828'))
      .finally(() => setLoading(false))
  }, [])

  const showToast = (msg, bg = '#2e7d32') => {
    setToast({ msg, bg })
    setTimeout(() => setToast(null), 3000)
  }

  const selectReg = reg => {
    setSelReg(reg)
    setRows(reg.drugs.map((d, i) => makeDrugRow(d, bsa, pt.wt, pt.ccr, i)))
    setView('order')
    window.scrollTo(0, 0)
  }

  const recalc = () => {
    if (selReg) setRows(selReg.drugs.map((d, i) => makeDrugRow(d, bsa, pt.wt, pt.ccr, i)))
  }

  const updRow = (key, f, v) => setRows(rs => rs.map(r => r.key === key ? { ...r, [f]: v } : r))
  const delRow = key => setRows(rs => rs.filter(r => r.key !== key))
  const addRow = () => setRows(rs => [...rs, {
    key: `c${Date.now()}`, checked: true, name:'', doseLabel:'',
    dose:'', vehicle:'', rate:'', instruct:'', detail:'', days:'', note:'', isFixed: false
  }])

  const pc = (k, v) => setPt(p => ({ ...p, [k]: v }))
  const oc = (k, v) => setOrd(o => ({ ...o, [k]: v }))

  const doCopy = () => {
    const txt = buildCopyText(selReg, pt, ord, bsa, rows.filter(r => r.checked))
    navigator.clipboard.writeText(txt)
      .then(() => showToast('✅ คัดลอกแล้ว!'))
      .catch(() => showToast('❌ copy ไม่ได้', '#c62828'))
  }

  return (
    <div style={{ paddingBottom: 20 }}>
      {toast && <div className="toast" style={{ background: toast.bg }}>{toast.msg}</div>}

      <div className="header no-print">
        <span style={{ fontSize: 20 }}>💊</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>Chemo Order</div>
          <div style={{ fontSize: 11, opacity: .8 }}>สาขาโลหิตวิทยา รพ.สงฆ์</div>
        </div>
        {view === 'order' && (
          <button onClick={() => setView('search')}
            style={{ background:'rgba(255,255,255,.2)',color:'#fff',border:'none',borderRadius:8,padding:'7px 14px',fontSize:13 }}>
            ← กลับ
          </button>
        )}
        <Link to="/admin" style={{ textDecoration:'none' }}>
          <button style={{ background:'rgba(255,255,255,.2)',color:'#fff',border:'none',borderRadius:8,padding:'7px 12px',fontSize:15 }}>
            ⚙
          </button>
        </Link>
      </div>

      <div className="no-print" style={{ padding: 12 }}>
        {loading && <div className="loading">⏳ กำลังโหลดสูตรยา...</div>}
        {!loading && view === 'search' && (
          <SearchView regs={filtered} search={search} setSearch={setSearch}
            cats={cats} catF={catF} setCatF={setCatF} onSel={selectReg} />
        )}
        {!loading && view === 'order' && selReg && (
          <OrderView reg={selReg} pt={pt} pc={pc} bsa={bsa} ord={ord} oc={oc}
            rows={rows} updRow={updRow} delRow={delRow} addRow={addRow} recalc={recalc}
            onPrint={() => window.print()} onCopy={doCopy} />
        )}
      </div>

      {selReg && (
        <PrintArea reg={selReg} pt={pt} ord={ord} bsa={bsa} rows={rows.filter(r => r.checked)} />
      )}
    </div>
  )
}

function SearchView({ regs, search, setSearch, cats, catF, setCatF, onSel }) {
  return (
    <div>
      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="🔍 ค้นหา เช่น CHOP, Bortezomib, ABVD..."
        style={{ marginBottom: 10, fontSize: 16 }} />
      <div className="pill-row" style={{ marginBottom: 14 }}>
        {cats.map(c => (
          <button key={c} className={`pill${catF===c?' active':''}`} onClick={() => setCatF(c)}>{c}</button>
        ))}
      </div>
      {regs.length === 0 && (
        <div style={{ textAlign:'center', color:'#999', padding: 40 }}>ไม่พบสูตรยา</div>
      )}
      <div className="reg-grid">
        {regs.map(reg => (
          <div key={reg._id || reg.id} className="reg-card" onClick={() => onSel(reg)}>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
              <span style={{ fontWeight:600, fontSize:15, flex:1 }}>{reg.abbr}</span>
              <span className={`tag tag-${reg.type==='IPD'?'ipd':'opd'}`}>{reg.type}</span>
              <span className="tag tag-cat">{reg.cat}</span>
            </div>
            <div style={{ fontSize:12, color:'#555', marginBottom:4 }}>{reg.name}</div>
            <div style={{ fontSize:11, color:'#aaa' }}>
              {reg.drugs?.length || 0} รายการ{reg.cycleInfo ? ' · ' + reg.cycleInfo : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function OrderView({ reg, pt, pc, bsa, ord, oc, rows, updRow, delRow, addRow, recalc, onPrint, onCopy }) {
  const lb = t => <label className="label">{t}</label>
  const inp = (val, fn, type='text', ph='') => (
    <input value={val} onChange={e => fn(e.target.value)} type={type} placeholder={ph}
      inputMode={type==='number'?'decimal':undefined} />
  )

  return (
    <div>
      <div style={{ fontWeight:600, fontSize:15, color:'#1565c0', marginBottom:12, lineHeight:1.3 }}>
        📋 {reg.name}
      </div>

      {/* Patient + Labs */}
      <div className="order-top">
        <div className="card">
          <div className="sec-label">ข้อมูลผู้ป่วย</div>
          {lb('ชื่อ-นามสกุล')}{inp(pt.name, v => pc('name',v), 'text', 'ชื่อ นามสกุล')}
          <div className="pt-grid" style={{ marginTop:6 }}>
            <div>{lb('HN')}{inp(pt.hn, v => pc('hn',v))}</div>
            <div>{lb('AN')}{inp(pt.an, v => pc('an',v))}</div>
            <div>{lb('หอผู้ป่วย')}{inp(pt.ward, v => pc('ward',v))}</div>
            <div>{lb('สิทธิ')}{inp(pt.right, v => pc('right',v))}</div>
          </div>
        </div>
        <div className="card">
          <div className="sec-label">BW / Labs</div>
          <div className="pt-grid">
            <div>{lb('น้ำหนัก (kg)')}{inp(pt.wt, v => pc('wt',v), 'number', '60')}</div>
            <div>{lb('ส่วนสูง (cm)')}{inp(pt.ht, v => pc('ht',v), 'number', '165')}</div>
          </div>
          <div className="bsa-box">
            <span style={{ color:'#1565c0', fontSize:13 }}>BSA = </span>
            <span style={{ color:'#1565c0', fontSize:24, fontWeight:600 }}>{bsa ? `${bsa} m²` : '—'}</span>
          </div>
          <div className="grid-4">
            <div>{lb('Cr')}{inp(pt.cr, v => pc('cr',v), 'number')}</div>
            <div>{lb('TB')}{inp(pt.tb, v => pc('tb',v), 'number')}</div>
            <div>{lb('AST')}{inp(pt.ast, v => pc('ast',v), 'number')}</div>
            <div>{lb('ALT')}{inp(pt.alt, v => pc('alt',v), 'number')}</div>
          </div>
          <div style={{ marginTop:6 }}>{lb('CCr (mL/min)')}{inp(pt.ccr, v => pc('ccr',v), 'number')}</div>
        </div>
      </div>

      {/* Cycle */}
      <div className="card">
        <div className="cycle-grid">
          <div>{lb('Cycle ที่')}{inp(ord.cycle, v => oc('cycle',v))}</div>
          <div>{lb('Day 1')}{inp(ord.day1, v => oc('day1',v), 'text', 'วว/ดด/ปปปป')}</div>
          <div>{lb('แพทย์ผู้สั่งยา')}{inp(ord.drName, v => oc('drName',v))}</div>
          <div>{lb('รหัสแพทย์')}{inp(ord.drCode, v => oc('drCode',v))}</div>
        </div>
      </div>

      {/* Drugs */}
      <div className="card">
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12, flexWrap:'wrap' }}>
          <span style={{ fontWeight:500, fontSize:14, flex:1 }}>
            รายการยา ({rows.filter(r=>r.checked).length} รายการ)
          </span>
          <button className="btn-sm" onClick={recalc}>🔄 คำนวณ</button>
          <button className="btn-sm" onClick={addRow}>➕ เพิ่มยา</button>
        </div>

        {/* Desktop table */}
        <div className="drug-table-wrap">
          <div className="tbl-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th style={{width:28}}>✓</th>
                  <th style={{minWidth:130}}>ชื่อยา</th>
                  <th style={{width:68}}>mg</th>
                  <th style={{width:105}}>ส่วนผสม</th>
                  <th style={{width:120}}>วิธีให้</th>
                  <th style={{width:150}}>Rate/รายละเอียด</th>
                  <th style={{width:82}}>วัน</th>
                  <th style={{width:78}}>หมายเหตุ</th>
                  <th style={{width:24}}></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => <DrugRowDesktop key={row.key} row={row} updRow={updRow} delRow={delRow} />)}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="drug-card-list">
          {rows.map((row, i) => (
            <DrugRowMobile key={row.key} row={row} updRow={updRow} delRow={delRow} i={i} />
          ))}
        </div>
      </div>

      {/* Action bar */}
      <div className="action-bar no-print">
        <button className="btn-success btn-lg" onClick={onCopy}
          style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:1 }}>
          <span>📋 Copy Text</span>
          <span style={{ fontSize:11, fontWeight:400, opacity:.85 }}>LINE / HIS</span>
        </button>
        <button className="btn-primary btn-lg" onClick={onPrint}>🖨️ พิมพ์</button>
      </div>
    </div>
  )
}

function DrugRowDesktop({ row, updRow, delRow }) {
  const ii = (f, ph) => (
    <input className="row-inp" value={row[f]}
      onChange={e => updRow(row.key, f, e.target.value)} placeholder={ph || ''} />
  )
  return (
    <tr style={{ opacity: row.checked ? 1 : .4 }}>
      <td style={{ textAlign:'center' }}>
        <input type="checkbox" checked={row.checked}
          onChange={e => updRow(row.key, 'checked', e.target.checked)} style={{ width:15, height:15 }} />
      </td>
      <td>
        {ii('name','ชื่อยา')}
        {row.doseLabel && <div style={{ fontSize:10, color:'#1565c0', marginTop:2 }}>{row.doseLabel}</div>}
      </td>
      <td>{ii('dose','mg')}</td>
      <td>{ii('vehicle','NSS 250 mL')}</td>
      <td>{row.isFixed ? ii('instruct','วิธีใช้') : ii('rate','IV in 1 hr')}</td>
      <td>{ii('detail','rate, คำเตือน')}</td>
      <td>{ii('days','Day 1')}</td>
      <td>{ii('note','NED...')}</td>
      <td style={{ textAlign:'center' }}>
        <button onClick={() => delRow(row.key)}
          style={{ background:'none',border:'none',color:'#e53935',fontSize:18,padding:'0 2px',lineHeight:1 }}>×</button>
      </td>
    </tr>
  )
}

function DrugRowMobile({ row, updRow, delRow, i }) {
  const ii = (f, ph, type='text') => (
    <input className="row-inp" value={row[f]} type={type}
      onChange={e => updRow(row.key, f, e.target.value)} placeholder={ph || ''}
      style={{ fontSize:14, padding:'7px 8px' }}
      inputMode={type==='number'?'decimal':undefined} />
  )
  return (
    <div className="drug-card">
      <div className="drug-card-header">
        <input type="checkbox" checked={row.checked}
          onChange={e => updRow(row.key, 'checked', e.target.checked)}
          style={{ width:18, height:18, flexShrink:0 }} />
        <span style={{ fontWeight:600, color:'#1565c0', fontSize:13 }}>ยาที่ {i+1}</span>
        {row.doseLabel && <span style={{ fontSize:11, color:'#888', flex:1 }}>{row.doseLabel}</span>}
        <button onClick={() => delRow(row.key)}
          style={{ background:'none',border:'none',color:'#e53935',fontSize:22,padding:'0 4px',lineHeight:1 }}>×</button>
      </div>

      <div style={{ marginBottom:8 }}>
        <label className="label" style={{ marginTop:0 }}>ชื่อยา</label>
        {ii('name','ชื่อยา')}
      </div>
      <div className="drug-card-fields">
        <div>
          <label className="label" style={{ marginTop:0 }}>ขนาด (mg)</label>
          {ii('dose','mg','number')}
        </div>
        <div>
          <label className="label" style={{ marginTop:0 }}>ส่วนผสม</label>
          {ii('vehicle','NSS 250 mL')}
        </div>
        <div>
          <label className="label" style={{ marginTop:0 }}>{row.isFixed ? 'วิธีใช้' : 'Route'}</label>
          {row.isFixed ? ii('instruct','วิธีใช้') : ii('rate','IV in 1 hr')}
        </div>
        <div>
          <label className="label" style={{ marginTop:0 }}>วัน</label>
          {ii('days','Day 1')}
        </div>
        <div className="drug-card-full">
          <label className="label" style={{ marginTop:0 }}>รายละเอียด</label>
          {ii('detail','rate escalation, คำเตือน...')}
        </div>
        <div className="drug-card-full">
          <label className="label" style={{ marginTop:0 }}>หมายเหตุ</label>
          {ii('note','NED, ใบกำกับ...')}
        </div>
      </div>
    </div>
  )
}
