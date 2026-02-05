import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CURRENCIES, CATEGORIES, CHART_COLORS } from './constants';

/**
 * Merge Tailwind CSS classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency with symbol
 */
export function formatCurrency(amount, currency = 'USD') {
  const currencyInfo = CURRENCIES[currency] || CURRENCIES.USD;
  
  if (isNaN(amount)) return `${currencyInfo.symbol}0.00`;
  
  return new Intl.NumberFormat(currencyInfo.locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format date in various formats
 */
export function formatDate(date, format = 'short') {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) return 'Invalid Date';
  
  const formats = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric', weekday: 'short' },
    numeric: { month: '2-digit', day: '2-digit', year: 'numeric' },
    monthYear: { month: 'short', year: 'numeric' },
  };
  
  return d.toLocaleDateString('en-US', formats[format] || formats.short);
}

/**
 * Get category color by category value
 */
export function getCategoryColor(category) {
  const cat = CATEGORIES.find(c => c.value === category);
  return cat ? cat.color : CHART_COLORS[0];
}

/**
 * Get category label by category value
 */
export function getCategoryLabel(category) {
  const cat = CATEGORIES.find(c => c.value === category);
  return cat ? cat.label : 'Other';
}

/**
 * Get category icon by category value
 */
export function getCategoryIcon(category) {
  const cat = CATEGORIES.find(c => c.value === category);
  return cat ? cat.icon : '📦';
}

/**
 * Calculate budget progress percentage
 */
export function calculateBudgetProgress(spent, budget) {
  if (!budget || budget === 0) return 0;
  const progress = (spent / budget) * 100;
  return Math.min(Math.max(progress, 0), 150); // Cap at 150% for display
}

/**
 * Get budget status (safe, warning, danger, critical)
 */
export function getBudgetStatus(spent, budget) {
  if (!budget || budget === 0) return 'unknown';
  
  const percentage = spent / budget;
  
  if (percentage < 0.8) return 'safe';
  if (percentage < 1.0) return 'warning';
  if (percentage < 1.2) return 'danger';
  return 'critical';
}

/**
 * Get budget status color
 */
export function getBudgetStatusColor(status) {
  const colors = {
    safe: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-orange-500',
    critical: 'text-red-500',
    unknown: 'text-gray-500',
  };
  return colors[status] || colors.unknown;
}

/**
 * Get budget status background color
 */
export function getBudgetStatusBg(status) {
  const colors = {
    safe: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-orange-500',
    critical: 'bg-red-500',
    unknown: 'bg-gray-500',
  };
  return colors[status] || colors.unknown;
}

/**
 * Group receipts by date
 */
export function groupReceiptsByDate(receipts) {
  const groups = {};
  
  receipts.forEach(receipt => {
    const date = formatDate(receipt.date, 'short');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(receipt);
  });
  
  return groups;
}

/**
 * Group receipts by category
 */
export function groupReceiptsByCategory(receipts) {
  const groups = {};
  
  receipts.forEach(receipt => {
    receipt.items?.forEach(item => {
      const category = item.category || 'other';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push({ ...item, receiptId: receipt.id, date: receipt.date });
    });
  });
  
  return groups;
}

/**
 * Calculate total spending by category
 */
export function calculateCategoryTotals(receipts) {
  const totals = {};
  
  receipts.forEach(receipt => {
    receipt.items?.forEach(item => {
      const category = item.category || 'other';
      totals[category] = (totals[category] || 0) + (item.price || 0);
    });
  });
  
  return totals;
}

/**
 * Calculate spending for a specific time period
 */
export function calculatePeriodSpending(receipts, period = 'month') {
  const now = new Date();
  const filtered = receipts.filter(receipt => {
    const receiptDate = new Date(receipt.date);
    
    switch (period) {
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return receiptDate >= weekAgo;
      
      case 'month':
        return (
          receiptDate.getMonth() === now.getMonth() &&
          receiptDate.getFullYear() === now.getFullYear()
        );
      
      case 'quarter':
        const currentQuarter = Math.floor(now.getMonth() / 3);
        const receiptQuarter = Math.floor(receiptDate.getMonth() / 3);
        return (
          receiptQuarter === currentQuarter &&
          receiptDate.getFullYear() === now.getFullYear()
        );
      
      case 'year':
        return receiptDate.getFullYear() === now.getFullYear();
      
      case 'all':
      default:
        return true;
    }
  });
  
  return filtered.reduce((sum, receipt) => sum + (receipt.total || 0), 0);
}

/**
 * Convert image file to base64
 */
export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Validate receipt data
 */
export function validateReceiptData(data) {
  const errors = [];
  
  if (!data.merchant || data.merchant.trim() === '') {
    errors.push('Merchant name is required');
  }
  
  if (!data.date) {
    errors.push('Date is required');
  }
  
  if (!data.total || isNaN(data.total) || data.total < 0) {
    errors.push('Valid total amount is required');
  }
  
  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    errors.push('At least one item is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Generate unique ID
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Truncate text
 */
export function truncate(text, length = 50) {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substr(0, length) + '...';
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(current, previous) {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Get time-based greeting
 */
export function getGreeting() {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Check if file type is allowed
 */
export function isValidFileType(file, allowedTypes) {
  return allowedTypes.includes(file.type);
}

/**
 * Sort receipts by date (newest first)
 */
export function sortReceiptsByDate(receipts, order = 'desc') {
  return [...receipts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
}

/**
 * Filter receipts by search query
 */
export function searchReceipts(receipts, query) {
  if (!query || query.trim() === '') return receipts;
  
  const lowercaseQuery = query.toLowerCase();
  
  return receipts.filter(receipt => {
    // Search in merchant name
    if (receipt.merchant?.toLowerCase().includes(lowercaseQuery)) return true;
    
    // Search in items
    if (receipt.items?.some(item => 
      item.name?.toLowerCase().includes(lowercaseQuery)
    )) return true;
    
    // Search in category
    if (receipt.items?.some(item => 
      item.category?.toLowerCase().includes(lowercaseQuery)
    )) return true;
    
    return false;
  });
}