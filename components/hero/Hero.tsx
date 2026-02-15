'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Canvas from './Canvas';
import Overlay from './Overlay';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);

    // Track scroll progress of the 800vh container for smoother scrubbing
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    return (
        <div ref={containerRef} className="h-[800vh] relative bg-[#121212]">
            <div
                ref={canvasRef}
                className="sticky top-0 h-screen w-full overflow-hidden"
            >
                <Canvas scrollYProgress={scrollYProgress} />
                <Overlay scrollYProgress={scrollYProgress} />

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm animate-bounce z-20 pointer-events-none">
                    Scroll to explore
                </div>
            </div>
        </div>
    );
}
