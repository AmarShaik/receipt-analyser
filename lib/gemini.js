/**
 * Gemini API Client
 * Handles all interactions with Google's Gemini API
 */

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

/**
 * Analyze receipt image and extract structured data
 * @param {string} imageBase64 - Base64 encoded image
 * @param {string} mimeType - Image mime type (e.g., 'image/jpeg')
 * @returns {Promise<Object>} - Extracted receipt data
 */
export async function analyzeReceipt(imageBase64, mimeType) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file.');
  }

  try {
    const response = await fetch(
      `${GEMINI_API_URL}/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                inline_data: {
                  mime_type: mimeType,
                  data: imageBase64
                }
              },
              {
                text: `You are an expert receipt analyzer. Analyze this receipt image and extract ALL information in valid JSON format.

IMPORTANT RULES:
1. Return ONLY valid JSON, no markdown, no backticks, no explanation
2. Be precise with numbers - extract exactly what you see
3. For dates, use YYYY-MM-DD format
4. Categorize each item appropriately
5. If you cannot read something, use null (not "unknown" or empty string)

Return this exact JSON structure:
{
  "merchant": "exact store/restaurant name",
  "date": "YYYY-MM-DD",
  "total": number (total amount paid),
  "subtotal": number (subtotal before tax, if visible),
  "tax": number (tax amount, if visible),
  "items": [
    {
      "name": "item name",
      "quantity": number (default to 1 if not specified),
      "price": number (price per unit),
      "category": "food/transport/shopping/entertainment/healthcare/utilities/education/other"
    }
  ],
  "paymentMethod": "Cash/Credit Card/Debit Card/UPI/Digital Wallet/Bank Transfer/Other"
}

Category Guidelines:
- food: groceries, restaurants, cafes, food delivery
- transport: uber, gas, parking, public transport, car services
- shopping: clothing, electronics, home goods, general retail
- entertainment: movies, games, subscriptions, events
- healthcare: pharmacy, doctor, medical supplies
- utilities: electricity, water, internet, phone bills
- education: books, courses, school supplies
- other: anything that doesn't fit above

Extract data now:`
              }
            ]
          }],
          generationConfig: {
            temperature: 0.1,
            topK: 32,
            topP: 1,
            maxOutputTokens: 2048,
          },
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract the text response
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textContent) {
      throw new Error('No response from Gemini API');
    }

    // Clean the response - remove markdown code blocks if present
    let cleanedText = textContent.trim();
    cleanedText = cleanedText.replace(/```json\s*/g, '');
    cleanedText = cleanedText.replace(/```\s*/g, '');
    cleanedText = cleanedText.trim();

    // Parse JSON
    let receiptData;
    try {
      receiptData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Raw response:', textContent);
      throw new Error('Failed to parse receipt data. The AI response was not valid JSON.');
    }

    // Validate required fields
    if (!receiptData.merchant || !receiptData.date || !receiptData.total) {
      throw new Error('Incomplete receipt data. Missing required fields.');
    }

    // Ensure items array exists
    if (!Array.isArray(receiptData.items)) {
      receiptData.items = [];
    }

    // Validate and clean data
    receiptData.total = Number(receiptData.total) || 0;
    receiptData.subtotal = Number(receiptData.subtotal) || null;
    receiptData.tax = Number(receiptData.tax) || null;
    
    receiptData.items = receiptData.items.map(item => ({
      name: item.name || 'Unknown Item',
      quantity: Number(item.quantity) || 1,
      price: Number(item.price) || 0,
      category: item.category || 'other',
    }));

    return receiptData;

  } catch (error) {
    console.error('Error analyzing receipt:', error);
    throw error;
  }
}

/**
 * Generate financial insights from receipts and budgets
 * @param {Array} receipts - Array of receipt objects
 * @param {Object} budgets - Budget object with category amounts
 * @returns {Promise<Object>} - AI-generated insights
 */
export async function generateInsights(receipts, budgets) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured.');
  }

  if (!receipts || receipts.length === 0) {
    throw new Error('No receipts to analyze');
  }

  try {
    // Prepare receipt summary for analysis
    const receiptSummary = receipts.map(r => ({
      merchant: r.merchant,
      date: r.date,
      total: r.total,
      items: r.items?.map(i => ({
        name: i.name,
        price: i.price,
        category: i.category
      }))
    }));

    // Calculate current spending by category
    const currentSpending = {};
    receipts.forEach(receipt => {
      receipt.items?.forEach(item => {
        const cat = item.category || 'other';
        currentSpending[cat] = (currentSpending[cat] || 0) + item.price;
      });
    });

    const response = await fetch(
      `${GEMINI_API_URL}/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a personal finance advisor. Analyze these transactions and budgets to provide actionable insights.

TRANSACTION DATA:
${JSON.stringify(receiptSummary, null, 2)}

BUDGET DATA:
${JSON.stringify(budgets, null, 2)}

CURRENT SPENDING BY CATEGORY:
${JSON.stringify(currentSpending, null, 2)}

Provide a comprehensive financial analysis in this EXACT JSON format (no markdown, no backticks):

{
  "totalSpent": number (total amount spent across all receipts),
  "budgetUtilization": number (percentage of total budget used, 0-100),
  "topCategory": "category with highest spending",
  "topMerchant": "merchant with most transactions or highest total",
  "insights": [
    "Specific insight 1 with numbers and actionable advice",
    "Specific insight 2 with numbers and actionable advice",
    "Specific insight 3 with numbers and actionable advice",
    "Specific insight 4 with numbers and actionable advice"
  ],
  "budgetRecommendations": [
    "Specific budget recommendation 1 with numbers",
    "Specific budget recommendation 2 with numbers"
  ],
  "savingOpportunities": [
    "Specific saving opportunity 1 with estimated amount",
    "Specific saving opportunity 2 with estimated amount",
    "Specific saving opportunity 3 with estimated amount"
  ],
  "spendingTrend": "increasing/decreasing/stable",
  "unusualTransactions": [
    "Description of unusual transaction 1",
    "Description of unusual transaction 2"
  ],
  "predictedNextMonth": number (predicted spending for next month),
  "financialHealthScore": number (0-100, where 100 is excellent)
}

Guidelines for insights:
- Be specific with numbers and percentages
- Provide actionable advice, not generic tips
- Compare spending to budgets
- Identify patterns and anomalies
- Be encouraging but honest
- Focus on the biggest opportunities for improvement
- Use actual merchant names and categories from the data

Generate insights now:`
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            topK: 32,
            topP: 1,
            maxOutputTokens: 2048,
          },
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textContent) {
      throw new Error('No response from Gemini API');
    }

    // Clean the response
    let cleanedText = textContent.trim();
    cleanedText = cleanedText.replace(/```json\s*/g, '');
    cleanedText = cleanedText.replace(/```\s*/g, '');
    cleanedText = cleanedText.trim();

    // Parse JSON
    let insights;
    try {
      insights = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Raw response:', textContent);
      throw new Error('Failed to parse insights. The AI response was not valid JSON.');
    }

    // Validate and set defaults
    return {
      totalSpent: Number(insights.totalSpent) || 0,
      budgetUtilization: Number(insights.budgetUtilization) || 0,
      topCategory: insights.topCategory || 'other',
      topMerchant: insights.topMerchant || 'Unknown',
      insights: Array.isArray(insights.insights) ? insights.insights : [],
      budgetRecommendations: Array.isArray(insights.budgetRecommendations) ? insights.budgetRecommendations : [],
      savingOpportunities: Array.isArray(insights.savingOpportunities) ? insights.savingOpportunities : [],
      spendingTrend: insights.spendingTrend || 'stable',
      unusualTransactions: Array.isArray(insights.unusualTransactions) ? insights.unusualTransactions : [],
      predictedNextMonth: Number(insights.predictedNextMonth) || 0,
      financialHealthScore: Number(insights.financialHealthScore) || 50,
    };

  } catch (error) {
    console.error('Error generating insights:', error);
    throw error;
  }
}

/**
 * Test Gemini API connection
 * @returns {Promise<boolean>} - True if API is working
 */
export async function testGeminiConnection() {
  if (!GEMINI_API_KEY) {
    console.error('Gemini API key not configured');
    return false;
  }

  try {
    const response = await fetch(
      `${GEMINI_API_URL}/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Reply with just the word "OK" if you can read this.'
            }]
          }]
        })
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Gemini API connection test failed:', error);
    return false;
  }
}

/**
 * Generate budget recommendations based on spending history
 * @param {Array} receipts - Historical receipts
 * @returns {Promise<Object>} - Recommended budgets
 */
export async function generateBudgetRecommendations(receipts) {
  if (!GEMINI_API_KEY || !receipts || receipts.length === 0) {
    return null;
  }

  try {
    const categorySpending = {};
    receipts.forEach(receipt => {
      receipt.items?.forEach(item => {
        const cat = item.category || 'other';
        if (!categorySpending[cat]) {
          categorySpending[cat] = [];
        }
        categorySpending[cat].push(item.price);
      });
    });

    const response = await fetch(
      `${GEMINI_API_URL}/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Based on this spending history, recommend monthly budgets for each category.

Spending History:
${JSON.stringify(categorySpending, null, 2)}

Return ONLY this JSON format:
{
  "food": number,
  "transport": number,
  "shopping": number,
  "entertainment": number,
  "healthcare": number,
  "utilities": number,
  "education": number,
  "other": number
}

Consider:
- Average spending per category
- Seasonal variations
- Room for savings
- Realistic limits`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    let cleanedText = textContent.trim();
    cleanedText = cleanedText.replace(/```json\s*/g, '');
    cleanedText = cleanedText.replace(/```\s*/g, '');
    
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('Error generating budget recommendations:', error);
    return null;
  }
}

export default {
  analyzeReceipt,
  generateInsights,
  testGeminiConnection,
  generateBudgetRecommendations,
};