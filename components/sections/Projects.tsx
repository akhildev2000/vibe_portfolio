'use client';

import Section from '@/components/ui/Section';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: "Netflix Clone",
        category: "Web Development",
        description: "A responsive replica of the Netflix interface built with HTML & CSS.",
        tags: ["HTML", "CSS", "Responsive"],
        links: { demo: "#", code: "#" }
    },
    {
        title: "Twitter Clone",
        category: "Web Development",
        description: "Social media interface clone focusing on layout and component structure.",
        tags: ["HTML", "CSS", "Layout"],
        links: { demo: "#", code: "#" }
    },
    {
        title: "E-Commerce App",
        category: "Mobile App",
        description: "Full-featured shopping application connected to a backend API.",
        tags: ["Flutter", "Dart", "API"],
        links: { demo: "#", code: "#" }
    },
    {
        title: "Task Manager",
        category: "Productivity",
        description: "A clean and efficient task management tool for daily productivity.",
        tags: ["Flutter", "Local Storage", "UI/UX"],
        links: { demo: "#", code: "#" }
    }
];

export default function Projects() {
    return (
        <Section id="projects" className="bg-[#121212] text-white">
            <div className="mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-4"
                >
                    Selected <span className="text-purple-500">Works.</span>
                </motion.h2>
                <p className="text-gray-400 text-lg max-w-2xl">
                    A collection of projects exploring mobile and web technologies.
                </p>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.2
                        }
                    }
                }}
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
                        }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="group relative bg-[#1E1E1E] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-colors"
                    >
                        <div className="h-64 bg-gradient-to-br from-gray-800 to-gray-900 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                            {/* Placeholder for project image */}
                            <span className="text-gray-600 font-mono text-xl">{project.title} Preview</span>
                        </div>

                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-sm text-purple-400 font-mono mb-2 block">{project.category}</span>
                                    <h3 className="text-2xl font-bold">{project.title}</h3>
                                </div>
                                <div className="flex gap-3">
                                    <a href={project.links.code} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                                        <Github size={20} />
                                    </a>
                                    <a href={project.links.demo} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>

                            <p className="text-gray-400 mb-6 line-clamp-2">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
}
