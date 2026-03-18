import { formatDrugLine } from '../utils/dose.js'

export default function PrintArea({ reg, pt, ord, bsa, rows }) {
  const today = new Date().toLocaleDateString('th-TH', { day:'2-digit', month:'2-digit', year:'numeric' })
  const hosp = pt.hosp || '…………'

  return (
    <div className="print-only" style={{ display:'none' }}>
      <table className="print-table">
        <tbody>
          <tr>
            <td colSpan={3} style={{ textAlign:'center', fontSize:'13pt', fontWeight:700, padding:'4pt 6pt' }}>
              💊 Chemo Order
            </td>
          </tr>
          <tr>
            <td colSpan={3} style={{ textAlign:'center', fontSize:'9.5pt', padding:'2pt 6pt' }}>
              สาขาโลหิตวิทยา {hosp}
            </td>
          </tr>
          <tr>
            <td colSpan={3} style={{ textAlign:'center', fontSize:'11.5pt', fontWeight:600, padding:'2pt 6pt' }}>
              ใบสั่งยาผู้ป่วย{reg.type==='OPD'?'นอก':'ใน'}
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ padding:'4pt 6pt', fontSize:'9pt', borderRight:'.5pt solid #000' }}>
              <b>Regimen: {reg.name}</b>&nbsp;&nbsp;Cycle: {ord.cycle||'…'}&nbsp;&nbsp;Day 1 = {ord.day1||'…………'}<br/>
              BW {pt.wt||'…'} kg &nbsp;Ht {pt.ht||'…'} cm &nbsp;BSA {bsa||'…'} m² &nbsp;
              Cr {pt.cr||'…'} &nbsp;TB {pt.tb||'…'} &nbsp;AST {pt.ast||'…'} &nbsp;ALT {pt.alt||'…'}
            </td>
            <td style={{ padding:'4pt 6pt', fontSize:'9pt', width:'40%' }}>
              <b>{pt.name||'………………………………………'}</b><br/>
              HN: {pt.hn||'…………'} &nbsp;AN: {pt.an||'…………'}<br/>
              Ward: {pt.ward||'…………………'} &nbsp;สิทธิ: {pt.right||'…………………'}
            </td>
          </tr>
          <tr style={{ background:'#f0f0f0' }}>
            <th style={{ width:'14pt', textAlign:'center', fontSize:'8.5pt', fontWeight:500, padding:'2.5pt 4pt' }}>☑</th>
            <th style={{ padding:'2.5pt 5pt', textAlign:'left', fontSize:'8.5pt', fontWeight:500 }}>
              ชื่อยา – ขนาด – วิธีใช้
            </th>
            <th style={{ width:'56pt', fontSize:'8.5pt', fontWeight:500, padding:'2.5pt 4pt' }}>วัน</th>
          </tr>
          {rows.map(row => (
            <tr key={row.key} style={{ borderBottom:'.3pt solid #ccc' }}>
              <td style={{ textAlign:'center', padding:'2.5pt 4pt' }}>☑</td>
              <td style={{ padding:'2.5pt 5pt', fontSize:'9pt', lineHeight:1.5 }}>
                <b>{row.name}</b>
                {row.doseLabel && <span style={{ fontSize:'8pt', color:'#555' }}> ({row.doseLabel})</span>}
                &nbsp;&nbsp;{formatDrugLine(row)}
                {row.detail && <div style={{ fontSize:'8.5pt', color:'#444', marginLeft:12 }}>{row.detail}</div>}
              </td>
              <td style={{ padding:'2.5pt 4pt', fontSize:'9pt' }}>
                {row.days}
                {row.note?.includes('NED') && (
                  <span style={{ border:'.3pt solid #000', padding:'0 3pt', fontSize:'7.5pt', marginLeft:4 }}>NED</span>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} style={{ padding:'3pt 6pt', fontSize:'8.5pt' }}>
              <b>Supportive:</b> □ Domperidone 1 tab tid ac &nbsp;□ Omeprazole 1 cap OD ac &nbsp;□ Senokot 2 tab hs prn
            </td>
          </tr>
          <tr>
            <td colSpan={3} style={{ padding:'5pt 7pt', fontSize:'8.5pt' }}>
              แพทย์: {ord.drName||'……………………………'} &nbsp;รหัส: {ord.drCode||'………'}
              <div style={{ display:'flex', gap:'16pt', marginTop:'10pt' }}>
                <div style={{ borderTop:'.3pt solid #888', paddingTop:'2pt', fontSize:'8pt' }}>กรรมการแพทย์ ……………………</div>
                <div style={{ borderTop:'.3pt solid #888', paddingTop:'2pt', fontSize:'8pt' }}>เภสัชกร ……………………</div>
                <div style={{ borderTop:'.3pt solid #888', paddingTop:'2pt', fontSize:'8pt' }}>ผู้จัดยา ……………………</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ fontSize:'7pt', color:'#aaa', textAlign:'center', marginTop:'3pt' }}>
        พิมพ์: {today} | Ref: คู่มือยาเคมีบำบัดโลหิตวิทยา 2020 Siriraj
      </div>
    </div>
  )
}
