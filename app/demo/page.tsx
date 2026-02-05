'use client';

import { useState } from 'react';
import { storage } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function DemoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const loadDemoData = () => {
    setLoading(true);
    
    const demoReceipts = [
      {
        id: 'demo_1',
        merchant: 'Whole Foods Market',
        date: '2024-02-01',
        total: 127.43,
        subtotal: 118.99,
        tax: 8.44,
        items: [
          { name: 'Organic Milk', price: 6.99, category: 'food', quantity: 2 },
          { name: 'Fresh Salmon', price: 24.99, category: 'food', quantity: 1 },
          { name: 'Mixed Greens', price: 5.49, category: 'food', quantity: 1 },
          { name: 'Whole Grain Bread', price: 4.99, category: 'food', quantity: 1 },
          { name: 'Free Range Eggs', price: 7.99, category: 'food', quantity: 1 },
        ],
        paymentMethod: 'Credit Card',
        createdAt: '2024-02-01T10:30:00Z',
      },
      {
        id: 'demo_2',
        merchant: 'Starbucks',
        date: '2024-02-02',
        total: 18.75,
        subtotal: 17.50,
        tax: 1.25,
        items: [
          { name: 'Caffe Latte', price: 5.95, category: 'food', quantity: 2 },
          { name: 'Blueberry Muffin', price: 3.95, category: 'food', quantity: 1 },
          { name: 'Croissant', price: 3.65, category: 'food', quantity: 1 },
        ],
        paymentMethod: 'Credit Card',
        createdAt: '2024-02-02T08:15:00Z',
      },
      {
        id: 'demo_3',
        merchant: 'Shell Gas Station',
        date: '2024-02-03',
        total: 52.30,
        subtotal: 52.30,
        tax: 0,
        items: [
          { name: 'Regular Unleaded', price: 52.30, category: 'transport', quantity: 1 },
        ],
        paymentMethod: 'Debit Card',
        createdAt: '2024-02-03T16:45:00Z',
      },
      {
        id: 'demo_4',
        merchant: 'Amazon',
        date: '2024-02-04',
        total: 234.99,
        subtotal: 234.99,
        tax: 0,
        items: [
          { name: 'Wireless Headphones', price: 129.99, category: 'shopping', quantity: 1 },
          { name: 'USB-C Cable Pack', price: 24.99, category: 'shopping', quantity: 1 },
          { name: 'Phone Case', price: 19.99, category: 'shopping', quantity: 1 },
          { name: 'Screen Protector', price: 12.99, category: 'shopping', quantity: 1 },
        ],
        paymentMethod: 'Credit Card',
        createdAt: '2024-02-04T14:20:00Z',
      },
      {
        id: 'demo_5',
        merchant: 'CVS Pharmacy',
        date: '2024-02-05',
        total: 43.67,
        subtotal: 40.99,
        tax: 2.68,
        items: [
          { name: 'Multivitamins', price: 18.99, category: 'healthcare', quantity: 1 },
          { name: 'Pain Relief', price: 12.99, category: 'healthcare', quantity: 1 },
          { name: 'Bandages', price: 9.01, category: 'healthcare', quantity: 1 },
        ],
        paymentMethod: 'Cash',
        createdAt: '2024-02-05T11:30:00Z',
      },
      {
        id: 'demo_6',
        merchant: 'Netflix',
        date: '2024-02-06',
        total: 15.49,
        subtotal: 15.49,
        tax: 0,
        items: [
          { name: 'Subscription - Standard', price: 15.49, category: 'entertainment', quantity: 1 },
        ],
        paymentMethod: 'Credit Card',
        createdAt: '2024-02-06T09:00:00Z',
      },
      {
        id: 'demo_7',
        merchant: 'AT&T',
        date: '2024-02-07',
        total: 89.99,
        subtotal: 89.99,
        tax: 0,
        items: [
          { name: 'Mobile Phone Service', price: 89.99, category: 'utilities', quantity: 1 },
        ],
        paymentMethod: 'Bank Transfer',
        createdAt: '2024-02-07T00:05:00Z',
      },
      {
        id: 'demo_8',
        merchant: 'Whole Foods Market',
        date: '2024-02-08',
        total: 95.67,
        subtotal: 89.50,
        tax: 6.17,
        items: [
          { name: 'Chicken Breast', price: 18.99, category: 'food', quantity: 1 },
          { name: 'Fresh Vegetables', price: 22.50, category: 'food', quantity: 1 },
          { name: 'Pasta & Sauce', price: 12.99, category: 'food', quantity: 1 },
          { name: 'Olive Oil', price: 19.99, category: 'food', quantity: 1 },
          { name: 'Coffee Beans', price: 15.03, category: 'food', quantity: 1 },
        ],
        paymentMethod: 'Credit Card',
        createdAt: '2024-02-08T10:45:00Z',
      },
    ];

    // Save all demo receipts
    demoReceipts.forEach(receipt => {
      storage.saveReceipt(receipt);
    });

    // Set demo budgets
    const demoBudgets = {
      food: 500,
      transport: 200,
      shopping: 300,
      entertainment: 150,
      healthcare: 200,
      utilities: 150,
      education: 100,
      other: 100,
    };
    storage.saveBudgets(demoBudgets);

    // Generate insights
    const insights = [
      {
        id: 'insight_1',
        title: 'Top Spending Category',
        description: 'Your biggest spending category is Food at $241.85 this month',
        type: 'warning',
        icon: '🍔',
      },
      {
        id: 'insight_2',
        title: 'Budget Alert',
        description: 'You are 50% through your shopping budget ($150/$300)',
        type: 'info',
        icon: '💳',
      },
      {
        id: 'insight_3',
        title: 'Savings Opportunity',
        description: 'Your utilities cost $89.99 - consider reviewing your plan',
        type: 'success',
        icon: '💡',
      },
    ];
    storage.saveInsights(insights);

    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-8">
      <div className="max-w-2xl w-full glass-card rounded-2xl p-12 text-center border border-blue-500/20">
        <h1 className="text-4xl font-black text-white mb-4 font-['Orbitron']">
          Welcome to SmartReceipt Demo
        </h1>
        <p className="text-blue-200 mb-8 text-lg">
          Click below to load sample receipt data and explore all features
        </p>
        
        <Button
          onClick={loadDemoData}
          disabled={loading}
          className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-600/50 font-semibold flex items-center gap-2 mx-auto"
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {loading ? 'Loading Demo Data...' : 'Load Demo Data & Start'}
        </Button>

        <div className="mt-8 text-sm text-blue-300">
          <p className="font-semibold mb-4">This demo includes:</p>
          <ul className="text-left space-y-2 inline-block">
            <li>✓ 8 sample receipts from various merchants</li>
            <li>✓ Real spending data across 8 categories</li>
            <li>✓ Pre-configured budget limits</li>
            <li>✓ AI-generated financial insights</li>
            <li>✓ Dashboard analytics and charts</li>
            <li>✓ Transaction history and filtering</li>
          </ul>
        </div>

        <p className="mt-8 text-gray-400 text-xs">
          Explore all features with sample data. Your data is stored locally in your browser.
        </p>
      </div>
    </div>
  );
}
