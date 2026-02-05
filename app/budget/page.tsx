'use client';

import { AlertCircle, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useBudget } from '@/hooks/useBudget';
import { useReceipts } from '@/hooks/useReceipts';
import BudgetCard from '@/components/BudgetCard';
import { CATEGORIES } from '@/lib/constants';

export default function BudgetPage() {
  const { budgets, updateCategoryBudget, resetBudgets } = useBudget();
  const { totalsByCategory } = useReceipts();

  return (
    <div className="gradient-bg min-h-screen text-white">
      {/* Header */}
      <div className="border-b border-purple-500/20 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text font-['Orbitron']">Budget Manager</h1>
          <Link href="/scan">
            <Button className="bg-purple-600 hover:bg-purple-700">New Scan</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Monthly Budget Overview */}
        <div className="glass cyber-border rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <DollarSign className="text-purple-400" />
            Monthly Budget Overview
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {CATEGORIES.map((cat) => (
                <div key={cat.value} className="bg-black/40 rounded-lg p-6">
                  <label className="block text-sm font-medium mb-2">{cat.label} Budget</label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={budgets[cat.value] ?? 0}
                      onChange={(e) => updateCategoryBudget(cat.value, Number(e.target.value))}
                      className="flex-1 bg-black/40 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>
              ))}
              <Button variant="outline" className="border-purple-500/50" onClick={resetBudgets}>Reset Defaults</Button>
            </div>

            <div className="space-y-4">
              {CATEGORIES.map((cat) => (
                <BudgetCard
                  key={cat.value}
                  category={cat.value}
                  spent={totalsByCategory[cat.value] || 0}
                  budget={budgets[cat.value] || 0}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Category Budgets */}
        <div className="glass cyber-border rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <TrendingUp className="text-purple-400" />
            Category Budgets
          </h2>
          <p className="text-gray-400">Budget progress is shown above. Customize per-category budgets to track overspending.</p>
        </div>

        {/* Alerts */}
        <div className="glass cyber-border rounded-lg p-8 border-yellow-500/30">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <AlertCircle className="text-yellow-400" />
            Budget Alerts
          </h2>
          <p className="text-gray-400">No budget alerts at this time. Set your budget to get started!</p>
        </div>
      </div>
    </div>
  );
}
