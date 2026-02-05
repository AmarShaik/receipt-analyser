// Category definitions with colors for visualization
export const CATEGORIES = [
  { value: 'food', label: 'Food & Dining', color: '#FF6B6B', icon: '🍽️' },
  { value: 'transport', label: 'Transportation', color: '#4ECDC4', icon: '🚗' },
  { value: 'shopping', label: 'Shopping', color: '#45B7D1', icon: '🛍️' },
  { value: 'entertainment', label: 'Entertainment', color: '#FFA07A', icon: '🎬' },
  { value: 'healthcare', label: 'Healthcare', color: '#98D8C8', icon: '💊' },
  { value: 'utilities', label: 'Utilities & Bills', color: '#F7DC6F', icon: '💡' },
  { value: 'education', label: 'Education', color: '#BB8FCE', icon: '📚' },
  { value: 'other', label: 'Other', color: '#85C1E2', icon: '📦' },
];

// Payment method options
export const PAYMENT_METHODS = [
  'Cash',
  'Credit Card',
  'Debit Card',
  'UPI',
  'Digital Wallet',
  'Bank Transfer',
  'Other'
];

// Currency configurations
export const CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' },
  INR: { symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
  EUR: { symbol: '€', name: 'Euro', locale: 'en-EU' },
  GBP: { symbol: '£', name: 'British Pound', locale: 'en-GB' },
  JPY: { symbol: '¥', name: 'Japanese Yen', locale: 'ja-JP' },
  AUD: { symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
};

// Default budget amounts (monthly, in USD)
export const DEFAULT_BUDGETS = {
  food: 500,
  transport: 200,
  shopping: 300,
  entertainment: 150,
  healthcare: 200,
  utilities: 150,
  education: 100,
  other: 100,
};

// Chart colors for data visualization
export const CHART_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
  '#F06292', '#64B5F6', '#81C784', '#FFD54F',
];

// Time period options for filtering
export const TIME_PERIODS = [
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'year', label: 'This Year' },
  { value: 'all', label: 'All Time' },
];

// Budget alert thresholds
export const BUDGET_THRESHOLDS = {
  warning: 0.8,  // 80%
  danger: 1.0,   // 100%
  critical: 1.2, // 120%
};

// App metadata
export const APP_NAME = 'SmartReceipt';
export const APP_DESCRIPTION = 'AI-Powered Personal Finance Management';
export const APP_VERSION = '1.0.0';

// Storage keys
export const STORAGE_KEYS = {
  RECEIPTS: 'smartreceipt_receipts',
  BUDGETS: 'smartreceipt_budgets',
  SETTINGS: 'smartreceipt_settings',
  INSIGHTS: 'smartreceipt_insights',
};

// API endpoints (for future use)
export const API_ENDPOINTS = {
  ANALYZE_RECEIPT: '/api/analyze-receipt',
  GENERATE_INSIGHTS: '/api/generate-insights',
  RECEIPTS: '/api/receipts',
};

// Gemini API configuration
export const GEMINI_CONFIG = {
  MODEL: 'gemini-1.5-pro-latest',
  MAX_TOKENS: 2048,
  TEMPERATURE: 0.7,
};

// File upload limits
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic'],
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  FULL: 'MMMM dd, yyyy',
  SHORT: 'MM/dd/yy',
  API: 'yyyy-MM-dd',
};