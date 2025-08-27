import { Resend } from 'resend'

const resendKey = process.env.RESEND_API_KEY
const resend = resendKey ? new Resend(resendKey) : null

export async function sendResetEmail(to: string, resetUrl: string) {
  if (!resend) return { skipped: true }
  const from = process.env.EMAIL_FROM || 'no-reply@fahren.dev'
  const subject = 'Restablecer tu contraseña — Fahren'
  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;padding:16px;background:#0f1115;color:#e5e7eb">
      <h2 style="color:#fff;margin:0 0 12px">Restablecer tu contraseña</h2>
      <p>Hacé clic en el siguiente enlace para crear una nueva contraseña:</p>
      <p><a href="${resetUrl}" style="color:#7c5cff">${resetUrl}</a></p>
      <p style="opacity:.7">Si no solicitaste este cambio, ignorá este mensaje.</p>
    </div>
  `
  await resend.emails.send({ from, to, subject, html })
  return { sent: true }
}

