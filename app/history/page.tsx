'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { useReceipts } from '@/hooks/useReceipts';
import { formatCurrency, formatDate, searchReceipts } from '@/lib/utils';
import { CATEGORIES } from '@/lib/constants';

export default function HistoryPage() {
  const { receipts, deleteReceipt } = useReceipts();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = searchReceipts(receipts, query).filter((r) => {
    if (category === 'all') return true;
    return r.items?.some((i: any) => i.category === category);
  });

  const totalSpent = filtered.reduce((sum, r) => sum + (r.total || 0), 0);
  const avgSpent = filtered.length ? totalSpent / filtered.length : 0;

  return (
    <div className="gradient-bg min-h-screen text-white">
      {/* Header */}
      <div className="border-b border-purple-500/20 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text font-['Orbitron']">Receipt History</h1>
          <Link href="/scan">
            <Button className="bg-purple-600 hover:bg-purple-700">New Scan</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters */}
        <div className="glass cyber-border rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Search receipts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-black/40 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-black/40 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Receipts Table */}
        <div className="glass cyber-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/20 bg-black/40">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Store</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr className="border-b border-purple-500/10 hover:bg-purple-500/5 transition">
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <p className="text-gray-400">No receipts yet.</p>
                      <Link href="/scan">
                        <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Scan Your First Receipt</Button>
                      </Link>
                    </td>
                  </tr>
                ) : (
                  filtered.map((receipt) => (
                    <tr key={receipt.id} className="border-b border-purple-500/10 hover:bg-purple-500/5 transition">
                      <td className="px-6 py-4 text-sm">{formatDate(receipt.date)}</td>
                      <td className="px-6 py-4 text-sm">{receipt.merchant}</td>
                      <td className="px-6 py-4 text-sm">{receipt.items?.[0]?.category || 'other'}</td>
                      <td className="px-6 py-4 text-sm">{formatCurrency(receipt.total || 0)}</td>
                      <td className="px-6 py-4 text-sm">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-500/50 hover:bg-purple-500/10"
                          onClick={() => deleteReceipt(receipt.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="glass cyber-border rounded-lg p-6">
            <p className="text-gray-400 mb-2">Total Receipts</p>
            <p className="text-3xl font-bold">{filtered.length}</p>
          </div>
          <div className="glass cyber-border rounded-lg p-6">
            <p className="text-gray-400 mb-2">Total Spent</p>
            <p className="text-3xl font-bold">{formatCurrency(totalSpent)}</p>
          </div>
          <div className="glass cyber-border rounded-lg p-6">
            <p className="text-gray-400 mb-2">Average per Receipt</p>
            <p className="text-3xl font-bold">{formatCurrency(avgSpent)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
