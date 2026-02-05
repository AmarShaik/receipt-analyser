'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import storage from '@/lib/storage';
import { calculateCategoryTotals } from '@/lib/utils';

export type ReceiptItem = {
  name: string;
  quantity: number;
  price: number;
  category: string;
};

export type Receipt = {
  id: string;
  merchant: string;
  date: string;
  total: number;
  subtotal?: number | null;
  tax?: number | null;
  items: ReceiptItem[];
  paymentMethod?: string;
  createdAt?: string;
  updatedAt?: string;
  imagePreview?: string | null;
};

export function useReceipts() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    setIsLoading(true);
    const data = storage.getReceipts();
    setReceipts(data || []);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addReceipt = useCallback((receipt: Receipt) => {
    const saved = storage.saveReceipt(receipt);
    if (saved) {
      setReceipts((prev) => [saved, ...prev]);
    }
    return saved;
  }, []);

  const updateReceipt = useCallback((id: string, updates: Partial<Receipt>) => {
    const updated = storage.updateReceipt(id, updates);
    if (updated) {
      setReceipts((prev) => prev.map((r) => (r.id === id ? updated : r)));
    }
    return updated;
  }, []);

  const deleteReceipt = useCallback((id: string) => {
    const ok = storage.deleteReceipt(id);
    if (ok) {
      setReceipts((prev) => prev.filter((r) => r.id !== id));
    }
    return ok;
  }, []);

  const totalsByCategory = useMemo(() => calculateCategoryTotals(receipts), [receipts]);

  const totalSpent = useMemo(() => receipts.reduce((sum, r) => sum + (r.total || 0), 0), [receipts]);

  return {
    receipts,
    isLoading,
    refresh,
    addReceipt,
    updateReceipt,
    deleteReceipt,
    totalsByCategory,
    totalSpent,
  };
}
