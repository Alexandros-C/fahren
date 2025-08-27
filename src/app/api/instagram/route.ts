import { NextResponse } from 'next/server'

// Expects env: IG_ACCESS_TOKEN with permissions for Basic Display/Graph
export async function GET(request: Request) {
  const token = process.env.IG_ACCESS_TOKEN
  const limit = 3
  try {
    if (token) {
      const fields = 'id,caption,media_url,permalink,media_type,thumbnail_url,timestamp'
      const res = await fetch(`https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}&limit=${limit}`, { next: { revalidate: 300 } })
      if (!res.ok) throw new Error('Instagram API error')
      const data = await res.json()
      return NextResponse.json({ items: data.data ?? [] })
    }
    // Fallback mock
    const items = Array.from({ length: 3 }).map((_, i) => ({
      id: String(i + 1),
      caption: `Post ${i + 1}`,
      media_url: '/hero-fallback.jpg',
      permalink: 'https://www.instagram.com/fahren.brand?igsh=MXduMjFldXFwZGR1dQ==',
      media_type: 'IMAGE',
      timestamp: new Date().toISOString(),
    }))
    return NextResponse.json({ items })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

