import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchRegimens, createRegimen, updateRegimen, deleteRegimen, seedRegimens } from '../utils/api.js'

const UNITS = ['fixed','mg/m2','mg/kg','mg/m2/day','IU/m2','AUC5']
const CATS = ['AML','ALL','APL','MDS/AML','Lymphoma','Myeloma','CLL','อื่นๆ']

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem('adminKey') || '')
  const [authed, setAuthed] = useState(!!sessionStorage.getItem('adminKey'))
  const [regimens, setRegimens] = useState([])
  const [loading, setLoading] = useState(false)
  const [editReg, setEditReg] = useState(null)  // null=list, 'new'=new, {..}=edit
  const [toast, setToast] = useState(null)
  const [confirm, setConfirm] = useState(null)

  const showToast = (msg, bg='#2e7d32') => { setToast({msg,bg}); setTimeout(()=>setToast(null),3000) }

  const load = () => {
    setLoading(true)
    fetchRegimens().then(setRegimens).catch(()=>showToast('โหลดไม่ได้','#c62828')).finally(()=>setLoading(false))
  }

  useEffect(() => { if (authed) load() }, [authed])

  const login = (e) => {
    e.preventDefault()
    sessionStorage.setItem('adminKey', adminKey)
    setAuthed(true)
  }

  const logout = () => {
    sessionStorage.removeItem('adminKey')
    setAuthed(false)
    setAdminKey('')
  }

  const handleSave = async (data) => {
    try {
      if (data._id) {
        await updateRegimen(data._id, data, adminKey)
        showToast('✅ แก้ไขแล้ว')
      } else {
        await createRegimen(data, adminKey)
        showToast('✅ เพิ่มสูตรแล้ว')
      }
      setEditReg(null)
      load()
    } catch {
      showToast('❌ บันทึกไม่ได้ ตรวจสอบ admin key', '#c62828')
    }
  }

  const handleDelete = async (reg) => {
    setConfirm({
      msg: `ลบ "${reg.name}" ออกจากระบบ?`,
      onOk: async () => {
        try {
          await deleteRegimen(reg._id, adminKey)
          showToast('✅ ลบแล้ว')
          load()
        } catch { showToast('❌ ลบไม่ได้', '#c62828') }
        setConfirm(null)
      }
    })
  }

  const handleSeed = async () => {
    setConfirm({
      msg: 'Seed สูตรยา built-in ทั้งหมดเข้า database? (จะ reset ข้อมูลเก่าทั้งหมด)',
      onOk: async () => {
        try {
          const r = await seedRegimens(adminKey)
          showToast(`✅ Seed แล้ว ${r.seeded} สูตร`)
          load()
        } catch { showToast('❌ Seed ไม่ได้', '#c62828') }
        setConfirm(null)
      }
    })
  }

  // ── Login ──────────────────────────────────
  if (!authed) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#f0f4f8' }}>
      <div className="card" style={{ width:340, maxWidth:'100%', textAlign:'center' }}>
        <div style={{ fontSize:32, marginBottom:12 }}>🔐</div>
        <div style={{ fontWeight:600, fontSize:16, marginBottom:16 }}>Admin Login</div>
        <div style={{ fontSize:12, color:'#666', marginBottom:16 }}>Hematology Chemo Order</div>
        <form onSubmit={login}>
          <input type="password" value={adminKey}
            onChange={e => setAdminKey(e.target.value)}
            placeholder="Admin Password" autoFocus
            style={{ marginBottom:12, textAlign:'center' }} />
          <button type="submit" className="btn-primary" style={{ width:'100%', padding:'8px' }}>
            เข้าสู่ระบบ
          </button>
        </form>
        <div style={{ marginTop:12 }}>
          <Link to="/" style={{ color:'#1565c0', fontSize:12 }}>← กลับหน้าหลัก</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {toast && <div className="toast" style={{ background:toast.bg }}>{toast.msg}</div>}
      {confirm && (
        <div className="overlay">
          <div className="modal" style={{ maxWidth:360, textAlign:'center' }}>
            <div style={{ fontSize:32, marginBottom:12 }}>⚠️</div>
            <div style={{ marginBottom:20, fontSize:14 }}>{confirm.msg}</div>
            <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
              <button onClick={() => setConfirm(null)} style={{ padding:'7px 20px' }}>ยกเลิก</button>
              <button className="btn-danger" onClick={confirm.onOk} style={{ padding:'7px 20px' }}>ยืนยัน</button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="header">
        <span style={{ fontSize:18 }}>⚙️</span>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:600, fontSize:14 }}>Admin — จัดการสูตรยา</div>
          <div style={{ fontSize:11, opacity:.8 }}>Hematology Chemo Order</div>
        </div>
        <Link to="/">
          <button style={{ background:'rgba(255,255,255,.15)',color:'#fff',border:'none',borderRadius:6,padding:'5px 12px' }}>
            ← หน้าหลัก
          </button>
        </Link>
        <button onClick={logout}
          style={{ background:'rgba(255,255,255,.15)',color:'#fff',border:'none',borderRadius:6,padding:'5px 12px' }}>
          ออก
        </button>
      </div>

      <div style={{ padding:12 }}>
        {editReg !== null ? (
          <RegForm
            reg={editReg === 'new' ? null : editReg}
            onSave={handleSave}
            onCancel={() => setEditReg(null)}
          />
        ) : (
          <RegList
            regimens={regimens} loading={loading}
            onNew={() => setEditReg('new')}
            onEdit={reg => setEditReg(reg)}
            onDelete={handleDelete}
            onSeed={handleSeed}
          />
        )}
      </div>
    </div>
  )
}

// ── Regimen List ───────────────────────────────
function RegList({ regimens, loading, onNew, onEdit, onDelete, onSeed }) {
  const [search, setSearch] = useState('')
  const filtered = regimens.filter(r =>
    (r.name + r.abbr).toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ display:'flex', gap:10, marginBottom:14, alignItems:'center', flexWrap:'wrap' }}>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="ค้นหาสูตรยา..." style={{ maxWidth:300 }} />
        <div style={{ flex:1 }} />
        <button onClick={onSeed} style={{ fontSize:12, padding:'6px 14px', color:'#e65100', borderColor:'#e65100' }}>
          🗄️ Seed built-in
        </button>
        <button className="btn-primary" onClick={onNew} style={{ padding:'6px 16px' }}>
          ➕ เพิ่มสูตรใหม่
        </button>
      </div>

      {loading && <div className="loading">⏳ กำลังโหลด...</div>}

      {!loading && (
        <div className="card" style={{ padding:0, overflow:'hidden' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>ชื่อสูตร</th>
                <th style={{width:70}}>Abbr</th>
                <th style={{width:90}}>Category</th>
                <th style={{width:60}}>Type</th>
                <th style={{width:70}}>Cycle</th>
                <th style={{width:60}}>ยา</th>
                <th style={{width:100}}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(reg => (
                <tr key={reg._id}>
                  <td style={{ fontWeight:500 }}>{reg.name}</td>
                  <td><span className="tag tag-cat">{reg.abbr}</span></td>
                  <td>{reg.cat}</td>
                  <td><span className={`tag tag-${reg.type==='IPD'?'ipd':'opd'}`}>{reg.type}</span></td>
                  <td style={{ fontSize:11, color:'#666' }}>{reg.cycleInfo||'—'}</td>
                  <td style={{ textAlign:'center' }}>{reg.drugs?.length||0}</td>
                  <td>
                    <div style={{ display:'flex', gap:4 }}>
                      <button className="btn-sm" onClick={() => onEdit(reg)} style={{ color:'#1565c0', borderColor:'#1565c0' }}>แก้ไข</button>
                      <button className="btn-sm btn-danger" onClick={() => onDelete(reg)}>ลบ</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign:'center', color:'#999', padding:24 }}>ไม่พบสูตรยา</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ── Regimen Form ───────────────────────────────
function RegForm({ reg, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: reg?.name || '',
    abbr: reg?.abbr || '',
    cat: reg?.cat || 'Lymphoma',
    type: reg?.type || 'OPD',
    cycleInfo: reg?.cycleInfo || '',
    drugs: reg?.drugs?.map(d=>({...d})) || []
  })

  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const addDrug = () => setForm(f => ({
    ...f,
    drugs: [...f.drugs, { name:'', dose:'', unit:'fixed', vehicle:'', route:'', instruct:'', days:'', maxDose:'', detail:'', note:'' }]
  }))

  const updDrug = (i, k, v) => setForm(f => ({
    ...f,
    drugs: f.drugs.map((d, idx) => idx===i ? {...d,[k]:v} : d)
  }))

  const delDrug = (i) => setForm(f => ({ ...f, drugs: f.drugs.filter((_,idx)=>idx!==i) }))

  const moveDrug = (i, dir) => {
    const drugs = [...form.drugs]
    const j = i + dir
    if (j < 0 || j >= drugs.length) return
    ;[drugs[i], drugs[j]] = [drugs[j], drugs[i]]
    setForm(f => ({ ...f, drugs }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.abbr) return alert('กรุณากรอกชื่อสูตรและ Abbr')
    const data = {
      ...form,
      _id: reg?._id,
      drugs: form.drugs.map(d => ({
        ...d,
        dose: d.dose ? parseFloat(d.dose) : undefined,
        maxDose: d.maxDose ? parseFloat(d.maxDose) : undefined,
      }))
    }
    onSave(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
        <div style={{ fontWeight:500, fontSize:15, flex:1 }}>
          {reg ? `แก้ไข: ${reg.name}` : 'เพิ่มสูตรยาใหม่'}
        </div>
        <button type="button" onClick={onCancel} style={{ padding:'6px 14px' }}>ยกเลิก</button>
        <button type="submit" className="btn-primary" style={{ padding:'6px 18px' }}>💾 บันทึก</button>
      </div>

      {/* Regimen info */}
      <div className="card">
        <div className="sec-label">ข้อมูลสูตรยา</div>
        <div className="admin-reg-grid">
          <div>
            <label className="label">ชื่อสูตร (name)</label>
            <input value={form.name} onChange={e=>sf('name',e.target.value)} placeholder="R-CHOP" required />
          </div>
          <div>
            <label className="label">ชื่อย่อ (abbr)</label>
            <input value={form.abbr} onChange={e=>sf('abbr',e.target.value)} placeholder="R-CHOP" required />
          </div>
          <div>
            <label className="label">Category</label>
            <select value={form.cat} onChange={e=>sf('cat',e.target.value)}>
              {CATS.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Type</label>
            <select value={form.type} onChange={e=>sf('type',e.target.value)}>
              <option>OPD</option><option>IPD</option>
            </select>
          </div>
          <div>
            <label className="label">Cycle Info</label>
            <input value={form.cycleInfo} onChange={e=>sf('cycleInfo',e.target.value)} placeholder="21 วัน" />
          </div>
        </div>
      </div>

      {/* Drug list */}
      <div className="card">
        <div style={{ display:'flex', alignItems:'center', marginBottom:10 }}>
          <span style={{ fontWeight:500, flex:1 }}>รายการยา ({form.drugs.length} รายการ)</span>
          <button type="button" className="btn-sm" onClick={addDrug}>➕ เพิ่มยา</button>
        </div>

        {form.drugs.map((drug, i) => (
          <div key={i} style={{ background:'#f8f9fa', border:'1px solid #e0e0e0', borderRadius:6, padding:10, marginBottom:8 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
              <span style={{ fontWeight:500, fontSize:12, color:'#1565c0', minWidth:20 }}>{i+1}.</span>
              <div style={{ flex:1, fontWeight:500, fontSize:13 }}>{drug.name||'(ยังไม่ได้ใส่ชื่อ)'}</div>
              <button type="button" className="btn-sm" onClick={()=>moveDrug(i,-1)} disabled={i===0} title="เลื่อนขึ้น">↑</button>
              <button type="button" className="btn-sm" onClick={()=>moveDrug(i,1)} disabled={i===form.drugs.length-1} title="เลื่อนลง">↓</button>
              <button type="button" className="btn-sm btn-danger" onClick={()=>delDrug(i)}>ลบ</button>
            </div>
            <div className="admin-drug-grid">
              <div>
                <label className="label">ชื่อยา</label>
                <input value={drug.name} onChange={e=>updDrug(i,'name',e.target.value)} placeholder="Rituximab" />
              </div>
              <div>
                <label className="label">Dose</label>
                <input type="number" value={drug.dose} onChange={e=>updDrug(i,'dose',e.target.value)} placeholder="375" />
              </div>
              <div>
                <label className="label">Unit</label>
                <select value={drug.unit} onChange={e=>updDrug(i,'unit',e.target.value)}>
                  {UNITS.map(u=><option key={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Max dose (mg)</label>
                <input type="number" value={drug.maxDose} onChange={e=>updDrug(i,'maxDose',e.target.value)} placeholder="-" />
              </div>
            </div>
            <div className="admin-drug-detail" style={{ marginTop:7 }}>
              <div>
                <label className="label">Vehicle (สารละลาย)</label>
                <input value={drug.vehicle} onChange={e=>updDrug(i,'vehicle',e.target.value)} placeholder="NSS 250 mL" />
              </div>
              <div>
                <label className="label">Route / วิธีให้ (ถ้าไม่ fixed)</label>
                <input value={drug.route} onChange={e=>updDrug(i,'route',e.target.value)} placeholder="IV in 1 hr" />
              </div>
              <div>
                <label className="label">Instruct (ถ้า unit=fixed)</label>
                <input value={drug.instruct} onChange={e=>updDrug(i,'instruct',e.target.value)} placeholder="8 mg IV ก่อนให้ยา 30 นาที" />
              </div>
              <div>
                <label className="label">วัน (days)</label>
                <input value={drug.days} onChange={e=>updDrug(i,'days',e.target.value)} placeholder="Day 1" />
              </div>
              <div>
                <label className="label">รายละเอียดเพิ่มเติม / คำเตือน</label>
                <input value={drug.detail} onChange={e=>updDrug(i,'detail',e.target.value)} placeholder="ระวัง extravasation" />
              </div>
              <div>
                <label className="label">หมายเหตุ (note)</label>
                <input value={drug.note} onChange={e=>updDrug(i,'note',e.target.value)} placeholder="NED, ใบกำกับ" />
              </div>
            </div>
          </div>
        ))}

        {form.drugs.length === 0 && (
          <div style={{ textAlign:'center', color:'#999', padding:20, fontSize:12 }}>
            ยังไม่มีรายการยา — กด ➕ เพิ่มยา
          </div>
        )}
      </div>

      <div style={{ display:'flex', justifyContent:'flex-end', gap:8 }}>
        <button type="button" onClick={onCancel} style={{ padding:'8px 20px' }}>ยกเลิก</button>
        <button type="submit" className="btn-primary" style={{ padding:'8px 24px', fontSize:14 }}>💾 บันทึกสูตรยา</button>
      </div>
    </form>
  )
}
