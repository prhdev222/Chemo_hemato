// Lymphoma (part 1: Hodgkin, B/T-cell NHL, Burkitt CODOX-M, CLL FC/FCM) — order forms transcribed from Siriraj Chemotherapy Protocol 2025, pp. 111–136
const P = (n) => `Siriraj order 2025 p.${n}`

// ---- dose-adjustment footnotes printed at the bottom of the pages (shared wording) ----
const DOXO_NOTE  = 'CrCl <10 mL/min: 75%; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา'
const CYCLO_NOTE = 'CrCl <10 mL/min: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา'
const VCR_NOTE   = 'ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา'
const VBL_NOTE   = 'ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา'
const ETOP_NOTE  = 'CrCl 15–50 mL/min: 75%; CrCl <15 mL/min: งดใช้ยา; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3 mg/dL หรือ AST >180 U/L: งดใช้ยา'
const DTIC_NOTE  = 'CrCl 30–60 mL/min: 75%; CrCl 10–30 mL/min: 50%; CrCl <10 mL/min: งดยา; ไม่มีคำแนะนำเรื่องปรับขนาดยาในโรคตับ'
const BENDA_NOTE = 'CrCl <40 mL/min: งดยา; TB 1.8–3.6 mg/dL และ AST 100–400 U/L: งดยา; TB >3.6 mg/dL: งดยา'
const BV18_NOTE  = 'CrCl <30 mL/min: งดยา; Child-Pugh A: 1.2 mg/kg; BW >100 kg คิดน้ำหนัก 100 kg; Child-Pugh B, C: งดยา'
const BV12_NOTE  = 'CrCl <30 mL/min: งดยา; Child-Pugh A: 0.9 mg/kg; BW >100 kg คิดน้ำหนัก 100 kg; Child-Pugh B, C: งดยา'
const NIVO_NOTE  = 'ไม่ต้องปรับขนาดยาในโรคไต; TB >1.5 mg/dL หรือ AST >60 U/L: ยังไม่มีข้อมูลเรื่องปรับขนาดยาในโรคตับระดับปานกลางหรือรุนแรง'
const CIS_NOTE   = 'CrCl 46–60 mL/min: 50%; CrCl 31–45 mL/min: 25%; CrCl ≤30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ'
const ARAC_NOTE  = 'CrCl 40–60 mL/min: 1,000 mg/m2/day; CrCl <40 mL/min: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ'
const FLU_NOTE   = 'CrCl 30–70 mL/min: 50%; CrCl <30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ'
const MITO_NOTE  = 'ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL: 50%; TB >3 mg/dL: 25%'

// ---- rows that are printed identically on many forms ----
const DOMP = { name:'Domperidone (10 mg)', unit:'fixed', instruct:'1 tab oral tid ac', days:'ตลอดการรักษา' }
const OMEP = { name:'Omeprazole (20 mg)', unit:'fixed', instruct:'1 cap oral OD ac', days:'ตลอดการรักษา' }
const SENO = { name:'Senokot', unit:'fixed', instruct:'2 tabs oral hs prn for constipation', days:'ตลอดการรักษา' }
const ACV  = { name:'Acyclovir (400 mg)', unit:'fixed', instruct:'1 tab oral bid pc', days:'ตลอดการรักษา' }
const CTX  = { name:'Co-trimoxazole SS (80/400)', unit:'fixed', instruct:'2 tabs oral OD วันจันทร์, พุธ, ศุกร์', days:'ตลอดการรักษา' }
const FILG = { name:'Filgrastim', unit:'fixed', instruct:'(……®) ☐ 300 mcg ☐ 480 mcg SC OD', days:'เริ่มวันที่……ถึง……' }
const DEXOPH = { name:'Dex-oph eye drop', unit:'fixed', instruct:'2 drops หยอดตา 2 ข้าง q 8 hr', days:'D2 ถึง D4' }
const MANNITOL24 = { name:'20% Mannitol', unit:'fixed', instruct:'คู่กับ 20% Mannitol 100 mL in D5W 1,000 mL IV drip in 24 hr', days:'D1' }

const TXN = { name:'Transfusion / sepsis', unit:'fixed', instruct:'ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3)', days:'ตลอดการรักษา' }
const TXN_IRR = { name:'Transfusion / sepsis', unit:'fixed', instruct:'ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3)', days:'ตลอดการรักษา' }

const NURSE = { name:'คำสั่งพยาบาล', unit:'fixed', instruct:'Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล', days:'ตลอดการรักษา' }
const NURSE_IRR = { name:'คำสั่งพยาบาล', unit:'fixed', instruct:'Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล', days:'ตลอดการรักษา' }
// Hodgkin forms add fertility / smoking-cessation counselling
const NURSE_HL_IRR = { name:'คำสั่งพยาบาล', unit:'fixed', instruct:'Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง การวางแผนมีบุตรในอนาคต การหยุดสูบบุหรี่ และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล', days:'ตลอดการรักษา' }
const NURSE_HL = { name:'คำสั่งพยาบาล', unit:'fixed', instruct:'Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง การวางแผนมีบุตรในอนาคต การหยุดสูบบุหรี่ และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล', days:'ตลอดการรักษา' }

const BV_VS = { name:'Record vital signs (Brentuximab vedotin)', unit:'fixed', instruct:'หลังให้ยา Brentuximab vedotin ให้ Record vital signs q 15 min × 2 then q 30 min until completion of infusion of brentuximab vedotin', days:'วันที่ให้ Brentuximab vedotin' }
const INF_REACTION = { name:'Infusion reaction', unit:'fixed', instruct:'ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณา ให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา', days:'วันที่ให้ยา' }

const OND_PRE = (days) => ({ name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days })
const OND_PRN = (days) => ({ name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม.', days })
const DEXA_PRE = (days) => ({ name:'Dexamethasone', unit:'fixed', instruct:'10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days })
const PARA_PRE = (days) => ({ name:'Paracetamol (500 mg)', unit:'fixed', instruct:'1 tab oral ก่อนให้ยาเคมีบำบัด 30 นาที', days })
const PRED5_D1_5 = { name:'Prednisolone (5 mg)', unit:'fixed', instruct:'5 tabs PO tid pc and hs #100 tabs', days:'D1 ถึง D5' }
const CBC_FU = { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:'D5, D8, D11, D14, D17, D20' }

const REGIMENS = [
  // ---------------- p.111 ABVD ----------------
  { name:'ABVD regimen', abbr:'ABVD', cat:'Hodgkin', type:'IPD', group:'order', ref:P(111), cycleInfo:'28 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, ESR, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF ☐ ส่งปรึกษาอายุรแพทย์โรคปอด เพื่อประเมิน PFTs รวมทั้ง DLCO', days:'D1' },
    CBC_FU,
    TXN_IRR,
    NURSE_HL_IRR,
    DOMP, OMEP, SENO,
    { name:'Ondansetron injection', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1 และ D15' },
    { name:'Dexamethasone injection', unit:'fixed', instruct:'10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1 และ D15' },
    PARA_PRE('D1 และ D15'),
    { name:'Vinblastine', dose:6, unit:'mg/m2', maxDose:10, vehicle:'NSS 20 mL', route:'IV push', days:'D1 และ D15', detail:'max 10 mg; ระวัง leak', note:VBL_NOTE },
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1 และ D15', detail:'ระวัง leak', note:DOXO_NOTE },
    { name:'Bleomycin', dose:10, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1 และ D15', note:'CrCl 40–50 mL/min: 70%; CrCl 30–40 mL/min: 60%; CrCl 20–30 mL/min: 55%; CrCl 10–20 mL/min: 45%; CrCl 5–10 mL/min: 40%; ไม่ต้องปรับขนาดยาในโรคตับ' },
    { name:'Dacarbazine', dose:375, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV drip in 3 hr', days:'D1 และ D15', note:DTIC_NOTE },
    FILG,
  ]},

  // ---------------- p.112 B-B (Brentuximab vedotin + Bendamustine) ----------------
  { name:'B-B regimen (Brentuximab vedotin + Bendamustine)', abbr:'B-B', cat:'Hodgkin', type:'IPD', group:'order', ref:P(112), cycleInfo:'21 วัน', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, ESR, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    TXN_IRR,
    NURSE_IRR,
    BV_VS,
    INF_REACTION,
    DOMP, OMEP, SENO,
    OND_PRE('D1 และ D2'),
    DEXA_PRE('D1 และ D2'),
    { name:'Brentuximab vedotin', dose:1.8, unit:'mg/kg', maxDose:180, vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1', detail:'max 180 mg; Cycle 1–16', note:BV18_NOTE },
    { name:'Bendamustine', dose:90, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV drip in 2 hr', days:'D1 และ D2', detail:'Cycle 1–6', note:BENDA_NOTE },
    FILG,
  ]},

  // ---------------- p.113 BEGEV ----------------
  { name:'BEGEV regimen', abbr:'BEGEV', cat:'Hodgkin', type:'IPD', group:'order', ref:P(113), cycleInfo:'21 วัน (Cycle 1–4)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    TXN_IRR,
    NURSE_IRR,
    DOMP, OMEP, SENO,
    OND_PRN('D1 ถึง D3'),
    { name:'Vinorelbine', dose:20, unit:'mg/m2/day', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1', note:'ไม่ต้องปรับขนาดยาในโรคไตและโรคตับ' },
    { name:'Gemcitabine', dose:800, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 30 min', days:'D1 และ D4', note:'ไม่มีคำแนะนำการปรับขนาดยาในโรคไต; AST เพิ่มขึ้น: ไม่ต้องปรับขนาดยา; TB เพิ่มขึ้น: 80%' },
    { name:'Bendamustine', dose:90, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV drip in 2 hr', days:'D2 และ D3', note:BENDA_NOTE },
    { name:'Prednisolone (5 mg)', unit:'fixed', instruct:'5 tabs po tid pc and hs #100 tabs', days:'D1 ถึง D4' },
    FILG,
  ]},

  // ---------------- p.114 BR (Bendamustine + Rituximab) ----------------
  { name:'BR regimen (Bendamustine + Rituximab)', abbr:'BR', cat:'Lymphoma', type:'IPD', group:'order', ref:P(114), cycleInfo:'28 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    TXN_IRR,
    NURSE_IRR,
    { name:'Record vital signs (Rituximab)', unit:'fixed', instruct:'Record vital signs q 15 min × 2 then q 30 min × 2 then q 1 hr until completion of infusion', days:'วันที่ให้ Rituximab' },
    INF_REACTION,
    { name:'คำแนะนำ Rituximab rate', unit:'fixed', instruct:'การให้ยา rituximab ครั้งแรก: ชั่วโมงที่ 1 เริ่มให้ยาในขนาด 50 mg/hr, ชั่วโมงถัดไป เพิ่มขนาดยาได้ 100 mg/hr; การให้ยา rituximab ครั้งต่อไป: ชั่วโมงที่ 1 เริ่มให้ยาในปริมาณ 20% จากนั้นให้ยาที่เหลือ 80% ภายใน 1.5 hr', days:'วันที่ให้ Rituximab' },
    DOMP, OMEP, SENO,
    { name:'☐ Tenofovir alafenamide (25 mg)', unit:'fixed', instruct:'1 tab po OD pc กรณี AntiHBc+', days:'ตลอดการรักษา' },
    { name:'Premedication ก่อนให้ rituximab 30 min', unit:'fixed', instruct:'☐ Dexamethasone 10 mg IV ☐ Chlorpheniramine 10 mg IV ☐ Paracetamol (500 mg) 1 tab oral ☐ Benadryl (25 mg) 2 cap oral', days:'ทุก 28 วัน (Cycle 1–6)' },
    { name:'☐ Rituximab (375 mg/m2)', dose:375, unit:'mg/m2', vehicle:'NSS ☐ 250 mL ☐ 500 mL', route:'IV infusion: ชั่วโมงที่ 1 rate …… ml/hr, ชั่วโมงที่ 2 rate …… ml/hr, ชั่วโมงต่อไป rate …… ml/hr', days:'ทุก 28 วัน (Cycle 1–6)', note:'เลือกขนาด 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง' },
    { name:'☐ Rituximab (500 mg/m2)', dose:500, unit:'mg/m2', vehicle:'NSS ☐ 250 mL ☐ 500 mL', route:'IV infusion: ชั่วโมงที่ 1 rate …… ml/hr, ชั่วโมงที่ 2 rate …… ml/hr, ชั่วโมงต่อไป rate …… ml/hr', days:'ทุก 28 วัน (Cycle 1–6)', note:'เลือกขนาด 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง' },
    OND_PRE('D1, D2'),
    DEXA_PRE('D1, D2'),
    { name:'Bendamustine', dose:90, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV drip in 2 hr', days:'D1, D2', detail:'ทุก 28 วัน Cycle 1–6', note:BENDA_NOTE + '; หมายเหตุ กรณีใช้ single agent bendamustine: 100 mg/m2 D1,2 for newly diagnosed CLL; 120 mg/m2 D1,2 for relapsed/refractory indolent lymphoma' },
    FILG,
  ]},

  // ---------------- p.115 BrECADD ----------------
  { name:'BrECADD regimen', abbr:'BrECADD', cat:'Hodgkin', type:'IPD', group:'order', ref:P(115), cycleInfo:'21 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D0/D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D0 = …… D1 = ……; CBC, ESR, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    CBC_FU,
    TXN_IRR,
    NURSE_HL_IRR,
    INF_REACTION,
    DOMP, OMEP, SENO,
    { name:'Ondansetron injection', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1 ถึง D3' },
    { name:'Brentuximab vedotin', dose:1.8, unit:'mg/kg', maxDose:180, vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D0', detail:'max 180 mg', note:BV18_NOTE },
    { name:'Doxorubicin', dose:40, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1', detail:'ระวัง leak', note:DOXO_NOTE },
    { name:'Cyclophosphamide', dose:1250, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1', note:CYCLO_NOTE },
    { name:'Etoposide', dose:150, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV drip in 2 hr', days:'D1 ถึง D3', note:ETOP_NOTE },
    { name:'Dacarbazine', dose:250, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV drip in 3 hr', days:'D2 ถึง D3', note:DTIC_NOTE },
    { name:'Dexamethasone (4 mg)', dose:40, unit:'mg/m2', route:'Sig. ……', days:'D1 ถึง D4', detail:'พิมพ์ไว้เป็น 40 mg/m2 (ตรวจสอบกับ protocol: BrECADD ใช้ dexamethasone 40 mg/day)' },
    FILG,
    BV_VS,
  ]},

  // ---------------- p.116 Brentuximab vedotin monotherapy ----------------
  { name:'Brentuximab vedotin monotherapy', abbr:'BV mono', cat:'Hodgkin', type:'IPD', group:'order', ref:P(116), cycleInfo:'21 วัน (Cycle 1–16)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, ESR, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads; ☐ anti-HIV, HBsAg, anti-HBc, anti-HCV', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    TXN_IRR,
    NURSE_IRR,
    INF_REACTION,
    DOMP, OMEP, SENO,
    OND_PRE('D1'),
    DEXA_PRE('D1'),
    { name:'Brentuximab vedotin', dose:1.8, unit:'mg/kg', maxDose:180, vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1', detail:'max 180 mg', note:BV18_NOTE },
    FILG,
    BV_VS,
  ]},

  // ---------------- p.117 BV-AVD ----------------
  { name:'BV-AVD regimen', abbr:'BV-AVD', cat:'Hodgkin', type:'IPD', group:'order', ref:P(117), cycleInfo:'28 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, ESR, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    CBC_FU,
    TXN_IRR,
    NURSE_HL_IRR,
    INF_REACTION,
    DOMP, OMEP, SENO,
    { name:'Ondansetron injection', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1 และ D15' },
    { name:'Dexamethasone injection', unit:'fixed', instruct:'10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1 และ D15' },
    PARA_PRE('D1 และ D15'),
    { name:'Vinblastine', dose:6, unit:'mg/m2', maxDose:10, vehicle:'NSS 20 mL', route:'IV push', days:'D1 และ D15', detail:'max 10 mg; ระวัง leak', note:VBL_NOTE },
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1 และ D15', detail:'ระวัง leak', note:DOXO_NOTE },
    { name:'Dacarbazine', dose:375, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV drip in 3 hr', days:'D1 และ D15', note:DTIC_NOTE },
    { name:'Brentuximab vedotin', dose:1.2, unit:'mg/kg', maxDose:120, vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D1 และ D15', detail:'max 120 mg; ให้หลังจากให้ยาเคมีตัวอื่นครบ 1 ชั่วโมง', note:BV12_NOTE },
    FILG,
    BV_VS,
  ]},

  // ---------------- p.118 BV-CHP ----------------
  { name:'BV-CHP regimen', abbr:'BV-CHP', cat:'Lymphoma', type:'IPD', group:'order', ref:P(118), cycleInfo:'21 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    TXN,
    NURSE,
    INF_REACTION,
    DOMP, OMEP, SENO,
    OND_PRE('D1'),
    DEXA_PRE('D1'),
    { name:'Doxorubicin', dose:50, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1', detail:'ระวัง leak', note:DOXO_NOTE },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1', note:CYCLO_NOTE },
    PRED5_D1_5,
    { name:'Brentuximab vedotin', dose:1.8, unit:'mg/kg', maxDose:180, vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1', detail:'max 180 mg; ให้หลังจากให้ยาเคมีตัวอื่นครบ 1 ชั่วโมง', note:BV18_NOTE },
    FILG,
    BV_VS,
  ]},

  // ---------------- p.119 BV-N (Brentuximab vedotin + Nivolumab) ----------------
  { name:'BV-N regimen (Brentuximab vedotin + Nivolumab)', abbr:'BV-N', cat:'Hodgkin', type:'IPD', group:'order', ref:P(119), cycleInfo:'21 วัน (Cycle 1–8)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, ESR, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    TXN_IRR,
    NURSE_IRR,
    INF_REACTION,
    DOMP, OMEP, SENO,
    { name:'Ondansetron injection', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1' },
    { name:'Dexamethasone injection', unit:'fixed', instruct:'10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1' },
    PARA_PRE('D1'),
    { name:'Brentuximab vedotin', dose:1.8, unit:'mg/kg', maxDose:180, vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D1', detail:'max 180 mg', note:BV18_NOTE },
    { name:'Nivolumab', dose:3, unit:'mg/kg', vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D1', detail:'(100 mg/10 ml; 40 mg/4 ml)', note:NIVO_NOTE },
    FILG,
    BV_VS,
  ]},

  // ---------------- p.120 BV-N-AD ----------------
  { name:'BV-N-AD regimen', abbr:'BV-N-AD', cat:'Hodgkin', type:'IPD', group:'order', ref:P(120), cycleInfo:'28 วัน (Cycle 1–4)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, ESR, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    CBC_FU,
    TXN_IRR,
    NURSE_HL_IRR,
    INF_REACTION,
    DOMP, OMEP, SENO,
    { name:'Ondansetron injection', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1 และ D15' },
    { name:'Dexamethasone injection', unit:'fixed', instruct:'10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1 และ D15' },
    PARA_PRE('D1 และ D15'),
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1 และ D15', detail:'ระวัง leak', note:DOXO_NOTE },
    { name:'Dacarbazine', dose:375, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV drip in 3 hr', days:'D1 และ D15', note:DTIC_NOTE },
    { name:'Brentuximab vedotin', dose:1.2, unit:'mg/kg', maxDose:120, vehicle:'NSS 100 mL', route:'IV in 30 min', days:'D1 และ D15', detail:'max 120 mg; ให้หลังจากให้ยา doxorubicin และ dacarbazine', note:BV12_NOTE },
    { name:'Nivolumab (100 mg/10 ml; 40 mg/4 ml)', unit:'fixed', instruct:'240 mg in NSS 100 mL IV in 1 hr (ให้หลังจากให้ยา Brentuximab vedotin หมดอย่างน้อย 30 นาที)', days:'D1 และ D15', note:NIVO_NOTE },
    FILG,
    BV_VS,
  ]},

  // ---------------- p.121 CDOP ----------------
  { name:'CDOP regimen (Cyclophosphamide, liposomal Doxorubicin, Vincristine, Prednisolone)', abbr:'CDOP', cat:'Lymphoma', type:'IPD', group:'order', ref:P(121), cycleInfo:'21 วัน (Cycle 1–8)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    TXN,
    NURSE,
    DOMP, OMEP, SENO,
    OND_PRE('D1'),
    DEXA_PRE('D1'),
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, vehicle:'NSS 20 mL', route:'IV push', days:'D1', detail:'max 2 mg; ระวัง leak', note:VCR_NOTE },
    { name:'Liposomal doxorubicin', dose:30, unit:'mg/m2', vehicle:'D5W 250 mL', route:'IV drip in 2 hr', days:'D1', note:'ไม่ต้องปรับขนาดยาในโรคไต; TB 1.2–3 mg/dL หรือ AST 60–180 U/L: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา' },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1', note:CYCLO_NOTE },
    { name:'Prednisolone (5 mg)', dose:60, unit:'mg/m2', route:'Sig. ……', days:'D1 ถึง D5' },
    FILG,
  ]},

  // ---------------- p.122 CEOP ----------------
  { name:'CEOP regimen (Cyclophosphamide, Etoposide, Vincristine, Prednisolone)', abbr:'CEOP', cat:'Lymphoma', type:'IPD', group:'order', ref:P(122), cycleInfo:'21 วัน (Cycle 1–8)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    TXN,
    NURSE,
    DOMP, OMEP, SENO,
    OND_PRE('D1 ถึง D3'),
    DEXA_PRE('D1'),
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, vehicle:'NSS 20 mL', route:'IV push', days:'D1', detail:'max 2 mg; ระวัง leak', note:VCR_NOTE },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1', note:CYCLO_NOTE },
    { name:'Etoposide (IV)', dose:50, unit:'mg/m2/day', vehicle:'NSS 500 mL', route:'IV drip in 2 hr', days:'D1', note:ETOP_NOTE },
    { name:'Etoposide (50 mg/cap)', dose:100, unit:'mg/m2/day', route:'PO; Sig. ……', days:'D2 ถึง D3', note:ETOP_NOTE },
    PRED5_D1_5,
    FILG,
  ]},

  // ---------------- p.123 CHOEP ----------------
  { name:'CHOEP regimen', abbr:'CHOEP', cat:'Lymphoma', type:'IPD', group:'order', ref:P(123), cycleInfo:'21 วัน (Cycle 1–8)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    TXN,
    NURSE,
    DOMP, OMEP, SENO,
    OND_PRE('D1 ถึง D3'),
    DEXA_PRE('D1'),
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, vehicle:'NSS 20 mL', route:'IV push', days:'D1', detail:'max 2 mg; ระวัง leak', note:VCR_NOTE },
    { name:'Doxorubicin', dose:50, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1', detail:'ระวัง leak', note:DOXO_NOTE },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1', note:CYCLO_NOTE },
    { name:'Etoposide', dose:100, unit:'mg/m2/day', vehicle:'NSS 500 mL', route:'IV drip in 2 hr', days:'D1 ถึง D3', note:ETOP_NOTE },
    PRED5_D1_5,
    FILG,
  ]},

  // ---------------- p.124 CHOP ----------------
  { name:'CHOP regimen', abbr:'CHOP', cat:'Lymphoma', type:'IPD', group:'order', ref:P(124), cycleInfo:'21 วัน (Cycle 1–8)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    TXN,
    NURSE,
    DOMP, OMEP, SENO,
    OND_PRE('D1'),
    DEXA_PRE('D1'),
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, vehicle:'NSS 20 mL', route:'IV push', days:'D1', detail:'max 2 mg; ระวัง leak', note:VCR_NOTE },
    { name:'Doxorubicin', dose:50, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1', detail:'ระวัง leak', note:DOXO_NOTE },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1', note:CYCLO_NOTE },
    PRED5_D1_5,
    FILG,
  ]},

  // ---------------- p.125 CNOP ----------------
  { name:'CNOP regimen (Cyclophosphamide, Mitoxantrone, Vincristine, Prednisolone)', abbr:'CNOP', cat:'Lymphoma', type:'IPD', group:'order', ref:P(125), cycleInfo:'21 วัน (Cycle 1–8)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    TXN,
    NURSE,
    DOMP, OMEP, SENO,
    OND_PRE('D1'),
    DEXA_PRE('D1'),
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, vehicle:'NSS 20 mL', route:'IV push', days:'D1', detail:'max 2 mg; ระวัง leak', note:VCR_NOTE },
    { name:'Mitoxantrone', dose:10, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1', detail:'ระวัง leak', note:MITO_NOTE },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hrs', days:'D1', note:CYCLO_NOTE },
    PRED5_D1_5,
    FILG,
  ]},

  // ---------------- p.126 CODOX-M ----------------
  { name:'CODOX-M regimen', abbr:'CODOX-M', cat:'Burkitt', type:'IPD', group:'order', ref:P(126), cycleInfo:'Cycle 1 (2) 3 (สลับกับ IVAC)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF ☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    CBC_FU,
    TXN,
    NURSE,
    { name:'Cytarabine IT', unit:'fixed', instruct:'(เบิก 100 mg/vial จำนวน 2 ขวด) 70 mg IT วันที่…… และ ……', days:'D1 และ D3' },
    { name:'CSF', unit:'fixed', instruct:'CSF for cell count, differential, protein, sugar, cytology, flow cytometry for NHL; Capillary blood glucose (POCT) หลัง lumbar puncture', days:'D1' },
    { name:'Methotrexate IT', unit:'fixed', instruct:'12 mg IT วันที่……', days:'D15' },
    { name:'Leucovorin (15 mg)', unit:'fixed', instruct:'1 tab oral 24 hr หลังให้ MTX IT', days:'D16' },
    { name:'MTX level', unit:'fixed', instruct:'MTX level OD จนกว่า <0.05 µmol/L เริ่ม D12 (48 hr หลังจากเริ่มยา)', days:'เริ่ม D12' },
    DOMP, OMEP, SENO,
    OND_PRN('D1 – D5, D8, D10'),
    { name:'Cyclophosphamide', dose:800, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1', note:CYCLO_NOTE },
    { name:'Cyclophosphamide', dose:200, unit:'mg/m2/day', vehicle:'NSS 100 mL', route:'IV in 1 hr', days:'D2 ถึง D5', note:CYCLO_NOTE },
    { name:'Doxorubicin', dose:40, unit:'mg/m2/day', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1', detail:'ระวัง leak', note:DOXO_NOTE },
    { name:'Vincristine', dose:1.4, unit:'mg/m2/day', maxDose:2, vehicle:'NSS 20 mL', route:'IV push', days:'D1 และ D8', detail:'max 2 mg; ระวัง leak', note:VCR_NOTE },
    { name:'Methotrexate (loading)', dose:1200, unit:'mg/m2', vehicle:'D5W 250 mL', route:'IV in 1 hr', days:'D10', note:'CrCl 30–60 mL/min: 50%; CrCl <30 mL/min: งดยา; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา' },
    { name:'Methotrexate (infusion)', dose:2760, unit:'mg/m2', vehicle:'D5W 1,000 mL + 7.5% NaHCO3 100 mL', route:'IV in 10 hr × 2 ชุด', days:'D10', detail:'2,760 mg/m2/10 hr; then หลัง loading dose', note:'CrCl 30–60 mL/min: 50%; CrCl <30 mL/min: งดยา; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา' },
    { name:'Leucovorin (first dose)', dose:192, unit:'mg/m2', vehicle:'D5W 50 mL', route:'IV in 10 min', days:'เริ่ม D11', detail:'เริ่มให้ 12 hr หลัง MTX หมด', note:'Leucovorin 50 mg IV q 6 hours if MTX >20 µmol/L at 0 hours, or >1.0 µmol/L at 24 hours, or >0.1 µmol/L at 48 hours after the end of MTX infusion' },
    { name:'Leucovorin (q 6 hr)', dose:15, unit:'mg/m2', vehicle:'D5W 20 mL', route:'IV push q 6 hr', days:'เริ่ม D11', detail:'หยุดให้ เมื่อ MTX level <0.05 µmol/L', note:'Leucovorin 50 mg IV q 6 hours if MTX >20 µmol/L at 0 hours, or >1.0 µmol/L at 24 hours, or >0.1 µmol/L at 48 hours after the end of MTX infusion' },
    { name:'Filgrastim', unit:'fixed', instruct:'(……®) ☐ 300 mcg ☐ 480 mcg SC OD', days:'เริ่ม D6 (เว้น D8, D10, D15)' },
  ]},

  // ---------------- p.127 COP/ABV ----------------
  { name:'COP/ABV regimen', abbr:'COP/ABV', cat:'Hodgkin', type:'IPD', group:'order', ref:P(127), cycleInfo:'28 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, ESR, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    CBC_FU,
    TXN,
    NURSE_HL,
    DOMP, OMEP, SENO,
    OND_PRE('D1'),
    DEXA_PRE('D1'),
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, vehicle:'NSS 20 mL', route:'IV push', days:'D1', detail:'max 2 mg; ระวัง leak' },
    { name:'Cyclophosphamide', dose:600, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1' },
    { name:'Prednisolone (5 mg)', dose:60, unit:'mg/m2', route:'Sig. ……', days:'D1 ถึง D7' },
    { name:'Vinblastine', dose:6, unit:'mg/m2', maxDose:10, vehicle:'NSS 20 mL', route:'IV push', days:'D15', detail:'max 10 mg; ระวัง leak' },
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D15', detail:'ระวัง leak' },
    { name:'Bleomycin', dose:10, unit:'IU/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D15' },
    FILG,
  ]},

  // ---------------- p.128 CVP ----------------
  { name:'CVP regimen', abbr:'CVP', cat:'Lymphoma', type:'IPD', group:'order', ref:P(128), cycleInfo:'21 วัน (Cycle 1–8)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    TXN,
    NURSE,
    DOMP, OMEP, SENO,
    { name:'Ondansetron injection', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1' },
    { name:'Dexamethasone injection', unit:'fixed', instruct:'10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, vehicle:'NSS 20 mL', route:'IV push', days:'D1', detail:'max 2 mg; ระวัง leak', note:VCR_NOTE },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1', note:CYCLO_NOTE },
    PRED5_D1_5,
    FILG,
  ]},

  // ---------------- p.129 DA-EPOCH ----------------
  { name:'DA-EPOCH regimen', abbr:'DA-EPOCH', cat:'Lymphoma', type:'IPD', group:'order', ref:P(129), cycleInfo:'21 วัน (Cycle 1–8)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    CBC_FU,
    TXN,
    NURSE,
    { name:'คำแนะนำ dose adjustment', unit:'fixed', instruct:'ตรวจ CBC สัปดาห์ละ 2 ครั้ง; ถ้า nadir ANC ไม่ต่ำกว่า 500/mm3 เพิ่มขนาดของ etoposide, doxorubicin, และ cyclophosphamide 20% จากขนาดรอบที่แล้ว; ถ้า nadir ANC ต่ำกว่า 500/mm3 1–2 ครั้ง ใช้ขนาดเท่ากับรอบที่แล้ว; ถ้า nadir ANC ต่ำกว่า 500/mm3 3 ครั้งหรือ nadir platelet count ต่ำกว่า 25,000/mm3 1 ครั้ง ลดขนาดของ etoposide, doxorubicin, และ cyclophosphamide 20% จากขนาดที่ใช้ในรอบที่แล้ว', days:'ทุก cycle' },
    DOMP, OMEP, SENO, CTX,
    OND_PRN('D1 ถึง D5'),
    { name:'Etoposide', dose:50, unit:'mg/m2/day', vehicle:'NSS 500 mL (ผสมรวมกับ doxorubicin และ vincristine)', route:'IV drip in 24 hr via central line', days:'D1 ถึง D4', note:ETOP_NOTE },
    { name:'Doxorubicin', dose:10, unit:'mg/m2/day', vehicle:'NSS 500 mL (ผสมรวมกับ etoposide และ vincristine)', route:'IV drip in 24 hr via central line', days:'D1 ถึง D4', note:DOXO_NOTE },
    { name:'Vincristine', dose:0.4, unit:'mg/m2/day', vehicle:'NSS 500 mL (ผสมรวมกับ etoposide และ doxorubicin)', route:'IV drip in 24 hr via central line', days:'D1 ถึง D4', note:VCR_NOTE },
    { name:'NSS 500 mL', unit:'fixed', instruct:'IV drip in 24 hr via central line', days:'D1 ถึง D4' },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D5', note:CYCLO_NOTE },
    { name:'Prednisolone (5 mg)', dose:120, unit:'mg/m2', route:'PO bid pc; Sig. …… tab #……tab', days:'D1 ถึง D5' },
    FILG,
  ]},

  // ---------------- p.130 DHAP ----------------
  { name:'DHAP regimen', abbr:'DHAP', cat:'Lymphoma', type:'IPD', group:'order', ref:P(130), cycleInfo:'21 วัน (Cycle 1–4)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    TXN,
    NURSE,
    DOMP, OMEP, SENO,
    OND_PRN('D1 ถึง D2'),
    { name:'Dexamethasone 40 mg/day', unit:'fixed', instruct:'☐ Dexamethasone (4 mg) 5 tabs oral bid pc ☐ Dexamethasone 10 mg IV q 6 hr', days:'D1 ถึง D4', note:'เลือก oral หรือ IV อย่างใดอย่างหนึ่ง' },
    { name:'Cisplatin', dose:100, unit:'mg/m2', vehicle:'NSS 1,000 mL', route:'IV in 24 hr', days:'D1', detail:'คู่กับ 20% Mannitol 100 mL in D5W 1,000 mL IV drip in 24 hr', note:CIS_NOTE },
    MANNITOL24,
    { name:'Cytarabine', dose:2000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 3 hr q 12 hr', days:'D2', detail:'(……®) รวม 2 doses', note:ARAC_NOTE },
    DEXOPH,
    FILG,
  ]},

  // ---------------- p.131 DHAX ----------------
  { name:'DHAX regimen', abbr:'DHAX', cat:'Lymphoma', type:'IPD', group:'order', ref:P(131), cycleInfo:'21 วัน (Cycle 1–4)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    TXN,
    NURSE,
    DOMP, OMEP, SENO,
    OND_PRN('D1 ถึง D2'),
    { name:'Dexamethasone (4 mg)', unit:'fixed', instruct:'5 tabs oral bid pc', days:'D1 ถึง D4' },
    { name:'Oxaliplatin', dose:130, unit:'mg/m2', vehicle:'D5W 250 mL', route:'IV in 2 hr', days:'D1', note:'CrCl ≤30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ' },
    { name:'Cytarabine', dose:2000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 3 hr q 12 hr', days:'D2', detail:'(……®) รวม 2 doses', note:ARAC_NOTE },
    DEXOPH,
    FILG,
  ]},

  // ---------------- p.132 ESHAP ----------------
  { name:'ESHAP regimen', abbr:'ESHAP', cat:'Lymphoma', type:'IPD', group:'order', ref:P(132), cycleInfo:'21 วัน (Cycle 1–8)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    TXN,
    NURSE,
    DOMP, OMEP, SENO,
    OND_PRN('D1 ถึง D5'),
    { name:'Methylprednisolone', unit:'fixed', instruct:'500 mg in NSS 100 mL IV drip in 15 min', days:'D1 ถึง D4' },
    { name:'Etoposide', dose:40, unit:'mg/m2/day', vehicle:'NSS 500 mL', route:'IV drip in 2 hr', days:'D1 ถึง D4', detail:'พิมพ์เป็นช่วง 40–60 mg/m2/day', note:ETOP_NOTE },
    { name:'Cisplatin', dose:25, unit:'mg/m2/day', vehicle:'NSS 1,000 mL', route:'IV drip in 20 hr', days:'D1 ถึง D4', detail:'คู่กับ 20% Mannitol 100 mL in D5W 1,000 mL IV drip in 20 hr', note:CIS_NOTE },
    { name:'20% Mannitol', unit:'fixed', instruct:'คู่กับ 20% Mannitol 100 mL in D5W 1,000 mL IV drip in 20 hr', days:'D1 ถึง D4' },
    { name:'Cytarabine', dose:2000, unit:'mg/m2/day', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D5', detail:'(……®)', note:ARAC_NOTE },
    FILG,
  ]},

  // ---------------- p.133 FC 3-day ----------------
  { name:'FC regimen 3-day protocol (Fludarabine + Cyclophosphamide)', abbr:'FC 3-day', cat:'CLL', type:'IPD', group:'order', ref:P(133), cycleInfo:'28 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Reticulocyte, direct Coombs\' test; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    CBC_FU,
    TXN_IRR,
    NURSE_IRR,
    DOMP, OMEP, SENO, ACV, CTX,
    OND_PRN('D1 ถึง D3'),
    { name:'Fludarabine', dose:25, unit:'mg/m2/day', vehicle:'NSS 100 mL', route:'IV drip in 30 min', days:'D1 ถึง D3', detail:'พิมพ์เป็นช่วง 25–30 mg/m2/day', note:FLU_NOTE },
    { name:'Cyclophosphamide', dose:250, unit:'mg/m2/day', vehicle:'NSS 100 mL', route:'IV drip in 30 min', days:'D1 ถึง D3', detail:'พิมพ์เป็นช่วง 250–300 mg/m2/day', note:CYCLO_NOTE },
    FILG,
  ]},

  // ---------------- p.134 FC 5-day ----------------
  { name:'FC regimen 5-day protocol (Fludarabine + Cyclophosphamide)', abbr:'FC 5-day', cat:'CLL', type:'IPD', group:'order', ref:P(134), cycleInfo:'28 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Reticulocyte, direct Coombs\' test; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    CBC_FU,
    TXN_IRR,
    NURSE_IRR,
    DOMP, OMEP, SENO, ACV, CTX,
    OND_PRN('D1 ถึง D5'),
    { name:'Fludarabine', dose:20, unit:'mg/m2/day', vehicle:'NSS 100 mL', route:'IV drip in 30 min', days:'D1 ถึง D5', note:FLU_NOTE },
    { name:'Cyclophosphamide', dose:600, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1', note:CYCLO_NOTE },
    FILG,
  ]},

  // ---------------- p.135 FCM ----------------
  { name:'FCM regimen (Fludarabine, Cyclophosphamide, Mitoxantrone)', abbr:'FCM', cat:'CLL', type:'IPD', group:'order', ref:P(135), cycleInfo:'28 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Reticulocyte, direct Coombs\' test; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    CBC_FU,
    TXN_IRR,
    NURSE_IRR,
    DOMP, OMEP, SENO, ACV, CTX,
    OND_PRN('D1 ถึง D3'),
    { name:'Mitoxantrone', dose:5, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV drip in 10 min', days:'D1', detail:'ระวัง leak', note:MITO_NOTE },
    { name:'Fludarabine', dose:25, unit:'mg/m2/day', vehicle:'NSS 100 mL', route:'IV drip in 30 min', days:'D1 ถึง D3', note:'CrCl 30–70 mL/min: 15 mg/m2/day; CrCl <30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ' },
    { name:'Cyclophosphamide', dose:200, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV drip in 2 hr', days:'D1 ถึง D3', detail:'พิมพ์เป็นช่วง 200–250 mg/m2', note:CYCLO_NOTE },
    FILG,
  ]},

  // ---------------- p.136 FLUDAP ----------------
  { name:'FLUDAP regimen (Fludarabine, Dexamethasone, Cisplatin, Cytarabine)', abbr:'FLUDAP', cat:'Lymphoma', type:'IPD', group:'order', ref:P(136), cycleInfo:'21 วัน (Cycle 1–6)', drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Reticulocyte, direct Coombs\' test; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    CBC_FU,
    TXN_IRR,
    NURSE_IRR,
    DOMP, OMEP, SENO, ACV, CTX,
    OND_PRN('D1 ถึง D3'),
    { name:'Dexamethasone', unit:'fixed', instruct:'100 mg in NSS 50 mL IV drip in 24 hr', days:'D1 ถึง D3' },
    { name:'Fludarabine', dose:30, unit:'mg/m2/day', maxDose:50, vehicle:'NSS 50 mL', route:'IV drip in 30 min', days:'D2 ถึง D3', detail:'max 50 mg; ก่อนให้ Ara-C 4 hr', note:FLU_NOTE },
    { name:'Cisplatin', dose:50, unit:'mg/m2', vehicle:'NSS 1,000 mL', route:'IV drip in 4 hr', days:'D2 ถึง D3', note:CIS_NOTE },
    { name:'20% Mannitol', unit:'fixed', instruct:'20% Mannitol 100 mL in D5W 1,000 mL IV drip in 20 hr', days:'D2 ถึง D3' },
    { name:'Cytarabine', dose:1000, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 24 hr', days:'D2 ถึง D3', detail:'(……®)', note:'CrCl 40–60 mL/min: 500 mg/m2 ต่อครั้ง; CrCl <40 mL/min: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ' },
    FILG,
  ]},
]

// shared row constants above are reused across forms; export fresh copies so no two regimens share a drug object
export default REGIMENS.map((r) => ({ ...r, drugs: r.drugs.map((d) => ({ ...d })) }))
