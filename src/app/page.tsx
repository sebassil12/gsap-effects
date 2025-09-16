import Link from 'next/link';
import { effects } from '@/lib/data'; // Adjust the import path if needed
import { EffectCard } from '@/components/EffectCard';

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold text-center mb-12">My GSAP Effects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {effects.map((effect) => (
          // Use Next.js Link for optimized, client-side navigation
          <Link href={`/effects/${effect.slug}`} key={effect.slug}>
            <EffectCard 
              title={effect.title} 
              description={effect.description} 
            />
          </Link>
        ))}
      </div>
    </main>
  );
}