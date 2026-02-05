'use client';

import { formatDate, formatCurrency, truncate } from '@/lib/utils';

type Props = {
  receipts: any[];
};

export default function TransactionList({ receipts }: Props) {
  if (!receipts.length) {
    return <p className="text-gray-400">No receipts yet.</p>;
  }

  return (
    <div className="space-y-4">
      {receipts.map((receipt) => (
        <div key={receipt.id} className="glass cyber-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{receipt.merchant}</div>
              <div className="text-xs text-gray-400">{formatDate(receipt.date)}</div>
            </div>
            <div className="font-bold">{formatCurrency(receipt.total || 0)}</div>
          </div>
          <div className="mt-2 text-sm text-gray-300">
            {receipt.items?.slice(0, 3).map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between">
                <span>{truncate(item.name, 40)}</span>
                <span>{formatCurrency(item.price || 0)}</span>
              </div>
            ))}
            {receipt.items?.length > 3 && (
              <div className="text-xs text-gray-500">+{receipt.items.length - 3} more items</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
