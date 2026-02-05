'use client';

type Props = {
  label: string;
  value: string;
  icon?: string;
};

export default function StatCard({ label, value, icon }: Props) {
  return (
    <div className="glass cyber-border rounded-lg p-6 hover:cyber-glow transition-all">
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
