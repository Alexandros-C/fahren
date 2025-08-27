import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/server-auth'

export async function POST(req: Request) {
  const session: any = await getServerSession(authOptions as any)
  if (!session?.user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { amount } = await req.json()
  const updated = await prisma.user.update({ where: { id: session.user.id }, data: { points: { increment: Number(amount) || 0 } } })
  return NextResponse.json({ points: updated.points })
}

