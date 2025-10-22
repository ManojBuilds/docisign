import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get the client IP from the headers
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    
    // Handle possible array of IPs in x-forwarded-for
    const ip = forwarded 
      ? Array.isArray(forwarded) 
        ? forwarded[0] 
        : forwarded.split(',')[0].trim()
      : realIp || 'unknown';

    return Response.json({ 
      ip: ip,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'unknown'
    });
  } catch (error) {
    console.error('Error getting client info:', error);
    return Response.json({ 
      ip: 'unknown',
      error: 'Could not determine client IP'
    }, { status: 500 });
  }
}