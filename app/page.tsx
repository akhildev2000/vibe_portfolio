import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] text-white selection:bg-purple-500/30">
      <Hero />
      <div className="relative z-20 bg-[#121212] shadow-[0_-50px_100px_rgba(0,0,0,1)]">
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />

        <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
          <p>© {new Date().getFullYear()} Akhil Dev D. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}