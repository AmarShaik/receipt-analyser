import { NextResponse } from 'next/server';
import { generateInsights } from '@/lib/gemini';

/**
 * POST /api/generate-insights
 * Generates AI-powered financial insights from receipts and budgets
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { receipts, budgets } = body;

    // Validate input
    if (!receipts || !Array.isArray(receipts)) {
      return NextResponse.json(
        { error: 'Receipts array is required' },
        { status: 400 }
      );
    }

    if (receipts.length === 0) {
      return NextResponse.json(
        { error: 'At least one receipt is required to generate insights' },
        { status: 400 }
      );
    }

    if (!budgets || typeof budgets !== 'object') {
      return NextResponse.json(
        { error: 'Budgets object is required' },
        { status: 400 }
      );
    }

    console.log(`Generating insights for ${receipts.length} receipts...`);
    
    // Call Gemini API
    const insights = await generateInsights(receipts, budgets);

    console.log('Insights generated successfully');

    return NextResponse.json({
      success: true,
      data: insights,
    });

  } catch (error) {
    console.error('Error in generate-insights API:', error);

    // Return appropriate error message
    if (error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured. Please check your environment variables.' },
        { status: 500 }
      );
    }

    if (error.message.includes('No receipts')) {
      return NextResponse.json(
        { error: 'No receipts to analyze' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to generate insights' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/generate-insights
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Insights generation API is running',
  });
}