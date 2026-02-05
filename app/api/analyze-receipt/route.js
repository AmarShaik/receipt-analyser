import { NextResponse } from 'next/server';
import { analyzeReceipt } from '@/lib/gemini';

/**
 * POST /api/analyze-receipt
 * Analyzes a receipt image and extracts structured data
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { imageBase64, mimeType } = body;

    // Validate input
    if (!imageBase64) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      );
    }

    if (!mimeType) {
      return NextResponse.json(
        { error: 'Image mime type is required' },
        { status: 400 }
      );
    }

    // Validate mime type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic'];
    if (!allowedTypes.includes(mimeType)) {
      return NextResponse.json(
        { error: `Invalid image type. Allowed types: ${allowedTypes.join(', ')}` },
        { status: 400 }
      );
    }

    console.log('Analyzing receipt with Gemini API...');
    
    // Call Gemini API
    const receiptData = await analyzeReceipt(imageBase64, mimeType);

    console.log('Receipt analyzed successfully');

    return NextResponse.json({
      success: true,
      data: receiptData,
    });

  } catch (error) {
    console.error('Error in analyze-receipt API:', error);

    // Return appropriate error message
    if (error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured. Please check your environment variables.' },
        { status: 500 }
      );
    }

    if (error.message.includes('Failed to parse')) {
      return NextResponse.json(
        { error: 'Could not extract receipt data. Please try with a clearer image.' },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to analyze receipt' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analyze-receipt
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Receipt analysis API is running',
  });
}