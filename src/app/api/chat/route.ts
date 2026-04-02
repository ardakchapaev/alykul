import { NextRequest, NextResponse } from 'next/server';

const AI_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://alykul.baimuras.pro/api/v1';

export async function POST(request: NextRequest) {
  try {
    const { messages, sessionId, userId, customerName, customerPhone } = await request.json();

    // Get the last user message
    const lastUserMessage = messages.filter((m: { role: string }) => m.role === 'user').pop();
    if (!lastUserMessage) {
      return NextResponse.json({ text: null, fallback: true });
    }

    // Call unified AI backend
    const response = await fetch(`${AI_API_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channel: 'website',
        channel_user_id: sessionId || `web_${Date.now()}`,
        message: lastUserMessage.text,
        user_id: userId || null,
        customer_name: customerName || null,
        customer_phone: customerPhone || null,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ text: null, fallback: true });
    }

    const data = await response.json();
    return NextResponse.json({ text: data.response, fallback: false });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ text: null, fallback: true });
  }
}
