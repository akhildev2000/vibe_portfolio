'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Overlay from './Overlay';

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Track scroll progress of the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Map scroll (0 to 1) to frame index (0 to 119 - assuming 120 frames for now, will adjust)
    // We'll dynamically set the max frame based on loaded images
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, images.length - 1]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const frameCount = 192; // Validated file count
            const promises: Promise<HTMLImageElement | null>[] = [];

            for (let i = 0; i < frameCount; i++) {
                // Filenames are frame_000.webp, frame_001.webp, etc.
                const formattedIndex = i.toString().padStart(3, '0');
                const src = `/sequence/frame_${formattedIndex}.webp`;

                const promise = new Promise<HTMLImageElement | null>(async (resolve) => {
                    const img = new Image();
                    img.src = src;
                    try {
                        await img.decode(); // Decode off-main-thread for smoothness
                        resolve(img);
                    } catch (e) {
                        console.warn(`Failed to load/decode frame ${i}`, e);
                        // Fallback to onload if decode fails (rare) or just resolve null
                        img.onload = () => resolve(img);
                        img.onerror = () => resolve(null);
                    }
                });
                promises.push(promise);
            }

            const results = await Promise.all(promises);
            const successfulImages = results.filter((img): img is HTMLImageElement => img !== null);

            setImages(successfulImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    // Draw to canvas
    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', { alpha: false }); // alpha: false optimization
        if (!context) return;

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';

        const render = (index: number) => {
            const imageIndex = Math.min(
                images.length - 1,
                Math.max(0, Math.round(index))
            );
            const img = images[imageIndex];

            if (!img) return;

            // Handle object-fit: cover logic
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            // Optimization: Calculate draw dimensions once or only on resize?
            // For Scrollytelling, responsive is key, so calc per frame is safer but maybe costly.
            // Let's keep it per frame but optimize variables.
            const imgRatio = img.width / img.height;
            const canvasRatio = canvasWidth / canvasHeight;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgRatio > canvasRatio) {
                drawHeight = canvasHeight;
                drawWidth = canvasHeight * imgRatio;
                offsetX = (canvasWidth - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = canvasWidth;
                drawHeight = canvasWidth / imgRatio;
                offsetX = 0;
                offsetY = (canvasHeight - drawHeight) / 2;
            }

            // context.clearRect not needed if we cover the whole canvas with the image
            context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        // Subscribe to frame changes
        const unsubscribe = frameIndex.on('change', (latest) => {
            // Debouncing or throttling via requestAnimationFrame logic is implicit 
            // if we just call render, but let's ensure we don't stack frames.
            // Actually framer-motion's 'change' fires on every tick.
            // Let's just call render directly.
            render(latest);
        });

        // Initial render
        render(frameIndex.get());

        // Resize handler
        const handleResize = () => {
            // Match physical pixels for sharpness
            // const dpr = window.devicePixelRatio || 1;
            // canvas.width = window.innerWidth * dpr;
            // canvas.height = window.innerHeight * dpr;
            // context.scale(dpr, dpr); 
            // Note: scaling context with dpr might break image draw logic if not adjusted.
            // For video frames, usually 1:1 CSS pixels is enough unless source is 4k.
            // Let's stick to standard sizing for now to ensure object-fit logic holds.
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(frameIndex.get());
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial size

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, [images, frameIndex]);

    return (
        <div ref={containerRef} className="h-[500vh] relative bg-[#121212]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full block"
                />
                <Overlay scrollYProgress={scrollYProgress} />
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/50">
                        Loading Sequence...
                    </div>
                )}
            </div>
        </div>
    );
}
