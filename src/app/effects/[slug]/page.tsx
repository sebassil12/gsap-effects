import { effects } from '@/lib/data';
import dynamic from 'next/dynamic';

const effectComponentMap: { [key: string]: React.ComponentType } = {
    'zoom-effect-transition': dynamic(() => import('@/components/effects/ZoomTransition')),
    'bouncy-button': dynamic(() => import('@/components/effects/BouncyButton')),
    'parallax-image': dynamic(() => import('@/components/effects/ParallaxImage')),
};

type PageProps = {
    params: { slug: string };
};

// 1. Make the function async
export default async function EffectPage({ params }: PageProps) {
    // 2. Await the params before using them
    const { slug } = await params;

    const effect = effects.find((e) => e.slug === slug);
    const EffectComponent = effectComponentMap[slug];

    if (!effect || !EffectComponent) {
        // Handle not found case
        return <div>Effect not found!</div>;
    }

    return (
        <EffectComponent />
    );
}

export async function generateStaticParams() {
    return effects.map((effect) => ({
        slug: effect.slug,
    }));
}