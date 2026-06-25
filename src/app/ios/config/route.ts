import { NextResponse } from 'next/server';

/**
 * Endpoint ini mengembalikan teks mentah (plain text) berisi konfigurasi untuk iOS.
 * Link ini bisa digunakan pada aplikasi seperti Surge atau Shadowrocket.
 */
export async function GET() {
  const iosConfig = `[General]
bypass-system = true

[Rule]
FINAL,DIRECT

[Host]
growtopia1.com = 5.39.46.38
growtopia2.com = 5.39.46.38
www.growtopia1.com = 5.39.46.38
www.growtopia2.com = 5.39.46.38`;

  return new NextResponse(iosConfig, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
