import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'node:crypto'
import { sendResetEmail } from '@/lib/email'

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email requerido' }, { status: 400 })
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ ok: true })
  const token = crypto.randomBytes(24).toString('hex')
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30)
  await prisma.passwordResetToken.create({ data: { token, userId: user.id, expiresAt } })
  const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/restablecer/${token}`
  try { await sendResetEmail(email, resetUrl) } catch {}
  return NextResponse.json({ ok: true })
}

