'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky-nav border-gray-800 ${isScrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold gradient-text font-['Orbitron'] hover:scale-105 transition-transform">
          SmartReceipt
        </Link>
        <div className="flex gap-3">
          <Link href="/dashboard">
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-900/50 hover:border-gray-600 transition-all duration-300">
              Dashboard
            </Button>
          </Link>
          <Link href="/scan">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300 hover-lift">
              Scan Receipt
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
