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
  if (!res.ok) throw httpError(res, 'สร้างสูตรไม่ได้')
  return res.json()
}

export async function updateRegimen(id, data, adminKey) {
  const res = await fetch(`${BASE}/regimens/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw httpError(res, 'แก้ไขสูตรไม่ได้')
  return res.json()
}

export async function deleteRegimen(id, adminKey) {
  const res = await fetch(`${BASE}/regimens/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-key': adminKey }
  })
  if (!res.ok) throw httpError(res, 'ลบสูตรไม่ได้')
  return res.json()
}

export async function seedRegimens(adminKey) {
  const res = await fetch(`${BASE}/seed`, {
    method: 'POST',
    headers: { 'x-admin-key': adminKey }
  })
  if (!res.ok) throw httpError(res, 'seed ไม่ได้')
  return res.json()
}

function httpError(res, what) {
  if (res.status === 401) return new Error('รหัส admin ไม่ถูกต้อง (401)')
  if (res.status === 504) return new Error(what + ' — server timeout (504)')
  return new Error(`${what} (HTTP ${res.status})`)
}
