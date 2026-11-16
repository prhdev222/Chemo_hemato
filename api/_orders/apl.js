// Acute Promyelocytic Leukemia — order forms transcribed from Siriraj Chemotherapy Protocol 2025, pp. 73–92
const P = (n) => `Siriraj order 2025 p.${n}`

// rows printed identically on every APL form
const NURSE = { name:'คำสั่งพยาบาล', unit:'fixed', instruct:'Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล', days:'ตลอดการรักษา' }
const DOMP = { name:'Domperidone (10 mg)', unit:'fixed', instruct:'1 tab oral tid ac', days:'ตลอดการรักษา' }
const OMEP = { name:'Omeprazole (20 mg)', unit:'fixed', instruct:'1 cap oral OD ac', days:'ตลอดการรักษา' }
const SENO = { name:'Senokot', unit:'fixed', instruct:'2 tabs oral hs prn for constipation', days:'ตลอดการรักษา' }

// left-column blocks that recur
const LAB_IND = 'CBC, BUN, Cr, Electrolyte, Ca, PO4, Mg, LFT, uric acid, LDH; PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads'
const LAB_CONS = 'CBC, BUN, Cr, Electrolyte, Ca, PO4, Mg, LFT, uric acid; ☐ PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads'
const LAB_IDA_CONS = 'CBC, BUN, Cr, LFT, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads'
const CBC_D5_20 = 'D5, D8, D10, D12, D14, D17, D20'
const EKG_IND = 'D4, D8, D11, D15, D18, D22, D25'
const TX = (plt, extra) => `ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <${plt}/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3)${extra ? '; ' + extra : ''}`
const FFP = 'ให้ FFP ถ้า prolonged PT, aPTT; ให้ cryoprecipitate ถ้า fibrinogen <150 mg/dL'
const KEEP = 'keep K >4 mEq/L, Mg >1.8 mEq/L, QTc <500 msec'
const ONDAN = '8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม.'
const ATRA_DETAIL = '…… cap oral pc เช้า, …… cap oral pc เย็น; ห้ามให้ทาง NG tube'
const ATRA_TAB_DETAIL = '…… tab oral pc เช้า, …… tab oral pc เย็น; ห้ามให้ทาง NG tube'
const IDA_NOTE = 'eGFR <30 mL/min/1.73 m2: ลดขนาดยา; TB 2.5–5 mg/dL: 6 mg/m2/day (50%); TB >5 mg/dL: งดยา'
const IDA_AGE = 'อายุ 1–60 ปี: 12 mg/m2/day; อายุ 61–70 ปี: 9 mg/m2/day; อายุ >70 ปี: 6 mg/m2/day'
const MITO_NOTE = 'ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL: 5 mg/m2/day (50%); TB >3 mg/dL: 2.5 mg/m2/day (25%)'
const EVAL_FULL = 'BMA, BM biopsy, flow cytometry, cytogenetics, PML-RARA, CT brain/LP กรณีมีอาการทางสมอง'
const EVAL_D28 = 'APL day 28–35 ของ induction: BMA, BM biopsy, flow cytometry, LP กรณี high risk'
const EVAL_POST = 'APL หลังจาก consolidation: BMA, BM biopsy, flow cytometry, PML-RARA'

export default [
  // ---------- p.74 ATO monotherapy ----------
  { name:'ATO monotherapy', abbr:'ATO mono', cat:'APL', type:'IPD', group:'order', ref:P(74), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_IND, days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC, Cr, Electrolyte, Mg, ALT', days:CBC_D5_20 },
    { name:'EKG ติดตาม', unit:'fixed', instruct:'EKG 12 leads', days:EKG_IND },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('30,000', FFP + '; ' + KEEP), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'เริ่ม D1 จนกว่า CR' },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'เริ่ม D1 จนกว่า CR (ไม่เกิน D75)' },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:EVAL_FULL, days:'D1' },
  ]},

  // ---------- p.75 ATRA monotherapy ----------
  { name:'ATRA monotherapy', abbr:'ATRA mono', cat:'APL', type:'IPD', group:'order', ref:P(75), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_IND, days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_D5_20 },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('30,000', FFP), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'เริ่ม D1 จนกว่า CR (ไม่เกิน D90)', detail:ATRA_DETAIL },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:EVAL_FULL, days:'D1' },
  ]},

  // ---------- p.77 Induction ATRA-ATO ----------
  { name:'ATRA-ATO — Induction', abbr:'ATRA-ATO Ind', cat:'APL', type:'IPD', group:'order', ref:P(77), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_IND, days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC, Cr, Electrolyte, Mg, ALT', days:CBC_D5_20 },
    { name:'EKG ติดตาม', unit:'fixed', instruct:'EKG 12 leads', days:EKG_IND },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('30,000', FFP + '; ' + KEEP), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'เริ่ม D1 จนกว่า CR (ไม่เกิน D60)', detail:ATRA_DETAIL },
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'เริ่ม D1 จนกว่า CR' },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'เริ่ม D1 จนกว่า CR' },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:EVAL_FULL, days:'D1' },
  ]},

  // ---------- p.78 Consolidation After ATRA-ATO (course คี่) ----------
  { name:'ATRA-ATO — Consolidation Cycle 1, 3, 5, 7 (course คี่)', abbr:'ATRA-ATO Cons odd', cat:'APL', type:'IPD', group:'order', ref:P(78), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_CONS, days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC, Cr, Electrolyte, Mg, ALT', days:'D8, D15, D22' },
    { name:'EKG ติดตาม', unit:'fixed', instruct:'EKG 12 leads', days:'D8, D15, D22' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('20,000', FFP + '; ' + KEEP), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'D1 ถึง D14', detail:ATRA_DETAIL },
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'D1–D5, D8–D12, D15–D19, D22–D26' },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1–D5, D8–D12, D15–D19, D22–D26' },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:'day 28–35 ของ induction: BMA, BM biopsy, flow cytometry; หลังจาก consolidation: BMA, BM biopsy, flow cytometry, PML-RARA', days:'D1' },
  ]},

  // ---------- p.79 Consolidation After ATRA-ATO (course คู่) ----------
  { name:'ATRA-ATO — Consolidation Cycle 2, 4, 6 (course คู่)', abbr:'ATRA-ATO Cons even', cat:'APL', type:'IPD', group:'order', ref:P(79), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_CONS, days:'D1' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('20,000', FFP), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'D1 ถึง D14', detail:ATRA_DETAIL },
  ]},

  // ---------- p.81 Induction ATRA-IDA ----------
  { name:'ATRA-IDA (ATRA + Chemotherapy) — Induction', abbr:'ATRA-IDA Ind', cat:'APL', type:'IPD', group:'order', ref:P(81), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_IND + '; eGFR', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_D5_20 },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('30,000', FFP), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'D2, D4, D6, D8' },
    { name:'Idarubicin', dose:12, unit:'mg/m2/day', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D2, D4, D6, D8', detail:'ระวัง leak', note:IDA_NOTE + '; หากอายุมากกว่า 70 ปี: งดยา Day 8' },
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'เริ่ม D1 จนกว่า CR (ไม่เกิน D90)', detail:ATRA_DETAIL },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:EVAL_FULL + ', CT หรือ PET กรณี extramedullary leukemia', days:'D1' },
  ]},

  // ---------- p.82 Consolidation After ATRA-IDA — Cycle 1 (one regimen per risk group) ----------
  { name:'ATRA-IDA — Consolidation Cycle 1 (High risk)', abbr:'ATRA-IDA C1 HR', cat:'APL', type:'IPD', group:'order', ref:P(82), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_IDA_CONS + '; eGFR, CrCl', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_D5_20 },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('20,000'), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'D1 ถึง D4' },
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'D1 ถึง D15', detail:ATRA_TAB_DETAIL },
    { name:'Idarubicin', dose:5, unit:'mg/m2/day', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1 ถึง D4', detail:'ระวัง leak', note:'5 mg/m2/day สำหรับ high risk และ low risk, 7 mg/m2/day สำหรับ intermediate risk; ' + IDA_NOTE },
    { name:'Cytarabine (เฉพาะ high risk)', dose:1000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 3 hr', days:'D1 ถึง D4', note:'CrCl 40–60 mL/min: 500 mg/m2/day; CrCl <40 mL/min: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ' },
    { name:'ตรวจ cerebellar signs', unit:'fixed', instruct:'ตรวจ cerebellar signs ทุกครั้งก่อนให้ยา cytarabine (เฉพาะ high risk)', days:'D1 ถึง D4' },
    { name:'Dexa-oph eye drop', unit:'fixed', instruct:'2 drops หยอดตา 2 ข้าง q 8 hr', days:'D1 ถึง D7' },
    { name:'Filgrastim', unit:'fixed', instruct:'☐ 300 mcg ☐ 480 mcg SC OD', days:'เริ่ม D5' },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:EVAL_D28, days:'D1' },
  ]},
  { name:'ATRA-IDA — Consolidation Cycle 1 (Intermediate risk)', abbr:'ATRA-IDA C1 IR', cat:'APL', type:'IPD', group:'order', ref:P(82), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_IDA_CONS + '; eGFR, CrCl', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_D5_20 },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('20,000'), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'D1 ถึง D4' },
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'D1 ถึง D15', detail:ATRA_TAB_DETAIL },
    { name:'Idarubicin', dose:7, unit:'mg/m2/day', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1 ถึง D4', detail:'ระวัง leak', note:'7 mg/m2/day สำหรับ intermediate risk (5 mg/m2/day สำหรับ high risk และ low risk); ' + IDA_NOTE },
    { name:'Dexa-oph eye drop', unit:'fixed', instruct:'2 drops หยอดตา 2 ข้าง q 8 hr', days:'D1 ถึง D7' },
    { name:'Filgrastim', unit:'fixed', instruct:'☐ 300 mcg ☐ 480 mcg SC OD', days:'เริ่ม D5' },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:EVAL_D28, days:'D1' },
  ]},
  { name:'ATRA-IDA — Consolidation Cycle 1 (Low risk)', abbr:'ATRA-IDA C1 LR', cat:'APL', type:'IPD', group:'order', ref:P(82), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_IDA_CONS + '; eGFR, CrCl', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_D5_20 },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('20,000'), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'D1 ถึง D4' },
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'D1 ถึง D15', detail:ATRA_TAB_DETAIL },
    { name:'Idarubicin', dose:5, unit:'mg/m2/day', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1 ถึง D4', detail:'ระวัง leak', note:'5 mg/m2/day สำหรับ high risk และ low risk, 7 mg/m2/day สำหรับ intermediate risk; ' + IDA_NOTE },
    { name:'Dexa-oph eye drop', unit:'fixed', instruct:'2 drops หยอดตา 2 ข้าง q 8 hr', days:'D1 ถึง D7' },
    { name:'Filgrastim', unit:'fixed', instruct:'☐ 300 mcg ☐ 480 mcg SC OD', days:'เริ่ม D5' },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:EVAL_D28, days:'D1' },
  ]},

  // ---------- p.83 Consolidation After ATRA-IDA — Cycle 2 ----------
  { name:'ATRA-IDA — Consolidation Cycle 2 (High risk)', abbr:'ATRA-IDA C2 HR', cat:'APL', type:'IPD', group:'order', ref:P(83), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_IDA_CONS, days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_D5_20 },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('20,000'), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'D1 ถึง D5' },
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'D1 ถึง D15', detail:ATRA_TAB_DETAIL },
    { name:'Mitoxantrone', dose:10, unit:'mg/m2/day', vehicle:'NSS 50 mL', route:'IV drip in 15 min', days:'D1 ถึง D5', note:'D1 ถึง D5 สำหรับ high risk, D1 ถึง D3 สำหรับ intermediate และ low risk; ' + MITO_NOTE },
    { name:'Filgrastim', unit:'fixed', instruct:'☐ 300 mcg ☐ 480 mcg SC OD', days:'เริ่ม D……' },
  ]},
  { name:'ATRA-IDA — Consolidation Cycle 2 (Intermediate / Low risk)', abbr:'ATRA-IDA C2 IR-LR', cat:'APL', type:'IPD', group:'order', ref:P(83), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_IDA_CONS, days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_D5_20 },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('20,000'), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'D1 ถึง D5' },
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'D1 ถึง D15', detail:ATRA_TAB_DETAIL },
    { name:'Mitoxantrone', dose:10, unit:'mg/m2/day', vehicle:'NSS 50 mL', route:'IV drip in 15 min', days:'D1 ถึง D3', note:'D1 ถึง D3 สำหรับ intermediate และ low risk, D1 ถึง D5 สำหรับ high risk; ' + MITO_NOTE },
    { name:'Filgrastim', unit:'fixed', instruct:'☐ 300 mcg ☐ 480 mcg SC OD', days:'เริ่ม D……' },
  ]},

  // ---------- p.84 Consolidation After ATRA-IDA — Cycle 3 ----------
  { name:'ATRA-IDA — Consolidation Cycle 3 (High risk)', abbr:'ATRA-IDA C3 HR', cat:'APL', type:'IPD', group:'order', ref:P(84), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_IDA_CONS + '; eGFR', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_D5_20 },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('20,000'), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'D1 ถึง D4' },
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'D1 ถึง D15', detail:ATRA_TAB_DETAIL },
    { name:'Idarubicin', dose:12, unit:'mg/m2/day', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1', detail:'ระวัง leak', note:'D1 สำหรับ high risk และ low risk, D1 ถึง D2 สำหรับ intermediate risk; ' + IDA_NOTE },
    { name:'Cytarabine (เฉพาะ high risk)', dose:150, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV drip in 8 hr', days:'D1 ถึง D4', note:'ขนาดยา 150 mg/m2: ไม่มีคำแนะนำเรื่องปรับขนาดยาในโรคไตและโรคตับ' },
    { name:'ตรวจ cerebellar signs', unit:'fixed', instruct:'ตรวจ cerebellar signs ทุกครั้งก่อนให้ยา cytarabine (เฉพาะ high risk)', days:'D1 ถึง D4' },
    { name:'Dex-oph eye drop', unit:'fixed', instruct:'2 drops หยอดตา 2 ข้าง q 8 hr', days:'D1 ถึง D7' },
    { name:'Filgrastim', unit:'fixed', instruct:'☐ 300 mcg ☐ 480 mcg SC OD', days:'เริ่ม D……' },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:EVAL_POST, days:'D1' },
  ]},
  { name:'ATRA-IDA — Consolidation Cycle 3 (Intermediate risk)', abbr:'ATRA-IDA C3 IR', cat:'APL', type:'IPD', group:'order', ref:P(84), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_IDA_CONS + '; eGFR', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_D5_20 },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('20,000'), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'D1 ถึง D4' },
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'D1 ถึง D15', detail:ATRA_TAB_DETAIL },
    { name:'Idarubicin', dose:12, unit:'mg/m2/day', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1 ถึง D2', detail:'ระวัง leak', note:'D1 ถึง D2 สำหรับ intermediate risk (D1 สำหรับ high risk และ low risk); ' + IDA_NOTE },
    { name:'Dex-oph eye drop', unit:'fixed', instruct:'2 drops หยอดตา 2 ข้าง q 8 hr', days:'D1 ถึง D7' },
    { name:'Filgrastim', unit:'fixed', instruct:'☐ 300 mcg ☐ 480 mcg SC OD', days:'เริ่ม D……' },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:EVAL_POST, days:'D1' },
  ]},
  { name:'ATRA-IDA — Consolidation Cycle 3 (Low risk)', abbr:'ATRA-IDA C3 LR', cat:'APL', type:'IPD', group:'order', ref:P(84), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_IDA_CONS + '; eGFR', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_D5_20 },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('20,000'), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'D1 ถึง D4' },
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'D1 ถึง D15', detail:ATRA_TAB_DETAIL },
    { name:'Idarubicin', dose:12, unit:'mg/m2/day', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1', detail:'ระวัง leak', note:'D1 สำหรับ high risk และ low risk, D1 ถึง D2 สำหรับ intermediate risk; ' + IDA_NOTE },
    { name:'Dex-oph eye drop', unit:'fixed', instruct:'2 drops หยอดตา 2 ข้าง q 8 hr', days:'D1 ถึง D7' },
    { name:'Filgrastim', unit:'fixed', instruct:'☐ 300 mcg ☐ 480 mcg SC OD', days:'เริ่ม D……' },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:EVAL_POST, days:'D1' },
  ]},

  // ---------- p.86 APML4 Induction ATRA-IDA-ATO ----------
  { name:'APML4 — Induction ATRA-IDA-ATO', abbr:'APML4 Ind', cat:'APL', type:'IPD', group:'order', ref:P(86), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_IND + '; eGFR', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC, Cr, Electrolyte, Mg, ALT', days:CBC_D5_20 },
    { name:'EKG ติดตาม', unit:'fixed', instruct:'EKG 12 leads', days:EKG_IND },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('30,000', FFP + '; ' + KEEP), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'D2, D4, D6, D8, D9 ถึง D36' },
    { name:'Idarubicin', dose:12, unit:'mg/m2/day', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D2, D4, D6, D8', detail:'6–12 mg/m2/day ตามอายุ; ระวัง leak', note:IDA_AGE + '; ' + IDA_NOTE },
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'D1 ถึง D36', detail:ATRA_DETAIL },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D9 ถึง D36' },
    { name:'Prednisolone (5 mg)', dose:1, unit:'mg/kg/day', route:'PO', days:'D1 ถึง D10 หรือ WBC <1,000/mm3', detail:'Sig. ……' },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:EVAL_FULL, days:'D1' },
  ]},

  // ---------- p.87 APML4 Consolidation Cycle 1 ----------
  { name:'APML4 — Consolidation Cycle 1', abbr:'APML4 C1', cat:'APL', type:'IPD', group:'order', ref:P(87), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_CONS, days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC, Cr, Electrolyte, Mg, ALT', days:'D8, D15, D22' },
    { name:'EKG ติดตาม', unit:'fixed', instruct:'EKG 12 leads', days:'D8, D15, D22' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('20,000', FFP + '; ' + KEEP), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'D1 ถึง D28', detail:ATRA_DETAIL },
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'D1 ถึง D28' },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1 ถึง D28' },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:EVAL_D28, days:'D1' },
  ]},

  // ---------- p.88 APML4 Consolidation Cycle 2 ----------
  { name:'APML4 — Consolidation Cycle 2', abbr:'APML4 C2', cat:'APL', type:'IPD', group:'order', ref:P(88), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_CONS, days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC, Cr, Electrolyte, Mg, ALT', days:'D8, D15, D22' },
    { name:'EKG ติดตาม', unit:'fixed', instruct:'EKG 12 leads', days:'D8, D15, D22' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('20,000', FFP + '; ' + KEEP), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'D1–D7, D15–D21, D29–D35', detail:ATRA_DETAIL },
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'D1–D5, D8–D12, D15–D19, D22–D26, D29–D33' },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1–D5, D8–D12, D15–D19, D22–D26, D29–D33' },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:EVAL_POST, days:'D1' },
  ]},

  // ---------- p.90 APOLLO Induction ATRA-ATO (+CHT in induction) ----------
  { name:'APOLLO — Induction ATRA-ATO (+ Idarubicin)', abbr:'APOLLO Ind', cat:'APL', type:'IPD', group:'order', ref:P(90), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_IND + '; eGFR', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC, Cr, Electrolyte, Mg, ALT', days:CBC_D5_20 },
    { name:'EKG ติดตาม', unit:'fixed', instruct:'EKG 12 leads', days:EKG_IND },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('30,000', FFP + '; ' + KEEP), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'D1, D3, D5 ถึง D28' },
    { name:'Idarubicin', dose:12, unit:'mg/m2/day', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1, D3', detail:'ระวัง leak', note:IDA_NOTE + '; ' + IDA_AGE },
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'D1 ถึง D28 (ไม่เกิน D60)', detail:ATRA_DETAIL },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D5 ถึง D28' },
    { name:'Prednisolone (5 mg)', dose:0.5, unit:'mg/kg/day', route:'PO', days:'D1 ถึง D20', detail:'Sig. ……' },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:EVAL_FULL, days:'D1' },
  ]},

  // ---------- p.91 APOLLO Consolidation Cycle 1-3 ----------
  { name:'APOLLO — Consolidation Cycle 1–3', abbr:'APOLLO C1-3', cat:'APL', type:'IPD', group:'order', ref:P(91), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_CONS, days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC, Cr, Electrolyte, Mg, ALT', days:'D8, D15, D22, D29' },
    { name:'EKG ติดตาม', unit:'fixed', instruct:'EKG 12 leads', days:'D8, D15, D22' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('20,000', FFP + '; ' + KEEP), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'D1–D14, D29–D42', detail:ATRA_DETAIL },
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'D1–D5, D8–D12, D15–D19, D22–D26' },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1–D5, D8–D12, D15–D19, D22–D26' },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:EVAL_D28, days:'D1' },
  ]},

  // ---------- p.92 APOLLO Consolidation Cycle 4 ----------
  { name:'APOLLO — Consolidation Cycle 4', abbr:'APOLLO C4', cat:'APL', type:'IPD', group:'order', ref:P(92), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_CONS, days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC, Cr, Electrolyte, Mg, ALT', days:'D8, D15, D22, D29' },
    { name:'EKG ติดตาม', unit:'fixed', instruct:'EKG 12 leads', days:'D8, D15, D22' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX('20,000', FFP + '; ' + KEEP), days:'ตลอดการรักษา' },
    NURSE, DOMP, OMEP, SENO,
    { name:'ATRA (10 mg)', dose:45, unit:'mg/m2/day', route:'PO pc เช้า–เย็น', days:'D1–D14', detail:ATRA_DETAIL },
    { name:'Ondansetron', unit:'fixed', instruct:ONDAN, days:'D1–D5, D8–D12, D15–D19, D22–D26' },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1–D5, D8–D12, D15–D19, D22–D26' },
    { name:'การประเมินโรค APL', unit:'fixed', instruct:EVAL_POST, days:'D1' },
  ]},
]
