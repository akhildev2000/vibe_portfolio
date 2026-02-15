'use client';

import { MotionValue, useTransform, motion } from 'framer-motion';

interface OverlayProps {
    scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
    // Animation Phases
    const opacity1 = useTransform(scrollYProgress, [0.05, 0.2, 0.25], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -50]);

    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.55], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.55], [50, -50]);

    const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.85, 0.9], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.55, 0.9], [50, -50]);

    // Fade out everything when section ends
    const globalOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

    // Hide pointer events when faded out
    const pointerEvents = useTransform(scrollYProgress, (v) => v > 0.95 ? 'none' : 'auto');

    return (
        <motion.div
            style={{ opacity: globalOpacity, pointerEvents }}
            className="fixed inset-0 z-10 flex items-center justify-center p-4 w-full h-full"
        >
            {/* Slide 1 */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute w-full max-w-4xl text-center"
            >
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference">
                    Akhil Dev D.
                </h1>
                <p className="text-xl md:text-3xl font-light text-gray-300 mt-4 tracking-widest">
                    FLUTTER & FRONTEND DEVELOPER
                </p>
            </motion.div>

            {/* Slide 2 */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute w-full max-w-4xl text-left pl-4 md:pl-20"
            >
                <h2 className="text-5xl md:text-8xl font-bold leading-tight text-white">
                    I build digital <br />
                    <span className="italic font-serif text-purple-400">experiences</span>
                    <br /> that matter.
                </h2>
            </motion.div>

            {/* Slide 3 */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute w-full max-w-4xl text-right pr-4 md:pr-20"
            >
                <h2 className="text-5xl md:text-8xl font-bold leading-tight text-white">
                    Bridging <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        Design & Code.
                    </span>
                </h2>
            </motion.div>
        </motion.div>
    );
}
