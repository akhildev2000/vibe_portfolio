'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue, useTransform, motion } from 'framer-motion';

interface CanvasProps {
    scrollYProgress: MotionValue<number>;
}

export default function Canvas({ scrollYProgress }: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    // Config
    const frameCount = 192;

    // Hide canvas when scroll is done so it doesn't block lower content
    const opacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);
    // Also toggle pointer events or z-index if needed, but opacity is good start.
    // To ensure it doesn't overlap footer, we can scale it down or hide it.

    // 1. Preload Images
    useEffect(() => {
        let isMounted = true;

        const loadImages = async () => {
            const promises = [];
            let loadedCount = 0;

            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                const paddedIndex = i.toString().padStart(3, '0');
                img.src = `/sequence/frame_${paddedIndex}.webp`;

                promises.push(
                    new Promise<HTMLImageElement>((resolve) => {
                        img.onload = () => {
                            loadedCount++;
                            if (isMounted) setLoadProgress(Math.round((loadedCount / frameCount) * 100));
                            resolve(img);
                        };
                        img.onerror = () => {
                            console.warn(`Failed frame: ${i}`);
                            resolve(img); // Resolve with broken image
                        };
                    })
                );
            }

            const loadedImages = await Promise.all(promises);
            if (isMounted) {
                imagesRef.current = loadedImages;
                setImagesLoaded(true);
            }
        };

        loadImages();

        return () => { isMounted = false; };
    }, []);

    // 2. Render Logic
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const images = imagesRef.current;
        if (!canvas || images.length === 0) return;

        const context = canvas.getContext('2d', { alpha: false });
        if (!context) return;

        // Force High Quality
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';

        // Aspect Ratio Handling
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        const img = images[index];
        if (!img) return;

        // "Cover" Fit Logic
        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = (img.width || 1920) / (img.height || 1080);

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgAspect;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawHeight = canvas.height;
            drawWidth = canvas.height * imgAspect;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // 3. Animation Loop
    useEffect(() => {
        if (!imagesLoaded) return;

        // Immediately render frame 0
        renderFrame(0);

        const update = () => {
            const progress = scrollYProgress.get() || 0;
            const totalFrames = imagesRef.current.length;
            // Ensure we clamp between 0 and totalFrames-1
            const index = Math.min(
                totalFrames - 1,
                Math.max(0, Math.floor(progress * (totalFrames - 1)))
            );

            requestAnimationFrame(() => renderFrame(index));
        };

        // Hook into Framer Motion's change event
        const unsubscribe = scrollYProgress.on("change", update);

        // Initial render call
        update();

        return () => unsubscribe();
    }, [imagesLoaded, scrollYProgress]);

    return (
        <>
            {/* Loading Screen */}
            {!imagesLoaded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
                    <div className="text-center">
                        <div className="text-2xl font-bold mb-2">Loading Experience</div>
                        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-purple-500 transition-all duration-100 ease-out"
                                style={{ width: `${loadProgress}%` }}
                            />
                        </div>
                        <div className="mt-2 text-sm text-gray-400">{loadProgress}%</div>
                    </div>
                </div>
            )}

            {/* The Video Canvas - FIXED Position */}
            <motion.canvas
                ref={canvasRef}
                style={{ opacity }}
                className="fixed top-0 left-0 w-full h-full object-cover z-0 bg-[#121212]"
            />
        </>
    );
}
