import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { token } = await req.json()
  if (!token) return NextResponse.json({ error: 'Token requerido' }, { status: 400 })
  const row = await prisma.emailVerificationToken.findUnique({ where: { token } })
  if (!row || row.expiresAt < new Date()) return NextResponse.json({ error: 'Token inválido o vencido' }, { status: 400 })
  await prisma.user.update({ where: { id: row.userId }, data: { emailVerified: true } })
  await prisma.emailVerificationToken.delete({ where: { token } })
  return NextResponse.json({ ok: true })
}

