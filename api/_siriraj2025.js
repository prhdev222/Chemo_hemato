// Regimens transcribed from "คู่มือการให้ยาเคมีบำบัด สาขาวิชาโลหิตวิทยา ศิริราช — Update version 2025",
// section 1 "CMT Summary" (pp. 4–30). `ref` gives the PDF page for each regimen.
//
// Transcription rules
// - Doses in g/m2 are written as mg/m2. µg doses use unit 'mcg/m2' or are 'fixed'.
// - Flat doses (e.g. "Dexamethasone 40 mg/d") are unit:'fixed' with the dose in `instruct`.
// - The summary tables list no premedication; none has been added here.
// - `type` (IPD/OPD) is NOT in the summary tables and is an editorial guess — verify.
// - Regimens already present in BUILTIN (api/seed.js) are not repeated here.
// Every entry must be checked against the PDF by a clinician before clinical use.

const P = (n) => `Siriraj CMT 2025 p.${n}`

export const SIRIRAJ_2025 = [

  // ───────────────────────── Acute lymphoblastic leukemia (p.4–6) ─────────────────────────
  { name:'ALL protocol phase I (adapted GMALL)', abbr:'ALL Ph I GMALL', cat:'ALL', type:'IPD', ref:P(4), drugs:[
    { name:'Vincristine', dose:1.4, unit:'mg/m2', route:'IV push', days:'D1, D8, D15, D22' },
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1, D8, D15, D22', detail:'ระวัง extravasation' },
    { name:'L-asparaginase', dose:5000, unit:'IU/m2', vehicle:'NSS 500 mL', route:'IV in 4 hr', days:'D15–D28' },
    { name:'Prednisolone', dose:60, unit:'mg/m2', route:'PO', days:'D1–D14', note:'หรือ Dexamethasone 10 mg/m2' },
    { name:'Prednisolone', dose:40, unit:'mg/m2', route:'PO', days:'D15–D28', note:'หรือ Dexamethasone 6 mg/m2' },
  ]},
  { name:'B-cell ALL induction cycle 1 (adapted MRC UKALL XII/ECOG E2993)', abbr:'B-ALL Ind C1', cat:'ALL', type:'IPD', ref:P(4), drugs:[
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1, D8, D15, D22', detail:'ระวัง extravasation' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', route:'IV push', days:'D1, D8, D15, D22' },
    { name:'L-asparaginase', dose:6000, unit:'IU/m2', vehicle:'NSS 500 mL', route:'IV in 4 hr', days:'D18, D20, D22, D24, D26, D28' },
    { name:'Dexamethasone', dose:10, unit:'mg/m2/day', maxDose:20, route:'PO', days:'D1–D7', note:'max 20 mg/day; งดถ้าอายุ ≥55 ปี' },
    { name:'Rituximab (considered)', dose:375, unit:'mg/m2', vehicle:'NSS 250–500 mL', route:'Standard infusion regimen', days:'D8, D15' },
    { name:'Cytarabine (IT)', unit:'fixed', instruct:'70 mg intrathecal', days:'D1' },
    { name:'Methotrexate (IT)', unit:'fixed', instruct:'12.5 mg intrathecal', days:'D14' },
  ]},
  { name:'B-cell ALL induction cycle 2 (adapted MRC UKALL XII/ECOG E2993)', abbr:'B-ALL Ind C2', cat:'ALL', type:'IPD', ref:P(4), drugs:[
    { name:'Cyclophosphamide', dose:1000, unit:'mg/m2', maxDose:1500, vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1, D29', note:'max 1,500 mg; อายุ >60 ปี ใช้ 800 mg/m2' },
    { name:'Cytarabine', dose:75, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D1–D4, D8–D11, D29–D32, D36–D39' },
    { name:'Mercaptopurine', dose:60, unit:'mg/m2', route:'PO', days:'D1–D14, D29–D42' },
    { name:'L-asparaginase', dose:5000, unit:'IU/m2', vehicle:'NSS 500 mL', route:'IV in 4 hr', days:'D15, D17, D19, D21, D23, D25', note:'งดถ้าอายุ ≥55 ปี' },
    { name:'Rituximab (considered)', dose:375, unit:'mg/m2', vehicle:'NSS 250–500 mL', route:'Standard infusion regimen', days:'D8, D15' },
    { name:'Methotrexate (IT)', unit:'fixed', instruct:'12.5 mg intrathecal', days:'D1, D8, D15, D22' },
  ]},
  { name:'Blinatumomab — consolidation in B-ALL', abbr:'Blina consol', cat:'ALL', type:'IPD', cycleInfo:'28 วัน', ref:P(4), drugs:[
    { name:'Blinatumomab', dose:15, unit:'mcg/m2', route:'Continuous IV infusion', days:'D1–D28', note:'หรือ 28 mcg/day flat dose' },
  ]},
  { name:'Inotuzumab (with mini-hyper-CVD) — cycle 1', abbr:'Ino+miniCVD C1', cat:'ALL', type:'IPD', ref:P(5), drugs:[
    { name:'Inotuzumab ozogamicin', dose:0.6, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 1 hr', days:'D2' },
    { name:'Inotuzumab ozogamicin', dose:0.3, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 1 hr', days:'D8' },
  ]},
  { name:'Inotuzumab (with mini-hyper-CVD) — cycle 2–4', abbr:'Ino+miniCVD C2-4', cat:'ALL', type:'IPD', ref:P(5), drugs:[
    { name:'Inotuzumab ozogamicin', dose:0.3, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 1 hr', days:'D2, D8' },
  ]},
  { name:'Mini-hyper-CVD — cycle 1,3,5,7', abbr:'miniCVD-A', cat:'ALL', type:'IPD', ref:P(5), drugs:[
    { name:'Cyclophosphamide', dose:150, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 1 hr every 12 hr', days:'D1–D3' },
    { name:'Vincristine', unit:'fixed', instruct:'2 mg IV push', days:'D1, D8' },
    { name:'Dexamethasone', unit:'fixed', instruct:'20 mg/day PO หรือ IV', days:'D1–D4, D11–D14' },
  ]},
  { name:'Mini-hyper-CVD — cycle 2,4,6,8', abbr:'miniCVD-B', cat:'ALL', type:'IPD', ref:P(5), drugs:[
    { name:'Methotrexate', dose:250, unit:'mg/m2', vehicle:'D5W 500 mL', route:'IV in 3 hr', days:'D1' },
    { name:'Leucovorin', dose:15, unit:'mg/m2', route:'IV push every 6 hr × 8 doses', days:'Start D2', detail:'เริ่ม 12 hr หลัง MTX หมด; หยุดเมื่อ MTX level <0.05 µmol/L', note:'เพิ่มเป็น 50 mg ถ้า MTX level สูง' },
    { name:'Cytarabine', dose:500, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr every 12 hr', days:'D2–D3' },
    { name:'Methotrexate (IT)', unit:'fixed', instruct:'12 mg intrathecal', days:'D2' },
    { name:'Cytarabine (IT)', unit:'fixed', instruct:'100 mg intrathecal', days:'D8' },
  ]},
  { name:'Nelarabine — after CMT induction in T-ALL', abbr:'Nelarabine 650', cat:'ALL', type:'IPD', ref:P(5), drugs:[
    { name:'Nelarabine', dose:650, unit:'mg/m2', route:'IV drip in 2 hr', days:'D1–D5' },
  ]},
  { name:'TPOG HR/VHR ALL — phase I', abbr:'TPOG ALL Ph I', cat:'ALL', type:'IPD', ref:P(6), drugs:[
    { name:'Vincristine', dose:1.5, unit:'mg/m2', route:'IV push', days:'D1, D8, D15, D22' },
    { name:'Prednisolone', dose:30, unit:'mg/m2', route:'PO BID (per dose)', days:'D1–D28' },
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1, D8, D15, D22', detail:'ระวัง extravasation' },
    { name:'L-asparaginase', dose:10000, unit:'IU/m2', vehicle:'NSS 500 mL', route:'IV in 4 hr', days:'D4, D6, D8, D10, D12, D14' },
    { name:'Methotrexate (IT)', unit:'fixed', instruct:'15 mg intrathecal', days:'D1, D8, D29 (+D15, D22 ถ้า CNS-3 หรือ traumatic tap)' },
  ]},
  { name:'TPOG VHR ALL — phase II', abbr:'TPOG ALL Ph II', cat:'ALL', type:'IPD', ref:P(6), drugs:[
    { name:'Cyclophosphamide', dose:1000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1, D29' },
    { name:'Mesna', dose:250, unit:'mg/m2', vehicle:'D5W 20 mL', route:'IV in 15 min at hr 0, 4, 8 of cyclophosphamide (per dose)', days:'D1, D29' },
    { name:'Cytarabine', dose:75, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D1–D4, D8–D11, D29–D32, D36–D39' },
    { name:'Mercaptopurine', dose:60, unit:'mg/m2', route:'PO', days:'D1–D14, D29–D42' },
    { name:'L-asparaginase', dose:25000, unit:'IU/m2', vehicle:'NSS 500 mL', route:'IV in 4 hr', days:'D15, D22, D43, D50' },
    { name:'Vincristine', dose:1.5, unit:'mg/m2', route:'IV push', days:'D15, D22, D43, D50' },
    { name:'Methotrexate (IT)', unit:'fixed', instruct:'15 mg intrathecal', days:'D1, D8, D15, D22' },
  ]},
  { name:'TPOG VHR ALL — phase III', abbr:'TPOG ALL Ph III', cat:'ALL', type:'IPD', ref:P(6), drugs:[
    { name:'Vincristine', dose:1.5, unit:'mg/m2', route:'IV push', days:'D1, D15, D29, D43' },
    { name:'Methotrexate', dose:5000, unit:'mg/m2', vehicle:'D5W 1,000 mL', route:'IV in 24 hr', days:'D1, D15, D29, D43' },
    { name:'Leucovorin', dose:15, unit:'mg/m2', route:'IV push every 6 hr × 8 doses', days:'Start D2, D16, D30, D44', detail:'เริ่ม 12 hr หลัง MTX หมด; หยุดเมื่อ MTX level <0.05 µmol/L', note:'เพิ่มเป็น 50 mg ถ้า MTX level สูง' },
    { name:'Mercaptopurine', dose:25, unit:'mg/m2', route:'PO', days:'D1–D56' },
    { name:'Methotrexate (IT)', unit:'fixed', instruct:'15 mg intrathecal', days:'D1, D29' },
  ]},

  // ───────────────────────── AML / MDS (p.6–7) ─────────────────────────
  { name:'7+3 (Daunorubicin+Cytarabine)', abbr:'7+3 DNR', cat:'AML', type:'IPD', ref:P(6), drugs:[
    { name:'Cytarabine', dose:100, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 12 hr', days:'D1–D7', note:'100–200 mg/m2' },
    { name:'Daunorubicin', dose:60, unit:'mg/m2', route:'IV slowly push', days:'D1–D3', detail:'ระวัง leak', note:'60–90 mg/m2' },
  ]},
  { name:'7+3 (Mitoxantrone+Cytarabine)', abbr:'7+3 Mito', cat:'AML', type:'IPD', ref:P(6), drugs:[
    { name:'Cytarabine', dose:100, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 12 hr', days:'D1–D7', note:'100–200 mg/m2' },
    { name:'Mitoxantrone', dose:12, unit:'mg/m2', route:'IV slowly push', days:'D1–D3', detail:'ระวัง leak' },
  ]},
  { name:'7+3 (Doxorubicin+Cytarabine)', abbr:'7+3 Doxo', cat:'AML', type:'IPD', ref:P(6), drugs:[
    { name:'Cytarabine', dose:100, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 12 hr', days:'D1–D7', note:'100–200 mg/m2' },
    { name:'Doxorubicin', dose:45, unit:'mg/m2', route:'IV slowly push', days:'D1–D3', detail:'ระวัง leak' },
  ]},
  { name:'Azacytidine + Venetoclax', abbr:'Aza+Ven', cat:'MDS/AML', type:'OPD', cycleInfo:'28 วัน', ref:P(7), drugs:[
    { name:'Azacytidine', dose:75, unit:'mg/m2', route:'SC', days:'D1–D7', note:'NED; ใบกำกับ' },
    { name:'Venetoclax', unit:'fixed', instruct:'400 mg/day PO (ramp-up ใน dose แรก)', days:'D1–D28' },
  ]},
  { name:'Decitabine', abbr:'Decitabine', cat:'MDS/AML', type:'OPD', cycleInfo:'28 วัน', ref:P(7), drugs:[
    { name:'Decitabine', dose:20, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1–D5' },
  ]},
  { name:'Decitabine + Venetoclax', abbr:'Dec+Ven', cat:'MDS/AML', type:'OPD', cycleInfo:'28 วัน', ref:P(7), drugs:[
    { name:'Decitabine', dose:20, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1–D5' },
    { name:'Venetoclax', unit:'fixed', instruct:'400 mg/day PO (ramp-up ใน dose แรก)', days:'D1–D28' },
  ]},
  { name:'IDAC (Intermediate-dose Ara-C)', abbr:'IDAC', cat:'AML', type:'IPD', ref:P(7), drugs:[
    { name:'Cytarabine', dose:1500, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 3 hr every 12 hr', days:'D1, D3, D5 (total 6 doses)' },
  ]},
  { name:'LDAC (Low-dose Ara-C)', abbr:'LDAC', cat:'AML', type:'OPD', ref:P(7), drugs:[
    { name:'Cytarabine', unit:'fixed', instruct:'40 mg SC', days:'D1–D10' },
  ]},
  { name:'LDAC + Venetoclax', abbr:'LDAC+Ven', cat:'AML', type:'OPD', cycleInfo:'28 วัน', ref:P(7), drugs:[
    { name:'Cytarabine', unit:'fixed', instruct:'40 mg SC', days:'D1–D10' },
    { name:'Venetoclax', unit:'fixed', instruct:'400 mg/day PO (ramp-up ใน dose แรก)', days:'D1–D28' },
  ]},
  { name:'G-DEC (Filgrastim + Decitabine)', abbr:'G-DEC', cat:'MDS/AML', type:'OPD', ref:P(7), drugs:[
    { name:'Filgrastim', dose:100, unit:'mcg/m2', route:'SC', days:'D0–D5' },
    { name:'Decitabine', dose:5, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 30 min', days:'D1–D5' },
  ]},

  // ───────────────────────── Acute promyelocytic leukemia (p.7–9) ─────────────────────────
  { name:'ATO monotherapy', abbr:'ATO mono', cat:'APL', type:'IPD', ref:P(7), drugs:[
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'Start D1 until CR', detail:'monitor K, Mg, QTc' },
  ]},
  { name:'ATRA monotherapy', abbr:'ATRA mono', cat:'APL', type:'IPD', ref:P(7), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'Start D1 until CR', note:'ห้ามให้ทาง NG tube' },
  ]},
  { name:'ATRA-ATO Consolidation (total 28 weeks)', abbr:'ATRA-ATO consol', cat:'APL', type:'OPD', ref:P(7), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'D1–D15 every 4 wk' },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1–D5, D8–D12, D15–D19, D22–D26 every 8 wk', detail:'monitor K, Mg, QTc' },
  ]},
  { name:'ATRA-CMT Consolidation C1 — High risk', abbr:'ATRA-CMT C1 HR', cat:'APL', type:'IPD', ref:P(8), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'D1–D15' },
    { name:'Idarubicin', dose:5, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1–D4', detail:'ระวัง extravasation' },
    { name:'Cytarabine', dose:1000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 3 hr', days:'D1–D4' },
  ]},
  { name:'ATRA-CMT Consolidation C2 — High risk', abbr:'ATRA-CMT C2 HR', cat:'APL', type:'IPD', ref:P(8), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'D1–D15' },
    { name:'Mitoxantrone', dose:10, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 15 min', days:'D1–D5' },
  ]},
  { name:'ATRA-CMT Consolidation C3 — High risk', abbr:'ATRA-CMT C3 HR', cat:'APL', type:'IPD', ref:P(8), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'D1–D15' },
    { name:'Idarubicin', dose:12, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1', detail:'ระวัง extravasation' },
    { name:'Cytarabine', dose:150, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV drip in 8 hr', days:'D1–D4' },
  ]},
  { name:'ATRA-CMT Consolidation C1 — Intermediate risk', abbr:'ATRA-CMT C1 IR', cat:'APL', type:'IPD', ref:P(8), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'D1–D15' },
    { name:'Idarubicin', dose:7, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1–D4', detail:'ระวัง extravasation' },
  ]},
  { name:'ATRA-CMT Consolidation C2 — Intermediate risk', abbr:'ATRA-CMT C2 IR', cat:'APL', type:'IPD', ref:P(8), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'D1–D15' },
    { name:'Mitoxantrone', dose:10, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 15 min', days:'D1–D3' },
  ]},
  { name:'ATRA-CMT Consolidation C3 — Intermediate risk', abbr:'ATRA-CMT C3 IR', cat:'APL', type:'IPD', ref:P(8), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'D1–D15' },
    { name:'Idarubicin', dose:12, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1–D2', detail:'ระวัง extravasation' },
  ]},
  { name:'ATRA-CMT Consolidation C1 — Low risk', abbr:'ATRA-CMT C1 LR', cat:'APL', type:'IPD', ref:P(8), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'D1–D15' },
    { name:'Idarubicin', dose:5, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1–D4', detail:'ระวัง extravasation' },
  ]},
  { name:'ATRA-CMT Consolidation C2 — Low risk', abbr:'ATRA-CMT C2 LR', cat:'APL', type:'IPD', ref:P(8), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'D1–D15' },
    { name:'Mitoxantrone', dose:10, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 15 min', days:'D1–D3' },
  ]},
  { name:'ATRA-CMT Consolidation C3 — Low risk', abbr:'ATRA-CMT C3 LR', cat:'APL', type:'IPD', ref:P(8), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'D1–D15' },
    { name:'Idarubicin', dose:12, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1', detail:'ระวัง extravasation' },
  ]},
  { name:'ATRA-CMT Maintenance (2 years, every 12 wk)', abbr:'ATRA-CMT maint', cat:'APL', type:'OPD', cycleInfo:'12 สัปดาห์', ref:P(8), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'D1–D15' },
    { name:'Methotrexate', dose:15, unit:'mg/m2', route:'PO', days:'Weekly' },
    { name:'Mercaptopurine', dose:90, unit:'mg/m2', route:'PO', days:'Daily' },
  ]},
  { name:'APML4: ATRA-CMT-ATO Induction', abbr:'APML4 Ind', cat:'APL', type:'IPD', ref:P(8), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'Start D1 until CR' },
    { name:'Idarubicin', dose:12, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D2, D4, D6, D8', detail:'ระวัง extravasation' },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D9–D36', detail:'monitor K, Mg, QTc' },
  ]},
  { name:'APML4: ATRA-CMT-ATO Consolidation — cycle 1', abbr:'APML4 Consol C1', cat:'APL', type:'OPD', ref:P(8), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'D1–D28' },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1–D28', detail:'monitor K, Mg, QTc' },
  ]},
  { name:'APML4: ATRA-CMT-ATO Consolidation — cycle 2', abbr:'APML4 Consol C2', cat:'APL', type:'OPD', ref:P(8), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'D1–D7, D15–D21, D29–D35' },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1–D5, D8–D12, D15–D19, D22–D26, D29–D33', detail:'monitor K, Mg, QTc' },
  ]},
  { name:'APML4: ATRA-CMT-ATO Maintenance (every 12 wk)', abbr:'APML4 maint', cat:'APL', type:'OPD', cycleInfo:'12 สัปดาห์', ref:P(8), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO', days:'D1–D14' },
    { name:'Methotrexate', dose:5, unit:'mg/m2', route:'PO', days:'Daily except D1–D14', note:'5–15 mg/m2 (ตามตาราง PDF — ตรวจสอบ daily/weekly)' },
    { name:'Mercaptopurine', dose:50, unit:'mg/m2', route:'PO', days:'Weekly except D1–D14', note:'50–90 mg/m2 (ตามตาราง PDF — ตรวจสอบ daily/weekly)' },
  ]},
  { name:'APOLLO: ATRA-ATO Induction (+idarubicin)', abbr:'APOLLO Ind', cat:'APL', type:'IPD', ref:P(8), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'Start D1 until CR (up to D60)' },
    { name:'Idarubicin', dose:12, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1, D3', detail:'ระวัง extravasation' },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'Start D5 until CR (up to D60)', detail:'monitor K, Mg, QTc' },
  ]},
  { name:'APOLLO: ATRA-ATO Consolidation — cycle 1–3', abbr:'APOLLO Consol C1-3', cat:'APL', type:'OPD', ref:P(9), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'D1–D14, D29–D42' },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1–D5, D8–D12, D15–D19, D22–D26', detail:'monitor K, Mg, QTc' },
  ]},
  { name:'APOLLO: ATRA-ATO Consolidation — cycle 4', abbr:'APOLLO Consol C4', cat:'APL', type:'OPD', ref:P(9), drugs:[
    { name:'ATRA', dose:45, unit:'mg/m2/day', route:'PO every 12 hr', days:'D1–D14' },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1–D5, D8–D12, D15–D19, D22–D26', detail:'monitor K, Mg, QTc' },
  ]},

  // ───────────────────────── Relapse/refractory acute leukemia (p.9–11) ─────────────────────────
  { name:'ALL-REZ BFM protocol — phase F1', abbr:'ALL-REZ F1', cat:'ALL', type:'IPD', ref:P(9), drugs:[
    { name:'Vincristine', dose:1.5, unit:'mg/m2', route:'IV push', days:'D1, D6' },
    { name:'Methotrexate', dose:1000, unit:'mg/m2', vehicle:'D5W 1,000 mL', route:'IV in 36 hr', days:'D1' },
    { name:'Leucovorin', dose:15, unit:'mg/m2', route:'IV หรือ PO every 6 hr (6 doses)', days:'D2–D3' },
    { name:'L-asparaginase', dose:10000, unit:'IU/m2', vehicle:'NSS 500 mL', route:'IV in 4 hr', days:'D4' },
    { name:'Dexamethasone', dose:20, unit:'mg/m2', route:'PO', days:'D1–D5' },
    { name:'Methotrexate (IT)', unit:'fixed', instruct:'12 mg intrathecal', days:'D1' },
    { name:'Cytarabine (IT)', unit:'fixed', instruct:'30 mg intrathecal', days:'D1' },
    { name:'Hydrocortisone (IT)', unit:'fixed', instruct:'15 mg intrathecal', days:'D1' },
  ]},
  { name:'ALL-REZ BFM protocol — phase F2', abbr:'ALL-REZ F2', cat:'ALL', type:'IPD', ref:P(9), drugs:[
    { name:'Vincristine', dose:1.5, unit:'mg/m2', route:'IV push', days:'D1' },
    { name:'Cytarabine', dose:3000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 3 hr every 12 hr (4 doses)', days:'D1, D2' },
    { name:'L-asparaginase', dose:10000, unit:'IU/m2', vehicle:'NSS 500 mL', route:'IV in 4 hr', days:'D4' },
    { name:'Dexamethasone', dose:20, unit:'mg/m2', route:'PO', days:'D1–D5' },
    { name:'Methotrexate (IT)', unit:'fixed', instruct:'12 mg intrathecal', days:'D1' },
    { name:'Cytarabine (IT)', unit:'fixed', instruct:'30 mg intrathecal', days:'D1' },
    { name:'Hydrocortisone (IT)', unit:'fixed', instruct:'15 mg intrathecal', days:'D1' },
  ]},
  { name:'Blinatumomab (R/R B-ALL) — cycle 1', abbr:'Blina R/R C1', cat:'ALL', type:'IPD', ref:P(9), drugs:[
    { name:'Blinatumomab', unit:'fixed', instruct:'9 mcg/day continuous IV infusion', days:'D1–D7' },
    { name:'Blinatumomab', unit:'fixed', instruct:'28 mcg/day continuous IV infusion', days:'D8–D28' },
  ]},
  { name:'Blinatumomab (R/R B-ALL) — cycle 2', abbr:'Blina R/R C2', cat:'ALL', type:'IPD', ref:P(9), drugs:[
    { name:'Blinatumomab', unit:'fixed', instruct:'28 mcg/day continuous IV infusion', days:'D1–D28' },
  ]},
  { name:'FLAG', abbr:'FLAG', cat:'AML', type:'IPD', ref:P(10), drugs:[
    { name:'Fludarabine', dose:30, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 30 min', days:'D1–D5' },
    { name:'Cytarabine', dose:2000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 3 hr', days:'D1–D5', detail:'เริ่ม 4 hr หลัง fludarabine หมด' },
    { name:'Filgrastim', unit:'fixed', instruct:'300 mcg SC', days:'Start D0 until ANC >1,000/mm3' },
  ]},
  { name:'FLAG-IDA', abbr:'FLAG-IDA', cat:'AML', type:'IPD', ref:P(10), drugs:[
    { name:'Fludarabine', dose:30, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 30 min', days:'D1–D4' },
    { name:'Cytarabine', dose:2000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 3 hr', days:'D1–D4', detail:'เริ่ม 4 hr หลัง fludarabine หมด' },
    { name:'Idarubicin', dose:12, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D2–D4', detail:'ระวัง extravasation' },
    { name:'Filgrastim', unit:'fixed', instruct:'300 mcg SC', days:'Start D0 until ANC >1,000/mm3' },
  ]},
  { name:'Inotuzumab (R/R B-ALL)', abbr:'Ino R/R', cat:'ALL', type:'IPD', ref:P(10), drugs:[
    { name:'Inotuzumab ozogamicin', dose:0.8, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 1 hr', days:'D1' },
    { name:'Inotuzumab ozogamicin', dose:0.5, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 1 hr', days:'D8, D15' },
  ]},
  { name:'MEC', abbr:'MEC', cat:'AML', type:'IPD', ref:P(10), drugs:[
    { name:'Mitoxantrone', dose:8, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1–D5' },
    { name:'Etoposide', dose:100, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 1 hr', days:'D1–D5' },
    { name:'Cytarabine', dose:1000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 3 hr', days:'D1–D5' },
  ]},
  { name:'MECA', abbr:'MECA', cat:'ALL', type:'IPD', ref:P(10), drugs:[
    { name:'Mitoxantrone', dose:8, unit:'mg/m2', route:'IV push', days:'D1–D5' },
    { name:'Etoposide', dose:100, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 1 hr', days:'D1–D3' },
    { name:'Carboplatin', dose:200, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D7–D8' },
    { name:'Cytarabine', dose:500, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr every 12 hr', days:'D7–D8' },
    { name:'Prednisolone', dose:1, unit:'mg/kg/day', route:'PO', days:'D1–D28', note:'ในผู้ป่วย ALL' },
  ]},
  { name:'Nelarabine (R/R T-ALL)', abbr:'Nelarabine 1500', cat:'ALL', type:'IPD', ref:P(10), drugs:[
    { name:'Nelarabine', dose:1500, unit:'mg/m2', route:'IV drip in 2 hr', days:'D1, D3, D5' },
  ]},
  { name:'S-HAM', abbr:'S-HAM', cat:'AML', type:'IPD', ref:P(10), drugs:[
    { name:'Cytarabine', dose:1000, unit:'mg/m2/day', vehicle:'NSS 250 mL', route:'IV in 3 hr every 12 hr', days:'D1, D2, D8, D9', note:'1–3 g/m2/day' },
    { name:'Mitoxantrone', dose:10, unit:'mg/m2/day', vehicle:'NSS 50 mL', route:'IV in 30 min', days:'D3, D4, D10, D11' },
  ]},
  { name:'TPOG 1305 protocol — phase I induction', abbr:'TPOG1305 Ph I', cat:'ALL', type:'IPD', ref:P(10), drugs:[
    { name:'Dexamethasone', dose:20, unit:'mg/m2/day', route:'PO หรือ IV TID', days:'D1–D5, D15–D19' },
    { name:'Mitoxantrone', dose:10, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 30 min', days:'D1–D2' },
    { name:'Vincristine', dose:1.5, unit:'mg/m2', route:'IV push', days:'D3, D10, D17, D24' },
    { name:'L-asparaginase', dose:10000, unit:'IU/m2', vehicle:'NSS 500 mL', route:'IV in 4 hr', days:'D3, D5, D7, D17, D19, D21' },
    { name:'Methotrexate (IT)', unit:'fixed', instruct:'12 mg intrathecal', days:'D1, D8' },
  ]},
  { name:'TPOG 1305 protocol — phase II consolidation', abbr:'TPOG1305 Ph II', cat:'ALL', type:'IPD', ref:P(11), drugs:[
    { name:'Dexamethasone', dose:6, unit:'mg/m2/day', route:'PO BID', days:'D1–D5' },
    { name:'Vincristine', dose:1.5, unit:'mg/m2', route:'IV push', days:'D3' },
    { name:'Methotrexate', dose:1000, unit:'mg/m2', vehicle:'D5W 1,000 mL', route:'IV in 24 hr', days:'D8' },
    { name:'Leucovorin', dose:15, unit:'mg/m2', route:'IV push every 6 hr × 6 doses', days:'Start D9', detail:'เริ่ม 18 hr หลัง MTX หมด; หยุดเมื่อ MTX level <0.05 µmol/L', note:'เพิ่มเป็น 50 mg ถ้า MTX level สูง' },
    { name:'L-asparaginase', dose:10000, unit:'IU/m2', vehicle:'NSS 500 mL', route:'IV in 4 hr', days:'D9, D11, D13' },
    { name:'Cyclophosphamide', dose:440, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D15–D19' },
    { name:'Etoposide', dose:100, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 1 hr', days:'D15–D19' },
    { name:'Methotrexate (IT)', unit:'fixed', instruct:'12 mg intrathecal', days:'D8' },
  ]},

  // ───────────────────────── Aplastic anemia (p.12) ─────────────────────────
  { name:'ATG-CSA', abbr:'ATG-CSA', cat:'Aplastic anemia', type:'IPD', ref:P(12), drugs:[
    { name:'ATG', dose:3.5, unit:'mg/kg/day', vehicle:'NSS 500 mL', route:'IV in 12 hr', days:'D1–D5' },
    { name:'Cyclosporin A', dose:5, unit:'mg/kg/day', route:'PO BID', days:'Start D1' },
    { name:'Prednisolone', dose:1, unit:'mg/kg/day', route:'PO BID', days:'D5–D13' },
    { name:'Prednisolone', dose:0.5, unit:'mg/kg/day', route:'PO BID', days:'D14–D16' },
    { name:'Prednisolone', dose:0.25, unit:'mg/kg/day', route:'PO BID', days:'D17–D19' },
  ]},
  { name:'ATG-CSA-Eltrombopag', abbr:'ATG-CSA-EPAG', cat:'Aplastic anemia', type:'IPD', ref:P(12), drugs:[
    { name:'ATG', dose:3.5, unit:'mg/kg/day', vehicle:'NSS 500 mL', route:'IV in 12 hr', days:'D1–D5' },
    { name:'Cyclosporin A', dose:5, unit:'mg/kg/day', route:'PO BID', days:'Start D1' },
    { name:'Eltrombopag', unit:'fixed', instruct:'75 mg/day PO', days:'Start D14 until 6 months' },
    { name:'Prednisolone', dose:1, unit:'mg/kg/day', route:'PO BID', days:'D5–D13' },
    { name:'Prednisolone', dose:0.5, unit:'mg/kg/day', route:'PO BID', days:'D14–D16' },
    { name:'Prednisolone', dose:0.25, unit:'mg/kg/day', route:'PO BID', days:'D17–D19' },
  ]},
  { name:'CSA-Eltrombopag', abbr:'CSA-EPAG', cat:'Aplastic anemia', type:'OPD', ref:P(12), drugs:[
    { name:'Cyclosporin A', dose:10, unit:'mg/kg/day', route:'PO', days:'Start D1 until 6 months' },
    { name:'Eltrombopag', unit:'fixed', instruct:'100 mg/day PO', days:'Start D1 until 6 months' },
  ]},

  // ───────────────────────── HLH (p.12) ─────────────────────────
  { name:'HLH 2004 protocol — phase I (week 1–8)', abbr:'HLH-2004 Ph I', cat:'HLH', type:'IPD', ref:P(12), drugs:[
    { name:'Etoposide', dose:150, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D1, D4, D8, D11, D15, D22, D29, D36, D43, D50' },
    { name:'Dexamethasone', dose:10, unit:'mg/m2', route:'PO หรือ IV', days:'D1–D14' },
    { name:'Dexamethasone', dose:5, unit:'mg/m2', route:'PO หรือ IV', days:'D15–D28' },
    { name:'Dexamethasone', dose:2.5, unit:'mg/m2', route:'PO หรือ IV', days:'D29–D42' },
    { name:'Dexamethasone', dose:1.25, unit:'mg/m2', route:'PO หรือ IV', days:'D43–D56', note:'แล้ว taper off ใน 1 สัปดาห์' },
    { name:'Cyclosporine', dose:6, unit:'mg/kg/day', route:'PO every 12 hr', days:'Daily', note:'6–10 mg/kg/day' },
    { name:'IVIG', unit:'fixed', instruct:'0.5 g/kg/dose IV (IAHS only)', days:'every 4 weeks' },
  ]},
  { name:'HLH 2004 protocol — phase II (week 9–40, 2-week cycle)', abbr:'HLH-2004 Ph II', cat:'HLH', type:'OPD', cycleInfo:'14 วัน', ref:P(12), drugs:[
    { name:'Etoposide', dose:150, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D1' },
    { name:'Dexamethasone', dose:10, unit:'mg/m2/day', route:'PO', days:'D8–D10' },
    { name:'Cyclosporine', dose:6, unit:'mg/kg/day', route:'PO every 12 hr', days:'Daily', note:'6–10 mg/kg/day' },
    { name:'Co-trimoxazole', unit:'fixed', instruct:'5 mg TMP/kg/day PO BID', days:'3 days/week' },
  ]},

  // ───────────────────────── Classical Hodgkin lymphoma (p.13–15) ─────────────────────────
  { name:'B-B (Brentuximab+Bendamustine)', abbr:'B-B', cat:'Hodgkin', type:'OPD', cycleInfo:'21 วัน', ref:P(13), drugs:[
    { name:'Brentuximab vedotin', dose:1.8, unit:'mg/kg', vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1' },
    { name:'Bendamustine', dose:90, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D1, D2', note:'NED' },
  ]},
  { name:'BEGEV', abbr:'BEGEV', cat:'Hodgkin', type:'OPD', cycleInfo:'21 วัน', ref:P(13), drugs:[
    { name:'Vinorelbine', dose:20, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1' },
    { name:'Gemcitabine', dose:800, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 30 min', days:'D1, D4' },
    { name:'Bendamustine', dose:90, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D2, D3', note:'NED' },
  ]},
  { name:'BrECADD', abbr:'BrECADD', cat:'Hodgkin', type:'IPD', cycleInfo:'21 วัน', ref:P(13), drugs:[
    { name:'Brentuximab vedotin', dose:1.8, unit:'mg/kg', maxDose:180, vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D0', detail:'max 180 mg' },
    { name:'Doxorubicin', dose:40, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1', detail:'ระวัง extravasation' },
    { name:'Cyclophosphamide', dose:1250, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1' },
    { name:'Etoposide', dose:150, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D1–D3' },
    { name:'Dacarbazine', dose:250, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 3 hr', days:'D2–D3' },
    { name:'Dexamethasone', dose:40, unit:'mg/m2', route:'PO', days:'D1–D4' },
  ]},
  { name:'Brentuximab vedotin monotherapy', abbr:'BV mono', cat:'Hodgkin', type:'OPD', cycleInfo:'21 วัน', ref:P(13), drugs:[
    { name:'Brentuximab vedotin', dose:1.8, unit:'mg/kg', vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1' },
  ]},
  { name:'BV-AVD', abbr:'BV-AVD', cat:'Hodgkin', type:'OPD', cycleInfo:'28 วัน', ref:P(13), drugs:[
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1, D15', detail:'ระวัง extravasation' },
    { name:'Vinblastine', dose:6, unit:'mg/m2', route:'IV push', days:'D1, D15' },
    { name:'Dacarbazine', dose:375, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 3 hr', days:'D1, D15' },
    { name:'Brentuximab vedotin', dose:1.2, unit:'mg/kg', maxDose:180, vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1, D15', detail:'max 180 mg' },
  ]},
  { name:'BV-DTIC', abbr:'BV-DTIC', cat:'Hodgkin', type:'OPD', cycleInfo:'21 วัน', ref:P(13), drugs:[
    { name:'Brentuximab vedotin', dose:1.8, unit:'mg/kg', maxDose:180, vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1', detail:'max 180 mg' },
    { name:'Dacarbazine', dose:375, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 3 hr', days:'D1' },
  ]},
  { name:'BV-N (Brentuximab+Nivolumab)', abbr:'BV-N', cat:'Hodgkin', type:'OPD', cycleInfo:'21 วัน', ref:P(13), drugs:[
    { name:'Brentuximab vedotin', dose:1.8, unit:'mg/kg', maxDose:180, vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1', detail:'max 180 mg' },
    { name:'Nivolumab', dose:3, unit:'mg/kg', vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1' },
  ]},
  { name:'BV-N-AD', abbr:'BV-N-AD', cat:'Hodgkin', type:'OPD', cycleInfo:'28 วัน', ref:P(13), drugs:[
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1, D15', detail:'ระวัง extravasation' },
    { name:'Dacarbazine', dose:375, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 3 hr', days:'D1, D15' },
    { name:'Brentuximab vedotin', dose:1.2, unit:'mg/kg', maxDose:120, vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1, D15', detail:'max 120 mg' },
    { name:'Nivolumab', unit:'fixed', instruct:'240 mg ผสม NSS 100 mL IV in 1 hr', days:'D1, D15' },
  ]},
  { name:'COP-ABV', abbr:'COP-ABV', cat:'Hodgkin', type:'OPD', cycleInfo:'28 วัน', ref:P(14), drugs:[
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, route:'IV push', days:'D1', detail:'max 2 mg' },
    { name:'Cyclophosphamide', dose:600, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1' },
    { name:'Prednisolone', dose:60, unit:'mg/m2', route:'PO', days:'D1–D7' },
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D15', detail:'ระวัง extravasation' },
    { name:'Bleomycin', dose:10, unit:'IU/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D15' },
    { name:'Vinblastine', dose:6, unit:'mg/m2', route:'IV push', days:'D15' },
  ]},
  { name:'GVD', abbr:'GVD', cat:'Hodgkin', type:'OPD', cycleInfo:'21 วัน', ref:P(14), drugs:[
    { name:'Gemcitabine', dose:1000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 30 min', days:'D1, D8' },
    { name:'Vinorelbine', dose:20, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1, D8' },
    { name:'Liposomal doxorubicin', dose:15, unit:'mg/m2', vehicle:'D5W 250 mL', route:'IV in 2 hr', days:'D1' },
  ]},
  { name:'IGEV', abbr:'IGEV', cat:'Hodgkin', type:'IPD', cycleInfo:'21 วัน', ref:P(14), drugs:[
    { name:'Vinorelbine', dose:20, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1' },
    { name:'Gemcitabine', dose:800, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 30 min', days:'D1, D4' },
    { name:'Ifosfamide', dose:2000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1–D4', note:'+ Mesna 2,000 mg/m2' },
    { name:'Mesna', dose:2000, unit:'mg/m2', route:'IV (ร่วมกับ ifosfamide)', days:'D1–D4' },
    { name:'Prednisolone', unit:'fixed', instruct:'100 mg/day PO', days:'D1–D4' },
  ]},
  { name:'Modified BEACOPP', abbr:'mBEACOPP', cat:'Hodgkin', type:'IPD', cycleInfo:'21 วัน', ref:P(14), drugs:[
    { name:'Cyclophosphamide', dose:650, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 3 hr', days:'D1' },
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1', detail:'ระวัง extravasation' },
    { name:'Etoposide', dose:100, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 1 hr', days:'D1–D3' },
    { name:'Procarbazine', dose:100, unit:'mg/m2', route:'PO', days:'D1–D7' },
    { name:'Prednisolone', dose:40, unit:'mg/m2', route:'PO', days:'D1–D14' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, route:'IV push', days:'D8', detail:'max 2 mg' },
    { name:'Bleomycin', dose:10, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D8' },
  ]},
  { name:'MOPP', abbr:'MOPP', cat:'Hodgkin', type:'OPD', cycleInfo:'28 วัน', ref:P(14), drugs:[
    { name:'Mechlorethamine', dose:6, unit:'mg/m2', route:'IV push', days:'D1, D8' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, route:'IV push', days:'D1, D8', detail:'max 2 mg' },
    { name:'Procarbazine', dose:100, unit:'mg/m2', route:'PO', days:'D1–D14' },
    { name:'Prednisolone', dose:40, unit:'mg/m2', route:'PO', days:'D1–D14' },
  ]},
  { name:'MOPP/ABV', abbr:'MOPP/ABV', cat:'Hodgkin', type:'OPD', cycleInfo:'28 วัน', ref:P(14), drugs:[
    { name:'Mechlorethamine', dose:6, unit:'mg/m2', route:'IV push', days:'D1' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, route:'IV push', days:'D1', detail:'max 2 mg' },
    { name:'Procarbazine', dose:100, unit:'mg/m2', route:'PO', days:'D1–D7' },
    { name:'Prednisolone', dose:40, unit:'mg/m2', route:'PO', days:'D1–D14' },
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D8', detail:'ระวัง extravasation' },
    { name:'Bleomycin', dose:10, unit:'IU/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D8' },
    { name:'Vinblastine', dose:6, unit:'mg/m2', route:'IV push', days:'D8' },
  ]},
  { name:'Nivolumab-AVD', abbr:'N-AVD', cat:'Hodgkin', type:'OPD', cycleInfo:'28 วัน', ref:P(15), drugs:[
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1, D15', detail:'ระวัง extravasation' },
    { name:'Vinblastine', dose:6, unit:'mg/m2', route:'IV push', days:'D1, D15' },
    { name:'Dacarbazine', dose:375, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 3 hr', days:'D1, D15' },
    { name:'Nivolumab', unit:'fixed', instruct:'240 mg ผสม NSS 100 mL IV in 1 hr', days:'D1, D15' },
  ]},
  { name:'Stanford V', abbr:'Stanford V', cat:'Hodgkin', type:'OPD', cycleInfo:'12 สัปดาห์', ref:P(15), drugs:[
    { name:'Mechlorethamine', dose:6, unit:'mg/m2', route:'IV push', days:'wk 1, 5, 9' },
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'wk 1, 3, 5, 7, 9, 11', detail:'ระวัง extravasation' },
    { name:'Vinblastine', dose:6, unit:'mg/m2', route:'IV push', days:'wk 1, 3, 5, 7, 9, 11' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, route:'IV push', days:'wk 2, 4, 6, 8, 10, 12', detail:'max 2 mg' },
    { name:'Bleomycin', dose:5, unit:'IU/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'wk 2, 4, 6, 8, 10, 12' },
    { name:'Etoposide', dose:60, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 1 hr', days:'wk 3, 7, 11 (2 days/wk)' },
    { name:'Prednisolone', dose:40, unit:'mg/m2', route:'PO วันเว้นวัน (AD)', days:'wk 1–10' },
  ]},

  // ───────────────────────── Non-Hodgkin lymphoma (p.16–20) ─────────────────────────
  { name:'BV-CHP', abbr:'BV-CHP', cat:'Lymphoma', type:'OPD', cycleInfo:'21 วัน', ref:P(16), drugs:[
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1' },
    { name:'Doxorubicin', dose:50, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1', detail:'ระวัง extravasation' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, route:'IV push', days:'D1', detail:'max 2 mg', note:'ตาราง PDF ระบุ vincristine ใน BV-CHP — ตรวจสอบ (ECHELON-2 ไม่มี vincristine)' },
    { name:'Brentuximab vedotin', dose:1.8, unit:'mg/kg', vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1' },
    { name:'Prednisolone', unit:'fixed', instruct:'100 mg/day PO', days:'D1–D5' },
  ]},
  { name:'BV-Len-Ritux', abbr:'BV-Len-R', cat:'Lymphoma', type:'OPD', ref:P(16), drugs:[
    { name:'Brentuximab vedotin', dose:1.2, unit:'mg/kg', vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1' },
    { name:'Rituximab', dose:375, unit:'mg/m2', vehicle:'NSS 250–500 mL', route:'Standard infusion regimen', days:'D1' },
    { name:'Lenalidomide', unit:'fixed', instruct:'20 mg/day PO', days:'Daily' },
  ]},
  { name:'CDOP (liposomal doxorubicin)', abbr:'CDOP', cat:'Lymphoma', type:'OPD', cycleInfo:'21 วัน', ref:P(16), drugs:[
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1' },
    { name:'Liposomal doxorubicin', dose:30, unit:'mg/m2', vehicle:'D5W 250 mL', route:'IV in 2 hr', days:'D1' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, route:'IV push', days:'D1', detail:'max 2 mg' },
    { name:'Prednisolone', unit:'fixed', instruct:'100 mg/day PO', days:'D1–D5' },
  ]},
  { name:'CEOP', abbr:'CEOP', cat:'Lymphoma', type:'OPD', cycleInfo:'21 วัน', ref:P(16), drugs:[
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1' },
    { name:'Etoposide', dose:50, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D1–D3' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, route:'IV push', days:'D1', detail:'max 2 mg' },
    { name:'Prednisolone', unit:'fixed', instruct:'100 mg/day PO', days:'D1–D5' },
  ]},
  { name:'CHOEP', abbr:'CHOEP', cat:'Lymphoma', type:'OPD', cycleInfo:'21 วัน', ref:P(16), drugs:[
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1' },
    { name:'Doxorubicin', dose:50, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1', detail:'ระวัง extravasation' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, route:'IV push', days:'D1', detail:'max 2 mg' },
    { name:'Etoposide', dose:100, unit:'mg/m2/day', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1–D3' },
    { name:'Prednisolone', unit:'fixed', instruct:'100 mg/day PO', days:'D1–D5' },
  ]},
  { name:'CNOP', abbr:'CNOP', cat:'Lymphoma', type:'OPD', cycleInfo:'21 วัน', ref:P(17), drugs:[
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1' },
    { name:'Mitoxantrone', dose:10, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, route:'IV push', days:'D1', detail:'max 2 mg' },
    { name:'Prednisolone', unit:'fixed', instruct:'100 mg/day PO', days:'D1–D5' },
  ]},
  { name:'CVP', abbr:'CVP', cat:'Lymphoma', type:'OPD', cycleInfo:'21 วัน', ref:P(17), drugs:[
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, route:'IV push', days:'D1', detail:'max 2 mg' },
    { name:'Prednisolone', unit:'fixed', instruct:'100 mg/day PO', days:'D1–D5' },
  ]},
  { name:'DA-EPOCH (Dose-adjusted)', abbr:'DA-EPOCH', cat:'Lymphoma', type:'IPD', cycleInfo:'21 วัน', ref:P(17), drugs:[
    { name:'Etoposide', dose:50, unit:'mg/m2/day', route:'Continuous IV infusion', days:'D1–D4', note:'DA: nadir ANC ≥500 → +20%; ANC <500 1–2 ครั้ง → เท่าเดิม; ANC <500 ≥3 ครั้ง หรือ plt <25,000 → −20%' },
    { name:'Doxorubicin', dose:10, unit:'mg/m2/day', route:'Continuous IV infusion', days:'D1–D4', note:'DA ปรับตาม nadir เช่นเดียวกับ etoposide' },
    { name:'Vincristine', dose:0.4, unit:'mg/m2/day', route:'Continuous IV infusion', days:'D1–D4' },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D6', note:'DA ปรับตาม nadir เช่นเดียวกับ etoposide' },
    { name:'Prednisolone', dose:60, unit:'mg/m2', route:'PO', days:'D1–D5' },
  ]},
  { name:'DHAP', abbr:'DHAP', cat:'Lymphoma', type:'IPD', cycleInfo:'21 วัน', ref:P(17), drugs:[
    { name:'Dexamethasone', dose:40, unit:'mg/m2', route:'10 mg IV every 6 hr', days:'D1–D4' },
    { name:'Cytarabine', dose:2000, unit:'mg/m2', vehicle:'NSS 200 mL', route:'IV in 3 hr every 12 hr × 2 doses (per dose)', days:'D2' },
    { name:'Cisplatin', dose:100, unit:'mg/m2', vehicle:'NSS 1,000 mL', route:'IV in 24 hr', days:'D1', detail:'hydration, mannitol' },
  ]},
  { name:'DHAX', abbr:'DHAX', cat:'Lymphoma', type:'IPD', cycleInfo:'21 วัน', ref:P(17), drugs:[
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO', days:'D1–D4' },
    { name:'Cytarabine', dose:2000, unit:'mg/m2', vehicle:'NSS 200 mL', route:'IV in 3 hr every 12 hr × 2 doses (per dose)', days:'D2' },
    { name:'Oxaliplatin', dose:130, unit:'mg/m2', vehicle:'D5W 250 mL', route:'IV in 2 hr', days:'D1' },
  ]},
  { name:'DICE', abbr:'DICE', cat:'Lymphoma', type:'IPD', cycleInfo:'21–28 วัน', ref:P(17), drugs:[
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day (10 mg IV every 6 hr)', days:'D1–D4' },
    { name:'Prednisolone', unit:'fixed', instruct:'60 mg PO แล้วลดลงวันละ 10 mg', days:'Start D5' },
    { name:'Ifosfamide', dose:1000, unit:'mg/m2', maxDose:1750, vehicle:'NSS 1,000 mL', route:'IV in 24 hr', days:'D1–D4', detail:'max 1,750 mg', note:'+ Mesna 1,000 mg/m2' },
    { name:'Mesna', dose:1000, unit:'mg/m2', route:'IV (ร่วมกับ ifosfamide)', days:'D1–D4' },
    { name:'Cisplatin', dose:25, unit:'mg/m2', vehicle:'NSS 1,000 mL', route:'IV in 24 hr', days:'D1–D4' },
    { name:'Etoposide', dose:100, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1–D4' },
  ]},
  { name:'FLUDAP', abbr:'FLUDAP', cat:'Lymphoma', type:'IPD', cycleInfo:'21 วัน', ref:P(18), drugs:[
    { name:'Dexamethasone', unit:'fixed', instruct:'100 mg/day ผสม NSS 20 mL IV in 24 hr', days:'D1–D3' },
    { name:'Fludarabine', dose:30, unit:'mg/m2', maxDose:50, vehicle:'NSS 50 mL', route:'IV in 30 min', days:'D2–D3', detail:'max 50 mg; ให้ก่อน Ara-C 4 hr' },
    { name:'Cisplatin', dose:50, unit:'mg/m2', vehicle:'NSS 1,000 mL', route:'IV in 4 hr', days:'D2–D3', detail:'hydration, mannitol' },
    { name:'Cytarabine', dose:1000, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 24 hr', days:'D2–D3' },
  ]},
  { name:'FND', abbr:'FND', cat:'Lymphoma', type:'OPD', cycleInfo:'28 วัน', ref:P(18), drugs:[
    { name:'Fludarabine', dose:25, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D1–D3' },
    { name:'Mitoxantrone', dose:10, unit:'mg/m2', route:'IV push', days:'D1' },
    { name:'Dexamethasone', unit:'fixed', instruct:'20 mg/day IV หรือ PO', days:'D1–D5' },
  ]},
  { name:'GCVP', abbr:'GCVP', cat:'Lymphoma', type:'OPD', cycleInfo:'21 วัน', ref:P(18), drugs:[
    { name:'Gemcitabine', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 30 min', days:'D1, D8', note:'750–1,000 mg/m2' },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, route:'IV push', days:'D1', detail:'max 2 mg' },
    { name:'Prednisolone', unit:'fixed', instruct:'100 mg/day PO', days:'D1–D5' },
  ]},
  { name:'GemOx', abbr:'GemOx', cat:'Lymphoma', type:'OPD', cycleInfo:'14 วัน', ref:P(18), drugs:[
    { name:'Gemcitabine', dose:1000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 30 min', days:'D1' },
    { name:'Oxaliplatin', dose:130, unit:'mg/m2', vehicle:'D5W 250 mL', route:'IV in 3 hr', days:'D1' },
  ]},
  { name:'GIFOX', abbr:'GIFOX', cat:'Lymphoma', type:'IPD', cycleInfo:'14 วัน', ref:P(18), drugs:[
    { name:'Gemcitabine', dose:1000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 30 min', days:'D1' },
    { name:'Oxaliplatin', dose:130, unit:'mg/m2', vehicle:'D5W 250 mL', route:'IV in 3 hr', days:'D2' },
    { name:'Ifosfamide', dose:5000, unit:'mg/m2', vehicle:'NSS 1,000 mL', route:'IV in 20 hr', days:'D2', note:'+ Mesna 5,000 mg/m2' },
    { name:'Mesna', dose:5000, unit:'mg/m2', route:'IV (ร่วมกับ ifosfamide)', days:'D2' },
  ]},
  { name:'IMVP-16', abbr:'IMVP-16', cat:'Lymphoma', type:'IPD', cycleInfo:'21 วัน', ref:P(18), drugs:[
    { name:'Ifosfamide', dose:1000, unit:'mg/m2', vehicle:'5% DW 500 mL', route:'IV in 2 hr', days:'D1–D5' },
    { name:'Methotrexate', dose:30, unit:'mg/m2', route:'IV in 10 min', days:'D3, D10' },
    { name:'Etoposide (VP-16)', dose:100, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D1–D3' },
  ]},
  { name:'MINE', abbr:'MINE', cat:'Lymphoma', type:'IPD', ref:P(19), drugs:[
    { name:'Ifosfamide', dose:1330, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1–D3', note:'+ Mesna 1,330 mg/m2' },
    { name:'Mesna', dose:1330, unit:'mg/m2', route:'IV (ร่วมกับ ifosfamide)', days:'D1–D3' },
    { name:'Mesna', dose:500, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D1–D3' },
    { name:'Mitoxantrone', dose:8, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 15 min', days:'D1' },
    { name:'Etoposide', dose:65, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1–D3' },
  ]},
  { name:'mini-CHOP', abbr:'mini-CHOP', cat:'Lymphoma', type:'OPD', cycleInfo:'21 วัน', ref:P(19), drugs:[
    { name:'Cyclophosphamide', dose:400, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1' },
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1', detail:'ระวัง extravasation' },
    { name:'Vincristine', dose:1, unit:'mg/m2', route:'IV push', days:'D1' },
    { name:'Prednisolone', dose:40, unit:'mg/m2', route:'PO', days:'D1–D5' },
  ]},
  { name:'Pola-BR', abbr:'Pola-BR', cat:'Lymphoma', type:'OPD', cycleInfo:'21 วัน', ref:P(19), drugs:[
    { name:'Bendamustine', dose:90, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D1, D2', note:'NED' },
    { name:'Rituximab', dose:375, unit:'mg/m2', vehicle:'NSS 250–500 mL', route:'Standard infusion regimen', days:'D1' },
    { name:'Polatuzumab vedotin', dose:1.8, unit:'mg/kg', vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1' },
  ]},
  { name:'Pola-R-CHP', abbr:'Pola-R-CHP', cat:'Lymphoma', type:'OPD', cycleInfo:'21 วัน', ref:P(19), drugs:[
    { name:'Rituximab', dose:375, unit:'mg/m2', vehicle:'NSS 250–500 mL', route:'Standard infusion regimen', days:'D1' },
    { name:'Polatuzumab vedotin', dose:1.8, unit:'mg/kg', vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1' },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1' },
    { name:'Doxorubicin', dose:50, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1', detail:'ระวัง extravasation' },
    { name:'Prednisolone', unit:'fixed', instruct:'100 mg/day PO', days:'D1–D5' },
  ]},
  { name:'Polatuzumab vedotin monotherapy', abbr:'Pola mono', cat:'Lymphoma', type:'OPD', ref:P(19), drugs:[
    { name:'Polatuzumab vedotin', dose:1.8, unit:'mg/kg', vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1' },
  ]},
  { name:'R2 (Rituximab+Lenalidomide)', abbr:'R2', cat:'Lymphoma', type:'OPD', cycleInfo:'28 วัน', ref:P(19), drugs:[
    { name:'Rituximab', dose:375, unit:'mg/m2', vehicle:'NSS 250–500 mL', route:'Standard infusion regimen', days:'D1' },
    { name:'Lenalidomide', unit:'fixed', instruct:'20–25 mg/day PO', days:'D1–D21' },
  ]},
  { name:'RBAC500', abbr:'RBAC500', cat:'Lymphoma', type:'IPD', cycleInfo:'28 วัน', ref:P(19), drugs:[
    { name:'Rituximab', dose:375, unit:'mg/m2', vehicle:'NSS 250–500 mL', route:'Standard infusion regimen', days:'D1' },
    { name:'Bendamustine', dose:70, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D2, D3', note:'NED' },
    { name:'Cytarabine', dose:500, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D2–D4' },
  ]},
  { name:'VR-CAP', abbr:'VR-CAP', cat:'Lymphoma', type:'OPD', cycleInfo:'21 วัน', ref:P(20), drugs:[
    { name:'Rituximab', dose:375, unit:'mg/m2', vehicle:'NSS 250–500 mL', route:'Standard infusion regimen', days:'D1' },
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'SC', days:'D1, D4, D8, D11' },
    { name:'Doxorubicin', dose:50, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1', detail:'ระวัง extravasation' },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1' },
  ]},

  // ───────────────────────── CNS lymphoma (p.21–22) ─────────────────────────
  { name:'MATRIx', abbr:'MATRIx', cat:'CNS lymphoma', type:'IPD', cycleInfo:'21 วัน', ref:P(22), drugs:[
    { name:'Rituximab', dose:375, unit:'mg/m2', vehicle:'NSS 250–500 mL', route:'Standard infusion regimen', days:'D0' },
    { name:'Dexamethasone', unit:'fixed', instruct:'20 mg IV', days:'D1–D4' },
    { name:'Prehydration', unit:'fixed', instruct:'D5W 1,000 mL + 7.5% NaHCO3 100 mL IV เริ่ม 12 hr ก่อน MTX ต่อเนื่องถึง 48 hr หลัง MTX หมด', days:'D0' },
    { name:'Methotrexate (loading)', dose:500, unit:'mg/m2', vehicle:'D5W 50 mL', route:'IV in 15 min', days:'D1' },
    { name:'Methotrexate', dose:3000, unit:'mg/m2', vehicle:'D5W 500 mL + 7.5% NaHCO3 50 mL', route:'IV in 3 hr', days:'D1' },
    { name:'Leucovorin', dose:15, unit:'mg/m2', route:'IV every 6 hr × 12 doses', days:'Start D2', detail:'เริ่ม 12 hr หลัง MTX หมด; จนกว่า MTX level <0.05 µmol/L' },
    { name:'Cytarabine', dose:2000, unit:'mg/m2', vehicle:'NSS 300 mL', route:'IV in 3 hr every 12 hr (4 doses)', days:'D2, D3' },
    { name:'Thiotepa', dose:30, unit:'mg/m2', vehicle:'NSS (0.5–1 mg/mL)', route:'IV in 1 hr', days:'D4' },
  ]},

  // ───────────────────────── Chronic lymphocytic leukemia (p.24) ─────────────────────────
  { name:'Alemtuzumab', abbr:'Alemtuzumab', cat:'CLL', type:'OPD', ref:P(24), drugs:[
    { name:'Alemtuzumab', unit:'fixed', instruct:'30 mg ผสม NSS 100 mL IV in 2 hr', days:'3 days/week (max 12 wk)' },
  ]},
  { name:'Alemtuzumab + Fludarabine', abbr:'Alem+Flu', cat:'CLL', type:'OPD', cycleInfo:'28 วัน', ref:P(24), drugs:[
    { name:'Alemtuzumab', unit:'fixed', instruct:'30 mg ผสม NSS 100 mL IV in 2 hr', days:'D1–D3' },
    { name:'Fludarabine', dose:30, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D1–D3' },
  ]},
  { name:'CP (Chlorambucil+Prednisolone)', abbr:'CP', cat:'CLL', type:'OPD', cycleInfo:'14–28 วัน', ref:P(24), drugs:[
    { name:'Chlorambucil', dose:0.3, unit:'mg/kg/day', route:'PO', days:'D1–D5' },
    { name:'Prednisolone', dose:40, unit:'mg/m2/day', route:'PO', days:'D1–D5' },
  ]},
  { name:'FC — 3-day protocol', abbr:'FC 3-day', cat:'CLL', type:'OPD', cycleInfo:'28 วัน', ref:P(24), drugs:[
    { name:'Fludarabine', dose:30, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D1–D3' },
    { name:'Cyclophosphamide', dose:250, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D1–D3', note:'250–300 mg/m2' },
  ]},
  { name:'FC — 5-day protocol', abbr:'FC 5-day', cat:'CLL', type:'OPD', cycleInfo:'28 วัน', ref:P(24), drugs:[
    { name:'Fludarabine', dose:20, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D1–D5' },
    { name:'Cyclophosphamide', dose:600, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1', note:'600–1,000 mg/m2' },
  ]},
  { name:'Fludarabine monotherapy', abbr:'Fludarabine', cat:'CLL', type:'OPD', cycleInfo:'28 วัน', ref:P(24), drugs:[
    { name:'Fludarabine', dose:25, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D1–D5' },
  ]},
  { name:'R-FC — cycle 1', abbr:'R-FC C1', cat:'CLL', type:'OPD', cycleInfo:'28 วัน', ref:P(24), drugs:[
    { name:'Rituximab', dose:375, unit:'mg/m2', vehicle:'NSS 250–500 mL', route:'Standard infusion regimen', days:'D1' },
    { name:'Fludarabine', dose:25, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D2–D4' },
    { name:'Cyclophosphamide', dose:300, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D2–D4' },
  ]},
  { name:'R-FC — cycle 2–6', abbr:'R-FC C2-6', cat:'CLL', type:'OPD', cycleInfo:'28 วัน', ref:P(24), drugs:[
    { name:'Rituximab', dose:500, unit:'mg/m2', vehicle:'NSS 250–500 mL', route:'Standard infusion regimen', days:'D1' },
    { name:'Fludarabine', dose:25, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D2–D4' },
    { name:'Cyclophosphamide', dose:300, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D2–D4' },
  ]},

  // ───────────────────────── NK/T cell lymphoma (p.25–26) ─────────────────────────
  { name:'AspaMetDex', abbr:'AspaMetDex', cat:'NK/T lymphoma', type:'IPD', ref:P(25), drugs:[
    { name:'Prehydration', unit:'fixed', instruct:'D5W 1,000 mL + 7.5% NaHCO3 100 mL IV เริ่ม 12 hr ก่อน MTX ต่อเนื่องถึง 48 hr หลัง MTX หมด', days:'D1' },
    { name:'Methotrexate', dose:3000, unit:'mg/m2', vehicle:'D5W 500 mL', route:'IV in 3 hr', days:'D1' },
    { name:'Leucovorin', dose:30, unit:'mg/m2', route:'IV every 6 hr', days:'Start D2', detail:'เริ่ม 12 hr หลัง MTX หมด; จนกว่า MTX level <0.05 µmol/L' },
    { name:'L-asparaginase', dose:6000, unit:'IU/m2', vehicle:'NSS 500 mL', route:'IV in 4 hr', days:'D2, D4, D6, D8' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO', days:'D1–D4' },
  ]},
  { name:'DDGP', abbr:'DDGP', cat:'NK/T lymphoma', type:'IPD', ref:P(25), drugs:[
    { name:'Dexamethasone', dose:15, unit:'mg/m2', route:'IV', days:'D1–D4' },
    { name:'Cisplatin', dose:20, unit:'mg/m2', vehicle:'NSS 1,000 mL', route:'IV in 20 hr', days:'D1, D8', detail:'hydration, mannitol', note:'วันตามตาราง PDF — ตรวจสอบ (แถว day อาจเลื่อน)' },
    { name:'Gemcitabine', dose:800, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 30 min', days:'D1–D7', note:'วันตามตาราง PDF — ตรวจสอบ (แถว day อาจเลื่อน)' },
    { name:'L-asparaginase', dose:6000, unit:'IU/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'', note:'PDF ไม่ระบุวัน — ตรวจสอบ' },
  ]},
  { name:'DeVIC', abbr:'DeVIC', cat:'NK/T lymphoma', type:'IPD', ref:P(25), drugs:[
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day IV', days:'D1–D3' },
    { name:'Etoposide', dose:67, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D1–D3' },
    { name:'Ifosfamide', dose:1000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1–D3', note:'+ Mesna 1,000 mg/m2' },
    { name:'Mesna', dose:1000, unit:'mg/m2', route:'IV (ร่วมกับ ifosfamide)', days:'D1–D3' },
    { name:'Carboplatin', dose:200, unit:'mg/m2', maxDose:800, vehicle:'D5W 250 mL', route:'IV in 1 hr', days:'D1', detail:'max 800 mg' },
  ]},
  { name:'GELAD', abbr:'GELAD', cat:'NK/T lymphoma', type:'IPD', ref:P(25), drugs:[
    { name:'Gemcitabine', dose:1000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 30 min', days:'D1' },
    { name:'Etoposide', dose:60, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D1–D3' },
    { name:'L-asparaginase', dose:6000, unit:'IU/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D1–D7' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day IV', days:'D1–D4' },
  ]},
  { name:'GELOX', abbr:'GELOX', cat:'NK/T lymphoma', type:'IPD', ref:P(25), drugs:[
    { name:'Gemcitabine', dose:1000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 30 min', days:'D1, D8' },
    { name:'Oxaliplatin', dose:130, unit:'mg/m2', vehicle:'D5W 250 mL', route:'IV in 3 hr', days:'D1' },
    { name:'L-asparaginase', dose:6000, unit:'IU/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D1–D7' },
  ]},
  { name:'SMILE', abbr:'SMILE', cat:'NK/T lymphoma', type:'IPD', ref:P(26), drugs:[
    { name:'Prehydration', unit:'fixed', instruct:'D5W 1,000 mL + 7.5% NaHCO3 100 mL IV เริ่ม 12 hr ก่อน MTX ต่อเนื่องถึง 48 hr หลัง MTX หมด', days:'D0' },
    { name:'Methotrexate', dose:2000, unit:'mg/m2', vehicle:'D5W 1,000 mL + 7.5% NaHCO3 100 mL', route:'IV in 6 hr', days:'D1' },
    { name:'Leucovorin', dose:30, unit:'mg/m2', route:'IV every 6 hr', days:'Start D2', detail:'เริ่ม 12 hr หลัง MTX หมด; จนกว่า MTX level <0.05 µmol/L' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day IV', days:'D2–D4' },
    { name:'Ifosfamide', dose:1500, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D2–D4', note:'+ Mesna 1,500 mg/m2' },
    { name:'Mesna', dose:1500, unit:'mg/m2', route:'IV (ร่วมกับ ifosfamide)', days:'D2–D4' },
    { name:'Etoposide', dose:100, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D2–D4' },
    { name:'L-asparaginase', dose:6000, unit:'IU/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D8, D10, D12, D14, D16, D18, D20' },
  ]},
  { name:'VIDL', abbr:'VIDL', cat:'NK/T lymphoma', type:'IPD', ref:P(26), drugs:[
    { name:'Ifosfamide', dose:1200, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1–D3', note:'+ Mesna 1,200 mg/m2' },
    { name:'Mesna', dose:1200, unit:'mg/m2', route:'IV (ร่วมกับ ifosfamide)', days:'D1–D3' },
    { name:'Etoposide', dose:100, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D1–D3' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO', days:'D1–D3' },
    { name:'L-asparaginase', dose:4000, unit:'IU/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D8, D10, D12, D14, D16, D18, D20' },
  ]},
  { name:'VIPD', abbr:'VIPD', cat:'NK/T lymphoma', type:'IPD', ref:P(26), drugs:[
    { name:'Ifosfamide', dose:1200, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1–D3', note:'+ Mesna 1,200 mg/m2' },
    { name:'Mesna', dose:1200, unit:'mg/m2', route:'IV (ร่วมกับ ifosfamide)', days:'D1–D3' },
    { name:'Cisplatin', dose:33, unit:'mg/m2', vehicle:'NSS 1,000 mL', route:'IV in 20 hr', days:'D1–D3', detail:'hydration, mannitol' },
    { name:'Etoposide', dose:100, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D1–D3' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO', days:'D1–D4' },
  ]},

  // ───────────────────────── Multiple myeloma (p.27–30) ─────────────────────────
  { name:'HD-dexa (High-dose dexamethasone)', abbr:'HD-dexa', cat:'Myeloma', type:'OPD', cycleInfo:'28 วัน', ref:P(27), drugs:[
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO', days:'D1–D4, D9–D12, D17–D20' },
  ]},
  { name:'Bortezomib monotherapy', abbr:'Bortezomib', cat:'Myeloma', type:'OPD', cycleInfo:'21 วัน', ref:P(27), drugs:[
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'IV', days:'D1, D4, D8, D11' },
  ]},
  { name:'VCD (Bortezomib+Cyclophosphamide+Dex)', abbr:'VCD', cat:'Myeloma', type:'OPD', cycleInfo:'28 วัน', ref:P(27), drugs:[
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'IV', days:'D1, D4, D8, D11 (หรือ D1, D8, D15, D22)' },
    { name:'Cyclophosphamide', dose:300, unit:'mg/m2', route:'PO', days:'D1, D8, D15, D22' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO', days:'D1–D4 (D9–D12, D17–D20 ใน cycle 1–2)' },
  ]},
  { name:'VCD-mod', abbr:'VCD-mod', cat:'Myeloma', type:'OPD', ref:P(27), drugs:[
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'IV', days:'D1, D4, D8, D11' },
    { name:'Cyclophosphamide', dose:500, unit:'mg/m2', route:'PO', days:'D1, D8, D15' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO', days:'D1, D8, D15' },
  ]},
  { name:'VMP (Bortezomib+Melphalan+Prednisolone)', abbr:'VMP', cat:'Myeloma', type:'OPD', cycleInfo:'35 วัน', ref:P(27), drugs:[
    { name:'Melphalan', dose:9, unit:'mg/m2', route:'PO', days:'D1–D4' },
    { name:'Prednisolone', dose:60, unit:'mg/m2', route:'PO', days:'D1–D4' },
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'IV', days:'D1, D8, D15, D22 (cycle แรก 6 สัปดาห์: D1, D4, D8, D11, D22, D25, D29, D32)' },
  ]},
  { name:'VTD (Bortezomib+Thalidomide+Dex)', abbr:'VTD', cat:'Myeloma', type:'OPD', cycleInfo:'28 วัน', ref:P(27), drugs:[
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'IV', days:'D1, D4, D8, D11' },
    { name:'Thalidomide', unit:'fixed', instruct:'100–200 mg PO hs', days:'D1–D28' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO', days:'D1–D4, D9–D12' },
  ]},
  { name:'VTP (Bortezomib+Thalidomide+Prednisolone)', abbr:'VTP', cat:'Myeloma', type:'OPD', cycleInfo:'35 วัน', ref:P(28), drugs:[
    { name:'Thalidomide', unit:'fixed', instruct:'100 mg PO hs', days:'D1–D28' },
    { name:'Prednisolone', dose:60, unit:'mg/m2', route:'PO', days:'D1–D4' },
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'IV', days:'D1, D8, D15, D22 (cycle แรก 6 สัปดาห์: D1, D4, D8, D11, D22, D25, D29, D32)' },
  ]},
  { name:'MPR (Melphalan+Prednisolone+Lenalidomide)', abbr:'MPR', cat:'Myeloma', type:'OPD', cycleInfo:'28 วัน', ref:P(28), drugs:[
    { name:'Melphalan', dose:9, unit:'mg/m2', route:'PO', days:'D1–D4' },
    { name:'Prednisolone', dose:60, unit:'mg/m2', route:'PO', days:'D1–D4' },
    { name:'Lenalidomide', unit:'fixed', instruct:'5–10 mg/day PO', days:'D1–D21' },
  ]},
  { name:'Dara-Pd (Daratumumab+Pomalidomide+Dex)', abbr:'Dara-Pd', cat:'Myeloma', type:'OPD', cycleInfo:'28 วัน', ref:P(28), drugs:[
    { name:'Daratumumab', dose:16, unit:'mg/kg', route:'Standard infusion regimen', days:'Weekly cycle 1–2, every 2 wk cycle 3–6, every 4 wk thereafter' },
    { name:'Pomalidomide', unit:'fixed', instruct:'4 mg/day PO', days:'D1–D21' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO', days:'D1, D8, D15, D22' },
  ]},
  { name:'Dara-Kd (Daratumumab+Carfilzomib+Dex)', abbr:'Dara-Kd', cat:'Myeloma', type:'OPD', cycleInfo:'28 วัน', ref:P(29), drugs:[
    { name:'Daratumumab', dose:16, unit:'mg/kg', route:'Standard infusion regimen', days:'Weekly cycle 1–2, every 2 wk cycle 3–6, every 4 wk thereafter' },
    { name:'Carfilzomib', dose:20, unit:'mg/m2', vehicle:'D5W 50 mL', route:'IV in 30 min', days:'D1, D8, D15', note:'เพิ่มเป็น 70 mg/m2 ตั้งแต่ C1D8' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO', days:'D1, D8, D15, D22' },
  ]},
  { name:'Dara-CyBorD', abbr:'Dara-CyBorD', cat:'Myeloma', type:'OPD', cycleInfo:'28 วัน', ref:P(29), drugs:[
    { name:'Daratumumab', dose:16, unit:'mg/kg', route:'Standard infusion regimen', days:'Weekly cycle 1–2, every 2 wk cycle 3–6, every 4 wk thereafter' },
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'SC', days:'D1, D8, D15, D22' },
    { name:'Cyclophosphamide', dose:300, unit:'mg/m2', route:'PO', days:'D1, D8, D15, D22' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO', days:'D1, D8, D15, D22' },
  ]},
  { name:'Dara-VMP', abbr:'Dara-VMP', cat:'Myeloma', type:'OPD', cycleInfo:'42 วัน', ref:P(29), drugs:[
    { name:'Daratumumab', dose:16, unit:'mg/kg', route:'Standard infusion regimen', days:'Weekly cycle 1, every 3 wk cycle 2–9, every 4 wk thereafter' },
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'SC', days:'D1, D4, D8, D11, D22, D25, D29, D32 ใน cycle 1; D1, D8, D22, D29 ใน cycle 2–9' },
    { name:'Melphalan', dose:9, unit:'mg/m2', route:'PO', days:'D1–D4' },
    { name:'Prednisolone', dose:60, unit:'mg/m2', route:'PO', days:'D1–D4' },
  ]},
  { name:'Dara-VTd', abbr:'Dara-VTd', cat:'Myeloma', type:'OPD', cycleInfo:'28 วัน', ref:P(29), drugs:[
    { name:'Daratumumab', dose:16, unit:'mg/kg', route:'Standard infusion regimen', days:'D1, D8, D15, D22' },
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'SC', days:'D1, D4, D8, D11' },
    { name:'Thalidomide', unit:'fixed', instruct:'100 mg/day PO hs', days:'D1–D28' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO ใน C1–C2, 20 mg/day ใน C3–C4', days:'D1, D2, D8, D9, D15, D16, D22, D23' },
  ]},
  { name:'Dara-VRD (modified)', abbr:'Dara-VRD', cat:'Myeloma', type:'OPD', cycleInfo:'28 วัน', ref:P(29), drugs:[
    { name:'Daratumumab', dose:16, unit:'mg/kg', route:'Standard infusion regimen', days:'D1, D8, D15, D22' },
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'SC', days:'D1, D8, D15, D22' },
    { name:'Lenalidomide', unit:'fixed', instruct:'25 mg/day PO', days:'D1–D21' },
    { name:'Dexamethasone', unit:'fixed', instruct:'20 mg/day PO', days:'D1, D2, D8, D9, D15, D16, D22, D23' },
  ]},
  { name:'DVD (Liposomal doxorubicin+Vincristine+Dex)', abbr:'DVD', cat:'Myeloma', type:'OPD', cycleInfo:'28 วัน', ref:P(30), drugs:[
    { name:'Liposomal doxorubicin', dose:40, unit:'mg/m2', vehicle:'D5W 250 mL', route:'IV in 1½ hr', days:'D1' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1', detail:'max 2 mg' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO หรือ IV', days:'D1–D4' },
  ]},
  { name:'mCBAD', abbr:'mCBAD', cat:'Myeloma', type:'IPD', cycleInfo:'28 วัน', ref:P(30), drugs:[
    { name:'Cyclophosphamide', dose:350, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 1 hr every 12 hr', days:'D1–D4' },
    { name:'Mesna', dose:400, unit:'mg/m2', vehicle:'5% DN/2 1,000 mL', route:'IV in 12 hr every 12 hr', days:'D1–D4' },
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'SC', days:'D1, D4, D8, D11' },
    { name:'Doxorubicin', dose:9, unit:'mg/m2', route:'Continuous IV infusion', days:'D1–D4' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO', days:'D1–D4, D9–D12, D17–D20' },
  ]},
  { name:'Modified VAD', abbr:'mVAD', cat:'Myeloma', type:'IPD', cycleInfo:'28 วัน', ref:P(30), drugs:[
    { name:'Vincristine', unit:'fixed', instruct:'0.4 mg ผสม NSS 100 mL IV in 2 hr', days:'D1–D4' },
    { name:'Doxorubicin', dose:9, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1–D4' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO หรือ IV', days:'D1–D4' },
  ]},
  { name:'PAD (Bortezomib+Doxorubicin+Dex)', abbr:'PAD', cat:'Myeloma', type:'IPD', cycleInfo:'21 วัน', ref:P(30), drugs:[
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'IV', days:'D1, D4, D8, D11' },
    { name:'Doxorubicin', dose:9, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1–D4' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO หรือ IV', days:'D1–D4 (D8–D11, D15–D18 ใน cycle 1)' },
  ]},
  { name:'VAD', abbr:'VAD', cat:'Myeloma', type:'IPD', cycleInfo:'28 วัน', ref:P(30), drugs:[
    { name:'Vincristine', unit:'fixed', instruct:'0.4 mg/day continuous IV infusion', days:'D1–D4' },
    { name:'Doxorubicin', dose:9, unit:'mg/m2', route:'Continuous IV infusion', days:'D1–D4' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg/day PO หรือ IV', days:'D1–D4 (D9–D12, D17–D20 ใน cycle 1–2)' },
  ]},
  { name:'Teclistamab', abbr:'Teclistamab', cat:'Myeloma', type:'IPD', ref:P(30), drugs:[
    { name:'Teclistamab (step-up dose 1)', dose:0.06, unit:'mg/kg', route:'SC', days:'D1' },
    { name:'Teclistamab (step-up dose 2)', dose:0.3, unit:'mg/kg', route:'SC', days:'2–4 วันถัดไป' },
    { name:'Teclistamab (treatment dose)', dose:1.5, unit:'mg/kg', route:'SC', days:'2–4 วันถัดไป แล้ว weekly' },
  ]},
]
