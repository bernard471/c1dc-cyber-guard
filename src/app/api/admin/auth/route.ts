import { NextResponse } from 'next/server'

const ADMIN_CREDENTIALS = [
  { username: 'cyber1', password: 'c1dcCommunications' },
  { username: 'admin2', password: 'secure_password2' }
]

export async function POST(req: Request) {
  const { username, password } = await req.json()
  
  const isValidAdmin = ADMIN_CREDENTIALS.some(
    admin => admin.username === username && admin.password === password
  )

  if (isValidAdmin) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin-token', 'your-secure-admin-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    })
    return response
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
