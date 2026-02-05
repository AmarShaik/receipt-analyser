'use client';

import { Lightbulb } from 'lucide-react';

type Props = {
  title: string;
  items: string[] | undefined;
};

export default function InsightCard({ title, items }: Props) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="glass cyber-border rounded-lg p-6">
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
        <Lightbulb className="text-purple-400" />
        {title}
      </h3>
      <ul className="space-y-2 text-sm text-gray-300 list-disc pl-5">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
