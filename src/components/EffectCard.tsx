type EffectCardProps = {
  title: string;
  description: string;
};

export function EffectCard({ title, description }: EffectCardProps) {
  return (
    <div className="border rounded-lg p-6 h-full hover:shadow-lg hover:border-blue-500 transition-all cursor-pointer">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}