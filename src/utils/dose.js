export function calcBSA(wt, ht) {
  if (!wt || !ht) return 0
  return +(Math.sqrt(parseFloat(wt) * parseFloat(ht) / 3600)).toFixed(3)
}

export function calcDose(drug, bsa, wt, ccr) {
  if (!drug.dose || drug.unit === 'fixed') return null
  const b = parseFloat(bsa) || 0
  const w = parseFloat(wt) || 0
  if (['mg/m2', 'IU/m2', 'mg/m2/day'].includes(drug.unit)) {
    let d = drug.dose * b
    if (drug.maxDose) d = Math.min(d, drug.maxDose)
    return Math.round(d * 10) / 10
  }
  if (drug.unit === 'mg/kg') return Math.round(drug.dose * w * 10) / 10
  if (drug.unit === 'AUC5') return ccr ? Math.min(5 * (parseFloat(ccr) + 25), 800) : null
  return null
}

export function makeDrugRow(drug, bsa, wt, ccr, index) {
  const dv = calcDose(drug, bsa, wt, ccr)
  const isFixed = drug.unit === 'fixed'
  const doseLabel = !isFixed && drug.dose
    ? `${drug.dose} ${drug.unit}${drug.maxDose ? ', max ' + drug.maxDose + 'mg' : ''}`
    : drug.unit === 'AUC5' ? 'AUC5×(CCr+25)' : ''
  return {
    key: `${drug._id || drug.id || index}_${index}`,
    checked: true,
    name: drug.name || '',
    doseLabel,
    dose: dv != null ? String(dv) : '',
    vehicle: drug.vehicle || '',
    rate: isFixed ? '' : (drug.route || ''),
    instruct: isFixed ? (drug.instruct || '') : '',
    detail: drug.detail || '',
    days: drug.days || '',
    note: drug.note || '',
    isFixed
  }
}

export function formatDrugLine(row) {
  if (row.isFixed) return row.instruct || ''
  let s = ''
  if (row.dose) s += row.dose + ' mg'
  if (row.vehicle) s += (s ? ' ผสมใน ' : '') + row.vehicle
  if (row.rate) s += (s ? ' ' : '') + row.rate
  return s
}

export function buildCopyText(reg, pt, ord, bsa, rows) {
  const ln = '─'.repeat(40)
  const today = new Date().toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: 'numeric' })
  let t = `📋 ใบสั่งยาสาขาโลหิตวิทยา\n${ln}\n`
  t += `Regimen : ${reg.name}\nCycle   : ${ord.cycle || '—'}   Day 1 = ${ord.day1 || '—'}\n${ln}\n`
  t += `ผู้ป่วย : ${pt.name || '—'}\nHN : ${pt.hn || '—'}   AN : ${pt.an || '—'}\n`
  t += `BW : ${pt.wt || '—'} kg   Ht : ${pt.ht || '—'} cm   BSA : ${bsa || '—'} m²\n`
  if (pt.cr || pt.tb) t += `Labs : Cr ${pt.cr || '—'} TB ${pt.tb || '—'} AST ${pt.ast || '—'} ALT ${pt.alt || '—'}\n`
  t += `${ln}\nรายการยา\n${ln}\n`
  rows.forEach((row, i) => {
    t += `${i + 1}. ${row.name}${row.dose ? ' ' + row.dose + ' mg' : ''}\n`
    const line = formatDrugLine(row)
    if (line) t += `   ${line}\n`
    if (row.detail) t += `   ⚠ ${row.detail}\n`
    if (row.days) t += `   วัน: ${row.days}\n`
    if (row.note) t += `   หมายเหตุ: ${row.note}\n`
    t += '\n'
  })
  t += `${ln}\nแพทย์ : ${ord.drName || '—'}${ord.drCode ? ' (' + ord.drCode + ')' : ''}\nวันที่พิมพ์ : ${today}\n`
  return t
}
