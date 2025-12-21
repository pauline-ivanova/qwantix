import { NextResponse } from 'next/server';
import { sanitizeString, checkRateLimit, getClientIp } from '@/lib/security';

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting
    const ip = getClientIp(request);
    const { success } = checkRateLimit(ip, { limit: 5, windowMs: 60 * 1000 }); // 5 requests per minute
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, company, phoneNumber, message, honeypot, turnstileToken } = body;

    // 2. Honeypot check (hidden field should be empty)
    if (honeypot) {
      console.warn('Honeypot triggered');
      return NextResponse.json({ success: true }); // Silent fail for bots
    }

    // 3. Turnstile Verification (if token is provided and secret is configured)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && turnstileToken) {
      const verifyResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(turnstileToken)}&remoteip=${encodeURIComponent(ip)}`,
        }
      );
      const verifyData = await verifyResponse.json();
      if (!verifyData.success) {
        return NextResponse.json({ error: 'Invalid captcha token' }, { status: 400 });
      }
    }

    // 4. Sanitize data
    const sanitizedData = {
      name: sanitizeString(name),
      email: sanitizeString(email),
      company: sanitizeString(company),
      phone: sanitizeString(phoneNumber),
      message: sanitizeString(message),
    };

    // 5. Send to Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const text = `
<b>🚀 New Lead from Qwantix</b>
<b>Name:</b> ${sanitizedData.name}
<b>Email:</b> ${sanitizedData.email}
<b>Phone:</b> ${sanitizedData.phone || 'N/A'}
<b>Company:</b> ${sanitizedData.company || 'N/A'}
<b>Message:</b>
${sanitizedData.message}
      `.trim();

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'HTML',
        }),
      });
    } else {
      console.warn('Telegram bot token or chat ID not configured');
      // In a real scenario, you might want to log this or send an email instead
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
