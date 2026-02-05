import { NextResponse } from 'next/server';

/**
 * GET /api/receipts
 * Get all receipts (placeholder for future database integration)
 */
export async function GET() {
  // For now, receipts are stored in localStorage on the client
  // This endpoint is a placeholder for future database integration
  return NextResponse.json({
    message: 'Receipts are stored in localStorage. Use the client-side storage utility.',
    note: 'This endpoint will be used when MongoDB integration is added.',
  });
}

/**
 * POST /api/receipts
 * Create a new receipt (placeholder for future database integration)
 */
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate receipt data
    if (!body.merchant || !body.date || !body.total) {
      return NextResponse.json(
        { error: 'Missing required fields: merchant, date, or total' },
        { status: 400 }
      );
    }

    // For now, return success - actual storage happens on client
    return NextResponse.json({
      success: true,
      message: 'Receipt data validated. Store using client-side storage.',
      data: body,
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

/**
 * PUT /api/receipts
 * Update a receipt (placeholder for future database integration)
 */
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Receipt ID is required' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Receipt update validated. Store using client-side storage.',
      data: { id, ...updates },
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/receipts
 * Delete a receipt (placeholder for future database integration)
 */
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Receipt ID is required' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Receipt deletion validated. Remove using client-side storage.',
      id,
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}