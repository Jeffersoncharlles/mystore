import type { NextRequest } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {}
