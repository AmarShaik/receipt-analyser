'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import storage from '@/lib/storage';
import { DEFAULT_BUDGETS } from '@/lib/constants';

export type Budgets = Record<string, number>;

export function useBudget() {
  const [budgets, setBudgets] = useState<Budgets>(DEFAULT_BUDGETS);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    setIsLoading(true);
    const data = storage.getBudgets();
    setBudgets(data || DEFAULT_BUDGETS);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateCategoryBudget = useCallback((category: string, amount: number) => {
    storage.updateCategoryBudget(category, amount);
    setBudgets((prev) => ({ ...prev, [category]: Number(amount) }));
  }, []);

  const saveBudgets = useCallback((nextBudgets: Budgets) => {
    storage.saveBudgets(nextBudgets);
    setBudgets(nextBudgets);
  }, []);

  const resetBudgets = useCallback(() => {
    storage.resetBudgets();
    setBudgets(DEFAULT_BUDGETS);
  }, []);

  const totalBudget = useMemo(() => Object.values(budgets).reduce((sum, v) => sum + (v || 0), 0), [budgets]);

  return {
    budgets,
    isLoading,
    refresh,
    updateCategoryBudget,
    saveBudgets,
    resetBudgets,
    totalBudget,
  };
}
