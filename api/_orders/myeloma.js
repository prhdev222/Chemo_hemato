// Multiple myeloma — order forms transcribed from Siriraj Chemotherapy Protocol 2025, pp. 173–190
const P = (n) => `Siriraj order 2025 p.${n}`

// ---- rows shared by every daratumumab order form (pp. 173–180) ----
const DARA_LAB = { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, total Ca, LDH; ☐ เจาะเลือดใส่ EDTA tube 6 mL ส่ง ABO & Rh blood group, antibody screening test, DAT, red cell phenotyping ก่อนให้ยาครั้งแรก; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' }
const DARA_NURSE = { name:'คำสั่งพยาบาล', unit:'fixed', instruct:'ให้คำแนะนำเกี่ยวกับการวินิจฉัยโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล', days:'ตลอดการรักษา' }
const DARA_INFUSION = { name:'คำแนะนำ Daratumumab infusion', unit:'fixed', instruct:'การให้ยาครั้งแรก ผสม NSS 1000 mL เริ่ม rate 50 mL/hr; ครั้งที่ 2 ผสม NSS 500 mL เริ่ม rate 50 mL/hr; ครั้งที่ 3 เป็นต้นไป ผสม NSS 500 mL เริ่ม rate 100 mL/hr; เพิ่ม rate ทีละ 50 mL/hr ทุก 1 ชั่วโมง จนถึง 200 mL/hr; * หากเกิด IRRs ในครั้งก่อน ให้พิจารณาปรับ NSS และปรับ rate ตามคำแนะนำ', days:'ทุกครั้งที่ให้ Daratumumab' }
const DARA_VS = { name:'Record vital signs / IRR', unit:'fixed', instruct:'Record vital signs q 15 min x 4 then q 30 min x 2 then q 1 hr until completion of infusion; ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½ - 1 hr หลังจากสิ้นสุดการให้ยา', days:'ทุกครั้งที่ให้ Daratumumab' }
const DARA_COPD = '*ในผู้ป่วยที่มีประวัติ COPD ให้พิจารณายาขยายหลอดลมชนิดออกฤทธิ์สั้นและยาว และยาคอร์ติโคสเตียรอยด์ชนิดพ่น หลังการหยุดยา 4 ครั้งแรก; *หากผู้ป่วยไม่เกิด IRRs ที่สำคัญ อาจหยุดยาชนิดพ่นได้'

const daraPremed = (days) => [
  { name:'Dexamethasone (premedication)', unit:'fixed', instruct:'20 mg IV ก่อนให้ยา 30 นาที', days },
  { name:'Paracetamol (500 mg) (premedication)', unit:'fixed', instruct:'2 tabs oral ก่อนให้ยา 30 นาที', days },
  { name:'Chlorpheniramine (premedication)', unit:'fixed', instruct:'10 mg IV ก่อนให้ยา 30 นาที', days },
]
const dara = (days, schedule) => ({ name:'Daratumumab', dose:16, unit:'mg/kg', vehicle:'NSS ☐ 500 mL ☐ 1000 mL', route:'IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงที่ 3 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr); ใช้ Vented Paclitaxel infusion set 0.22 um หรือ 0.2 um', days, detail:'Sig. …… mg', note:`${schedule}; ${DARA_COPD}` })
const daraHead = (schedule) => ({ name:'ตารางการให้ยา (schedule)', unit:'fixed', instruct:schedule, days:'ตลอดการรักษา' })

// ---- rows shared by the inpatient forms (pp. 183–186) ----
const MM_EVAL = { name:'การประเมินโรค MM', unit:'fixed', instruct:'BMA, BM biopsy, FISH, albumin, beta2-microglobulin, LDH, SPEP, SIFX, SFLC, bone survey, CT/MRI/PET-CT เมื่อมีข้อบ่งชี้', days:'ก่อนเริ่มการรักษา' }
const IPD_TRANSFUSION = { name:'Transfusion / sepsis', unit:'fixed', instruct:'ให้ PFB ถ้า hemoglobin < 8 g/dL; ให้ LPPC/SDP ถ้า platelet count < 20,000/mm3; เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3 °C (และ ANC < 500/mm3)', days:'ตลอดการรักษา' }
const IPD_NURSE = { name:'คำสั่งพยาบาล', unit:'fixed', instruct:'Regular diet; Record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล', days:'ตลอดการรักษา' }
const ipdSupport = () => [
  { name:'Domperidone (10 mg)', unit:'fixed', instruct:'1 tab oral tid ac', days:'ตลอดการรักษา' },
  { name:'Omeprazole (20 mg)', unit:'fixed', instruct:'1 cap oral OD ac', days:'ตลอดการรักษา' },
  { name:'Senokot', unit:'fixed', instruct:'2 tabs oral hs prn for constipation', days:'ตลอดการรักษา' },
]
const NOTE_DOXO = 'CrCl <10 mL/min: 75%; TB 1.5-3 mg/dL หรือ AST 60-180 U/L: 50%; TB 3.1-5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา'
const NOTE_CYCLO = 'CrCl <10 mL/min: 50%; TB 3.1-5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา'
const NOTE_VCR = 'ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5-3 mg/dL หรือ AST 60-180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา'

export default [
  // ---------------- p.173 Dara-Vd ----------------
  { name:'Dara-Vd regimen (D-Vd)', abbr:'D-Vd', cat:'Myeloma', type:'OPD', group:'order', ref:P(173), cycleInfo:'21 วัน (ตาราง 3 สัปดาห์)', drugs:[
    { ...DARA_LAB }, { ...DARA_NURSE }, { ...DARA_INFUSION }, { ...DARA_VS },
    daraHead('Cycle 1-3: Daratumumab D1, D8, D15 (ทุกสัปดาห์); Bortezomib D1, D4, D8, D11; Dexamethasone D1-2, D4-5, D8-9, D11-12. Cycle 4-8: Daratumumab D1 (ทุก 3 สัปดาห์); Bortezomib D1, D4, D8, D11; Dexamethasone เหมือนเดิม. Cycle ≥9: Daratumumab D1 (ทุก 4 สัปดาห์)'),
    ...daraPremed('D1, D8, D15'),
    dara('D1, D8, D15', 'Cycle 1-3 ทุกสัปดาห์ (D1, D8, D15); Cycle 4-8 ทุก 3 สัปดาห์ (D1); Cycle ≥9 ทุก 4 สัปดาห์ (D1)'),
    { name:'☐ Bortezomib', dose:1.3, unit:'mg/m2', route:'SC', days:'D1, D4, D8, D11', detail:'(……………………®) Sig. …… mg SC' },
    { name:'☐ Dexamethasone (4 mg)', unit:'fixed', instruct:'5 tabs oral OD pc', days:'D2, D4, D5, D8*, D9, D11, D12', note:'*งดให้ Day 8 cycle 1-3 เนื่องจากมี premedication แล้ว' },
  ]},

  // ---------------- p.174 Dara-Rd / Daratumumab monotherapy ----------------
  { name:'Dara-Rd regimen / Daratumumab monotherapy (D-Rd)', abbr:'D-Rd', cat:'Myeloma', type:'OPD', group:'order', ref:P(174), cycleInfo:'28 วัน', drugs:[
    { ...DARA_LAB }, { ...DARA_NURSE }, { ...DARA_INFUSION }, { ...DARA_VS },
    daraHead('Cycle 1-2: Daratumumab D1, D8, D15, D22 (ทุกสัปดาห์); Lenalidomide D1-D21; Dexamethasone D1, D8, D15, D22. Cycle 3-6: Daratumumab D1, D15 (ทุก 2 สัปดาห์); Lenalidomide D1-D21; Dexamethasone D1, D8, D15, D22. Cycle ≥7: Daratumumab D1 (ทุก 4 สัปดาห์)'),
    ...daraPremed('D1, D8, D15, D22'),
    dara('D1, D8, D15, D22', 'Cycle 1-2 ทุกสัปดาห์ (D1, D8, D15, D22); Cycle 3-6 ทุก 2 สัปดาห์ (D1, D15); Cycle ≥7 ทุก 4 สัปดาห์ (D1)'),
    { name:'☐ Lenalidomide (10, 15, 25 mg)', unit:'fixed', instruct:'(……………………®) …… cap oral OD pc', days:'D1 ถึง D21', note:'เลือกขนาด 10, 15 หรือ 25 mg' },
    { name:'☐ Dexamethasone (4 mg) (สำหรับ DRd)', unit:'fixed', instruct:'5 tabs oral BID pc (สำหรับ DRd)', days:'D1, D8, D15, D22', note:'เลือกตามสูตร: DRd หรือ Daratumumab monotherapy' },
    { name:'☐ Dexamethasone (4 mg) (สำหรับ Daratumumab monotherapy)', unit:'fixed', instruct:'5 tabs oral OD pc (สำหรับ Daratumumab monotherapy)', days:'D2 และ D3', note:'เลือกตามสูตร: DRd หรือ Daratumumab monotherapy' },
  ]},

  // ---------------- p.175 Dara-Pd ----------------
  { name:'Dara-Pd regimen (D-Pd)', abbr:'D-Pd', cat:'Myeloma', type:'OPD', group:'order', ref:P(175), cycleInfo:'28 วัน', drugs:[
    { ...DARA_LAB }, { ...DARA_NURSE }, { ...DARA_INFUSION }, { ...DARA_VS },
    daraHead('Cycle 1-2: Daratumumab D1, D8, D15, D22 (ทุกสัปดาห์); Pomalidomide D1-D21; Dexamethasone D1, D8, D15, D22. Cycle 3-6: Daratumumab D1, D15 (ทุก 2 สัปดาห์); Pomalidomide D1-D21; Dexamethasone D1, D8, D15, D22. Cycle ≥7: Daratumumab D1 (ทุก 4 สัปดาห์)'),
    ...daraPremed('D1, D8, D15, D22'),
    dara('D1, D8, D15, D22', 'Cycle 1-2 ทุกสัปดาห์ (D1, D8, D15, D22); Cycle 3-6 ทุก 2 สัปดาห์ (D1, D15); Cycle ≥7 ทุก 4 สัปดาห์ (D1)'),
    { name:'☐ Pomalidomide (2, 3, 4 mg)', unit:'fixed', instruct:'(……………………®) …… cap oral OD pc', days:'D1 ถึง D21', note:'เลือกขนาด 2, 3 หรือ 4 mg' },
    { name:'☐ Dexamethasone (4 mg)', unit:'fixed', instruct:'5 tabs oral BID pc', days:'D1, D8, D15, D22' },
  ]},

  // ---------------- p.176 Dara-Kd ----------------
  { name:'Dara-Kd regimen (D-Kd)', abbr:'D-Kd', cat:'Myeloma', type:'OPD', group:'order', ref:P(176), cycleInfo:'28 วัน', drugs:[
    { ...DARA_LAB }, { ...DARA_NURSE }, { ...DARA_INFUSION }, { ...DARA_VS },
    daraHead('Cycle 1-2: Daratumumab D1, D8, D15, D22 (ทุกสัปดาห์); Carfilzomib D1, D8, D15; Dexamethasone D1, D8, D15, D22. Cycle 3-6: Daratumumab D1, D15 (ทุก 2 สัปดาห์); Carfilzomib D1, D8, D15; Dexamethasone D1, D8, D15, D22. Cycle ≥7: Daratumumab D1 (ทุก 4 สัปดาห์)'),
    ...daraPremed('D1, D8, D15, D22'),
    dara('D1, D8, D15, D22', 'Cycle 1-2 ทุกสัปดาห์ (D1, D8, D15, D22); Cycle 3-6 ทุก 2 สัปดาห์ (D1, D15); Cycle ≥7 ทุก 4 สัปดาห์ (D1)'),
    { name:'☐ Carfilzomib', dose:20, unit:'mg/m2', vehicle:'5%DW 50 mL', route:'IV in 30 min', days:'D1, D8, D15', detail:'ขนาดที่พิมพ์ให้เลือก: 20, 27, 36, 56, 70 mg/m2', note:'ขนาดยาเลือกได้ 20, 27, 36, 56 หรือ 70 mg/m2 (ใส่ค่า 20 เป็นค่าตั้งต้น)' },
    { name:'☐ Dexamethasone (4 mg)', unit:'fixed', instruct:'5 tabs oral BID pc', days:'D1, D8, D15, D22' },
  ]},

  // ---------------- p.177 Dara-CyBorD ----------------
  { name:'Dara-CyBorD regimen (D-VCD)', abbr:'D-VCD', cat:'Myeloma', type:'OPD', group:'order', ref:P(177), cycleInfo:'28 วัน', drugs:[
    { ...DARA_LAB }, { ...DARA_NURSE }, { ...DARA_INFUSION }, { ...DARA_VS },
    daraHead('Cycle 1-2: Daratumumab D1, D8, D15, D22 (ทุกสัปดาห์); VCD D1, D8, D15, D22. Cycle 3-6: Daratumumab D1, D15 (ทุก 2 สัปดาห์); VCD D1, D8, D15, D22. Then 1-24: Daratumumab D1 (ทุก 4 สัปดาห์)'),
    ...daraPremed('D1, D8, D15, D22'),
    dara('D1, D8, D15, D22', 'Cycle 1-2 ทุกสัปดาห์ (D1, D8, D15, D22); Cycle 3-6 ทุก 2 สัปดาห์ (D1, D15); Then 1-24 ทุก 4 สัปดาห์ (D1)'),
    { name:'☐ Cyclophosphamide (50 mg)', dose:300, unit:'mg/m2', route:'oral (Sig. ……)', days:'D1, D8, D15, D22', detail:'ยาเม็ด 50 mg; Sig. ……………………' },
    { name:'☐ Bortezomib', dose:1.3, unit:'mg/m2', route:'SC', days:'D1, D8, D15, D22', detail:'(……………………®) Sig. …… mg SC' },
    { name:'☐ Dexamethasone (4 mg) (40 mg/wk) สัปดาห์ที่ได้ Daratumumab', unit:'fixed', instruct:'5 tabs po OD pc (สำหรับสัปดาห์ที่ได้ Daratumumab)', days:'D2, D9, D16, D23', note:'เลือกตามสัปดาห์ที่ได้/ไม่ได้ Daratumumab' },
    { name:'☐ Dexamethasone (4 mg) (40 mg/wk) สัปดาห์ที่ไม่ได้ Daratumumab', unit:'fixed', instruct:'5 tabs po bid pc (สำหรับสัปดาห์ที่ไม่ได้ Daratumumab)', days:'D1, D8, D15, D22', note:'เลือกตามสัปดาห์ที่ได้/ไม่ได้ Daratumumab' },
  ]},

  // ---------------- p.178 Dara-VMP ----------------
  { name:'Dara-VMP regimen (D-VMP)', abbr:'D-VMP', cat:'Myeloma', type:'OPD', group:'order', ref:P(178), cycleInfo:'42 วัน (6 สัปดาห์)', drugs:[
    { ...DARA_LAB }, { ...DARA_NURSE }, { ...DARA_INFUSION }, { ...DARA_VS },
    daraHead('Cycle 1: Daratumumab D1, D8, D15, D22, D29, D36 (ทุกสัปดาห์); Bortezomib D1, D4, D8, D11, D22, D25, D29, D32; Melphalan + Prednisolone D1-D4. Cycle 2-9: Daratumumab D1, D22 (ทุก 3 สัปดาห์); Bortezomib D1, D8, D22, D29; Melphalan + Prednisolone D1-D4. Cycle ≥10: Daratumumab D1 (ทุก 4 สัปดาห์)'),
    ...daraPremed('D1, D8, D15, D22, D29, D36'),
    dara('D1, D8, D15, D22, D29, D36', 'Cycle 1 ทุกสัปดาห์ (D1, D8, D15, D22, D29, D36); Cycle 2-9 ทุก 3 สัปดาห์ (D1, D22); Cycle ≥10 ทุก 4 สัปดาห์ (D1)'),
    { name:'Dexamethasone (4 mg) (ใน cycle 1)', unit:'fixed', instruct:'1 tab oral OD pc (ใน cycle 1)', days:'☐ D2, D3 ☐ D9, D10', note:'เลือกวันที่ให้ตามช่อง ☐' },
    { name:'☐ Bortezomib*', dose:1.3, unit:'mg/m2', route:'SC', days:'☐ D1, D8, D22, D29 ☐ D1, D4, D8, D11, D22, D25, D29, D32', detail:'Sig. …… mg SC', note:'เลือกตารางวัน: ทุกสัปดาห์ (cycle 2-9) หรือ 2 ครั้ง/สัปดาห์ (cycle 1)' },
    { name:'☐ Melphalan (2 mg)', dose:9, unit:'mg/m2', route:'oral (Sig. ……)', days:'D1 ถึง D4', detail:'ยาเม็ด 2 mg; Sig. ……………………', note:'ให้เฉพาะใน week 1 C1-9' },
    { name:'☐ Prednisolone (5 mg)', dose:60, unit:'mg/m2', route:'oral (Sig. ……)', days:'D1 ถึง D4', detail:'ยาเม็ด 5 mg; Sig. ……………………', note:'ให้เฉพาะใน week 1 C1-9' },
  ]},

  // ---------------- p.179 Dara-VTd ----------------
  { name:'Dara-VTd regimen (D-VTd)', abbr:'D-VTd', cat:'Myeloma', type:'OPD', group:'order', ref:P(179), cycleInfo:'28 วัน', drugs:[
    { ...DARA_LAB }, { ...DARA_NURSE }, { ...DARA_INFUSION }, { ...DARA_VS },
    daraHead('Cycle 1-2: Daratumumab D1, D8, D15, D22 (ทุกสัปดาห์); Bortezomib D1, D4, D8, D11; Thalidomide D1-D28; Dexamethasone D1-2, D8-9, D15-16, D22-23. Cycle 3-4 และ post ASCT consolidation: Daratumumab D1, D15 (ทุก 2 สัปดาห์); Bortezomib D1, D4, D8, D11; Thalidomide D1-D28; Dexamethasone D1-2, D8-9, D15-16, D22-23. Maintenance (max 2 yr): Daratumumab D1 (ทุก 4 สัปดาห์)'),
    ...daraPremed('D1, D8, D15, D22'),
    dara('D1, D8, D15, D22', 'Cycle 1-2 ทุกสัปดาห์ (D1, D8, D15, D22); Cycle 3-4 และ post ASCT consolidation ทุก 2 สัปดาห์ (D1, D15); MT (max 2 yr) ทุก 4 สัปดาห์ (D1)'),
    { name:'☐ Bortezomib', dose:1.3, unit:'mg/m2', route:'SC', days:'D1, D4, D8, D11', detail:'(……………………®) Sig. …… mg SC' },
    { name:'☐ Thalidomide (50 mg)', unit:'fixed', instruct:'2 tabs po OD hs', days:'D1 ถึง D28' },
    { name:'☐ Dexamethasone (4 mg) (40 mg/d in C1-C2)', unit:'fixed', instruct:'5 tabs po OD pc D1, D8, D15, D22 + 5 tabs po bid pc D2, D9, D16, D23', days:'D1, D8, D15, D22 + D2, D9, D16, D23', note:'ใช้ใน C1-C2' },
    { name:'☐ Dexamethasone (4 mg) (20 mg/d in other cycle)', unit:'fixed', instruct:'5 tabs po OD pc', days:'D2, D8, D9, D16, D22, D23', note:'ใช้ใน cycle อื่นนอกจาก C1-C2' },
  ]},

  // ---------------- p.180 Dara-VRd (modified) ----------------
  { name:'Dara-VRd regimen (modified D-VRd)', abbr:'mod D-VRd', cat:'Myeloma', type:'OPD', group:'order', ref:P(180), cycleInfo:'28 วัน (C1-C6)', drugs:[
    { ...DARA_LAB }, { ...DARA_NURSE }, { ...DARA_INFUSION }, { ...DARA_VS },
    daraHead('Cycle 1-4: Daratumumab D1, D8, D15, D22 (ทุกสัปดาห์); Bortezomib D1, D8, D15, D22; Lenalidomide 25 mg D1-D21; Dexamethasone D1-2, D8-9, D15-16, D22-23. Cycle 5-6 (post ASCT consolidation): Daratumumab D1, D15; Bortezomib D1, D8, D15, D22; Lenalidomide 25 mg D1-D21; Dexamethasone เหมือนเดิม. C7-9 MT: Daratumumab D1; Lenalidomide 10 mg D1-D21. C10-32 MT: Daratumumab D1; Lenalidomide 15 mg D1-D21. *modified D-VRd – ปรับจาก 3-week/cycle to 4-week/cycle in C1-C6, Daratumumab D1,8,15 to D1,8,15,22 in C1-C4, Bortezomib D1,4,8,11 to D1,8,15,22 in C1-C6'),
    ...daraPremed('D1, D8, D15, D22'),
    dara('D1, D8, D15, D22', 'Cycle 1-4 ทุกสัปดาห์ (D1, D8, D15, D22); Cycle 5-6 (post ASCT consolidation) ทุก 2 สัปดาห์ (D1, D15); C7-32 MT ทุก 4 สัปดาห์ (D1)'),
    { name:'☐ Bortezomib', dose:1.3, unit:'mg/m2', route:'SC', days:'D1, D8, D15, D22', detail:'(……………………®) Sig. …… mg SC' },
    { name:'☐ Lenalidomide (10, 15, 25 mg)', unit:'fixed', instruct:'(……………………®) …… cap oral OD pc', days:'D1 ถึง D21', note:'เลือกขนาด 10, 15 หรือ 25 mg (ตาราง: 25 mg C1-6, 10 mg C7-9, 15 mg C10-32)' },
    { name:'☐ Dexamethasone (4 mg) (40 mg/d in C1-C2)', unit:'fixed', instruct:'5 tabs po OD pc D1, D8, D15, D22 + 5 tabs po bid pc D2, D9, D16, D23', days:'D1, D8, D15, D22 + D2, D9, D16, D23', note:'ใช้ใน C1-C2' },
    { name:'☐ Dexamethasone (4 mg) (20 mg/d in other cycle)', unit:'fixed', instruct:'5 tabs po OD pc', days:'D2, D8, D9, D15, D16, D22, D23', note:'ใช้ใน cycle อื่นนอกจาก C1-C2' },
  ]},

  // ---------------- p.183 DT-PACE ----------------
  { name:'DT-PACE regimen', abbr:'DT-PACE', cat:'Myeloma', type:'IPD', group:'order', ref:P(183), cycleInfo:'28 วัน', drugs:[
    { ...MM_EVAL },
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, Electrolyte, Ca, PO4, Mg; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:'D5, D8, D11, D14, D17, D20' },
    { ...IPD_TRANSFUSION }, { ...IPD_NURSE }, ...ipdSupport(),
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม.', days:'D1 ถึง D4' },
    { name:'NSS 1,000 mL + KCl 20 mEq', unit:'fixed', instruct:'IV drip in 4 hr ก่อนยาเคมีบำบัด', days:'D1' },
    { name:'Cisplatin', dose:10, unit:'mg/m2/day', vehicle:'NSS 1,000 mL (ผสมรวมกับ Cyclophosphamide และ Etoposide)', route:'IV drip in 24 hr via central line/port A', days:'D1 ถึง D4', detail:'ผสมรวม Cisplatin + Cyclophosphamide + Etoposide ในถุงเดียวกัน', note:'CrCl 46-60 mL/min: 50%; CrCl 31-45 mL/min: 25%; CrCl <30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ' },
    { name:'Cyclophosphamide', dose:400, unit:'mg/m2/day', vehicle:'NSS 1,000 mL (ผสมรวมกับ Cisplatin และ Etoposide)', route:'IV drip in 24 hr via central line/port A', days:'D1 ถึง D4', detail:'ผสมรวม Cisplatin + Cyclophosphamide + Etoposide ในถุงเดียวกัน', note:NOTE_CYCLO },
    { name:'Etoposide', dose:40, unit:'mg/m2/day', vehicle:'NSS 1,000 mL (ผสมรวมกับ Cisplatin และ Cyclophosphamide)', route:'IV drip in 24 hr via central line/port A', days:'D1 ถึง D4', detail:'ผสมรวม Cisplatin + Cyclophosphamide + Etoposide ในถุงเดียวกัน', note:'CrCl 15-50 mL/min: 75%; CrCl <15 mL/min: งดใช้ยา; TB 1.5-3 mg/dL หรือ AST 60-180 U/L: 50%; TB >3 mg/dL หรือ AST >180 U/L: งดใช้ยา' },
    { name:'Doxorubicin', dose:10, unit:'mg/m2/day', vehicle:'NSS 100 ml', route:'IV drip in 24 hr via central line/port A', days:'D1 ถึง D4', note:NOTE_DOXO },
    { name:'NSS 1,000 mL + KCl 20 mEq + 50%MgSO4 20 mEq', unit:'fixed', instruct:'IV drip in 4 hr', days:'D5' },
    { name:'Dexamethasone (4 mg)', unit:'fixed', instruct:'5 tabs oral bid pc', days:'D1 ถึง D4' },
    { name:'Thalidomide (50 mg)', unit:'fixed', instruct:'…… cap oral OD pc', days:'D1 ถึง D28' },
    { name:'Filgrastim', unit:'fixed', instruct:'(……………………®) ○ 300 μg ○ 480 μg SC OD', days:'เริ่มวันที่…… ถึง……' },
  ]},

  // ---------------- p.184 DVD ----------------
  { name:'DVD regimen', abbr:'DVD', cat:'Myeloma', type:'IPD', group:'order', ref:P(184), cycleInfo:'28 วัน (Cycle 1-8)', drugs:[
    { ...MM_EVAL },
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, Ca; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { ...IPD_TRANSFUSION }, { ...IPD_NURSE }, ...ipdSupport(),
    { name:'Ondansetron injection', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม.', days:'D1' },
    { name:'Liposomal doxorubicin', dose:40, unit:'mg/m2', vehicle:'D5W 250 mL', route:'IV drip in 1½ hr', days:'D1', note:'ไม่ต้องปรับขนาดยาในโรคไต; TB 1.2-3 mg/dL หรือ AST 60-180 U/L: 50%; TB 3.1-5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, vehicle:'NSS 100 mL', route:'IV drip in 1 hr', days:'D1', detail:'max 2 mg', note:NOTE_VCR },
    { name:'Dexamethasone (4 mg)', unit:'fixed', instruct:'5 tabs oral bid pc', days:'D1 - D4, D9 - D12, D17 - D20' },
    { name:'Filgrastim', unit:'fixed', instruct:'(……………………®) ○ 300 μg ○ 480 μg SC OD', days:'เริ่มวันที่…… ถึง……' },
  ]},

  // ---------------- p.185 mCBAD ----------------
  { name:'mCBAD regimen', abbr:'mCBAD', cat:'Myeloma', type:'IPD', group:'order', ref:P(185), cycleInfo:'28 วัน', drugs:[
    { ...MM_EVAL },
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, Electrolyte, Ca, PO4, LFT, uric acid, LDH, PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:'D5, D8, D10, D12, D14, D17, D20' },
    { ...IPD_TRANSFUSION }, { ...IPD_NURSE }, ...ipdSupport(),
    { name:'Co-trimoxazole SS (80/400)', unit:'fixed', instruct:'2 tabs oral OD วันจันทร์, พุธ, ศุกร์', days:'ตลอดการรักษา' },
    { name:'Acyclovir (400 mg)', unit:'fixed', instruct:'1 tab oral bid pc', days:'ตลอดการรักษา' },
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม.', days:'D1 ถึง D4, D8, D11' },
    { name:'Cyclophosphamide', dose:350, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV drip in 1 hr q 12 hr (8 doses)', days:'D1 ถึง D4', detail:'q 12 hr รวม 8 doses', note:NOTE_CYCLO },
    { name:'Mesna', dose:400, unit:'mg/m2', vehicle:'5%DN/2 1,000 mL', route:'IV drip in 12 hr q 12 hr (8 doses)', days:'D1 ถึง D4', detail:'เริ่มให้พร้อม cyclophosphamide; q 12 hr รวม 8 doses' },
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'SC', days:'D1, D4, D8, D11', detail:'Sig. …… mg SC' },
    { name:'Doxorubicin', dose:9, unit:'mg/m2', vehicle:'NSS 100 ml', route:'IV drip in 24 hr via central line/port A', days:'D1 ถึง D4', note:NOTE_DOXO },
    { name:'Dexamethasone (40 mg/d)', unit:'fixed', instruct:'☐ Dexamethasone (4 mg) 5 tabs oral bid pc ☐ Dexamethasone 10 mg IV q 6 hr', days:'D1 - D4, D9 - D12, D17 - D20', note:'เลือก oral หรือ IV อย่างใดอย่างหนึ่ง' },
    { name:'Filgrastim', unit:'fixed', instruct:'(……………………®) ○ 300 μg ○ 480 μg SC OD', days:'เริ่ม D5 (เว้น D8, D11) ถึง……' },
  ]},

  // ---------------- p.186 VAD ----------------
  { name:'VAD regimen', abbr:'VAD', cat:'Myeloma', type:'IPD', group:'order', ref:P(186), cycleInfo:'28 วัน (Cycle 1-8)', drugs:[
    { ...MM_EVAL },
    { name:'Lab D1', unit:'fixed', instruct:'CBC, BUN, Cr, LFT, Ca; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads', days:'D1' },
    { name:'Consult', unit:'fixed', instruct:'☐ ส่งปรึกษาทันตกรรม', days:'D1' },
    { name:'CBC ติดตาม', unit:'fixed', instruct:'CBC', days:'D5, D8, D11, D14, D17, D20' },
    { ...IPD_TRANSFUSION }, { ...IPD_NURSE }, ...ipdSupport(),
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม.', days:'D1 ถึง D4' },
    { name:'Vincristine', dose:0.4, unit:'mg/m2/day', maxDose:0.5, vehicle:'NSS 100 mL (ผสมรวมกับ Doxorubicin)', route:'IV drip in 24 hr via central line', days:'D1 ถึง D4', detail:'max 0.5 mg/day; ผสมรวม Vincristine + Doxorubicin ในถุงเดียวกัน', note:'ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5-3 mg/dL หรือ AST 60-180 U/L: 50% ของขนาดยา; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา' },
    { name:'Doxorubicin', dose:9, unit:'mg/m2/day', vehicle:'NSS 100 mL (ผสมรวมกับ Vincristine)', route:'IV drip in 24 hr via central line', days:'D1 ถึง D4', detail:'ผสมรวม Vincristine + Doxorubicin ในถุงเดียวกัน', note:'CrCl <10 mL/min: 75% ของขนาดยา; TB 1.5-3 mg/dL หรือ AST 60-180 U/L: 50% ของขนาดยา; TB 3.1-5 mg/dL หรือ AST >180 U/L: 25% ของขนาดยา; TB >5 mg/dL: งดยา' },
    { name:'NSS 1,000 mL', unit:'fixed', instruct:'IV drip in 24 hr via central line', days:'D1 ถึง D4' },
    { name:'Dexamethasone (4 mg)', unit:'fixed', instruct:'5 tabs oral bid pc', days:'D1 - D4, D9 - D12, D17 - D20' },
    { name:'Filgrastim', unit:'fixed', instruct:'(……………………®) ○ 300 μg ○ 480 μg SC OD', days:'เริ่มวันที่……' },
  ]},

  // ---------------- p.187–188 Teclistamab protocol (Medication + Monitoring) ----------------
  { name:'Teclistamab protocol — Medication & Monitoring (Page 1–2)', abbr:'Teclistamab', cat:'Myeloma', type:'IPD', group:'order', ref:P(187), drugs:[
    { name:'Lab D1', unit:'fixed', instruct:'☐ CBC, Ferritin, CRP, IL-6; ☐ BUN, Cr, Electrolyte, LFT, Total calcium, Mg, PO4, Uric acid, LDH; ☐ SPEP, Immunofixation, SFLC; ☐ PT, aPTT, fibrinogen, D-dimer; ☐ HBsAg, Anti-HBs, Anti-HBc, Anti-HCV, Anti-HIV, HSV IgG, VZV IgG; ☐ Serum IgG levels* (*IgG level should be maintained ≥ 4 g/L; 400 mg/dL and suggest follow up level every 4 weeks)', days:'D1' },
    { name:'คำสั่งพยาบาล', unit:'fixed', instruct:'Regular neutropenic diet; Record V/S, I/O; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล; แนะนำให้ผู้ป่วยอยู่ในโรงพยาบาลอย่างน้อย 2 วัน หลังได้รับยา ในช่วงการให้ยา 3 ครั้งแรก เพื่อสังเกตอาการ; หากผู้ป่วยมีอาการในกลุ่ม CRS และ/หรือ Immune-effector cell associated neurotoxicity syndrome (ICANS) แนะนำให้เลื่อนการให้ยาในครั้งถัดไป จนกว่าอาการแสดงดังกล่าวจะหายขาด; หากมีการพิจารณาเลื่อนการได้รับยาของผู้ป่วย กรุณาดูรายละเอียดคำแนะนำเพิ่มเติมจาก Treatment guideline', days:'ตลอดการรักษา' },
    { name:'วิธีการให้ยา Teclistamab', unit:'fixed', instruct:'บริหารยา teclistamab โดยวิธีการฉีดใต้ผิวหนัง (Subcutaneous); โดยแนะนำให้ฉีดบริเวณหน้าท้อง หรือต้นขา; ยาที่บรรจุใน syringe พร้อมฉีด แนะนำให้ใช้ทันที หรือภายใน 20 ชั่วโมง; กรุณาตรวจสอบรายละเอียดวิธีการเตรียมยา และวิธีการให้ยาฉบับเต็มใน treatment guideline', days:'ทุกครั้งที่ให้ยา' },
    { name:'Monitoring and Record vital signs', unit:'fixed', instruct:'D1, D….., D….. after infusion: Every 15 min x 4 then Every 30 min x 4 then Every 1 hour x 4 then every 4 hr; Keep BP ≥ 90/60 mmHg, RR < 20/min; ถ้ามีอาการไข้ หนาวสั่น ความดันลดลง รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง', days:'D1, D….., D….. (หลังให้ยา)' },
    { name:'Routine investigation', unit:'fixed', instruct:'Blood for CBC, ferritin, CRP, IL-6, PT, aPTT, fibrinogen, D-Dimer OD; Blood for BUN, Cr, Electrolyte, Total Ca, PO4, Uric acid q 6 hr D1, D….., D…..; Blood for LFT, Mg, FBS ทุกวันจันทร์ และพฤหัส; CRS assessment ทุกเวร ตาม protocol; ICANS assessment ทุกเวรเช้า บ่าย ตาม protocol', days:'ตลอดการรักษา' },
    { name:'Additional investigation after suspected CRS or ICANS', unit:'fixed', instruct:'Record V/S + notify if BP ≤ 90/60 mmHg, MAP ≤ 65 mmHg; HR > 120 bpm + ให้ทำ EKG 12 lead; RR > 24 /min, SpO2 < 95% (RA). If BT ≥ 38.0 °C + please notify and investigation: Blood for IL-6, CRP, ferritin, procalcitonin, PT, aPTT, fibrinogen, D-dimer, BUN, Cr, LFT stat; Blood for H/C x 2, UA, MUC; CXR-Portable; Empirical ATB: Piperacillin/Tazobactam 4.5 gm IV drip in 1 hr stat then Piperacillin/Tazobactam 4.5 gm IV drip in 3 hr q 6 hr', days:'เมื่อสงสัย CRS หรือ ICANS' },
    { name:'Omeprazole', unit:'fixed', instruct:'40 mg IV OD', days:'ตลอดการรักษา' },
    { name:'☐ Allopurinol (100 mg)', unit:'fixed', instruct:'3 caps oral pc เช้า', days:'ตลอดการรักษา', note:'เลือก Allopurinol หรือ Febuxostat' },
    { name:'☐ Febuxostat (80 mg)', unit:'fixed', instruct:'1 cap oral pc เช้า', days:'ตลอดการรักษา', note:'เลือก Allopurinol หรือ Febuxostat' },
    { name:'Co-trimoxazole SS (80/400)', unit:'fixed', instruct:'2 tabs oral OD วันจันทร์, พุธ, ศุกร์', days:'ตลอดการรักษา' },
    { name:'☐ Fluconazole (200)', unit:'fixed', instruct:'2 caps oral OD pc เช้า', days:'ตลอดการรักษา' },
    { name:'☐ Ciprofloxacin (500)', unit:'fixed', instruct:'1 tab oral bid pc', days:'ตลอดการรักษา' },
    { name:'☐ Acyclovir (400)', unit:'fixed', instruct:'1 tab po bid pc กรณี HSV IgG positive', days:'ตลอดการรักษา' },
    { name:'☐ Acyclovir (800)', unit:'fixed', instruct:'1 tab po bid pc กรณี VZV IgG positive', days:'ตลอดการรักษา' },
    { name:'☐ Tenofovir alafenamide (25 mg)', unit:'fixed', instruct:'1 tab po OD pc กรณี AntiHBc+', days:'ตลอดการรักษา' },
    { name:'☐ Dexamethasone (premedication)', unit:'fixed', instruct:'16 mg IV ก่อนการให้ Teclistamab 1-3 ชั่วโมง', days:'ทุกครั้งที่ให้ Teclistamab' },
    { name:'☐ Diphenhydramine (25 mg) (premedication)', unit:'fixed', instruct:'2 caps oral ก่อนการให้ Teclistamab 1-3 ชั่วโมง', days:'ทุกครั้งที่ให้ Teclistamab' },
    { name:'☐ Paracetamol (500 mg) (premedication)', unit:'fixed', instruct:'2 tabs oral ก่อนการให้ Teclistamab 1-3 ชั่วโมง', days:'ทุกครั้งที่ให้ Teclistamab' },
    { name:'Teclistamab — Step-up dose ครั้งที่ 1', dose:0.06, unit:'mg/kg', route:'SC', days:'D1 = ……', detail:'10 mg/mL/vial; Sig. …… ml SC', note:'ไม่ต้องปรับขนาดยาในโรคไตและโรคตับ' },
    { name:'Teclistamab — Step-up dose ครั้งที่ 2', dose:0.3, unit:'mg/kg', route:'SC', days:'D….. (ห่างจาก Step-up dose ครั้งที่ 1 เป็นเวลา 2-4 วัน)', detail:'10 mg/mL/vial; Sig. …… ml SC', note:'ไม่ต้องปรับขนาดยาในโรคไตและโรคตับ' },
    { name:'Teclistamab — First treatment dose', dose:1.5, unit:'mg/kg', route:'SC', days:'D….. (ห่างจาก Step-up dose ครั้งที่ 2 เป็นเวลา 2-4 วัน)', detail:'90 mg/mL/vial; Sig. …… ml SC', note:'ไม่ต้องปรับขนาดยาในโรคไตและโรคตับ' },
    { name:'Teclistamab — Treatment dose for maintenance', dose:1.5, unit:'mg/kg', route:'SC', days:'D….. ☐ ทุก 1 สัปดาห์ ☐ ทุก 2 สัปดาห์', detail:'90 mg/mL/vial; Sig. …… ml SC', note:'ไม่ต้องปรับขนาดยาในโรคไตและโรคตับ; เลือกความถี่ ทุก 1 หรือ 2 สัปดาห์' },
  ]},

  // ---------------- p.189 Teclistamab — CRS ----------------
  { name:'Teclistamab protocol — CRS (Page 3)', abbr:'Teclistamab CRS', cat:'Myeloma', type:'IPD', group:'order', ref:P(189), drugs:[
    { name:'Criteria CRS', unit:'fixed', instruct:'☐ CRS grade 1: Fever ≥ 38.0 °C; ☐ CRS grade 2: Fever with hypotension not requiring vasopressor and/or hypoxia required low-flow nasal canula; ☐ CRS grade 3: Fever with hypotension requiring vasopressor with or without vasopressin and/or hypoxia required high-flow nasal canula, face-mask; ☐ CRS grade 4: Fever with hypotension requiring multiple vasopressors and/or hypoxia requiring positive pressure (CPAP, BIPAP, Intubation, Mechanical ventilation)', days:'เมื่อสงสัย CRS' },
    { name:'เบิก Norepinephrine', unit:'fixed', instruct:'เบิก Norepinephrine 4 mg/vial 10 vials', days:'D1' },
    { name:'CRS grade 1 — ☐ Tocilizumab', unit:'fixed', instruct:'…… mg in NSS to 100 mL IV in 1 hr (8 mg/kg/dose, not exceed 800 mg/dose); Repeat in 8 hr if no improvement, no more than 3 dose in 24 hours', days:'CRS grade 1' },
    { name:'CRS grade 2 — ☐ Tocilizumab', unit:'fixed', instruct:'…… mg in NSS to 100 mL IV in 1 hr; If no improvement within 24 hours of starting tocilizumab: ☐ Dexamethasone 10 mg IV q 12 hr', days:'CRS grade 2' },
    { name:'CRS grade 3 — ☐ Tocilizumab', unit:'fixed', instruct:'…… mg in NSS to 100 mL IV in 1 hr; If no improvement: ☐ Dexamethasone 10 mg IV q 6 hr', days:'CRS grade 3' },
    { name:'CRS grade 4 — ☐ Tocilizumab', unit:'fixed', instruct:'…… mg + NSS 100 mL IV in 1 hr; Consider administer (ให้พร้อมกันหรือ อาการไม่ดีขึ้นหลังจาก tocilizumab): ☐ Methylprednisolone 1,000 mg in NSS 100 mL IV in 1 hr x 3 days', days:'CRS grade 4' },
  ]},

  // ---------------- p.190 Teclistamab — ICANS ----------------
  { name:'Teclistamab protocol — ICANS (Page 4)', abbr:'Teclistamab ICANS', cat:'Myeloma', type:'IPD', group:'order', ref:P(190), drugs:[
    { name:'Criteria ICANS', unit:'fixed', instruct:'☐ ICAN grade 1: ICE score 7-9, Awake spontaneously; ☐ ICAN grade 2: ICE score 3-6, Awake to voice; ☐ ICAN grade 3: ICE score 1-2, Awake only to tactile stimulus, Any clinical seizure focal or generalized that resolves rapidly or non-convulsive seizure on EEG, Focal/local edema on neuroimaging; ☐ ICAN grade 4: ICE score 0, Unarousable or require vigorous or repetitive tactile or stupor or coma, Life-threatening prolong seizure > 5 min, Deep focal motor weakness (hemiparesis or paraparesis), Diffuse cerebral edema on neuroimaging or decerebrate or decorticate or sixth cranial nerve palsy or papilledema or Crushing\'s triad; If ICAN symptoms present please notify (eg. Tremor, severe dizziness, delirium, confusion, agitation, alteration of consciousness, severe headache, aphasia)', days:'เมื่อสงสัย ICANS' },
    { name:'If seizure present', unit:'fixed', instruct:'Notify hematologist, neurologist; If seizure give diazepam 10 mg IV stat; On oxygen canular 3 LPM', days:'เมื่อมี seizure' },
    { name:'ICAN grade 2 — ☐ Dexamethasone', unit:'fixed', instruct:'10 mg IV x 1 dose (can be repeated q 6 hr if no improvement then taper dose)', days:'ICAN grade 2' },
    { name:'ICAN grade 3 (ICU care is recommended)', unit:'fixed', instruct:'☐ Dexamethasone 10 mg IV q 6 hr or ☐ Methylprednisolone (1 mg/kg IV) …… mg in NSS 100 mL IV in 1 hr q 12 hr; Consider repeat neuroimaging (CT or MRI) every 2–3 days if patient has persistent grade ≥3 neurotoxicity', days:'ICAN grade 3', note:'เลือก Dexamethasone หรือ Methylprednisolone อย่างใดอย่างหนึ่ง' },
    { name:'ICAN grade 4 (ICU care, consider mechanical ventilation for airway protection)', unit:'fixed', instruct:'☐ Methylprednisolone 1,000 mg + NSS 100 mL IV in 1 hr x 3 days then 250 mg in NSS 100 mL IV in 1 hr q 12 hr x 2 days then 125 mg in NSS 100 mL IV in 1 hr q 12 hr x 2 days then 60 mg in NSS 100 mL IV in 1 hr q 12 hr x 2 days; Consider repeat neuroimaging (CT or MRI) every 2–3 days if patient has persistent grade ≥3 neurotoxicity; Treat convulsive status epilepticus per institutional guidelines', days:'ICAN grade 4' },
  ]},
]
