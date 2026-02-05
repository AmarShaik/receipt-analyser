'use client';

import { useCallback, useEffect, useState } from 'react';
import storage from '@/lib/storage';

export type Insights = {
  totalSpent?: number;
  budgetUtilization?: number;
  topCategory?: string;
  topMerchant?: string;
  insights?: string[];
  budgetRecommendations?: string[];
  savingOpportunities?: string[];
  spendingTrend?: string;
  unusualTransactions?: string[];
  predictedNextMonth?: number;
  financialHealthScore?: number;
  createdAt?: string;
};

export function useInsights() {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = storage.getInsights();
    if (cached) {
      setInsights(cached);
    }
  }, []);

  const generate = useCallback(async (receipts: any[], budgets: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receipts, budgets }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to generate insights');
      }

      const result = await response.json();
      const data = result.data || result;

      storage.saveInsights(data);
      setInsights(data);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to generate insights');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    storage.clearInsights();
    setInsights(null);
  }, []);

  return {
    insights,
    isLoading,
    error,
    generate,
    clear,
  };
}
