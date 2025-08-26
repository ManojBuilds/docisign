// app/api/convert-to-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Check file type
    const allowedTypes = [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-word.document.macroEnabled.12',
      'application/rtf',
      'application/vnd.oasis.opendocument.text'
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Unsupported file type. Only DOC, DOCX, DOCM, RTF, and ODT files are supported.' 
      }, { status: 400 })
    }

    // Check file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ 
        error: 'File too large. Maximum size is 50MB.' 
      }, { status: 400 })
    }

    // Get conversion service URL from environment
    const conversionServiceUrl = process.env.CONVERSION_SERVICE_URL || 'http://localhost:3001'
    
    // Create FormData for the conversion service
    const convertFormData = new FormData()
    convertFormData.append('file', file)

    // Call your conversion service
    const convertResponse = await fetch(`${conversionServiceUrl}/api/convert/to-pdf`, {
      method: 'POST',
      body: convertFormData,
      headers: {
        // Don't set Content-Type header, let fetch set it with boundary
      },
    })

    if (!convertResponse.ok) {
      const errorData = await convertResponse.json().catch(() => ({ 
        error: 'Conversion service error' 
      }))
      
      console.error('Conversion service error:', {
        status: convertResponse.status,
        statusText: convertResponse.statusText,
        error: errorData
      })
      
      return NextResponse.json({ 
        error: `Conversion failed: ${errorData.message || errorData.error || convertResponse.statusText}` 
      }, { status: 500 })
    }

    // Get the PDF buffer from the conversion service
    const pdfBuffer = await convertResponse.arrayBuffer()
    
    if (!pdfBuffer || pdfBuffer.byteLength === 0) {
      return NextResponse.json({ 
        error: 'Conversion resulted in empty PDF' 
      }, { status: 500 })
    }

    // Return the PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBuffer.byteLength.toString(),
        'X-Conversion-Service': 'self-hosted-libreoffice',
        'X-Original-Filename': file.name,
        'X-PDF-Size': pdfBuffer.byteLength.toString(),
      },
    })

  } catch (error) {
    console.error('Conversion error:', error)
    
    // Handle different types of errors
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        return NextResponse.json({ 
          error: 'Conversion service unavailable. Please ensure the PDF conversion service is running.' 
        }, { status: 503 })
      }
      
      if (error.message.includes('timeout')) {
        return NextResponse.json({ 
          error: 'Conversion timeout. The document may be too complex or large.' 
        }, { status: 504 })
      }
    }
    
    return NextResponse.json({ 
      error: 'Internal server error during conversion',
      message: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
    }, { status: 500 })
  }
}

// Health check endpoint to verify conversion service
export async function GET() {
  try {
    const conversionServiceUrl = process.env.CONVERSION_SERVICE_URL || 'http://localhost:3001'
    
    const healthResponse = await fetch(`${conversionServiceUrl}/api/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!healthResponse.ok) {
      throw new Error(`Health check failed: ${healthResponse.statusText}`)
    }

    const healthData = await healthResponse.json()

    return NextResponse.json({
      status: 'healthy',
      conversionService: {
        url: conversionServiceUrl,
        status: healthData.status,
        uptime: healthData.uptime,
      },
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Health check error:', error)
    
    return NextResponse.json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      conversionService: {
        url: process.env.CONVERSION_SERVICE_URL || 'http://localhost:3001',
        status: 'unreachable',
      },
      timestamp: new Date().toISOString(),
    }, { status: 503 })
  }
}
