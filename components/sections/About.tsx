'use client';

import Section from '@/components/ui/Section';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <Section id="about" className="bg-[#121212] text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Column - Image or deeply stylistic typography */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
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

                {/* Right Column - Stats or Details */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-[#1E1E1E] p-8 rounded-2xl border border-white/5"
                >
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-1">Location</h4>
                            <p className="text-xl">Trivandrum, Kerala, India</p>
                        </div>
                        <div>
                            <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-1">Email</h4>
                            <p className="text-xl text-purple-400">akidev2000@gmail.com</p>
                        </div>
                        <div>
                            <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-1">Experience</h4>
                            <p className="text-xl">Flutter & Web Development</p>
                        </div>
                        <div>
                            <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-1">Phone</h4>
                            <p className="text-xl text-purple-400">+91 8281819583</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
