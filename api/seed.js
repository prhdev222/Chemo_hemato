import clientPromise from './_db.js'

const BUILTIN = [
  { name:'3+7 (Idarubicin+Cytarabine)', abbr:'3+7', cat:'AML', type:'IPD', drugs:[
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยา 30 นาที ซ้ำทุก 8 ชม.', days:'D1–D7' },
    { name:'Idarubicin', dose:12, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1–D3', detail:'ระวัง extravasation', note:'Cr>2.5→ลด50%; TB>5→งด' },
    { name:'Cytarabine', dose:100, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV drip in 12 hr', days:'D1–D7' },
  ]},
  { name:'HiDAC (High-dose Ara-C)', abbr:'HiDAC', cat:'AML', type:'IPD', drugs:[
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยา 30 นาที', days:'D1,D3,D5' },
    { name:'Cytarabine (High-dose)', dose:3000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 3 hr', days:'D1,D3,D5 q12h (6 doses)' },
  ]},
  { name:'ALL Induction Phase I (D1–14)', abbr:'ALL Ind I', cat:'ALL', type:'IPD', drugs:[
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยา 30 นาที', days:'D1,D8' },
    { name:'Dexamethasone (premedication)', unit:'fixed', instruct:'10 mg IV ก่อนให้ยา 30 นาที', days:'D1,D8' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, vehicle:'NSS 20 mL', route:'IV bolus', days:'D1,D8', detail:'max 2 mg; ระวัง extravasation' },
    { name:'Doxorubicin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1,D8' },
    { name:'Prednisolone (5mg)', dose:60, unit:'mg/m2', route:'PO pc', days:'D1–D14' },
  ]},
  { name:'ATRA+ATO — APL Low/Int risk', abbr:'ATRA+ATO', cat:'APL', type:'IPD', drugs:[
    { name:'ATRA (10mg)', dose:45, unit:'mg/m2/day', route:'PO เช้า-เย็น pc', days:'D1 จนกว่า CR', note:'ห้ามให้ทาง NG tube' },
    { name:'Arsenic trioxide', dose:0.15, unit:'mg/kg', vehicle:'NSS 250 mL', route:'IV drip in 3 hr', days:'D1 จนกว่า CR', detail:'monitor K, Mg, QTc' },
  ]},
  { name:'ATRA+IDA — APL High risk', abbr:'ATRA+IDA', cat:'APL', type:'IPD', drugs:[
    { name:'ATRA (10mg)', dose:45, unit:'mg/m2/day', route:'PO เช้า-เย็น pc', days:'D1 จนกว่า CR' },
    { name:'Idarubicin', dose:12, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D2,D4,D6,D8', detail:'ระวัง extravasation' },
  ]},
  { name:'Azacytidine', abbr:'Azacytidine', cat:'MDS/AML', type:'OPD', cycleInfo:'28 วัน', drugs:[
    { name:'Ondansetron (8mg)', unit:'fixed', instruct:'1 tab PO ก่อนให้ยา 30 นาที', days:'D1–D7' },
    { name:'Azacytidine', dose:75, unit:'mg/m2', route:'SC', days:'D1–D7', note:'NED; ใบกำกับ' },
  ]},
  { name:'R-CHOP', abbr:'R-CHOP', cat:'Lymphoma', type:'OPD', cycleInfo:'21 วัน', drugs:[
    { name:'Paracetamol (500mg)', unit:'fixed', instruct:'2 tab PO ก่อนให้ rituximab 30 นาที', days:'Day 1' },
    { name:'Benadryl (25mg)', unit:'fixed', instruct:'2 cap PO ก่อนให้ rituximab 30 นาที', days:'Day 1' },
    { name:'Rituximab', dose:375, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV infusion', days:'Day 1', detail:'50→100→150 mL/hr' },
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยา 30 นาที', days:'Day 1' },
    { name:'Dexamethasone', unit:'fixed', instruct:'10 mg IV ก่อนให้ยา 30 นาที', days:'Day 1' },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 1 hr', days:'Day 1' },
    { name:'Doxorubicin', dose:50, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'Day 1', detail:'ระวัง extravasation' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, vehicle:'NSS 20 mL', route:'IV push', days:'Day 1', detail:'max 2 mg' },
    { name:'Prednisolone (5mg)', unit:'fixed', instruct:'5 tab PO tid pc #100', days:'Day 1–5' },
  ]},
  { name:'CHOP', abbr:'CHOP', cat:'Lymphoma', type:'OPD', cycleInfo:'21 วัน', drugs:[
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยา 30 นาที', days:'Day 1' },
    { name:'Dexamethasone', unit:'fixed', instruct:'10 mg IV ก่อนให้ยา 30 นาที', days:'Day 1' },
    { name:'Cyclophosphamide', dose:750, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 1 hr', days:'Day 1' },
    { name:'Doxorubicin', dose:50, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'Day 1', detail:'ระวัง extravasation' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, route:'IV push', days:'Day 1', detail:'max 2 mg' },
    { name:'Prednisolone (5mg)', unit:'fixed', instruct:'5 tab PO tid pc #100', days:'Day 1–5' },
  ]},
  { name:'ABVD', abbr:'ABVD', cat:'Lymphoma', type:'OPD', cycleInfo:'28 วัน', drugs:[
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยา 30 นาที', days:'Day 1,15' },
    { name:'Adriamycin', dose:25, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'Day 1,15' },
    { name:'Bleomycin', dose:10, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'Day 1,15' },
    { name:'Vinblastine', dose:6, unit:'mg/m2', maxDose:10, route:'IV push', days:'Day 1,15', detail:'max 10 mg' },
    { name:'Dacarbazine', dose:375, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 3 hr', days:'Day 1,15' },
  ]},
  { name:'BR (Bendamustine+Rituximab)', abbr:'BR', cat:'Lymphoma', type:'OPD', cycleInfo:'28 วัน', drugs:[
    { name:'Rituximab', dose:375, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV infusion', days:'Day 1', detail:'50→100→150 mL/hr' },
    { name:'Bendamustine', dose:90, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'Day 1–2', note:'NED' },
  ]},
  { name:'ICE', abbr:'ICE', cat:'Lymphoma', type:'OPD', cycleInfo:'21 วัน', drugs:[
    { name:'Ifosfamide', dose:1670, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'Day 1–3' },
    { name:'Mesna', dose:1670, unit:'mg/m2', route:'IV ผสมใน bag เดียวกับ Ifosfamide', days:'Day 1–3' },
    { name:'Carboplatin', unit:'AUC5', vehicle:'D5W 250 mL', route:'IV in 1 hr', days:'Day 2', note:'max 800 mg' },
    { name:'Etoposide', dose:100, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'Day 1–3' },
  ]},
  { name:'R-ICE', abbr:'R-ICE', cat:'Lymphoma', type:'OPD', cycleInfo:'21 วัน', drugs:[
    { name:'Rituximab', dose:375, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV infusion', days:'Day 1', detail:'50→100→150 mL/hr' },
    { name:'Ifosfamide', dose:1670, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'Day 1–3' },
    { name:'Mesna', dose:1670, unit:'mg/m2', route:'IV ผสมใน bag เดียวกับ Ifosfamide', days:'Day 1–3' },
    { name:'Carboplatin', unit:'AUC5', vehicle:'D5W 250 mL', route:'IV in 1 hr', days:'Day 2', note:'max 800 mg' },
    { name:'Etoposide', dose:100, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'Day 1–3' },
  ]},
  { name:'GDP', abbr:'GDP', cat:'Lymphoma', type:'OPD', cycleInfo:'21 วัน', drugs:[
    { name:'Gemcitabine', dose:1000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 30 min', days:'Day 1,8' },
    { name:'Dexamethasone', unit:'fixed', instruct:'40 mg PO OD', days:'Day 1–4' },
    { name:'Cisplatin', dose:75, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'Day 1' },
  ]},
  { name:'VRd (Bortezomib+Lenalidomide+Dex)', abbr:'VRd', cat:'Myeloma', type:'OPD', cycleInfo:'21 วัน', drugs:[
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'SC', days:'Day 1,8,15' },
    { name:'Lenalidomide', unit:'fixed', instruct:'cap PO OD pc', days:'Day 1–14', note:'ใบกำกับ' },
    { name:'Dexamethasone (4mg)', unit:'fixed', instruct:'5 tab PO OD เย็น', days:'Day 1,8,15' },
  ]},
  { name:'Vd (Bortezomib+Dexamethasone)', abbr:'Vd', cat:'Myeloma', type:'OPD', cycleInfo:'21 วัน', drugs:[
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'SC', days:'Day 1,8,15,22' },
    { name:'Dexamethasone (4mg)', unit:'fixed', instruct:'5 tab PO OD เย็น', days:'Day 1,8,15,22' },
  ]},
  { name:'Rd (Lenalidomide+Dexamethasone)', abbr:'Rd', cat:'Myeloma', type:'OPD', cycleInfo:'28 วัน', drugs:[
    { name:'Lenalidomide', unit:'fixed', instruct:'cap PO OD pc', days:'Day 1–21', note:'ใบกำกับ' },
    { name:'Dexamethasone (4mg)', unit:'fixed', instruct:'5 tab PO OD เย็น', days:'Day 1,8,15,22' },
  ]},
  { name:'Chlorambucil', abbr:'Chlorambucil', cat:'CLL', type:'OPD', drugs:[
    { name:'Chlorambucil (2mg)', dose:0.5, unit:'mg/kg', route:'PO', days:'Day 1,15' },
  ]},
  { name:'Ibrutinib Monotherapy', abbr:'Ibrutinib', cat:'CLL', type:'OPD', cycleInfo:'28 วัน (ต่อเนื่อง)', drugs:[
    { name:'Ibrutinib (140mg)', unit:'fixed', instruct:'3 cap PO OD pc (420 mg/วัน) พร้อมน้ำ', days:'Day 1–28 (ต่อเนื่องทุกวัน)', note:'NED; ใบกำกับ; ระวัง atrial fibrillation, bleeding, hypertension' },
  ]},
  { name:'Rituximab Monotherapy (CLL)', abbr:'Rituximab', cat:'CLL', type:'OPD', cycleInfo:'28 วัน', drugs:[
    { name:'Paracetamol (500mg)', unit:'fixed', instruct:'1 tab PO ก่อนให้ rituximab 30 นาที', days:'Day 1' },
    { name:'Benadryl (25mg)', unit:'fixed', instruct:'2 cap PO ก่อนให้ rituximab 30 นาที', days:'Day 1' },
    { name:'Chlorpheniramine', unit:'fixed', instruct:'10 mg IV ก่อนให้ rituximab 30 นาที', days:'Day 1' },
    { name:'Dexamethasone', unit:'fixed', instruct:'10 mg IV ก่อนให้ rituximab 30 นาที', days:'Day 1' },
    { name:'Rituximab', unit:'fixed', instruct:'375 mg/m2 (cycle 1) หรือ 500 mg/m2 (cycle 2+) in NSS 250–500 mL IV infusion', days:'Day 1', detail:'เข็ม 1: 50 mg/hr → เพิ่ม 50 mg/hr ทุก 30 นาที max 400 mg/hr; เข็มต่อไป: 20% ใน 1 ชม. แล้ว 80% ใน 1.5 ชม.', note:'ตรวจ HBsAg, Anti-HBc ก่อน; ถ้า Anti-HBc+ ให้ Lamivudine prophylaxis' },
    { name:'Lamivudine (150mg) [ถ้า Anti-HBc+]', unit:'fixed', instruct:'1 tab PO OD pc', days:'ตลอด treatment + 12 เดือนหลังหยุดยา', note:'กรณี Anti-HBc positive เท่านั้น' },
  ]},

  // ── MULTIPLE MYELOMA ──────────────────────────
  { name:'MP (Melphalan+Prednisolone)', abbr:'MP', cat:'Myeloma', type:'OPD', cycleInfo:'28–42 วัน', drugs:[
    { name:'Melphalan (2mg)', dose:9, unit:'mg/m2', route:'PO ac (ก่อนอาหาร 1 ชม.)', days:'Day 1–4', note:'ปรับ dose ตาม CBC; CCr 10–50→75%; CCr<10→50%' },
    { name:'Prednisolone (5mg)', dose:60, unit:'mg/m2', route:'PO pc', days:'Day 1–4' },
  ]},
  { name:'MPT (Melphalan+Prednisolone+Thalidomide)', abbr:'MPT', cat:'Myeloma', type:'OPD', cycleInfo:'42 วัน', drugs:[
    { name:'Melphalan (2mg)', dose:9, unit:'mg/m2', route:'PO ac (ก่อนอาหาร 1 ชม.)', days:'Day 1–4', note:'CCr 10–50→75%; CCr<10→50%' },
    { name:'Prednisolone (5mg)', dose:60, unit:'mg/m2', route:'PO pc', days:'Day 1–4' },
    { name:'Thalidomide (50mg)', unit:'fixed', instruct:'cap PO OD pc (100–200 mg/วัน ตามที่แพทย์กำหนด)', days:'Day 1–42 (ต่อเนื่อง)', note:'NED; ใบกำกับ; ระวัง DVT ให้ aspirin/LMWH prophylaxis; ระวัง neuropathy' },
  ]},
  { name:'Cd (Cyclophosphamide+Dexamethasone)', abbr:'Cd', cat:'Myeloma', type:'OPD', cycleInfo:'28 วัน', drugs:[
    { name:'Cyclophosphamide (50mg)', dose:300, unit:'mg/m2', route:'PO pc', days:'Day 1,8,15,22', note:'NED' },
    { name:'Dexamethasone (4mg)', unit:'fixed', instruct:'5 tab PO OD pc เย็น', days:'Day 1,8,15,22' },
  ]},
  { name:'CTd (Cyclophosphamide+Thalidomide+Dex)', abbr:'CTd', cat:'Myeloma', type:'OPD', cycleInfo:'28 วัน', drugs:[
    { name:'Cyclophosphamide (50mg)', dose:300, unit:'mg/m2', route:'PO pc', days:'Day 1,8,15,22', note:'NED' },
    { name:'Thalidomide (50mg)', unit:'fixed', instruct:'cap PO OD pc (50–200 mg/วัน ตามที่แพทย์กำหนด)', days:'Day 1–28', note:'NED; ใบกำกับ; ระวัง DVT ให้ aspirin prophylaxis' },
    { name:'Dexamethasone (4mg)', unit:'fixed', instruct:'5 tab PO OD pc เย็น', days:'Day 1,8,15,22' },
  ]},
  { name:'Td (Thalidomide+Dexamethasone)', abbr:'Td', cat:'Myeloma', type:'OPD', cycleInfo:'28 วัน', drugs:[
    { name:'Thalidomide (50mg)', unit:'fixed', instruct:'cap PO OD pc (100–200 mg/วัน ตามที่แพทย์กำหนด)', days:'Day 1–28', note:'NED; ใบกำกับ; ระวัง DVT ให้ aspirin prophylaxis' },
    { name:'Dexamethasone (4mg)', unit:'fixed', instruct:'5 tab PO OD pc เย็น', days:'Day 1,8,15,22' },
  ]},
  { name:'Daratumumab Monotherapy', abbr:'Dara mono', cat:'Myeloma', type:'OPD', drugs:[
    { name:'Dexamethasone 20 mg (premedication)', unit:'fixed', instruct:'20 mg IV ก่อนให้ daratumumab 30 นาที', days:'ตาม schedule' },
    { name:'Paracetamol (500mg)', unit:'fixed', instruct:'2 tab PO ก่อนให้ daratumumab 30 นาที', days:'ตาม schedule' },
    { name:'Chlorpheniramine', unit:'fixed', instruct:'10 mg IV ก่อนให้ daratumumab 30 นาที', days:'ตาม schedule' },
    { name:'Daratumumab', dose:16, unit:'mg/kg', vehicle:'NSS 1,000 mL (เข็ม 1) / 500 mL (เข็ม 2+)', route:'IV infusion', days:'Cy1–2: D1,8,15,22 / Cy3–6: D1,15 / Cy7+: D1', detail:'เข็ม 1: 50→100→150→200 mL/hr; เข็ม 2: 50→100→150→200 mL/hr; เข็ม 3+: 100→150→200 mL/hr (ใช้ Vented Paclitaxel infusion set 0.22 μm)', note:'NED; ใบกำกับ' },
    { name:'Dexamethasone 4mg (post-infusion)', unit:'fixed', instruct:'5 tab PO OD pc Day 2–3 (cycle 1)', days:'Day 2,3 (Cy1)' },
    { name:'Montelukast (10mg)', unit:'fixed', instruct:'1 tab PO ก่อนนอน ×3 วันหลังให้ daratumumab (ป้องกัน delayed IRR)', days:'ตาม schedule' },
  ]},
  { name:'DVd (Daratumumab+Bortezomib+Dex)', abbr:'DVd', cat:'Myeloma', type:'OPD', cycleInfo:'21 วัน', drugs:[
    { name:'Dexamethasone 20 mg (premedication)', unit:'fixed', instruct:'20 mg IV ก่อนให้ daratumumab 30 นาที', days:'Day 1,8,15' },
    { name:'Paracetamol (500mg)', unit:'fixed', instruct:'2 tab PO ก่อนให้ daratumumab 30 นาที', days:'Day 1,8,15' },
    { name:'Chlorpheniramine', unit:'fixed', instruct:'10 mg IV ก่อนให้ daratumumab 30 นาที', days:'Day 1,8,15' },
    { name:'Daratumumab', dose:16, unit:'mg/kg', vehicle:'NSS 500 mL', route:'IV infusion', days:'Cy1–3: D1,8,15 / Cy4–8: D1,15 / Cy9+: D1', detail:'เข็ม 1: 50→100→150→200 mL/hr; เข็ม 3+: 100→150→200 mL/hr', note:'NED; ใบกำกับ' },
    { name:'Bortezomib', dose:1.3, unit:'mg/m2', route:'SC', days:'Cy1–8: D1,4,8,11; Cy9+: D1,8,15,22 (modified)', detail:'Cy1–3: D1,4,8,11 / Cy4–8: D1,4,8,11' },
    { name:'Dexamethasone (4mg)', unit:'fixed', instruct:'5 tab PO OD pc', days:'D2,4,5,8*,9,11,12 (*งด D8 cy1–3 เพราะมี premedication แล้ว)' },
  ]},
  { name:'DRd (Daratumumab+Lenalidomide+Dex)', abbr:'DRd', cat:'Myeloma', type:'OPD', cycleInfo:'28 วัน', drugs:[
    { name:'Dexamethasone 20 mg (premedication)', unit:'fixed', instruct:'20 mg IV ก่อนให้ daratumumab 30 นาที', days:'Day 1,8,15,22' },
    { name:'Paracetamol (500mg)', unit:'fixed', instruct:'2 tab PO ก่อนให้ daratumumab 30 นาที', days:'Day 1,8,15,22' },
    { name:'Chlorpheniramine', unit:'fixed', instruct:'10 mg IV ก่อนให้ daratumumab 30 นาที', days:'Day 1,8,15,22' },
    { name:'Daratumumab', dose:16, unit:'mg/kg', vehicle:'NSS 500 mL', route:'IV infusion', days:'Cy1–2: D1,8,15,22 / Cy3–6: D1,15 / Cy7+: D1', detail:'เข็ม 1: 50→100→150→200 mL/hr; เข็ม 3+: 100→150→200 mL/hr', note:'NED; ใบกำกับ' },
    { name:'Lenalidomide (10,15,25mg)', unit:'fixed', instruct:'cap PO OD pc', days:'Day 1–21', note:'NED; ใบกำกับ' },
    { name:'Dexamethasone (4mg)', unit:'fixed', instruct:'5 tab PO BID pc เย็น (DRd) หรือ 5 tab PO OD (Dara mono)', days:'Day 1,8,15,22' },
    { name:'Dexamethasone (4mg) post-infusion', unit:'fixed', instruct:'5 tab PO OD pc Day 2,3 (สำหรับ Dara mono)', days:'Day 2,3 (Cy1)' },
  ]},
  { name:'DT-PACE (Myeloma Salvage)', abbr:'DT-PACE', cat:'Myeloma', type:'IPD', cycleInfo:'28 วัน', drugs:[
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยา 30 นาที เวลาคลื่นไส้ทุก 8 ชม.', days:'D1–D4' },
    { name:'Hydration: NSS 1,000 mL + KCl 20 mEq', unit:'fixed', instruct:'IV drip in 4 hr ก่อนยาเคมีบำบัด', days:'D1' },
    { name:'Cisplatin', dose:10, unit:'mg/m2', route:'IV in 24 hr via central line (ผสมรวมใน bag เดียวกับ Cy+VP16)', days:'D1–D4', note:'CCr 46–60→50%; CCr 31–45→25%; CCr<30→งด' },
    { name:'Cyclophosphamide', dose:400, unit:'mg/m2', route:'IV in 24 hr via central line (ผสมรวมใน bag เดียวกับ Cis+VP16)', days:'D1–D4', note:'CCr<10→50%; TB>5→งด' },
    { name:'Etoposide (VP16)', dose:40, unit:'mg/m2', vehicle:'NSS 1,000 mL', route:'IV in 24 hr via central line (ผสมรวมกับ Cis+Cy)', days:'D1–D4', note:'CCr 15–50→75%; CCr<15→งด' },
    { name:'Doxorubicin', dose:10, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 24 hr via central line (แยก port)', days:'D1–D4', detail:'ต้องให้ผ่าน central line หรือ port เท่านั้น', note:'TB 1.5–3→50%; TB>5→งด' },
    { name:'Dexamethasone (4mg)', unit:'fixed', instruct:'5 tab PO BID pc', days:'D1–D4' },
    { name:'Thalidomide (50mg)', unit:'fixed', instruct:'cap PO OD pc (ปกติ 50–100 mg/วัน)', days:'D1–D28', note:'NED; ใบกำกับ; ระวัง DVT' },
    { name:'Hydration: NSS 1,000 mL + KCl 20 mEq + 50%MgSO4 20 mEq', unit:'fixed', instruct:'IV drip in 4 hr (หลัง cisplatin วันสุดท้าย)', days:'D5' },
  ]},
  { name:'HD-MTX (DLBCL/ALL — CNS prophylaxis+)', abbr:'HD-MTX', cat:'Lymphoma', type:'IPD', cycleInfo:'21–28 วัน', drugs:[
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยา 30 นาที เวลาคลื่นไส้ทุก 8 ชม.', days:'D1–D2' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, vehicle:'NSS 20 mL', route:'IV push', days:'D1', detail:'ระวัง leak; max 2 mg' },
    { name:'Dexamethasone', unit:'fixed', instruct:'5 mg IV q 6 hr', days:'D1–D4' },
    { name:'Hydration: D5W 1,000 mL + 7.5%NaHCO3 100 mL', unit:'fixed', instruct:'IV drip 120 mL/hr เริ่มอย่างน้อย 12 hr ก่อนให้ MTX → ต่อจนกว่า MTX หมด 48 hr → ดื่มน้ำ >2,000 mL/วัน; Keep urine pH >7, urine output >100 mL/hr', days:'D1–D4', detail:'ช่วง drip MTX ลด rate IV เป็น 100 mL/hr; งด omeprazole, cotrimoxazole' },
    { name:'Methotrexate', dose:1500, unit:'mg/m2', vehicle:'D5W 100 mL', route:'IV in 1 hr', days:'D2', detail:'ตามด้วย MTX 1,650 mg/m2 in D5W 1,000 mL + 7.5%NaHCO3 100 mL IV in 6 hr × 2 ชุด (รวม 3,150 mg/m2 ต่อ cycle)', note:'CCr 30–60→50%; CCr<30→งด; TB 3.1–5→75%; TB>5→งด' },
    { name:'Leucovorin', dose:15, unit:'mg/m2', vehicle:'D5W 20 mL', route:'IV push q 6 hr', days:'เริ่ม D3 (12 hr หลัง MTX หมด)', detail:'หยุดเมื่อ MTX level <0.05 μmol/L; ถ้า MTX >20 μmol/L → Leucovorin 50 mg IV q 6 hr' },
    { name:'IT Cytarabine', unit:'fixed', instruct:'15 mg IT', days:'D7–9, D17–19', detail:'เจาะ MTX level OD จนกว่า <0.05 μmol/L เริ่ม D4 (48 hr หลังเริ่มให้ MTX)' },
  ]},
  { name:'HD-MTX + Ara-C (CNS Lymphoma)', abbr:'HD-MTX-AraC', cat:'Lymphoma', type:'IPD', cycleInfo:'21 วัน', drugs:[
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยา 30 นาที เวลาคลื่นไส้ทุก 8 ชม.', days:'D1–D3' },
    { name:'Dexamethasone', unit:'fixed', instruct:'5 mg IV q 6 hr', days:'D1–D4' },
    { name:'Hydration: D5W 1,000 mL + 7.5%NaHCO3 100 mL', unit:'fixed', instruct:'IV drip 120 mL/hr เริ่มอย่างน้อย 12 hr ก่อนให้ MTX → ต่อจนกว่า MTX หมด 48 hr → ดื่มน้ำ >2 L/วัน; Keep urine pH >7, urine output >100 mL/hr', days:'D1', detail:'ช่วง drip MTX ลด rate IV เป็น 100 mL/hr; งด omeprazole, cotrimoxazole' },
    { name:'Methotrexate', dose:500, unit:'mg/m2', vehicle:'D5W 50 mL', route:'IV in 15 min', days:'D1', detail:'ตามด้วย MTX 3,000 mg/m2 in D5W 500 mL + 7.5%NaHCO3 50 mL IV in 3 hr (รวม 3,500 mg/m2)', note:'CCr 30–60→50%; CCr<30→งด; TB 3.1–5→75%; TB>5→งด' },
    { name:'Leucovorin', dose:15, unit:'mg/m2', vehicle:'D5W 20 mL', route:'IV push q 6 hr', days:'เริ่ม D2 (12 hr หลัง MTX หมด)', detail:'หยุดเมื่อ MTX level <0.05 μmol/L; ถ้า MTX >20 μmol/L → Leucovorin 50 mg IV q 6 hr' },
    { name:'Cytarabine', dose:2000, unit:'mg/m2', vehicle:'NSS 300 mL', route:'IV in 3 hr q 12 hr (รวม 4 doses)', days:'D2–D3', detail:'ตรวจ cerebellar signs ก่อนให้ทุกครั้ง', note:'CCr 40–60→1,000 mg/m2; CCr<40→<200 mg/m2/day' },
    { name:'Dex-oph Eyedrop', unit:'fixed', instruct:'2 drops หยอดตา 2 ข้าง q 8 hr (ป้องกัน conjunctivitis จาก HD Ara-C)', days:'D2–D5' },
  ]},
  { name:'HD-MTX (CNS Prophylaxis — DLBCL)', abbr:'HD-MTX-CNS', cat:'Lymphoma', type:'IPD', cycleInfo:'ตาม cycle หลัก', drugs:[
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยา 30 นาที เวลาคลื่นไส้ทุก 8 ชม.', days:'D2' },
    { name:'Dexamethasone', unit:'fixed', instruct:'10 mg IV ก่อนให้ยา 30 นาที', days:'D2' },
    { name:'Hydration: D5W 1,000 mL + 7.5%NaHCO3 100 mL', unit:'fixed', instruct:'IV drip 120 mL/hr เริ่มอย่างน้อย 12 hr ก่อนให้ MTX → ต่อจนกว่า MTX หมด 48 hr → ดื่มน้ำ >2,000 mL/วัน; Keep urine pH >7, urine output >100 mL/hr', days:'D1–D4', detail:'ช่วง drip MTX ลด rate IV เป็น 100 mL/hr; งด omeprazole, cotrimoxazole' },
    { name:'Methotrexate', dose:1500, unit:'mg/m2', vehicle:'D5W 100 mL', route:'IV in 1 hr', days:'D2', detail:'ตามด้วย MTX 1,500 mg/m2 in D5W 1,000 mL + 7.5%NaHCO3 100 mL IV in 6 hr (รวม 3,000 mg/m2)', note:'CCr 30–60→50%; CCr<30→งด; TB 3.1–5→75%; TB>5→งด' },
    { name:'Leucovorin', dose:15, unit:'mg/m2', vehicle:'D5W 20 mL', route:'IV push q 6 hr', days:'เริ่ม D3 (12 hr หลัง MTX หมด)', detail:'หยุดเมื่อ MTX level <0.05 μmol/L; ถ้า MTX >20 μmol/L → Leucovorin 50 mg IV q 6 hr; เจาะ MTX level OD เริ่ม D4' },
  ]},
  { name:'CODOX-M (Burkitt Lymphoma)', abbr:'CODOX-M', cat:'Lymphoma', type:'IPD', cycleInfo:'Cycle 1,3', drugs:[
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยา 30 นาที เวลาคลื่นไส้ทุก 8 ชม.', days:'D1–D5, D8, D10' },
    { name:'Cyclophosphamide', dose:800, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1', detail:'ตามด้วย Cyclophosphamide 200 mg/m2/day in NSS 100 mL IV in 1 hr D2–D5', note:'CCr<10→50%; TB>5→งด' },
    { name:'Doxorubicin', dose:40, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D1', detail:'ระวัง extravasation', note:'TB 1.5–3→50%; TB>5→งด' },
    { name:'Vincristine', dose:1.4, unit:'mg/m2', maxDose:2, vehicle:'NSS 20 mL', route:'IV push', days:'D1, D8', detail:'ระวัง leak; max 2 mg' },
    { name:'Methotrexate', dose:1200, unit:'mg/m2', vehicle:'D5W 250 mL', route:'IV in 1 hr', days:'D10', detail:'ตามด้วย MTX 2,760 mg/m2 in D5W 1,000 mL + 7.5%NaHCO3 100 mL IV in 10 hr ×2 ชุด', note:'CCr 30–60→50%; CCr<30→งด' },
    { name:'Leucovorin', dose:192, unit:'mg/m2', vehicle:'D5W 50 mL', route:'IV in 10 min', days:'D11 (เริ่ม 12 hr หลัง MTX หมด)', detail:'ตามด้วย Leucovorin 15 mg/m2 IV push q 6 hr จนกว่า MTX <0.05 μmol/L' },
    { name:'IT Cytarabine', unit:'fixed', instruct:'70 mg IT', days:'D1, D3', detail:'ส่ง CSF D1' },
    { name:'IT Methotrexate', unit:'fixed', instruct:'12 mg IT', days:'D15' },
    { name:'Leucovorin (oral หลัง IT MTX)', unit:'fixed', instruct:'15 mg PO 24 hr หลังให้ MTX IT', days:'D16' },
    { name:'Filgrastim (300/480 mcg)', unit:'fixed', instruct:'SC OD จนกว่า ANC >1,000/mm3 (เว้น D8, D10, D15)', days:'เริ่ม D6' },
  ]},
  { name:'IVAC (Burkitt Lymphoma)', abbr:'IVAC', cat:'Lymphoma', type:'IPD', cycleInfo:'Cycle 2,4', drugs:[
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยา 30 นาที เวลาคลื่นไส้ทุก 8 ชม.', days:'D1–D5' },
    { name:'Ifosfamide', dose:1500, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D1–D5', detail:'ผสมพร้อม Mesna ใน bag เดียวกัน', note:'CCr 46–60→80%; CCr<10→งด' },
    { name:'Mesna', dose:1500, unit:'mg/m2', route:'IV ผสมใน bag เดียวกับ Ifosfamide', days:'D1–D5' },
    { name:'Etoposide', dose:60, unit:'mg/m2', vehicle:'NSS 500 mL', route:'IV in 2 hr', days:'D1–D5', note:'CCr 15–50→75%; CCr<15→งด' },
    { name:'Cytarabine', dose:2000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr q 12 hr (รวม 4 doses)', days:'D1, D2', detail:'ตรวจ cerebellar signs ก่อนให้ทุกครั้ง', note:'CCr 40–60→1,000 mg/m2; CCr<40→<200 mg/m2/day' },
    { name:'IT Methotrexate', unit:'fixed', instruct:'12 mg IT', days:'D5', detail:'ส่ง CSF; ตรวจ capillary blood glucose หลัง LP' },
    { name:'Leucovorin (oral หลัง IT MTX)', unit:'fixed', instruct:'15 mg PO 24 hr หลังให้ MTX IT', days:'D6' },
    { name:'Filgrastim (300/480 mcg)', unit:'fixed', instruct:'SC OD จนกว่า ANC >1,000/mm3', days:'เริ่ม D6' },
  ]},
  { name:'Hyper-CVAD — Part A (cycle 1,3,5,7)', abbr:'HyperCVAD-A', cat:'ALL', type:'IPD', cycleInfo:'สลับกับ Part B', drugs:[
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยา 30 นาที เวลาคลื่นไส้ทุก 8 ชม.', days:'D1–D4, D8, D11' },
    { name:'Cyclophosphamide', dose:300, unit:'mg/m2', vehicle:'NSS 100 mL', route:'IV in 1 hr q 12 hr (6 doses)', days:'D1–D3', detail:'รวม 6 doses; 600 mg/m2/day', note:'CCr<10→50%; TB>5→งด' },
    { name:'Mesna', dose:300, unit:'mg/m2', route:'IV in 5%D/N/2 1,000 mL in 12 hr (6 doses) เริ่มพร้อม Cyclophosphamide', days:'D1–D3' },
    { name:'Vincristine', unit:'fixed', instruct:'2 mg in NSS 20 mL IV push ระวัง leak', days:'D4, D11', note:'TB 1.5–3→50%; TB>3.1→งด' },
    { name:'Doxorubicin', dose:50, unit:'mg/m2', vehicle:'NSS 50 mL', route:'IV in 10 min', days:'D4', detail:'ระวัง extravasation', note:'TB 1.5–3→50%; TB>5→งด' },
    { name:'Dexamethasone', unit:'fixed', instruct:'Dexamethasone (4 mg) 5 tab PO bid pc หรือ 10 mg IV q 6 hr', days:'D1–D4, D11–D14' },
    { name:'IT Methotrexate', unit:'fixed', instruct:'12 mg IT', days:'D2', detail:'ส่ง CSF; ตรวจ capillary blood glucose หลัง LP' },
    { name:'IT Cytarabine', unit:'fixed', instruct:'100 mg IT', days:'D8' },
    { name:'Filgrastim (300/480 mcg)', unit:'fixed', instruct:'SC OD จนกว่า ANC >1,000/mm3 (เว้น D8, D11)', days:'เริ่ม D5' },
    { name:'Cotrimoxazole DS', unit:'fixed', instruct:'1 tab PO OD วันจันทร์ พุธ ศุกร์ (PCP prophylaxis)', days:'ตลอด treatment' },
  ]},
  { name:'Hyper-CVAD — Part B (cycle 2,4,6,8)', abbr:'HyperCVAD-B', cat:'ALL', type:'IPD', cycleInfo:'สลับกับ Part A', drugs:[
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยา 30 นาที เวลาคลื่นไส้ทุก 8 ชม.', days:'D1–D3, D8' },
    { name:'Methylprednisolone', unit:'fixed', instruct:'50 mg in D5W 100 mL IV in 30 min q 12 hr (6 doses)', days:'D1–D3' },
    { name:'Methotrexate', dose:200, unit:'mg/m2', vehicle:'D5W 500 mL', route:'IV in 3 hr', days:'D1', detail:'ตามด้วย MTX 800 mg/m2 in D5W 1,000 mL IV in 20 hr D1', note:'CCr 30–60→50%; CCr<30→งด' },
    { name:'Leucovorin', dose:15, unit:'mg/m2', vehicle:'D5W 20 mL', route:'IV push q 6 hr', days:'เริ่ม D2 (12 hr หลัง MTX หมด)', detail:'หยุดเมื่อ MTX level <0.05 μmol/L; ถ้า MTX >20→Leucovorin 50 mg IV q 6 hr' },
    { name:'Cytarabine', dose:3000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr q 12 hr (4 doses)', days:'D2–D3', detail:'ตรวจ cerebellar signs ก่อนให้ทุกครั้ง', note:'CCr 40–60→1,000 mg/m2; CCr<40→<200 mg/m2/day' },
    { name:'Dex-oph Eyedrop', unit:'fixed', instruct:'2 drops หยอดตา 2 ข้าง q 8 hr (ป้องกัน conjunctivitis จาก HD Ara-C)', days:'D2–D4' },
    { name:'IT Methotrexate', unit:'fixed', instruct:'12 mg IT', days:'D2', detail:'ส่ง CSF; ตรวจ MTX level OD จนกว่า <0.05 μmol/L เริ่ม D3' },
    { name:'IT Cytarabine', unit:'fixed', instruct:'100 mg IT', days:'D8' },
    { name:'Filgrastim (300/480 mcg)', unit:'fixed', instruct:'SC OD จนกว่า ANC >1,000/mm3 (เว้น D8)', days:'เริ่ม D5' },
  ]},
  { name:'ESHAP', abbr:'ESHAP', cat:'Lymphoma', type:'OPD', cycleInfo:'21–28 วัน', drugs:[
    { name:'Ondansetron', unit:'fixed', instruct:'8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที', days:'D1–D4' },
    { name:'Etoposide', dose:40, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 1 hr', days:'D1–D4' },
    { name:'Methylprednisolone (Solu-Medrol)', unit:'fixed', instruct:'500 mg IV in 15 min', days:'D1–D4', note:'หรือ Prednisolone 500 mg PO' },
    { name:'Cytarabine (Ara-C)', dose:2000, unit:'mg/m2', vehicle:'NSS 250 mL', route:'IV in 2 hr', days:'D5', detail:'ให้หลัง cisplatin วันสุดท้าย; ระวัง conjunctivitis ให้ prednisolone eyedrop' },
    { name:'Cisplatin', dose:25, unit:'mg/m2', vehicle:'NSS 1000 mL', route:'IV continuous infusion in 24 hr', days:'D1–D4', detail:'total dose 100 mg/m²; hydration ก่อน-หลัง; monitor Cr, electrolytes' },
  ]},
]

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.headers['x-admin-key'] !== process.env.ADMIN_PASSWORD)
    return res.status(401).json({ error: 'Unauthorized' })

  if (req.method !== 'POST')
    return res.status(405).json({ error: 'POST only' })

  const client = await clientPromise
  const db = client.db('chemo_order')

  // ล้างของเก่า
  await db.collection('regimens').deleteMany({})
  await db.collection('drugs').deleteMany({})

  let count = 0
  for (const reg of BUILTIN) {
    const { drugs, ...regData } = reg
    regData.is_active = true
    regData.created_at = new Date()
    regData.updated_at = new Date()

    const result = await db.collection('regimens').insertOne(regData)
    const regimenId = result.insertedId.toString()

    if (drugs?.length > 0) {
      const drugDocs = drugs.map((d, i) => ({
        ...d,
        regimen_id: regimenId,
        sort_order: i,
        created_at: new Date()
      }))
      await db.collection('drugs').insertMany(drugDocs)
    }
    count++
  }

  res.status(200).json({ ok: true, seeded: count })
}
