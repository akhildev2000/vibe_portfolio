'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue } from 'framer-motion';

interface CanvasProps {
    scrollYProgress: MotionValue<number>;
}

export default function Canvas({ scrollYProgress }: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Total frames matching the public/sequence folder
    const frameCount = 192;

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];

            // Load the first image immediately to show something ASAP
            const firstImg = new Image();
            firstImg.src = `/sequence/frame_000.webp`;
            await new Promise((resolve) => {
                firstImg.onload = resolve;
                firstImg.onerror = resolve; // Continue even if error to avoid blocking
            });
            loadedImages[0] = firstImg;
            setImages([firstImg]); // Set immediate state

            // Load the rest
            const loadPromises = Array.from({ length: frameCount }).map((_, i) => {
                // Skip 0 as it's already loading/loaded
                if (i === 0) return Promise.resolve(firstImg);

                return new Promise<HTMLImageElement | null>((resolve) => {
                    const img = new Image();
                    const paddedIndex = i.toString().padStart(3, '0');
                    img.src = `/sequence/frame_${paddedIndex}.webp`;

                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        console.warn(`Failed to load frame ${i}`);
                        resolve(null);
                    };
                });
            });

            const results = await Promise.all(loadPromises);
            const filteredResults = results.filter((img): img is HTMLImageElement => img !== null);

            setImages(filteredResults);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d', { alpha: false });
        if (!context) return;

        context.imageSmoothingEnabled = true;

        let lastIndex = -1;
        let animationFrameId: number;

        const render = () => {
            // Get scroll progress (0 to 1)
            const progress = scrollYProgress.get();

            // Map progress to frame index
            // Use (images.length - 1) to ensure we don't go out of bounds
            const maxIndex = images.length - 1;
            const index = Math.min(
                maxIndex,
                Math.max(0, Math.floor(progress * maxIndex))
            );

            // Optimize: Draw only if frame changed
            if (index !== lastIndex) {
                lastIndex = index;
                const img = images[index];

                if (img) {
                    // Canvas dimensions
                    const canvasWidth = canvas.width;
                    const canvasHeight = canvas.height;

                    // Draw "Cover" logic
                    const imgRatio = img.width / img.height;
                    const canvasRatio = canvasWidth / canvasHeight;

                    let drawWidth, drawHeight, offsetX, offsetY;

                    if (imgRatio > canvasRatio) {
                        // Image is wider than canvas (crop sides)
                        drawHeight = canvasHeight;
                        drawWidth = canvasHeight * imgRatio;
                        offsetX = (canvasWidth - drawWidth) / 2;
                        offsetY = 0;
                    } else {
                        // Image is taller than canvas (crop top/bottom)
                        drawWidth = canvasWidth;
                        drawHeight = canvasWidth / imgRatio;
                        offsetX = 0;
                        offsetY = (canvasHeight - drawHeight) / 2;
                    }

                    // Clear and draw
                    context.clearRect(0, 0, canvasWidth, canvasHeight);
                    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        // Start render loop
        render();

        // Handle Resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            lastIndex = -1; // Force redraw
            // render() continues via rAF
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [images, scrollYProgress]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover z-0 block" // block to remove inline spacing
        />
    );
}
