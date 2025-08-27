import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import crypto from 'node:crypto'
import { sendResetEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()
    if (!email || !password) return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) return NextResponse.json({ error: 'Usuario ya registrado' }, { status: 400 })
    const hash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({ data: { email, password: hash, name } })
    const token = crypto.randomBytes(24).toString('hex')
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24)
    await prisma.emailVerificationToken.create({ data: { token, userId: user.id, expiresAt } })
    const verifyUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/verificar/${token}`
    try { await sendResetEmail(email, verifyUrl) } catch {}
    return NextResponse.json({ id: user.id, email: user.email, verifyUrl })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

