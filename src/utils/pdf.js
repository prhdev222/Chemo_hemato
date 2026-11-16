// Map a regimen's PDF reference (e.g. ref:'Siriraj order 2025 p.43') to the split PDF under /public/protocol.
// Page numbers are the original document's pages; each section file starts at `from`.
const SECTIONS = [
  { file:'cover-toc.pdf',            from:1,   to:2,   label:'ปก / สารบัญ' },
  { file:'cmt-summary.pdf',          from:3,   to:30,  label:'CMT Summary' },
  { file:'hd-chemo-guideline.pdf',   from:31,  to:33,  label:'High-dose chemotherapy guideline' },
  { file:'pcc-consent.pdf',          from:34,  to:35,  label:'PCC consent form' },
  { file:'opd-orders.pdf',           from:36,  to:39,  label:'ใบสั่งยาผู้ป่วยนอก' },
  { file:'ipd-all.pdf',              from:40,  to:61,  label:'ใบสั่งยา ALL' },
  { file:'ipd-aml-mds.pdf',          from:62,  to:72,  label:'ใบสั่งยา AML & MDS' },
  { file:'ipd-apl.pdf',              from:73,  to:92,  label:'ใบสั่งยา APL' },
  { file:'ipd-rr-leukemia.pdf',      from:93,  to:103, label:'ใบสั่งยา Relapse/Refractory acute leukemia' },
  { file:'ipd-aplastic-anemia.pdf',  from:104, to:105, label:'ใบสั่งยา Aplastic anemia' },
  { file:'ipd-hlh.pdf',              from:106, to:107, label:'ใบสั่งยา HLH' },
  { file:'ipd-ivig.pdf',             from:108, to:109, label:'ใบสั่งยา IVIG' },
  { file:'ipd-lymphoma.pdf',         from:110, to:162, label:'ใบสั่งยา Lymphoma' },
  { file:'ipd-nkt-lymphoma.pdf',     from:163, to:171, label:'ใบสั่งยา NK/T-cell lymphoma' },
  { file:'ipd-myeloma.pdf',          from:172, to:190, label:'ใบสั่งยา Multiple myeloma' },
  { file:'ipd-hsct.pdf',             from:191, to:198, label:'ใบสั่งยา HSCT' },
  { file:'pediatric-protocols.pdf',  from:199, to:201, label:'แนวทางการรักษาโรคมะเร็งในเด็กที่นำมาใช้ในผู้ใหญ่' },
]

export const PDF_SECTIONS = SECTIONS

export function pdfPage(reg) {
  const m = /p\.(\d+)/.exec(reg?.ref || '')
  return m ? +m[1] : null
}

export function pdfLocate(reg) {
  const p = pdfPage(reg)
  if (!p) return null
  const s = SECTIONS.find(x => p >= x.from && p <= x.to)
  if (!s) return null
  return { file: s.file, label: s.label, page: p, localPage: p - s.from + 1, sectionFrom: s.from, sectionTo: s.to }
}

export function pdfLink(reg) {
  const l = pdfLocate(reg)
  if (!l) return null
  return { href: `/protocol/${l.file}#page=${l.localPage}`, label: l.label, page: l.page }
}
