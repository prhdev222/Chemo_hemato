// Lymphoma (second half) — order forms transcribed from Siriraj Chemotherapy Protocol 2025, pp. 137–162
const P = (n) => `Siriraj order 2025 p.${n}`

// Shared wording printed on most forms in this range
const LAB_STD = 'CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads'
const TX_STD = 'ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3)'
const TX_IRR = 'ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3)'
const ADVICE = 'ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล'
const NURSE = 'Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ' + ADVICE
const NURSE_IRR = 'Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ' + ADVICE
const CBC_FU = 'D5, D8, D11, D14, D17, D20'
const RTX_PREMED = '☐ Dexamethasone 10 mg IV ☐ Paracetamol (500 mg) 1 tab oral ☐ Chlorpheniramine 10 mg IV ☐ Benadryl (25 mg) 2 cap oral'
const RTX_VS = 'หลังให้ Rituximab ให้ Record vital signs q 15 min × 2 then q 30 min × 2 then q 1 hr until completion of infusion'
const RTX_REACTION = 'ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา'
const RTX_ADVICE = 'การให้ยา rituximab ครั้งแรก: ชั่วโมงที่ 1 เริ่มให้ยาในขนาด 50 mg/hr ชั่วโมงถัดไป เพิ่มขนาดยาได้ 100 mg/hr; การให้ยา rituximab ครั้งต่อไป: ชั่วโมงที่ 1 เริ่มให้ยาในปริมาณ 20% จากนั้นให้ยาที่เหลือ 80% ภายใน 1.5 hr'
const RTX_VEHICLE = 'NSS ☐ 250 mL ☐ 500 mL'
const RTX_ROUTE = 'IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr)'
const HYDRATION = 'D5W 1,000 mL + 7.5% NaHCO3 100 mL IV drip 120 mL/hr เริ่มอย่างน้อย 12 hr ก่อนให้ methotrexate; ช่วงที่ drip methotrexate อยู่ ให้ลด rate IV เป็น 100 mL/hr และให้ต่อจนกว่า methotrexate หมด 48 hr จากนั้นให้ดื่มน้ำ >2,000 mL/day (พิจารณาลด rate IV ในผู้ป่วยอายุมาก, โรคหัวใจ และอื่นๆ)'
const LV_SIG = 'IV push q 6 hr เริ่มให้ 12 hr หลัง MTX หมด หยุดให้เมื่อ MTX level <0.05 µmol/L'
const URINE = 'Record V/S and urine output q 4 hr; keep urine pH >7 and urine output >100 mL/hr'

// Dose-adjustment footnotes
const FN_GEM = 'ไม่มีคำแนะนำการปรับขนาดยาในโรคไต; AST เพิ่มขึ้น: ไม่ต้องปรับขนาดยา; TB เพิ่มขึ้น: 80%'
const FN_IFOS = 'CrCl 46–60: 80%; CrCl 31–45: 75%; CrCl 10–30: 70%; CrCl <10: งดยา; ไม่มีคำแนะนำการปรับยาในโรคตับ'
const FN_ETOP = 'CrCl 15–50: 75%; CrCl <15: งดใช้ยา; TB 1.5–3 หรือ AST 60–180: 50%; TB >3 หรือ AST >180: งดใช้ยา'
const FN_CYC = 'CrCl <10: 50%; TB 3.1–5 หรือ AST >180: 75%; TB >5: งดยา'
const FN_DOXO = 'CrCl <10: 75%; TB 1.5–3 หรือ AST 60–180: 50%; TB 3.1–5 หรือ AST >180: 25%; TB >5: งดยา'
const FN_VCR = 'ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 หรือ AST 60–180: 50%; TB >3.1 หรือ AST >180: งดยา'
const FN_MTX = 'CrCl 30–60: 50% ของขนาดยา; CrCl <30: งดยา; TB 3.1–5 หรือ AST >180: 75% ของขนาดยา; TB >5: งดยา'
const FN_LV = 'Leucovorin 50 mg IV q 6 hr ถ้า MTX >20 µmol/L at 0 hr, หรือ >1.0 µmol/L at 24 hr, หรือ >0.1 µmol/L at 48 hr after the end of MTX infusion'
const FN_ARAC = 'CrCl 40–60: 1,000 mg/m2 ต่อครั้ง; CrCl <40: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ'
const FN_CARBO = 'ปรับขนาดยาตาม AUC; CrCl <30: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ'
const FN_POLA = 'ไม่ต้องปรับขนาดยาในโรคไตที่ CrCl ≥30 และไม่มีข้อมูลการปรับยาในโรคไตที่ CrCl <30; TB 1.5–3 หรือ AST 60–180: งดยา; maximum dose 240 mg/cycle'
const FN_BENDA = 'CrCl <40: งดยา; TB 1.8–3.6 และ AST 100–400: งดยา; TB >3.6: งดยา'
const FN_VNR = 'ไม่ต้องปรับขนาดยาในโรคไตและโรคตับ'
const FN_OXALI = 'CrCl <30: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ'
const FN_FLU = 'CrCl 30–70: 50%; CrCl <30: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ'

const SUPPORT3 = () => [
  { name:'Domperidone (10 mg)', unit:'fixed', instruct:'1 tab oral tid ac', days:'ตลอดการรักษา' },
  { name:'Omeprazole (20 mg)', unit:'fixed', instruct:'1 cap oral OD ac', days:'ตลอดการรักษา' },
  { name:'Senokot', unit:'fixed', instruct:'2 tabs oral hs prn for constipation', days:'ตลอดการรักษา' },
]
const FILGRASTIM = () => ({ name:'Filgrastim', unit:'fixed', instruct:'☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง……', days:'……' })
const ONDAN = (days) => ({ name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม.', days })
const TENOFOVIR = () => ({ name:'☐ Tenofovir alafenamide (25 mg)', unit:'fixed', instruct:'1 tab po OD pc กรณี AntiHBc+', days:'ตลอดการรักษา', note:'ให้เฉพาะกรณี Anti-HBc positive' })

export default [
  // ───────── p.137 Fludarabine ─────────
  { name:'Fludarabine (CLL)', abbr:'Fludarabine', cat:'CLL', type:'IPD', group:'order', ref:P(137), cycleInfo:'28 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, LDH; ☐ Reticulocyte, direct Coombs test; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_FU },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_IRR, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE_IRR, days:'ตลอดการรักษา' },
    ...SUPPORT3(),
    { name:'Acyclovir (400 mg)', unit:'fixed', instruct:'1 tab oral bid pc', days:'ตลอดการรักษา' },
    { name:'Co-trimoxazole SS (80/400)', unit:'fixed', instruct:'2 tabs oral OD วันจันทร์, พุธ, ศุกร์', days:'ตลอดการรักษา' },
    ONDAN('D1–D5'),
    { name:'Fludarabine', dose:25, unit:'mg/m2/day', vehicle:'NSS 100 mL', route:'IV drip in 30 min', days:'D1–D5', detail:'พิมพ์เป็นช่วง 25–30 mg/m2/day', note:FN_FLU },
    FILGRASTIM(),
  ]},

  // ───────── p.138 FND ─────────
  { name:'FND regimen', abbr:'FND', cat:'Lymphoma', type:'IPD', group:'order', ref:P(138), cycleInfo:'Cycle 1–8 (ไม่ระบุรอบ)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, LDH; ☐ Reticulocyte, direct Coombs test; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_FU },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_IRR, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE_IRR, days:'ตลอดการรักษา' },
    ...SUPPORT3(),
    { name:'Acyclovir (400 mg)', unit:'fixed', instruct:'1 tab oral bid pc', days:'ตลอดการรักษา' },
    { name:'Co-trimoxazole SS (80/400)', unit:'fixed', instruct:'2 tabs oral OD วันจันทร์, พุธ, ศุกร์', days:'ตลอดการรักษา' },
    ONDAN('D1–D3'),
    { name:'Mitoxantrone', dose:10, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1', detail:'ระวัง leak', note:'ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3: 50%; TB >3: 25%' },
    { name:'Fludarabine', dose:25, unit:'mg/m2/day', vehicle:'NSS 100 mL', route:'IV drip in 30 min', days:'D1–D3', note:'CrCl 30–70: 15 mg/m2/day; CrCl <30: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ' },
    { name:'Dexamethasone (4 mg)', unit:'fixed', instruct:'5 tabs oral OD pc (#25 tabs)', days:'D1–D5' },
    FILGRASTIM(),
  ]},

  // ───────── p.139 GCVP ─────────
  { name:'GCVP regimen', abbr:'GCVP', cat:'Lymphoma', type:'IPD', group:'order', ref:P(139), cycleInfo:'21 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_STD, days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:'D4, D7' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    { name:'คำแนะนำ Gemcitabine', unit:'fixed', instruct:'ขนาดยาของ Gemcitabine: Cycle 1: 750 mg/m2; Cycle 2: 875 mg/m2; Cycle ถัดไป: 1,000 mg/m2', days:'ทุก cycle' },
    ...SUPPORT3(),
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1, D8' },
    { name:'Dexamethasone injection', unit:'fixed', instruct:'10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1, D8' },
    { name:'Gemcitabine', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 30 min', days:'D1, D8', detail:'750–1,000 mg/m2: cycle 1 = 750, cycle 2 = 875, cycle ถัดไป = 1,000 mg/m2', note:FN_GEM },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, vehicle:'NSS 20 mL', route:'IV push', days:'D1', detail:'max 2 mg; ระวัง leak', note:FN_VCR },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1', note:FN_CYC },
    { name:'Prednisolone (5 mg)', unit:'fixed', instruct:'5 tabs PO tid pc and hs (#100 tabs)', days:'D1–D5' },
    FILGRASTIM(),
  ]},

  // ───────── p.140 GDP ─────────
  { name:'GDP regimen', abbr:'GDP', cat:'Lymphoma', type:'IPD', group:'order', ref:P(140), cycleInfo:'21 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_STD, days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:'D4, D7' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    ...SUPPORT3(),
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1, D8' },
    { name:'Dexamethasone', unit:'fixed', instruct:'10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1' },
    { name:'Gemcitabine', dose:1000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 30 min', days:'D1, D8', note:FN_GEM },
    { name:'5% D/NSS (pre-hydration)', unit:'fixed', instruct:'250 mL IV drip in 1 hr ก่อนให้ cisplatin', days:'D1' },
    { name:'Cisplatin', dose:75, unit:'mg/m2/day', vehicle:'NSS 500 mL', route:'IV drip in 2 hr', days:'D1', detail:'คู่กับ 20% Mannitol 250 mL IV drip in 2 hr', note:'CrCl 46–60: 50%; CrCl 31–45: 25%; CrCl ≤30: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ' },
    { name:'NSS (post-hydration)', unit:'fixed', instruct:'500 mL IV drip 120 mL/hr เริ่มหลัง cisplatin หมด', days:'D1' },
    { name:'Dexamethasone (4 mg)', unit:'fixed', instruct:'5 tabs oral bid pc (#40 tabs)', days:'D1–D4' },
    FILGRASTIM(),
  ]},

  // ───────── p.141 GemOx ─────────
  { name:'GemOx regimen', abbr:'GemOx', cat:'Lymphoma', type:'IPD', group:'order', ref:P(141), cycleInfo:'14 วัน (Cycle 1–4)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_STD, days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    ...SUPPORT3(),
    ONDAN('D1'),
    { name:'Gemcitabine', dose:1000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 30 min', days:'D1', note:FN_GEM },
    { name:'Oxaliplatin', dose:100, unit:'mg/m2', vehicle:'D5W 250 mL', route:'IV in 3 hr', days:'D1', note:FN_OXALI },
    FILGRASTIM(),
  ]},

  // ───────── p.142 GIFOX ─────────
  { name:'GIFOX regimen', abbr:'GIFOX', cat:'Lymphoma', type:'IPD', group:'order', ref:P(142), cycleInfo:'14 วัน (Cycle 1–4)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_STD, days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    ...SUPPORT3(),
    ONDAN('D1–D2'),
    { name:'Gemcitabine', dose:1000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 30 min', days:'D1', note:FN_GEM },
    { name:'Oxaliplatin', dose:130, unit:'mg/m2', vehicle:'D5W 250 mL', route:'IV in 3 hr', days:'D2', note:FN_OXALI },
    { name:'Ifosfamide', dose:5000, unit:'mg/m2', vehicle:'NSS 1,000 mL', route:'IV drip in 20 hr', days:'D2', detail:'ผสมร่วมกับ Mesna 5,000 mg/m2 ในขวดเดียวกัน', note:FN_IFOS },
    { name:'Mesna', dose:5000, unit:'mg/m2', vehicle:'NSS 1,000 mL', route:'IV drip in 20 hr', days:'D2', detail:'ผสมร่วมกับ Ifosfamide 5,000 mg/m2 ในขวดเดียวกัน' },
    FILGRASTIM(),
  ]},

  // ───────── p.143 GVD ─────────
  { name:'GVD regimen', abbr:'GVD', cat:'Hodgkin', type:'IPD', group:'order', ref:P(143), cycleInfo:'21 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_STD, days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    ...SUPPORT3(),
    ONDAN('D1–D3'),
    { name:'Gemcitabine', dose:1000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 30 min', days:'D1, D8', note:FN_GEM },
    { name:'Vinorelbine', dose:20, unit:'mg/m2/day', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1, D8', note:FN_VNR },
    { name:'Liposomal doxorubicin', dose:15, unit:'mg/m2', vehicle:'D5W 250 mL', route:'IV drip in 2 hr', days:'D1', note:'ไม่ต้องปรับขนาดยาในโรคไต; TB 1.2–3 หรือ AST 60–180: 50%; TB 3.1–5 หรือ AST >180: 25%; TB >5: งดยา' },
    FILGRASTIM(),
  ]},

  // ───────── p.144 HD-MTX regimen ─────────
  { name:'HD-MTX regimen (with vincristine, IT cytarabine)', abbr:'HD-MTX', cat:'CNS lymphoma', type:'IPD', group:'order', ref:P(144), cycleInfo:'Cycle 1–6 (ไม่ระบุรอบ)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, uric acid, LDH; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_FU },
    { name:'MTX level', unit:'fixed', instruct:'MTX level OD จนกว่า <0.05 µmol/L (เริ่มเจาะ 48 hr หลังจากเริ่มให้ MTX)', days:'เริ่ม D4' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    { name:'Record V/S และ urine', unit:'fixed', instruct:URINE, days:'D1–D2' },
    { name:'Intrathecal Cytarabine', unit:'fixed', instruct:'เบิก Cytarabine 100 mg/vial; Cytarabine 15 mg IT', days:'D7, D8, D9 และ D17, D18, D19' },
    { name:'Domperidone (10 mg)', unit:'fixed', instruct:'1 tab oral tid ac', days:'ตลอดการรักษา' },
    { name:'Senokot', unit:'fixed', instruct:'2 tabs oral hs prn for constipation', days:'ตลอดการรักษา' },
    { name:'งดยา', unit:'fixed', instruct:'งดให้ยา omeprazole และ co-trimoxazole', days:'ตลอดการรักษา' },
    ONDAN('D1–D2'),
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, vehicle:'NSS 20 mL', route:'IV push', days:'D1', detail:'max 2 mg; ระวัง leak' },
    { name:'Dexamethasone injection', unit:'fixed', instruct:'5 mg IV q 6 hr', days:'D1–D4' },
    { name:'Hydration', unit:'fixed', instruct:HYDRATION, days:'เริ่ม D1' },
    { name:'Methotrexate (bolus)', dose:1500, unit:'mg/m2', vehicle:'D5W 100 mL', route:'IV in 1 hr', days:'D2', detail:'ให้ก่อน then Methotrexate infusion', note:FN_MTX },
    { name:'Methotrexate (infusion × 2 ชุด)', dose:1650, unit:'mg/m2', vehicle:'D5W 1,000 mL + 7.5% NaHCO3 100 mL', route:'IV in 6 hr × 2 ชุด', days:'D2', detail:'ตามพิมพ์ "Methotrexate (1,650 mg/m2) …… mg in D5W 1,000 mL + 7.5% NaHCO3 100 mL IV in 6 hr × 2 ชุด"', note:FN_MTX },
    { name:'Leucovorin', dose:15, unit:'mg/m2', vehicle:'D5W 20 mL', route:LV_SIG, days:'เริ่ม D3', note:FN_LV },
  ]},

  // ───────── p.145 HD-MTX-Ara C ─────────
  { name:'HD-MTX-Ara C', abbr:'HD-MTX-AraC', cat:'CNS lymphoma', type:'IPD', group:'order', ref:P(145), cycleInfo:'21 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, uric acid, LDH; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_FU },
    { name:'MTX level', unit:'fixed', instruct:'MTX level OD จนกว่า <0.05 µmol/L (เริ่มเจาะ 48 hr หลังจากเริ่มให้ MTX)', days:'เริ่ม D4' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    { name:'Record V/S และ urine', unit:'fixed', instruct:URINE, days:'D1–D2' },
    { name:'Cerebellar signs', unit:'fixed', instruct:'ตรวจ cerebellar signs ทุกครั้งก่อนให้ยา cytarabine', days:'D3–D4' },
    { name:'Dex-oph eye drop', unit:'fixed', instruct:'2 drops หยอดตา 2 ข้าง q 8 hr', days:'D3–D6' },
    { name:'Domperidone (10 mg)', unit:'fixed', instruct:'1 tab oral tid ac', days:'ตลอดการรักษา' },
    { name:'Senokot', unit:'fixed', instruct:'2 tabs oral hs prn for constipation', days:'ตลอดการรักษา' },
    { name:'งดยา', unit:'fixed', instruct:'งดให้ยา omeprazole และ co-trimoxazole', days:'ตลอดการรักษา' },
    ONDAN('D2–D4'),
    { name:'Dexamethasone', unit:'fixed', instruct:'5 mg IV q 6 hr', days:'D1–D4' },
    { name:'Hydration', unit:'fixed', instruct:HYDRATION, days:'เริ่ม D1' },
    { name:'Methotrexate (bolus)', dose:500, unit:'mg/m2', vehicle:'D5W 50 mL', route:'IV in 15 min', days:'D2', detail:'ให้ก่อน then Methotrexate infusion', note:FN_MTX },
    { name:'Methotrexate (infusion)', dose:3000, unit:'mg/m2', vehicle:'D5W 500 mL + 7.5% NaHCO3 50 mL', route:'IV in 3 hr', days:'D2', note:FN_MTX },
    { name:'Leucovorin', dose:15, unit:'mg/m2', vehicle:'D5W 20 mL', route:LV_SIG, days:'เริ่ม D3', note:FN_LV },
    { name:'Cytarabine', dose:2000, unit:'mg/m2', vehicle:'NSS 300 mL', route:'IV in 3 hr q 12 hr (4 doses)', days:'D3–D4', detail:'ยี่ห้อ (……)', note:FN_ARAC },
    FILGRASTIM(),
  ]},

  // ───────── p.146 HD-MTX CNS prophylaxis ─────────
  { name:'HD-MTX for CNS prophylaxis', abbr:'HD-MTX CNS ppx', cat:'CNS lymphoma', type:'IPD', group:'order', ref:P(146), cycleInfo:'Cycle 1–4 (ไม่ระบุรอบ)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_FU },
    { name:'MTX level', unit:'fixed', instruct:'MTX level OD จนกว่า <0.05 µmol/L (เริ่มเจาะ 48 hr หลังจากเริ่มให้ MTX)', days:'เริ่ม D4' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    { name:'Record V/S และ urine', unit:'fixed', instruct:URINE, days:'D1–D2' },
    { name:'Domperidone (10 mg)', unit:'fixed', instruct:'1 tab oral tid ac', days:'ตลอดการรักษา' },
    { name:'Senokot', unit:'fixed', instruct:'2 tabs oral hs prn for constipation', days:'ตลอดการรักษา' },
    { name:'งดยา', unit:'fixed', instruct:'งดให้ยา omeprazole และ co-trimoxazole', days:'ตลอดการรักษา' },
    ONDAN('D2'),
    { name:'Dexamethasone', unit:'fixed', instruct:'10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D2' },
    { name:'Hydration', unit:'fixed', instruct:HYDRATION, days:'เริ่ม D1' },
    { name:'Methotrexate (bolus)', dose:1500, unit:'mg/m2', vehicle:'D5W 100 mL', route:'IV in 1 hr', days:'D2', detail:'ให้ก่อน then Methotrexate infusion', note:FN_MTX },
    { name:'Methotrexate (infusion)', dose:1500, unit:'mg/m2', vehicle:'D5W 1,000 mL + 7.5% NaHCO3 100 mL', route:'IV in 6 hr', days:'D2', note:FN_MTX },
    { name:'Leucovorin', dose:15, unit:'mg/m2', vehicle:'D5W 20 mL', route:LV_SIG, days:'เริ่ม D3', note:FN_LV },
  ]},

  // ───────── p.147 ICE ─────────
  { name:'ICE regimen', abbr:'ICE', cat:'Lymphoma', type:'IPD', group:'order', ref:P(147), cycleInfo:'21 วัน (Cycle 1, 2, 3 ……)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_STD, days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    ...SUPPORT3(),
    { name:'AUC', unit:'fixed', instruct:'AUC = CrCl + 25 = ……', days:'D1' },
    ONDAN('D1–D3'),
    { name:'Ifosfamide', dose:1670, unit:'mg/m2/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1–D3', detail:'ผสมร่วมกับ Mesna 1,670 mg/m2/day ในขวดเดียวกัน', note:FN_IFOS },
    { name:'Mesna', dose:1670, unit:'mg/m2/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1–D3', detail:'ผสมร่วมกับ Ifosfamide ในขวดเดียวกัน' },
    { name:'Carboplatin', unit:'AUC5', maxDose:800, vehicle:'D5W 250 mL', route:'IV drip in 1 hr', days:'D2', detail:'5 AUC; max 800 mg', note:FN_CARBO },
    { name:'Etoposide', dose:100, unit:'mg/m2/day', vehicle:'NSS 500 mL', route:'IV drip in 2 hr', days:'D1–D3', note:FN_ETOP },
    FILGRASTIM(),
  ]},

  // ───────── p.148 ICE 24-hour infusion ─────────
  { name:'ICE regimen 24-hour infusion', abbr:'ICE 24hr', cat:'Lymphoma', type:'IPD', group:'order', ref:P(148), cycleInfo:'21 วัน* (Cycle 1, 2, 3 ……) — *Original regimen ทุก 14 วัน', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, uric acid, LDH; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    ...SUPPORT3(),
    { name:'AUC', unit:'fixed', instruct:'AUC = CrCl + 25 = ……', days:'D1' },
    ONDAN('D1–D3'),
    { name:'Ifosfamide', dose:5000, unit:'mg/m2/day', vehicle:'NSS 1,000 mL', route:'IV drip in 24 hr', days:'D2', detail:'ผสมร่วมกับ Mesna 5,000 mg/m2/day ในขวดเดียวกัน', note:FN_IFOS },
    { name:'Mesna', dose:5000, unit:'mg/m2/day', vehicle:'NSS 1,000 mL', route:'IV drip in 24 hr', days:'D2', detail:'ผสมร่วมกับ Ifosfamide ในขวดเดียวกัน' },
    { name:'Carboplatin', unit:'AUC5', maxDose:800, vehicle:'D5W 250 mL', route:'IV drip in 1 hr', days:'D2', detail:'5 AUC; max 800 mg', note:FN_CARBO },
    { name:'Etoposide', dose:100, unit:'mg/m2/day', vehicle:'NSS 500 mL', route:'IV drip in 2 hr', days:'D1–D3', note:FN_ETOP },
    FILGRASTIM(),
  ]},

  // ───────── p.149 IGEV ─────────
  { name:'IGEV regimen', abbr:'IGEV', cat:'Hodgkin', type:'IPD', group:'order', ref:P(149), cycleInfo:'21 วัน (Cycle 1–4)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_STD, days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    ...SUPPORT3(),
    ONDAN('D1–D3'),
    { name:'Vinorelbine', dose:20, unit:'mg/m2/day', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1', note:FN_VNR },
    { name:'Gemcitabine', dose:800, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 30 min', days:'D1, D4', note:FN_GEM },
    { name:'Ifosfamide', dose:2000, unit:'mg/m2/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1–D4', detail:'ผสมร่วมกับ Mesna 2,000 mg/m2/day ในขวดเดียวกัน', note:FN_IFOS },
    { name:'Mesna', dose:2000, unit:'mg/m2/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1–D4', detail:'ผสมร่วมกับ Ifosfamide ในขวดเดียวกัน' },
    { name:'Prednisolone (5 mg)', unit:'fixed', instruct:'5 tabs po tid pc and hs (#100 tabs)', days:'D1–D4' },
    FILGRASTIM(),
  ]},

  // ───────── p.150 IVAC ─────────
  { name:'IVAC regimen (Cycle 2, 4)', abbr:'IVAC', cat:'Burkitt', type:'IPD', group:'order', ref:P(150), cycleInfo:'ให้ใน Cycle 2 และ 4', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_STD, days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_FU },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    { name:'Intrathecal Methotrexate', unit:'fixed', instruct:'Methotrexate (เบิก 50 mg/vial จำนวน 1 ขวด) 12 mg IT วันที่……; ส่ง CSF for cell count, differential count, protein, sugar และ cytology; Capillary blood glucose (POCT) หลัง lumbar puncture', days:'D5' },
    { name:'Leucovorin (15 mg)', unit:'fixed', instruct:'1 tab oral 24 hr หลังให้ MTX IT', days:'D6' },
    ...SUPPORT3(),
    ONDAN('D1–D5'),
    { name:'Ifosfamide', dose:1500, unit:'mg/m2/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1–D5', detail:'ผสมร่วมกับ Mesna 1,500 mg/m2/day ในขวดเดียวกัน', note:FN_IFOS },
    { name:'Mesna', dose:1500, unit:'mg/m2/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1–D5', detail:'ผสมร่วมกับ Ifosfamide ในขวดเดียวกัน' },
    { name:'Etoposide', dose:60, unit:'mg/m2/day', vehicle:'NSS 500 mL', route:'IV drip in 2 hr', days:'D1–D5', note:FN_ETOP },
    { name:'Cytarabine', dose:2000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr q 12 hr (รวม 4 doses)', days:'D1–D2', note:FN_ARAC },
    { name:'Cerebellar sign', unit:'fixed', instruct:'ตรวจ cerebellar sign ทุกครั้งก่อนให้ยา cytarabine', days:'D1–D2' },
    { name:'Filgrastim', unit:'fixed', instruct:'☐ 300 mcg ☐ 480 mcg SC OD', days:'เริ่ม D6' },
  ]},

  // ───────── p.151 MATRIx ─────────
  { name:'MATRIx regimen', abbr:'MATRIx', cat:'CNS lymphoma', type:'IPD', group:'order', ref:P(151), cycleInfo:'21 วัน (Cycle 1–4); *Original MATRIx regimen has rituximab in Day-5', drugs:[
    { name:'Lab D0', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA), EKG 12 leads', days:'D0' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D0' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_FU },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    { name:'Premedication ก่อนให้ rituximab 30 นาที', unit:'fixed', instruct:RTX_PREMED, days:'D0', note:'เลือกตามช่อง ☐ ที่กา' },
    { name:'Record vital signs (rituximab)', unit:'fixed', instruct:'Record vital signs q 15 min × 2 then q 30 min × 2 then q 1 hr until completion of infusion of rituximab; ' + RTX_REACTION, days:'D0' },
    { name:'Record V/S และ urine', unit:'fixed', instruct:URINE, days:'D0–D1' },
    { name:'Cerebellar signs', unit:'fixed', instruct:'ตรวจ cerebellar signs ทุกครั้งก่อนให้ยา cytarabine', days:'D2–D3' },
    { name:'คำแนะนำ rituximab', unit:'fixed', instruct:RTX_ADVICE, days:'D0' },
    { name:'MTX level', unit:'fixed', instruct:'MTX level OD จนกว่า <0.05 µmol/L (48 hr หลังจากเริ่มยา)', days:'เริ่ม D3' },
    { name:'Domperidone (10 mg)', unit:'fixed', instruct:'1 tab oral tid ac', days:'ตลอดการรักษา' },
    { name:'Senokot', unit:'fixed', instruct:'2 tabs oral hs prn for constipation', days:'ตลอดการรักษา' },
    { name:'Dex-oph eye drop', unit:'fixed', instruct:'2 drops หยอดตา 2 ข้าง q 8 hr', days:'D2–D5' },
    { name:'งดยา', unit:'fixed', instruct:'งดให้ยา omeprazole และ co-trimoxazole', days:'ตลอดการรักษา' },
    TENOFOVIR(),
    { name:'Rituximab', dose:375, unit:'mg/m2', vehicle:RTX_VEHICLE, route:RTX_ROUTE, days:'D0' },
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมี 30 min, prn q 8 hr', days:'D1–D4' },
    { name:'Dexamethasone', unit:'fixed', instruct:'5 mg IV q 6 hr', days:'D1–D4' },
    { name:'Hydration', unit:'fixed', instruct:HYDRATION, days:'เริ่ม D0' },
    { name:'Methotrexate (bolus)', dose:500, unit:'mg/m2', vehicle:'D5W 50 mL', route:'IV in 15 min', days:'D1', detail:'ให้ก่อน then Methotrexate infusion', note:FN_MTX },
    { name:'Methotrexate (infusion)', dose:3000, unit:'mg/m2', vehicle:'D5W 500 mL + 7.5% NaHCO3 50 mL', route:'IV in 3 hr', days:'D1', note:FN_MTX },
    { name:'Leucovorin', dose:15, unit:'mg/m2', vehicle:'D5W 20 mL', route:LV_SIG, days:'เริ่ม D2', note:FN_LV },
    { name:'Cytarabine', dose:2000, unit:'mg/m2', vehicle:'NSS 300 mL', route:'IV in 3 hr q 12 hr (4 doses)', days:'D2–D3', detail:'ยี่ห้อ (……)', note:FN_ARAC },
    { name:'Thiotepa', dose:30, unit:'mg/m2', vehicle:'NSS …… mL (0.5–1 mg/mL)', route:'IV in 1 hr', days:'D4', detail:'4 ชม. หลังให้ยา Thiotepa จนถึง 36 ชม. หลังยา Thiotepa หมด ให้อาบน้ำเปล่า (งดสบู่) 4 ครั้งต่อวัน และงดทาครีม', note:'ไม่มีคำแนะนำการปรับยาในโรคไตและโรคตับ' },
    FILGRASTIM(),
  ]},

  // ───────── p.152 MINE ─────────
  { name:'MINE regimen', abbr:'MINE', cat:'Lymphoma', type:'IPD', group:'order', ref:P(152), cycleInfo:'21 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_STD, days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_FU },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:'Regular diet; record V/S, I/O; Mouth wash หลังอาหารทุกมื้อ; ' + ADVICE, days:'ตลอดการรักษา' },
    ...SUPPORT3(),
    ONDAN('D1–D3'),
    { name:'Ifosfamide', dose:1333, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1–D3', detail:'ผสมร่วมกับ Mesna 1,333 mg/m2 ในขวดเดียวกัน', note:FN_IFOS },
    { name:'Mesna (ร่วมกับ ifosfamide)', dose:1333, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1–D3', detail:'ผสมร่วมกับ Ifosfamide ในขวดเดียวกัน' },
    { name:'Mesna (หลัง ifosfamide)', dose:500, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 30 min หลังให้ ifosfamide 4 hr', days:'D1–D3' },
    { name:'Mitoxantrone', dose:8, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 15 min', days:'D1', note:'ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3: 4 mg/m2; TB >3: 2 mg/m2' },
    { name:'Etoposide', dose:65, unit:'mg/m2/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1–D3', note:FN_ETOP },
    FILGRASTIM(),
  ]},

  // ───────── p.153 mini-CHOP ─────────
  { name:'mini-CHOP regimen', abbr:'mini-CHOP', cat:'Lymphoma', type:'IPD', group:'order', ref:P(153), cycleInfo:'21 วัน (Cycle 1–8)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:LAB_STD, days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    ...SUPPORT3(),
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1' },
    { name:'Dexamethasone', unit:'fixed', instruct:'10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1' },
    { name:'Vincristine', unit:'fixed', instruct:'1 mg in NSS 20 mL IV push ระวัง leak', days:'D1', note:FN_VCR },
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1', detail:'ระวัง leak', note:FN_DOXO },
    { name:'Cyclophosphamide', dose:400, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1', note:FN_CYC },
    { name:'Prednisolone (5 mg)', dose:40, unit:'mg/m2', route:'PO (Sig. ……)', days:'D1–D5' },
    FILGRASTIM(),
  ]},

  // ───────── p.154 Nivolumab-AVD ─────────
  { name:'Nivolumab-AVD regimen', abbr:'Nivo-AVD', cat:'Hodgkin', type:'IPD', group:'order', ref:P(154), cycleInfo:'28 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'CBC, ESR, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:CBC_FU },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_IRR, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:'Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง การวางแผนมีบุตรในอนาคต การหยุดสูบบุหรี่ และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล', days:'ตลอดการรักษา' },
    ...SUPPORT3(),
    { name:'Ondansetron injection', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1, D15' },
    { name:'Dexamethasone injection', unit:'fixed', instruct:'10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1, D15' },
    { name:'Paracetamol (500 mg)', unit:'fixed', instruct:'1 tab oral ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1, D15' },
    { name:'Vinblastine', dose:6, unit:'mg/m2', maxDose:10, vehicle:'NSS 20 mL', route:'IV push', days:'D1, D15', detail:'max 10 mg; ระวัง leak', note:'ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 หรือ AST 60–180: 50%; TB >3.1 หรือ AST >180: งดยา' },
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1, D15', detail:'ระวัง leak', note:FN_DOXO },
    { name:'Dacarbazine', dose:375, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV drip in 3 hr', days:'D1, D15', note:'CrCl 30–60: 75%; CrCl 10–30: 50%; CrCl <10: งดยา; ไม่มีคำแนะนำเรื่องปรับขนาดยาในโรคตับ' },
    { name:'Nivolumab (100 mg/10 mL; 40 mg/4 mL)', unit:'fixed', instruct:'240 mg in NSS 100 mL IV in 1 hr', days:'D1, D15', note:'ไม่ต้องปรับขนาดยาในโรคไต; TB >1.5 หรือ AST >60: ยังไม่มีข้อมูลเรื่องปรับขนาดยาในโรคตับระดับปานกลางหรือรุนแรง' },
    FILGRASTIM(),
  ]},

  // ───────── p.155 Obinutuzumab ─────────
  { name:'Obinutuzumab infusion protocol', abbr:'Obinutuzumab', cat:'Lymphoma', type:'IPD', group:'order', ref:P(155), cycleInfo:'Cycle 1–6 ……', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'คำแนะนำ Obinutuzumab', unit:'fixed', instruct:'การให้ยา Obinutuzumab ครั้งแรก: ชั่วโมงที่ 1–4 เริ่มให้ยาในขนาด 25 mg/hr ชั่วโมงถัดไป ให้ยาในขนาด 50 mg/hr และสามารถเพิ่มได้ครั้งละ 50 mg/hr ในทุกๆ 30 นาที จนถึงอัตราสูงสุด 400 mg/hr; การให้ยา Obinutuzumab ครั้งต่อไป: ชั่วโมงที่ 1 เริ่มให้ยาในขนาด 100 mg/hr ชั่วโมงถัดไป ให้ยาในขนาด 200 mg/hr และเพิ่มขึ้นครั้งละ 100 mg/hr ทุกๆ 30 นาที จนถึงอัตราสูงสุด 400 mg/hr', days:'ทุกครั้งที่ให้ยา' },
    { name:'Infusion reaction', unit:'fixed', instruct:RTX_REACTION, days:'ทุกครั้งที่ให้ยา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:'Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ', days:'ตลอดการรักษา' },
    TENOFOVIR(),
    { name:'Premedication ก่อนให้ obinutuzumab 60 นาที', unit:'fixed', instruct:'☐ Dexamethasone injection 20 mg IV ☐ Chlorpheniramine injection 10 mg IV ☐ Paracetamol tab (500 mg) 2 tabs oral ☐ Benadryl (25 mg) 2 cap oral', days:'ทุกครั้งที่ให้ยา', note:'เลือกตามช่อง ☐ ที่กา' },
    { name:'Obinutuzumab', unit:'fixed', instruct:'1,000 mg in NSS 250 mL IV infusion: เริ่มต้น rate 25 mL/hr; นาทีที่ 30 rate 50 mL/hr; นาทีที่ 60 rate 75 mL/hr; นาทีที่ 90 rate 100 mL/hr', days:'ทุก cycle', note:'ตามพิมพ์ "IV infusion 80" (เลข 80 ไม่มีหน่วยกำกับ)' },
    { name:'Record vital signs', unit:'fixed', instruct:'q 15 min × 2 then q 30 min × 2 then q 1 hr until completion of infusion', days:'ทุกครั้งที่ให้ยา' },
  ]},

  // ───────── p.156 Pola-BR ─────────
  { name:'Pola-BR regimen', abbr:'Pola-BR', cat:'Lymphoma', type:'IPD', group:'order', ref:P(156), cycleInfo:'21 วัน (Cycle 1–6 ……)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_IRR, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE_IRR, days:'ตลอดการรักษา' },
    { name:'Infusion reaction', unit:'fixed', instruct:RTX_REACTION, days:'D1' },
    { name:'คำแนะนำ rituximab', unit:'fixed', instruct:RTX_ADVICE, days:'D1' },
    ...SUPPORT3(),
    TENOFOVIR(),
    { name:'Premedication ก่อนให้ rituximab 30 min', unit:'fixed', instruct:RTX_PREMED, days:'D1', note:'เลือกตามช่อง ☐ ที่กา' },
    { name:'☐ Rituximab (375 mg/m2)', dose:375, unit:'mg/m2', vehicle:RTX_VEHICLE, route:RTX_ROUTE, days:'D1', note:'เลือก 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง' },
    { name:'☐ Rituximab (500 mg/m2)', dose:500, unit:'mg/m2', vehicle:RTX_VEHICLE, route:RTX_ROUTE, days:'D1', note:'เลือก 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง' },
    { name:'Polatuzumab vedotin', dose:1.8, unit:'mg/kg', maxDose:240, vehicle:'NSS 100 mL', route:'IV drip in 60 min (ครั้งแรก 90 min)', days:'D1', detail:'ให้ต่อจาก Rituximab; max 240 mg/cycle; *drip in 90 min in 1st time', note:FN_POLA },
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1, D2' },
    { name:'Dexamethasone', unit:'fixed', instruct:'10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1, D2' },
    { name:'Bendamustine', dose:90, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV drip in 2 hr', days:'D1, D2', note:FN_BENDA },
    FILGRASTIM(),
    { name:'Record vital signs', unit:'fixed', instruct:'หลังให้ยา Rituximab และ Polatuzumab ให้ Record vital signs q 15 min × 2 then q 30 min × 2 then q 1 hr until completion of infusion', days:'D1' },
  ]},

  // ───────── p.157 Pola-R-CHP ─────────
  { name:'Pola-R-CHP regimen', abbr:'Pola-R-CHP', cat:'Lymphoma', type:'IPD', group:'order', ref:P(157), cycleInfo:'21 วัน (CHP + Polatuzumab Cycle 1–6; Rituximab Cycle 1–8)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    { name:'Record vital signs', unit:'fixed', instruct:'หลังให้ยา Rituximab และ Polatuzumab ให้ Record vital signs q 15 min × 2 then q 30 min × 2 then q 1 hr until completion of infusion', days:'D1' },
    { name:'Infusion reaction', unit:'fixed', instruct:RTX_REACTION, days:'D1' },
    { name:'คำแนะนำ rituximab', unit:'fixed', instruct:RTX_ADVICE, days:'D1' },
    ...SUPPORT3(),
    TENOFOVIR(),
    { name:'Premedication ก่อนให้ rituximab 30 min', unit:'fixed', instruct:RTX_PREMED, days:'D1', note:'เลือกตามช่อง ☐ ที่กา' },
    { name:'Rituximab', dose:375, unit:'mg/m2', vehicle:RTX_VEHICLE, route:RTX_ROUTE, days:'D1', detail:'Cycle 1–8' },
    { name:'Polatuzumab vedotin', dose:1.8, unit:'mg/kg', maxDose:240, vehicle:'NSS 100 mL', route:'IV drip in 60 min (ครั้งแรก 90 min)', days:'D1', detail:'Cycle 1–6; ให้ต่อจาก Rituximab; max 240 mg/cycle; *drip in 90 min in 1st time', note:FN_POLA },
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1' },
    { name:'Dexamethasone', unit:'fixed', instruct:'10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1' },
    { name:'Doxorubicin', dose:50, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1', detail:'ระวัง leak', note:FN_DOXO },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1', note:FN_CYC },
    { name:'Prednisolone (5 mg)', unit:'fixed', instruct:'5 tabs PO tid pc and hs (#100 tabs)', days:'D1–D5' },
    FILGRASTIM(),
  ]},

  // ───────── p.158 Polatuzumab vedotin ─────────
  { name:'Polatuzumab vedotin (single agent)', abbr:'Pola', cat:'Lymphoma', type:'IPD', group:'order', ref:P(158), cycleInfo:'Cycle 1–6 (ไม่ระบุรอบ)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'คำแนะนำ Polatuzumab', unit:'fixed', instruct:'การให้ยา Polatuzumab vedotin ครั้งแรก: ให้ drip in 90 min และ observe อย่างน้อย 90 min following completion of dose; การให้ยา Polatuzumab vedotin ครั้งถัดไป: ให้ drip in 60 min และ observe อย่างน้อย 30 min following completion of dose', days:'D1' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:'Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ', days:'ตลอดการรักษา' },
    { name:'Premedication', unit:'fixed', instruct:'☐ Chlorpheniramine injection 10 mg IV ☐ Paracetamol tab (500 mg) 1 tab oral ☐ Benadryl (25 mg) 2 cap oral', days:'D1', note:'เลือกตามช่อง ☐ ที่กา' },
    { name:'Polatuzumab vedotin', dose:1.8, unit:'mg/kg', maxDose:240, vehicle:'NSS 100 mL', route:'IV drip in …… min', days:'D1', detail:'ครั้งแรก 90 min, ครั้งถัดไป 60 min; max 240 mg/cycle', note:FN_POLA },
    { name:'Record vital signs', unit:'fixed', instruct:'q 15 min × 2 then q 30 min × 2 then ☐ q 1 hr × 2 ครั้ง; ' + RTX_REACTION, days:'D1' },
  ]},

  // ───────── p.159 RBAC500 ─────────
  { name:'RBAC500 regimen', abbr:'RBAC500', cat:'Lymphoma', type:'IPD', group:'order', ref:P(159), cycleInfo:'28 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_IRR, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE_IRR, days:'ตลอดการรักษา' },
    { name:'Record vital signs', unit:'fixed', instruct:RTX_VS, days:'D1' },
    { name:'Infusion reaction', unit:'fixed', instruct:RTX_REACTION, days:'D1' },
    { name:'คำแนะนำ rituximab', unit:'fixed', instruct:RTX_ADVICE, days:'D1' },
    ...SUPPORT3(),
    TENOFOVIR(),
    { name:'Premedication ก่อนให้ rituximab 30 min', unit:'fixed', instruct:RTX_PREMED, days:'D1', note:'เลือกตามช่อง ☐ ที่กา' },
    { name:'☐ Rituximab (375 mg/m2)', dose:375, unit:'mg/m2', vehicle:RTX_VEHICLE, route:RTX_ROUTE, days:'D1', note:'เลือก 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง' },
    { name:'☐ Rituximab (500 mg/m2)', dose:500, unit:'mg/m2', vehicle:RTX_VEHICLE, route:RTX_ROUTE, days:'D1', note:'เลือก 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง' },
    ONDAN('D2–D4'),
    { name:'Dexamethasone', unit:'fixed', instruct:'10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D2–D4' },
    { name:'Bendamustine', dose:70, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D2–D3', note:FN_BENDA },
    { name:'Cytarabine', dose:500, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr (เริ่มให้หลังจาก Bendamustine หมด 2 hr)', days:'D2–D4', detail:'ยี่ห้อ (……)', note:'ขนาดยา 500 mg/m2: ไม่มีคำแนะนำเรื่องปรับขนาดยาในโรคไตและโรคตับ' },
    FILGRASTIM(),
  ]},

  // ───────── p.160 R-CHOP ─────────
  { name:'R-CHOP regimen', abbr:'R-CHOP', cat:'Lymphoma', type:'IPD', group:'order', ref:P(160), cycleInfo:'21 วัน (Cycle 1–8)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    { name:'Record vital signs', unit:'fixed', instruct:RTX_VS, days:'D1' },
    { name:'Infusion reaction', unit:'fixed', instruct:RTX_REACTION, days:'D1' },
    { name:'คำแนะนำ rituximab', unit:'fixed', instruct:RTX_ADVICE, days:'D1' },
    ...SUPPORT3(),
    TENOFOVIR(),
    { name:'Premedication ก่อนให้ rituximab 30 min', unit:'fixed', instruct:'☐ Dexamethasone injection 10 mg IV ☐ Chlorpheniramine injection 10 mg IV ☐ Paracetamol tab (500 mg) 1 tab oral ☐ Benadryl (25 mg) 2 cap oral', days:'D1', note:'เลือกตามช่อง ☐ ที่กา' },
    { name:'Rituximab', dose:375, unit:'mg/m2', vehicle:RTX_VEHICLE, route:RTX_ROUTE, days:'D1' },
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1' },
    { name:'Dexamethasone', unit:'fixed', instruct:'10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, vehicle:'NSS 20 mL', route:'IV push', days:'D1', detail:'max 2 mg; ระวัง leak', note:FN_VCR },
    { name:'Doxorubicin', dose:50, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1', detail:'ระวัง leak', note:FN_DOXO },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1', note:FN_CYC },
    { name:'Prednisolone (5 mg)', unit:'fixed', instruct:'5 tabs PO tid pc and hs (#100 tabs)', days:'D1–D5' },
    FILGRASTIM(),
  ]},

  // ───────── p.161 Rituximab ─────────
  { name:'Rituximab infusion protocol', abbr:'Rituximab', cat:'Lymphoma', type:'IPD', group:'order', ref:P(161), cycleInfo:'Cycle 1–8', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'คำแนะนำ rituximab', unit:'fixed', instruct:RTX_ADVICE, days:'ทุกครั้งที่ให้ยา' },
    { name:'Infusion reaction', unit:'fixed', instruct:RTX_REACTION, days:'ทุกครั้งที่ให้ยา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:'Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ', days:'ตลอดการรักษา' },
    TENOFOVIR(),
    { name:'Premedication ก่อนให้ rituximab 30 นาที', unit:'fixed', instruct:'☐ Dexamethasone injection 10 mg IV ☐ Chlorpheniramine injection 10 mg IV ☐ Paracetamol tab (500 mg) 1 tab oral ☐ Benadryl (25 mg) 2 cap oral', days:'ทุกครั้งที่ให้ยา', note:'เลือกตามช่อง ☐ ที่กา' },
    { name:'☐ Rituximab (375 mg/m2)', dose:375, unit:'mg/m2', vehicle:RTX_VEHICLE, route:RTX_ROUTE, days:'ทุก cycle', note:'เลือก 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง' },
    { name:'☐ Rituximab (500 mg/m2)', dose:500, unit:'mg/m2', vehicle:RTX_VEHICLE, route:RTX_ROUTE, days:'ทุก cycle', note:'เลือก 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง' },
    { name:'Record vital signs', unit:'fixed', instruct:'q 15 min × 2 then q 30 min × 2 then q 1 hr until completion of infusion', days:'ทุกครั้งที่ให้ยา' },
  ]},

  // ───────── p.162 VR-CAP ─────────
  { name:'VR-CAP regimen', abbr:'VR-CAP', cat:'Lymphoma', type:'IPD', group:'order', ref:P(162), cycleInfo:'21 วัน (Cycle 1–6 (7) (8))', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool conc. for parasite for 3 days; ☐ HBs Ag, Anti HBc Ab; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF ☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'Transfusion / sepsis', unit:'fixed', instruct:TX_STD, days:'ตลอดการรักษา' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:NURSE, days:'ตลอดการรักษา' },
    { name:'Infusion reaction', unit:'fixed', instruct:RTX_REACTION, days:'D1' },
    { name:'คำแนะนำ rituximab', unit:'fixed', instruct:RTX_ADVICE, days:'D1' },
    ...SUPPORT3(),
    TENOFOVIR(),
    { name:'Premedication ก่อนให้ rituximab 30 min', unit:'fixed', instruct:RTX_PREMED, days:'D1', note:'เลือกตามช่อง ☐ ที่กา' },
    { name:'☐ Rituximab (375 mg/m2)', dose:375, unit:'mg/m2', vehicle:RTX_VEHICLE, route:RTX_ROUTE, days:'D1', note:'เลือก 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง (ในแบบฟอร์มไม่พิมพ์วันกำกับ)' },
    { name:'☐ Rituximab (500 mg/m2)', dose:500, unit:'mg/m2', vehicle:RTX_VEHICLE, route:RTX_ROUTE, days:'D1', note:'เลือก 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง (ในแบบฟอร์มไม่พิมพ์วันกำกับ)' },
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 min', days:'D1' },
    { name:'Dexamethasone', unit:'fixed', instruct:'10 mg IV ก่อนให้ยาเคมีบำบัด 30 min', days:'D1' },
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'SC', days:'D1, D4, D8, D11', detail:'ยี่ห้อ (……)', note:'TB >3.1: 0.7 mg/m2 ใน cycle 1 และพิจารณาปรับขนาดยาเป็น 0.5–1 mg/m2 ใน cycle ถัดไป' },
    { name:'Doxorubicin', dose:50, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1', detail:'ระวัง leak', note:'อายุ >70 ปี: 75%; ' + FN_DOXO },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1', note:'อายุ >70 ปี: 75%; ' + FN_CYC },
    { name:'Prednisolone (5 mg)', unit:'fixed', instruct:'5 tabs PO tid pc and hs (#100 tabs)', days:'D1–D5', note:'อายุ >70 ปี: 50%' },
    FILGRASTIM(),
    { name:'Record vital signs', unit:'fixed', instruct:RTX_VS, days:'D1' },
  ]},
]
