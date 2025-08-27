import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const { token, password } = await req.json()
  if (!token || !password) return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  const row = await prisma.passwordResetToken.findUnique({ where: { token } })
  if (!row || row.expiresAt < new Date()) return NextResponse.json({ error: 'Token inválido o vencido' }, { status: 400 })
  const hash = await bcrypt.hash(password, 10)
  await prisma.user.update({ where: { id: row.userId }, data: { password: hash } })
  await prisma.passwordResetToken.delete({ where: { token } })
  return NextResponse.json({ ok: true })
}

