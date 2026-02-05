'use client';

import { calculateBudgetProgress, getBudgetStatus, getBudgetStatusColor } from '@/lib/utils';
import { getCategoryLabel, getCategoryColor } from '@/lib/utils';

type Props = {
  category: string;
  spent: number;
  budget: number;
};

export default function BudgetCard({ category, spent, budget }: Props) {
  const progress = calculateBudgetProgress(spent, budget);
  const status = getBudgetStatus(spent, budget);
  const color = getCategoryColor(category);

  return (
    <div className="glass cyber-border rounded-lg p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{getCategoryLabel(category)}</h3>
        <span className={`text-sm ${getBudgetStatusColor(status)}`}>{Math.round(progress)}%</span>
      </div>
      <div className="text-sm text-gray-300 mb-3">${spent.toFixed(2)} spent / ${budget.toFixed(2)} budget</div>
      <div className="w-full bg-purple-900/30 rounded-full h-2 overflow-hidden">
        <div
          className="h-full"
          style={{ width: `${Math.min(progress, 100)}%`, background: color }}
        />
      </div>
    </div>
  );
}
