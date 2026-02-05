import { STORAGE_KEYS, DEFAULT_BUDGETS } from './constants';

/**
 * Storage utility for managing app data in localStorage
 */
export const storage = {
  
  // ============= RECEIPTS =============
  
  /**
   * Get all receipts from storage
   */
  getReceipts: () => {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECEIPTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading receipts:', error);
      return [];
    }
  },

  /**
   * Save a new receipt
   */
  saveReceipt: (receipt) => {
    try {
      const receipts = storage.getReceipts();
      const newReceipt = {
        ...receipt,
        id: receipt.id || `receipt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: receipt.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      receipts.unshift(newReceipt); // Add to beginning
      localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(receipts));
      
      return newReceipt;
    } catch (error) {
      console.error('Error saving receipt:', error);
      return null;
    }
  },

  /**
   * Update an existing receipt
   */
  updateReceipt: (id, updates) => {
    try {
      const receipts = storage.getReceipts();
      const index = receipts.findIndex(r => r.id === id);
      
      if (index === -1) {
        console.error('Receipt not found:', id);
        return null;
      }
      
      receipts[index] = {
        ...receipts[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(receipts));
      return receipts[index];
    } catch (error) {
      console.error('Error updating receipt:', error);
      return null;
    }
  },

  /**
   * Delete a receipt
   */
  deleteReceipt: (id) => {
    try {
      const receipts = storage.getReceipts();
      const filtered = receipts.filter(r => r.id !== id);
      localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting receipt:', error);
      return false;
    }
  },

  /**
   * Get a single receipt by ID
   */
  getReceiptById: (id) => {
    const receipts = storage.getReceipts();
    return receipts.find(r => r.id === id) || null;
  },

  /**
   * Clear all receipts
   */
  clearReceipts: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.RECEIPTS);
      return true;
    } catch (error) {
      console.error('Error clearing receipts:', error);
      return false;
    }
  },

  // ============= BUDGETS =============
  
  /**
   * Get budgets from storage
   */
  getBudgets: () => {
    if (typeof window === 'undefined') return DEFAULT_BUDGETS;
    
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BUDGETS);
      return data ? JSON.parse(data) : DEFAULT_BUDGETS;
    } catch (error) {
      console.error('Error reading budgets:', error);
      return DEFAULT_BUDGETS;
    }
  },

  /**
   * Save budgets to storage
   */
  saveBudgets: (budgets) => {
    try {
      localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
      return true;
    } catch (error) {
      console.error('Error saving budgets:', error);
      return false;
    }
  },

  /**
   * Update a single category budget
   */
  updateCategoryBudget: (category, amount) => {
    try {
      const budgets = storage.getBudgets();
      budgets[category] = Number(amount);
      localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
      return true;
    } catch (error) {
      console.error('Error updating category budget:', error);
      return false;
    }
  },

  /**
   * Reset budgets to defaults
   */
  resetBudgets: () => {
    try {
      localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(DEFAULT_BUDGETS));
      return true;
    } catch (error) {
      console.error('Error resetting budgets:', error);
      return false;
    }
  },

  // ============= SETTINGS =============
  
  /**
   * Get settings from storage
   */
  getSettings: () => {
    if (typeof window === 'undefined') {
      return {
        currency: 'USD',
        theme: 'dark',
        notifications: true,
      };
    }
    
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : {
        currency: 'USD',
        theme: 'dark',
        notifications: true,
      };
    } catch (error) {
      console.error('Error reading settings:', error);
      return {
        currency: 'USD',
        theme: 'dark',
        notifications: true,
      };
    }
  },

  /**
   * Save settings to storage
   */
  saveSettings: (settings) => {
    try {
      const currentSettings = storage.getSettings();
      const updatedSettings = { ...currentSettings, ...settings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updatedSettings));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  },

  /**
   * Update a single setting
   */
  updateSetting: (key, value) => {
    try {
      const settings = storage.getSettings();
      settings[key] = value;
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error updating setting:', error);
      return false;
    }
  },

  // ============= INSIGHTS =============
  
  /**
   * Get cached insights
   */
  getInsights: () => {
    if (typeof window === 'undefined') return null;
    
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INSIGHTS);
      if (!data) return null;
      
      const insights = JSON.parse(data);
      
      // Check if insights are stale (older than 24 hours)
      const createdAt = new Date(insights.createdAt);
      const now = new Date();
      const hoursDiff = (now - createdAt) / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        // Insights are stale, remove them
        storage.clearInsights();
        return null;
      }
      
      return insights;
    } catch (error) {
      console.error('Error reading insights:', error);
      return null;
    }
  },

  /**
   * Save insights to storage
   */
  saveInsights: (insights) => {
    try {
      const dataToSave = {
        ...insights,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEYS.INSIGHTS, JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      console.error('Error saving insights:', error);
      return false;
    }
  },

  /**
   * Clear cached insights
   */
  clearInsights: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.INSIGHTS);
      return true;
    } catch (error) {
      console.error('Error clearing insights:', error);
      return false;
    }
  },

  // ============= UTILITY =============
  
  /**
   * Clear all app data
   */
  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing all data:', error);
      return false;
    }
  },

  /**
   * Export all data as JSON
   */
  exportData: () => {
    try {
      return {
        receipts: storage.getReceipts(),
        budgets: storage.getBudgets(),
        settings: storage.getSettings(),
        insights: storage.getInsights(),
        exportDate: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error exporting data:', error);
      return null;
    }
  },

  /**
   * Import data from JSON
   */
  importData: (data) => {
    try {
      if (data.receipts) {
        localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(data.receipts));
      }
      if (data.budgets) {
        localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(data.budgets));
      }
      if (data.settings) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
      }
      if (data.insights) {
        localStorage.setItem(STORAGE_KEYS.INSIGHTS, JSON.stringify(data.insights));
      }
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  },

  /**
   * Get storage size in bytes
   */
  getStorageSize: () => {
    if (typeof window === 'undefined') return 0;
    
    let total = 0;
    Object.values(STORAGE_KEYS).forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        total += item.length + key.length;
      }
    });
    return total;
  },
};

export default storage;