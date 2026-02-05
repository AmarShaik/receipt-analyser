'use client';

import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import ReceiptUploader from '@/components/ReceiptUploader';
import { Button } from '@/components/ui/button';
import { useReceipts } from '@/hooks/useReceipts';
import { formatCurrency } from '@/lib/utils';

export default function ScanPage() {
  const { addReceipt } = useReceipts();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleAnalyze = async (imageBase64: string, mimeType: string, previewUrl: string) => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);
    setPreview(previewUrl);

    try {
      const response = await fetch('/api/analyze-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, mimeType }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to analyze receipt');
      }

      const data = await response.json();
      setAnalysis(data.data || data);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze receipt');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = () => {
    if (!analysis) return;
    addReceipt({
      ...analysis,
      imagePreview: preview,
    });
    setAnalysis(null);
  };

  return (
    <div className="gradient-bg min-h-screen text-white">
      <div className="border-b border-purple-500/20 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold gradient-text font-['Orbitron']">Receipt Scanner</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="glass cyber-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Upload Receipt</h2>
            <ReceiptUploader onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

            {error && (
              <div className="mt-4 text-red-400 text-sm">{error}</div>
            )}

            {analysis && (
              <div className="mt-6 glass cyber-border rounded-lg p-5">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <CheckCircle2 size={18} /> Analysis complete
                </div>
                <div className="text-sm text-gray-300 space-y-1">
                  <div><span className="text-gray-400">Merchant:</span> {analysis.merchant}</div>
                  <div><span className="text-gray-400">Date:</span> {analysis.date}</div>
                  <div><span className="text-gray-400">Total:</span> {formatCurrency(analysis.total || 0)}</div>
                </div>
                <Button className="mt-4 w-full bg-purple-600 hover:bg-purple-700" onClick={handleSave}>
                  Save Receipt
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="glass cyber-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="text-purple-400" />
                Tips for Best Results
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3"><span className="text-purple-400">✓</span>Ensure good lighting and clear visibility of text</li>
                <li className="flex gap-3"><span className="text-purple-400">✓</span>Position receipt straight without shadows</li>
                <li className="flex gap-3"><span className="text-purple-400">✓</span>Include all important details (date, items, total)</li>
                <li className="flex gap-3"><span className="text-purple-400">✓</span>Use JPEG or PNG format for best results</li>
              </ul>
            </div>

            <div className="glass cyber-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Recent Scans</h3>
              <p className="text-gray-400">Scan a receipt to see it here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
