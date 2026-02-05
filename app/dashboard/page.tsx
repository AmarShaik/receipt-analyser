'use client';

import { BarChart3, TrendingUp, AlertCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import StatCard from '@/components/StatCard';
import SpendingChart from '@/components/SpendingChart';
import TransactionList from '@/components/TransactionList';
import { useReceipts } from '@/hooks/useReceipts';
import { useBudget } from '@/hooks/useBudget';
import { formatCurrency } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const { receipts, totalSpent, totalsByCategory } = useReceipts();
  const { budgets, totalBudget } = useBudget();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const avgTransaction = receipts.length ? totalSpent / receipts.length : 0;
  const thisMonth = receipts.filter((r) => new Date(r.date).getMonth() === new Date().getMonth()).reduce((sum, r) => sum + (r.total || 0), 0);

  const categoryData = Object.entries(totalsByCategory).map(([name, value]) => ({ name, value }));

  const trendMap: Record<string, number> = {};
  receipts.forEach((r) => {
    const d = new Date(r.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    trendMap[key] = (trendMap[key] || 0) + (r.total || 0);
  });
  const trendData = Object.entries(trendMap)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([label, value]) => ({ label, value }));

  return (
    <div className="gradient-bg min-h-screen text-white">
      <div className={`sticky-nav border-indigo-500/20 ${isScrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text font-['Orbitron']">Dashboard</h1>
          <Link href="/scan">
            <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-500/50 transition-all duration-300 hover-lift gap-2">
              <Zap size={18} />
              New Scan
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12 stagger-children">
          <StatCard label="Total Spent" value={formatCurrency(totalSpent)} icon="💰" />
          <StatCard label="Receipts" value={`${receipts.length}`} icon="📄" />
          <StatCard label="This Month" value={formatCurrency(thisMonth)} icon="📅" />
          <StatCard label="Avg. Transaction" value={formatCurrency(avgTransaction)} icon="📊" />
        </div>

        {/* Main Charts Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 fade-in">
            {/* Spending by Category */}
            <div className="glass-card border border-indigo-500/20 rounded-2xl p-8 hover-lift transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500">
                    <BarChart3 className="text-white" size={20} />
                  </div>
                  Spending by Category
                </h2>
              </div>
              <SpendingChart type="pie" data={categoryData} />
            </div>

            {/* Spending Trend */}
            <div className="glass-card border border-indigo-500/20 rounded-2xl p-8 hover-lift transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  Spending Trend
                </h2>
              </div>
              <SpendingChart type="line" data={trendData} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 fade-in">
            {/* Quick Actions */}
            <div className="glass-card border border-indigo-500/20 rounded-2xl p-6 hover-lift transition-all duration-300">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Zap className="text-indigo-400" size={20} />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link href="/scan" className="block">
                  <Button variant="outline" className="w-full border-indigo-500/50 hover:bg-indigo-500/10 hover:border-indigo-400 transition-all duration-300 text-white">
                    📸 Scan Receipt
                  </Button>
                </Link>
                <Link href="/budget" className="block">
                  <Button variant="outline" className="w-full border-indigo-500/50 hover:bg-indigo-500/10 hover:border-indigo-400 transition-all duration-300 text-white">
                    💰 Set Budget
                  </Button>
                </Link>
                <Link href="/history" className="block">
                  <Button variant="outline" className="w-full border-indigo-500/50 hover:bg-indigo-500/10 hover:border-indigo-400 transition-all duration-300 text-white">
                    📋 View History
                  </Button>
                </Link>
                <Link href="/insights" className="block">
                  <Button variant="outline" className="w-full border-indigo-500/50 hover:bg-indigo-500/10 hover:border-indigo-400 transition-all duration-300 text-white">
                    ✨ Get Insights
                  </Button>
                </Link>
              </div>
            </div>

            {/* Recent Receipts */}
            <div className="glass-card border border-indigo-500/20 rounded-2xl p-6 hover-lift transition-all duration-300">
              <h3 className="text-lg font-bold mb-4">Recent Receipts</h3>
              {receipts.length > 0 ? (
                <TransactionList receipts={receipts.slice(0, 3)} />
              ) : (
                <p className="text-gray-400 text-sm text-center py-4">No receipts yet. Start scanning!</p>
              )}
            </div>

            {/* Budget Snapshot */}
            <div className="glass-card border border-blue-500/30 rounded-2xl p-6 hover-lift transition-all duration-300 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="text-blue-400" size={20} />
                Budget Snapshot
              </h3>
              <div className="space-y-2">
                <div className="text-sm text-gray-300">
                  <span className="block text-gray-400 mb-1">Total Budget</span>
                  <span className="text-2xl font-bold gradient-text">{formatCurrency(totalBudget)}</span>
                </div>
                <div className="pt-4 border-t border-indigo-500/20">
                  <Link href="/budget" className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
                    Manage Budget →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
