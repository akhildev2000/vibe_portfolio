'use client';

import Section from '@/components/ui/Section';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const experiences = [
    {
        role: "Flutter Developer",
        company: "Vaanam Technologies",
        type: "Full-time",
        duration: "Jun 2024 – Present",
        location: "Coimbatore, Tamil Nadu, India (On-site)",
        description: "Developing scalable mobile applications using Flutter, focusing on performance optimization and modern UI implementation. collaborating with cross-functional teams to deliver production-ready applications.",
        technologies: ["Flutter", "Dart", "Firebase", "REST APIs"]
    },
    {
        role: "Mobile Application Developer",
        company: "Agriall",
        type: "Full-time",
        duration: "Nov 2023 – Apr 2024",
        location: "Mumbai, Maharashtra, India (On-site)",
        description: "Specialized in Mobile Application Development and E-Commerce solutions. Built and maintained features for a customer-facing e-commerce platform.",
        technologies: ["Flutter", "E-Commerce", "State Management"]
    },
    {
        role: "Flutter Developer",
        company: "Brototype",
        type: "Internship",
        duration: "Oct 2022 – Mar 2023",
        location: "Thiruvananthapuram, Kerala, India",
        description: "Successfully deployed one app to Play Store using Flutter. Gained hands-on experience in full application lifecycle development.",
        technologies: ["Flutter", "Play Store Deployment", "Git"]
    },
    {
        role: "Super Intern (Web Development)",
        company: "EduLadder",
        type: "Internship",
        duration: "Dec 2021 – Mar 2022",
        location: "Bangalore (Remote)",
        description: "Conducted daily code reviews and maintained code quality standards. Assisted in frontend development tasks ensuring pixel-perfect implementation.",
        technologies: ["HTML", "CSS", "JavaScript", "Code Review"]
    }
];

export default function Experience() {
    return (
        <Section id="experience" className="bg-[#121212] text-white">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        Professional <span className="text-purple-500">Journey.</span>
                    </h2>
                </motion.div>

                <div className="relative border-l border-white/10 ml-4 md:ml-10 space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>

                            <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-white/5 hover:border-purple-500/20 transition-colors group">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                            {exp.role}
                                        </h3>
                                        <div className="text-lg text-gray-300 font-medium flex items-center gap-2 mt-1">
                                            <Briefcase size={16} className="text-purple-500" />
                                            {exp.company}
                                            <span className="text-sm bg-white/10 px-2 py-0.5 rounded-full text-gray-400 ml-2">
                                                {exp.type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-400 flex flex-col items-start md:items-end gap-1">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            {exp.duration}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} />
                                            {exp.location}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    {exp.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
