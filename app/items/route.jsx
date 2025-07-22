export async function POST(request) {
  const formData = await request.formData()
  const name = formData.get('name')
  const password = formData.get('pass')
  return Response.json({ name, password})
}