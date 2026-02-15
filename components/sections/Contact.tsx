'use client';

import Section from '@/components/ui/Section';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Contact() {
    return (
        <Section id="contact" className="bg-[#121212] text-white py-32">
            <div className="grid md:grid-cols-2 gap-16">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
                    >
                        Let's build <br /> something <span className="text-purple-500">great.</span>
                    </motion.h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-md">
                        I'm currently available for freelance projects and full-time opportunities.
                    </p>

                    <div className="space-y-6">
                        <a href="mailto:akidev2000@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                            <div className="p-4 bg-white/5 rounded-full group-hover:bg-purple-500/20 transition-colors">
                                <Mail size={24} />
                            </div>
                            <span className="text-lg">akidev2000@gmail.com</span>
                        </a>

                        <a href="tel:+918281819583" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                            <div className="p-4 bg-white/5 rounded-full group-hover:bg-purple-500/20 transition-colors">
                                <Phone size={24} />
                            </div>
                            <span className="text-lg">+91 8281819583</span>
                        </a>

                        <div className="flex items-center gap-4 text-gray-300 group">
                            <div className="p-4 bg-white/5 rounded-full group-hover:bg-purple-500/20 transition-colors">
                                <MapPin size={24} />
                            </div>
                            <span className="text-lg">Trivandrum, Kerala</span>
                        </div>
                    </div>
                </div>

                <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6 bg-[#1A1A1A] p-8 rounded-3xl border border-white/5"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                        <input
                            type="text"
                            className="w-full bg-[#121212] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full bg-[#121212] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                        <textarea
                            rows={4}
                            className="w-full bg-[#121212] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="Tell me about your project..."
                        ></textarea>
                    </div>
                    <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                        Send Message <ArrowRight size={20} />
                    </button>
                </motion.form>
            </div>
        </Section>
    );
}
