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
