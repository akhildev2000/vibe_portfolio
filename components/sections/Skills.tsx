'use client';

import Section from '@/components/ui/Section';
import { motion } from 'framer-motion';

const skills = {
    "Mobile Development": ["Flutter", "Dart", "iOS", "Android", "GetX", "Bloc"],
    "Web Development": ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"],
    "Tools & Design": ["Git", "Figma", "Firebase", "VS Code", "Rest API"]
};

export default function Skills() {
    return (
        <Section id="skills" className="bg-[#0F0F0F] text-white">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        Technical <span className="text-purple-500">Arsenal.</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {Object.entries(skills).map(([category, items], catIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: catIndex * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-[#1A1A1A] p-8 rounded-2xl border border-white/5 hover:border-purple-500/20 transition-colors"
                        >
                            <h3 className="text-xl font-bold mb-6 text-purple-400 border-b border-white/10 pb-2">
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {items.map((skill, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: (catIndex * 0.1) + (index * 0.05) }}
                                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                                        viewport={{ once: true }}
                                        className="px-4 py-2 bg-white/5 rounded-lg text-sm text-gray-300 transition-colors cursor-default"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
