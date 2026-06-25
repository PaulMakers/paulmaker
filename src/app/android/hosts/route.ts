import { NextResponse } from 'next/server';

/**
 * Endpoint ini mengembalikan teks mentah (plain text) berisi konfigurasi hosts.
 * Link ini yang harus dimasukkan ke dalam aplikasi seperti PowerTunnel atau Hosts Editor.
 */
export async function GET() {
  const hostsContent = `5.39.46.38 growtopia1.com
5.39.46.38 growtopia2.com
5.39.46.38 www.growtopia1.com
5.39.46.38 www.growtopia2.com`;

  return new NextResponse(hostsContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
