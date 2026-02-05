'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useReceipts } from '@/hooks/useReceipts';
import { useBudget } from '@/hooks/useBudget';
import { useInsights } from '@/hooks/useInsights';
import InsightCard from '@/components/InsightCard';
import { formatCurrency } from '@/lib/utils';

export default function InsightsPage() {
  const { receipts, totalSpent } = useReceipts();
  const { budgets } = useBudget();
  const { insights, isLoading, error, generate, clear } = useInsights();

  return (
    <div className="gradient-bg min-h-screen text-white">
      <div className="border-b border-purple-500/20 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text font-['Orbitron']">AI Insights</h1>
          <div className="flex gap-3">
            <Link href="/dashboard">
              <Button variant="outline" className="border-purple-500/50 text-white">Dashboard</Button>
            </Link>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => generate(receipts, budgets)}
              disabled={isLoading || receipts.length === 0}
            >
              {isLoading ? 'Generating...' : 'Generate Insights'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {error && <div className="text-red-400 text-sm">{error}</div>}

        <div className="grid md:grid-cols-4 gap-6">
          <div className="glass cyber-border rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-1">Total Spent</p>
            <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
          </div>
          <div className="glass cyber-border rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-1">Top Category</p>
            <p className="text-2xl font-bold">{insights?.topCategory || '—'}</p>
          </div>
          <div className="glass cyber-border rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-1">Top Merchant</p>
            <p className="text-2xl font-bold">{insights?.topMerchant || '—'}</p>
          </div>
          <div className="glass cyber-border rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-1">Health Score</p>
            <p className="text-2xl font-bold">{insights?.financialHealthScore ?? '—'}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <InsightCard title="Insights" items={insights?.insights} />
          <InsightCard title="Budget Recommendations" items={insights?.budgetRecommendations} />
          <InsightCard title="Saving Opportunities" items={insights?.savingOpportunities} />
          <InsightCard title="Unusual Transactions" items={insights?.unusualTransactions} />
        </div>

        {insights && (
          <Button variant="outline" className="border-purple-500/50" onClick={clear}>
            Clear Cached Insights
          </Button>
        )}

        {receipts.length === 0 && (
          <div className="glass cyber-border rounded-lg p-6 text-gray-300">
            No receipts yet. Scan a receipt first to generate insights.
          </div>
        )}
      </div>
    </div>
  );
}
