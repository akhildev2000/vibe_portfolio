'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Canvas from './Canvas';
import Overlay from './Overlay';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress relative to this 500vh section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    return (
        <section
            ref={containerRef}
            className="relative w-full"
            style={{ height: '500vh' }} // The scroll track
        >
            {/* 
              The content is NOT sticky. It is FIXED. 
              It stays in the viewport while we scroll through the spacer.
              We pass scrollYProgress to control animations and fade-out.
            */}
            <Canvas scrollYProgress={scrollYProgress} />
            <Overlay scrollYProgress={scrollYProgress} />

            <ScrollIndicator scrollYProgress={scrollYProgress} />
        </section>
    );
}

function ScrollIndicator({ scrollYProgress }: { scrollYProgress: any }) {
    // Fade out quickly as user starts scrolling
    const opacity = scrollYProgress.get() < 0.1 ? 1 : 0; // Simple toggle or useTransform

    return (
        <div
            className="fixed bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm animate-bounce z-20 pointer-events-none mix-blend-difference transition-opacity duration-300 block"
            style={{ opacity: 0 }} // Controlled via ref/effect in real DOM, but CSS class is safer for SSR
        >
            <span className="opacity-100">Scroll to explore</span>
        </div>
    );
}
