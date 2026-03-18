const BASE = '/api'

export async function fetchRegimens() {
  const res = await fetch(`${BASE}/regimens`)
  if (!res.ok) throw new Error('โหลดข้อมูลไม่ได้')
  return res.json()
}

export async function createRegimen(data, adminKey) {
  const res = await fetch(`${BASE}/regimens`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('สร้างสูตรไม่ได้')
  return res.json()
}

export async function updateRegimen(id, data, adminKey) {
  const res = await fetch(`${BASE}/regimens/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('แก้ไขสูตรไม่ได้')
  return res.json()
}

export async function deleteRegimen(id, adminKey) {
  const res = await fetch(`${BASE}/regimens/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-key': adminKey }
  })
  if (!res.ok) throw new Error('ลบสูตรไม่ได้')
  return res.json()
}

export async function seedRegimens(adminKey) {
  const res = await fetch(`${BASE}/seed`, {
    method: 'POST',
    headers: { 'x-admin-key': adminKey }
  })
  if (!res.ok) throw new Error('seed ไม่ได้')
  return res.json()
}
