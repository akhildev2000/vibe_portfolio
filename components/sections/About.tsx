'use client';

import Section from '@/components/ui/Section';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <Section id="about" className="bg-[#121212] text-white relative overflow-hidden">
            {/* Floating Background Icons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-10 text-purple-500/20"
                >
                    {/* Placeholder for code/bracket icon */}
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </motion.div>
                <motion.div
                    animate={{ y: [0, 30, 0], opacity: [0.1, 0.15, 0.1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-40 right-20 text-blue-500/20"
                >
                    {/* Placeholder for mobile/phone icon */}
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-100">
                        About <span className="text-purple-500">Me.</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                        I'm a passionate Flutter Developer based in Trivandrum, India.
                        I build mobile apps that are not just functional but also beautiful and intuitive.
                    </p>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        With a background in Computer Applications and intensive training at Brototype,
                        I bridge the gap between complex engineering and elegant user experience.
                    </p>
                </motion.div>

                {/* Right Column */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-[#1E1E1E] p-8 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-sm"
                >
                    <div className="space-y-6">
                        <div className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-1">Location</h4>
                            <p className="text-xl font-medium">Trivandrum, Kerala, India</p>
                        </div>
                        <div className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-1">Email</h4>
                            <p className="text-xl font-medium text-purple-400">akidev2000@gmail.com</p>
                        </div>
                        <div className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-1">Experience</h4>
                            <p className="text-xl font-medium">Flutter & Web Development</p>
                        </div>
                        <div className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-1">Phone</h4>
                            <p className="text-xl font-medium text-purple-400">+91 8281819583</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
