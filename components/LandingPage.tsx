'use client';

import Link from 'next/link';
import { ArrowRight, Receipt, TrendingUp, Zap, BarChart3, Lock, Smartphone, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="gradient-bg min-h-screen text-white overflow-hidden">
      {/* Navigation */}
      <nav className={`sticky-nav border-gray-800 ${isScrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold gradient-text font-['Orbitron'] hover:scale-105 transition-transform">SmartReceipt</div>
          <div className="flex gap-3">
            <Link href="/demo">
              <Button variant="outline" className="border-gray-700 hover:border-gray-600 text-white hover:bg-gray-900/50 transition-all duration-300">
                Try Demo
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="border-gray-700 hover:border-gray-600 text-white hover:bg-gray-900/50 transition-all duration-300">
                Dashboard
              </Button>
            </Link>
            <Link href="/insights">
              <Button variant="outline" className="border-gray-700 hover:border-gray-600 text-white hover:bg-gray-900/50 transition-all duration-300">
                Insights
              </Button>
            </Link>
            <Link href="/scan">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300 hover-lift">
                Start Scanning
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6">
        {/* Animated background blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="text-center max-w-4xl mx-auto blur-in">
          {/* <div className="inline-block mb-6 px-4 py-2 rounded-full border border-indigo-500/50 bg-indigo-500/10 backdrop-blur-sm">
            <span className="text-sm font-medium text-indigo-300">✨ AI-Powered Receipt Management</span>
          </div> */}

          <h1 className="hero-title mb-6 font-['Orbitron']">
            Smart Receipt <span className="gradient-text animate-gradient">Analysis</span>
          </h1>

          <p className="hero-subtitle mb-8 max-w-2xl mx-auto leading-relaxed">
            Scan receipts in real-time, extract data with cutting-edge AI, and gain intelligent insights into your spending habits. Manage your finances smarter, faster, and better.
          </p>

          <div className="flex gap-4 justify-center flex-wrap mb-12">
            <Link href="/scan">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white gap-2 shadow-lg shadow-blue-600/50 hover-lift font-semibold">
                Start Scanning <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-blue-400 text-white hover:bg-blue-500/10 transition-all duration-300 hover:border-blue-300 hover-lift font-semibold">
                Try Demo
              </Button>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center animate-bounce mt-8">
            <ChevronDown className="text-indigo-400 opacity-50" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-['Orbitron'] mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-lg">Everything you need to manage receipts and track spending</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          {[
            {
              icon: Receipt,
              title: 'Smart Scanning',
              description: 'Capture receipts with your camera and extract data automatically using advanced AI.',
              color: 'from-blue-500 to-blue-400'
            },
            {
              icon: TrendingUp,
              title: 'Spending Insights',
              description: 'Get detailed analytics on your spending patterns and budget trends over time.',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: BarChart3,
              title: 'Visual Reports',
              description: 'Beautiful charts and graphs to visualize your financial data at a glance.',
              color: 'from-cyan-500 to-teal-500'
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Real-time processing powered by AI for instant receipt analysis.',
              color: 'from-blue-500 to-blue-400'
            },
            {
              icon: Lock,
              title: 'Secure & Private',
              description: 'Your data is encrypted and never shared with third parties.',
              color: 'from-blue-400 to-cyan-400'
            },
            {
              icon: Smartphone,
              title: 'Mobile Friendly',
              description: 'Works seamlessly on desktop, tablet, and mobile devices.',
              color: 'from-cyan-400 to-teal-400'
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="glass-card hover-lift group relative overflow-hidden p-8 rounded-xl border border-blue-500/20"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}></div>
              
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all duration-300">{feature.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 my-24">
        <div className="glass-card border border-blue-500/30 rounded-2xl p-12 text-center relative overflow-hidden hover-lift">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-400/10 -z-10"></div>
          
          <h2 className="text-4xl font-bold mb-4 font-['Orbitron'] gradient-text">
            Ready to Transform Your Receipt Management?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of users who are taking control of their finances with SmartReceipt. Start tracking your spending today.
          </p>
          <Link href="/scan">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white gap-2 shadow-lg shadow-blue-600/50 hover-lift font-semibold">
              Get Started Now <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-md py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4 gradient-text">SmartReceipt</h3>
              <p className="text-gray-400 text-sm">AI-powered receipt management for smarter spending.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/scan" className="hover:text-blue-400 transition-colors">Scanner</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link></li>
                <li><Link href="/insights" className="hover:text-blue-400 transition-colors">Insights</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-500/20 pt-8 text-center text-gray-400">
            <p>&copy; 2026 SmartReceipt. All rights reserved. Built with ❤️ for better finances.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
