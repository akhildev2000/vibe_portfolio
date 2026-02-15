'use client';

import { useTransform, motion, MotionValue } from 'framer-motion';

interface OverlayProps {
    scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {

    // Section 1: 0% - 35% (Fade out strictly by 35%)
    const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.35], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.35], [0, -50]);

    // Section 2: 35% - 65% (Fade in 35-40%, visible, fade out 60-65%)
    const opacity2 = useTransform(scrollYProgress, [0.35, 0.4, 0.6, 0.65], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.35, 0.65], [50, -50]);

    // Section 3: 65% - 100% (Fade in 65-70%, visible)
    const opacity3 = useTransform(scrollYProgress, [0.65, 0.7, 0.95, 1], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.65, 1], [50, -50]);

    return (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center text-white drop-shadow-lg">
            {/* Section 1 */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex items-center justify-center p-8"
            >
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-center">
                    Akhil Dev D.<br />
                    <span className="text-4xl md:text-6xl font-light text-gray-400">Mobile Application Developer.</span>
                </h1>
            </motion.div>

            {/* Section 2 */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-0 flex items-center justify-start p-8 md:pl-20"
            >
                <h2 className="text-5xl md:text-7xl font-bold max-w-2xl leading-tight">
                    I build digital <br />
                    <span className="italic font-serif">experiences.</span>
                </h2>
            </motion.div>

            {/* Section 3 */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute inset-0 flex items-center justify-end p-8 md:pr-20"
            >
                <h2 className="text-5xl md:text-7xl font-bold max-w-2xl text-right leading-tight">
                    Bridging design <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        & engineering.
                    </span>
                </h2>
            </motion.div>
        </div>
    );
}
