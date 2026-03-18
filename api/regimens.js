import clientPromise from './_db.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-admin-key')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const client = await clientPromise
  const db = client.db('chemo_order')

  // GET — ดึงสูตรทั้งหมด พร้อม drugs
  if (req.method === 'GET') {
    const regimens = await db.collection('regimens')
      .find({ is_active: { $ne: false } })
      .sort({ cat: 1, name: 1 })
      .toArray()

    const drugs = await db.collection('drugs')
      .find({})
      .sort({ sort_order: 1 })
      .toArray()

    const result = regimens.map(reg => ({
      ...reg,
      id: reg._id.toString(),
      drugs: drugs
        .filter(d => d.regimen_id === reg._id.toString())
        .map(d => ({ ...d, id: d._id.toString() }))
    }))

    return res.status(200).json(result)
  }

  // POST — สร้าง regimen ใหม่ (admin only)
  if (req.method === 'POST') {
    if (req.headers['x-admin-key'] !== process.env.ADMIN_PASSWORD)
      return res.status(401).json({ error: 'Unauthorized' })

    const { drugs, ...regimenData } = req.body
    regimenData.is_active = true
    regimenData.created_at = new Date()
    regimenData.updated_at = new Date()

    const regResult = await db.collection('regimens').insertOne(regimenData)
    const regimenId = regResult.insertedId.toString()

    if (drugs && drugs.length > 0) {
      const drugDocs = drugs.map((d, i) => ({
        ...d,
        regimen_id: regimenId,
        sort_order: i,
        created_at: new Date()
      }))
      await db.collection('drugs').insertMany(drugDocs)
    }

    return res.status(201).json({ id: regimenId })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
