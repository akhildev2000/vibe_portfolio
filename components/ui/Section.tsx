import { ReactNode } from 'react';
import { cn } from '@/lib/utils'; // Assuming we might need this later, but for now standard classNames

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function Section({ children, className = '', id }: SectionProps) {
    return (
        <section
            id={id}
            className={`relative min-h-screen w-full flex flex-col justify-center px-4 md:px-8 py-20 ${className}`}
        >
            <div className="max-w-7xl mx-auto w-full z-10">
                {children}
            </div>
        </section>
    );
}
