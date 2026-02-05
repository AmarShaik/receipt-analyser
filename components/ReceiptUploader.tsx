'use client';

import { useState } from 'react';
import { FileText, Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { convertToBase64, formatFileSize, isValidFileType } from '@/lib/utils';
import { UPLOAD_LIMITS } from '@/lib/constants';

type Props = {
  onAnalyze: (imageBase64: string, mimeType: string, previewUrl: string) => void;
  isAnalyzing?: boolean;
};

export default function ReceiptUploader({ onAnalyze, isAnalyzing }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [base64, setBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);

    if (!isValidFileType(file, UPLOAD_LIMITS.ALLOWED_TYPES)) {
      setError(`Invalid file type. Allowed: ${UPLOAD_LIMITS.ALLOWED_TYPES.join(', ')}`);
      return;
    }

    if (file.size > UPLOAD_LIMITS.MAX_FILE_SIZE) {
      setError(`File too large. Max ${formatFileSize(UPLOAD_LIMITS.MAX_FILE_SIZE)}.`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const encoded = await convertToBase64(file);
    setBase64(encoded);
    setMimeType(file.type);
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleFile(file);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-purple-500/50 rounded-lg p-8 text-center hover:border-purple-400 transition cursor-pointer">
        <input
          type="file"
          accept={UPLOAD_LIMITS.ALLOWED_TYPES.join(',')}
          onChange={onChange}
          className="hidden"
          id="receipt-upload"
        />
        <label htmlFor="receipt-upload" className="cursor-pointer block">
          {preview ? (
            <>
              <FileText className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <p className="text-sm text-gray-300">Image selected</p>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <p className="font-medium mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-400">PNG, JPG, WEBP, HEIC up to 10MB</p>
            </>
          )}
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {preview && (
        <div className="space-y-4">
          <img src={preview} alt="Receipt preview" className="w-full rounded-lg border border-purple-500/30" />
          <Button
            disabled={isAnalyzing || !base64 || !mimeType}
            onClick={() => base64 && mimeType && onAnalyze(base64, mimeType, preview)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            size="lg"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Receipt'}
          </Button>
        </div>
      )}
    </div>
  );
}
