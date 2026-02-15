export default function Projects() {
    const projects = [
        {
            title: "Neon Horizon",
            category: "Web Application",
            description: "A futuristic dashboard for managing IoT devices in smart cities.",
            gradient: "from-blue-500/20 to-purple-500/20"
        },
        {
            title: "Velvet Audio",
            category: "E-Commerce",
            description: "Premium audio equipment store with 3D product visualizers.",
            gradient: "from-emerald-500/20 to-teal-500/20"
        },
        {
            title: "Apex Finance",
            category: "Fintech",
            description: "Real-time trading platform with WebGL data visualization.",
            gradient: "from-orange-500/20 to-red-500/20"
        },
        {
            title: "Zenith AI",
            category: "SaaS",
            description: "AI-powered creative assistant for digital artists.",
            gradient: "from-indigo-500/20 to-cyan-500/20"
        }
    ];

    return (
        <section className="relative w-full min-h-screen bg-[#121212] py-32 px-4 md:px-12 z-20">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-4xl md:text-6xl font-bold mb-16 text-white/90">Selected Work</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10`}
                        >
                            {/* Card Glow Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative p-8 md:p-12 h-96 flex flex-col justify-end">
                                <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                                    <span className="text-sm uppercase tracking-widest text-white/50 mb-2 block">{project.category}</span>
                                    <h4 className="text-3xl font-bold text-white mb-2">{project.title}</h4>
                                    <p className="text-white/70 max-w-sm">{project.description}</p>
                                </div>

                                <div className="absolute top-8 right-8 arrow-icon opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                        <line x1="7" y1="17" x2="17" y2="7"></line>
                                        <polyline points="7 7 17 7 17 17"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
