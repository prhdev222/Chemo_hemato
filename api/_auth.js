// Admin check shared by every write endpoint.
// Trims both sides so a stray space/newline in the ADMIN_PASSWORD env var or in the typed key does not cause a 401.
export function isAdmin(req) {
  const given = String(req.headers['x-admin-key'] || '').trim()
  const expected = String(process.env.ADMIN_PASSWORD || '').trim()
  return expected.length > 0 && given === expected
}
