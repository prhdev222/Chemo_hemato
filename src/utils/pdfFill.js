// Decide which value goes into which blank of an original order-form page.
// `fields` comes from /protocol/fields.json (built by the extraction script):
//   { k:'bw'|'ht'|'bsa'|'crcl'|'cr'|'tb'|'ast'|'alt'|'d1'|'cycle'|'dr'|'drcode'|'dose', x,y,w,h, u?, ctx? }
// Coordinates are PDF points with a top-left origin.

const STOP = new Set(['injection', 'tab', 'tabs', 'cap', 'caps', 'oral', 'high', 'low', 'dose', 'with', 'and', 'loading', 'continuous', 'liposomal'])

// forms often abbreviate; a row name token may appear on the form under any of these spellings
const ALIASES = {
  cytarabine: ['ara-c', 'arac', 'ara c', 'cytarabine'],
  mercaptopurine: ['6-mp', '6mp', 'mercaptopurine'],
  thioguanine: ['6-tg', '6tg', 'thioguanine'],
  methotrexate: ['mtx', 'methotrexate'],
  doxorubicin: ['doxorubicin', 'adriamycin'],
  adriamycin: ['adriamycin', 'doxorubicin'],
  etoposide: ['etoposide', 'vp-16', 'vp16'],
  arsenic: ['arsenic', 'ato'],
  atra: ['atra', 'tretinoin'],
  cyclophosphamide: ['cyclophosphamide', 'cpm', 'endoxan'],
  vincristine: ['vincristine', 'vcr'],
  rituximab: ['rituximab', 'mabthera'],
  dexamethasone: ['dexamethasone', 'dexa'],
  prednisolone: ['prednisolone', 'pred'],
  daunorubicin: ['daunorubicin', 'dnr'],
  idarubicin: ['idarubicin', 'ida'],
  carboplatin: ['carboplatin', 'cbdca'],
  cisplatin: ['cisplatin', 'cddp'],
  filgrastim: ['filgrastim', 'g-csf', 'gcsf'],
  asparaginase: ['asparaginase', 'l-asp'],
}

// first meaningful word of a drug name: "☐ Prednisolone (5 mg)" → "prednisolone"
export function drugToken(name) {
  const clean = String(name || '')
    .replace(/\[[^\]]*\]/g, ' ')     // "[CHOP] Cyclophosphamide"
    .replace(/\([^)]*\)/g, ' ')      // "(5 mg)"
    .replace(/[☐○●•\-–—:]/g, ' ')
    .toLowerCase()
  const words = clean.split(/\s+/).filter(w => /^[a-z][a-z0-9]{2,}$/.test(w) && !STOP.has(w))
  return words[0] || ''
}

// strength in mg from a name like "Prednisolone (5 mg)" → 5
export function tabletStrength(name) {
  const m = /\((\d+(?:\.\d+)?)\s*mg\)/i.exec(name || '')
  return m ? parseFloat(m[1]) : null
}

function fmt(n) {
  if (n == null || n === '' || isNaN(n)) return ''
  const v = +n
  return Number.isInteger(v) ? String(v) : String(Math.round(v * 10) / 10)
}

/**
 * @param {object} args
 * @param {Array} args.fields   blanks on this page
 * @param {Array} args.rows     drug rows from the order view (name, dose, doseUnit, isFixed, checked)
 * @param {object} args.pt      patient (wt, ht, cr, tb, ast, alt)
 * @param {object} args.ord     order (cycle, day1, drName, drCode)
 * @param {number|string} args.bsa
 * @param {string} args.ccr
 * @returns {Array<{x,y,w,h,text}>}
 */
export function planFills({ fields, rows, pt, ord, bsa, ccr }) {
  const out = []
  const simple = {
    bw: fmt(pt.wt), ht: fmt(pt.ht), bsa: bsa ? String(bsa) : '', crcl: fmt(ccr),
    cr: fmt(pt.cr), tb: fmt(pt.tb), ast: fmt(pt.ast), alt: fmt(pt.alt),
    d1: ord.day1 || '', cycle: ord.cycle || '', dr: ord.drName || '', drcode: ord.drCode || '',
  }
  for (const f of fields) {
    if (f.k in simple) {
      if (simple[f.k]) out.push({ x: f.x, y: f.y, w: f.w, h: f.h, text: simple[f.k] })
    }
  }

  // dose blanks: match each calculable, checked row to the first unused blank whose context names the drug
  const doseFields = fields.filter(f => f.k === 'dose').map(f => ({ ...f, used: false, tok: drugToken(f.ctx) , ctxl: (f.ctx || '').toLowerCase() }))
  for (const row of rows) {
    if (!row.checked || row.isFixed || !row.dose) continue
    const tok = drugToken(row.name)
    if (!tok) continue
    const names = ALIASES[tok] || [tok]
    const hit = d => d.tok === tok || names.some(n => d.ctxl.includes(n))
    const f = doseFields.find(d => !d.used && hit(d))
    if (!f) continue
    f.used = true
    let text = ''
    const dose = parseFloat(row.dose)
    if (f.u === 'tab' || f.u === 'cap') {
      const st = tabletStrength(row.name)
      text = st ? fmt(Math.round((dose / st) * 2) / 2) : ''
    } else if (f.u === 'mg' || f.u === 'mcg' || f.u === 'iu' || f.u === 'unit' || f.u === 'other') {
      text = fmt(dose)
    }
    if (text) out.push({ x: f.x, y: f.y, w: f.w, h: f.h, text })
  }
  return out
}
