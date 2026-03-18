import { ObjectId } from 'mongodb'
import clientPromise from './_db.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-admin-key')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const isAdmin = req.headers['x-admin-key'] === process.env.ADMIN_PASSWORD
  if (!isAdmin) return res.status(401).json({ error: 'Unauthorized' })

  const client = await clientPromise
  const db = client.db('chemo_order')
  const { id } = req.query

  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' })
  const oid = new ObjectId(id)

  // PUT — แก้ไข regimen
  if (req.method === 'PUT') {
    const { drugs, ...regimenData } = req.body
    regimenData.updated_at = new Date()

    await db.collection('regimens').updateOne(
      { _id: oid },
      { $set: regimenData }
    )

    if (drugs) {
      // ลบ drugs เก่า แล้วใส่ใหม่
      await db.collection('drugs').deleteMany({ regimen_id: id })
      if (drugs.length > 0) {
        const drugDocs = drugs.map((d, i) => ({
          ...d,
          regimen_id: id,
          sort_order: i,
          updated_at: new Date()
        }))
        await db.collection('drugs').insertMany(drugDocs)
      }
    }

    return res.status(200).json({ ok: true })
  }

  // DELETE — ลบ regimen (soft delete)
  if (req.method === 'DELETE') {
    await db.collection('regimens').updateOne(
      { _id: oid },
      { $set: { is_active: false, deleted_at: new Date() } }
    )
    return res.status(200).json({ ok: true })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
