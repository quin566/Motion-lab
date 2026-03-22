import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Layers, 
  MousePointer2, 
  Box, 
  Sparkles, 
  Move, 
  ArrowRight, 
  Github, 
  Twitter, 
  Globe,
  Menu,
  X
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { CustomCursor, MagneticButton, MorphingCard, ParallaxSection } from "./components/MotionElements";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navItems = [
    { name: "Experiment", href: "#experiment" },
    { name: "The Lab", href: "#the-lab" },
    { name: "Playground", href: "#playground" },
    { name: "Vault", href: "#vault" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] px-6 py-8 flex justify-between items-center transition-all duration-500 ${scrolled ? "bg-black/20 backdrop-blur-md py-4" : "mix-blend-difference"}`}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-bold tracking-tighter"
        >
          <a href="#" className="cursor-none" data-hover="true">AETHER<span className="text-accent">.</span></a>
        </motion.div>
        
        <div className="hidden md:flex gap-12 text-sm font-medium uppercase tracking-widest">
          {navItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="hover:text-accent transition-colors cursor-none"
              data-hover="true"
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <MagneticButton className="p-2 md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </MagneticButton>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[150] bg-black flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 p-4"><X size={32} /></button>
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className="text-4xl font-display font-bold hover:text-accent transition-colors"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const scrollToLab = () => {
    document.getElementById("the-lab")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.3em] mb-8 bg-white/5 backdrop-blur-sm">
            Interactive Motion Lab v2.0
          </span>
          <h1 className="text-[12vw] md:text-[8vw] font-display font-bold leading-[0.85] tracking-tighter mb-8">
            CRAFTING<br />
            <span className="text-gradient">DIGITAL</span><br />
            POETRY
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-xl mx-auto text-white/40 text-lg md:text-xl font-light leading-relaxed mb-12"
        >
          An overbuilt exploration of fluid interfaces, cinematic transitions, 
          and the invisible threads that connect motion to emotion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <MagneticButton 
            onClick={scrollToLab}
            className="px-10 py-5 bg-white text-black rounded-full font-bold text-sm uppercase tracking-widest hover:bg-accent transition-colors"
          >
            Enter the Lab
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent/5 rounded-full blur-[120px]" />
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-white/5 rounded-full"
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] border border-white/5 rounded-full"
        />
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20"
      >
        <ArrowRight className="rotate-90" size={24} />
      </motion.div>
    </section>
  );
};

const ExperimentSection = () => {
  const experiments = [
    { id: "01", title: "Kinetic Typography", category: "Motion", img: "https://picsum.photos/seed/motion1/800/600" },
    { id: "02", title: "Fluid Simulation", category: "Physics", img: "https://picsum.photos/seed/physics1/800/600" },
    { id: "03", title: "Spatial Audio", category: "Sound", img: "https://picsum.photos/seed/sound1/800/600" },
    { id: "04", title: "Generative Art", category: "Creative", img: "https://picsum.photos/seed/art1/800/600" },
  ];

  return (
    <section id="experiment" className="py-32 overflow-hidden">
      <div className="px-6 mb-16 max-w-7xl mx-auto">
        <h2 className="text-sm uppercase tracking-[0.4em] text-accent-tertiary mb-4">Active Experiments</h2>
        <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tight">THE SHOWCASE</h3>
      </div>

      <div className="flex gap-8 px-6 overflow-x-auto pb-12 no-scrollbar">
        {experiments.map((exp) => (
          <motion.div
            key={exp.id}
            whileHover={{ y: -20 }}
            className="flex-shrink-0 w-[300px] md:w-[450px] group cursor-none"
            data-hover="true"
          >
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-6">
              <img 
                src={exp.img} 
                alt={exp.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <MagneticButton className="p-6 bg-white text-black rounded-full">
                  <ArrowRight size={24} />
                </MagneticButton>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <span className="text-accent text-xs font-mono mb-2 block">{exp.id} / {exp.category}</span>
                <h4 className="text-2xl font-display font-bold">{exp.title}</h4>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const VaultSection = () => {
  const archived = [
    { year: "2025", name: "Neon Pulse", type: "Web Experience" },
    { year: "2024", name: "Gravity Well", type: "Interaction Design" },
    { year: "2024", name: "Echo Chamber", type: "Audio Visualizer" },
    { year: "2023", name: "Prism Flow", type: "WebGL Experiment" },
  ];

  return (
    <section id="vault" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-sm uppercase tracking-[0.4em] text-white/40 mb-4">The Archive</h2>
          <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tight">THE VAULT</h3>
        </div>
        <p className="max-w-xs text-white/40 text-sm leading-relaxed">
          A collection of past explorations, failed prototypes, and successful 
          deployments from the lab's history.
        </p>
      </div>

      <div className="space-y-4">
        {archived.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group flex items-center justify-between py-8 border-b border-white/10 hover:border-accent transition-colors cursor-none"
            data-hover="true"
          >
            <div className="flex items-center gap-12">
              <span className="text-xs font-mono text-white/20 group-hover:text-accent transition-colors">{item.year}</span>
              <h4 className="text-3xl md:text-5xl font-display font-bold group-hover:translate-x-4 transition-transform duration-500">{item.name}</h4>
            </div>
            <div className="hidden md:block text-right">
              <span className="text-sm uppercase tracking-widest text-white/40">{item.type}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const FeatureGrid = () => {
  const features = [
    { title: "Fluid Motion", description: "Physics-based animations that feel natural and responsive to every interaction.", icon: Zap },
    { title: "Layered Depth", description: "Multi-plane parallax systems that create a sense of infinite digital space.", icon: Layers },
    { title: "Magnetic UI", description: "Elements that pull you in, creating a tactile feel in a touchless environment.", icon: MousePointer2 },
    { title: "3D Transforms", description: "Breaking the flat screen with perspective shifts and spatial awareness.", icon: Box },
    { title: "Micro-Magic", description: "The tiny details that turn a simple click into a memorable moment.", icon: Sparkles },
    { title: "Spatial Flow", description: "Seamless transitions that guide the eye through complex information.", icon: Move },
  ];

  return (
    <section id="the-lab" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="mb-24">
        <h2 className="text-sm uppercase tracking-[0.4em] text-accent mb-4">The Laboratory</h2>
        <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
          EXPERIMENTS IN<br />INTERACTION
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <MorphingCard {...f} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const DraggablePlayground = () => {
  return (
    <section id="playground" className="py-32 px-6 bg-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-sm uppercase tracking-[0.4em] text-accent-secondary mb-4">Interactive Playground</h2>
          <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tight">GRAB & PLAY</h3>
        </div>

        <div className="h-[600px] relative border border-white/10 rounded-[40px] bg-black/40 backdrop-blur-sm overflow-hidden">
          {[
            { color: "bg-accent", size: "w-32 h-32", label: "Motion", shape: "rounded-3xl" },
            { color: "bg-accent-secondary", size: "w-48 h-48", label: "Physics", shape: "rounded-full" },
            { color: "bg-accent-tertiary", size: "w-40 h-40", label: "Fluid", shape: "rounded-[40px]" },
            { color: "bg-white", size: "w-24 h-24", label: "Tactile", text: "text-black", shape: "rounded-xl" },
            { color: "bg-orange-500", size: "w-36 h-36", label: "Play", shape: "rounded-full" },
            { color: "bg-indigo-500", size: "w-28 h-28", label: "Flex", shape: "rounded-2xl" },
          ].map((item, i) => (
            <motion.div
              key={i}
              drag
              dragConstraints={{ left: 0, right: 1000, top: 0, bottom: 400 }}
              whileDrag={{ scale: 1.1, zIndex: 50 }}
              className={`absolute cursor-grab active:cursor-grabbing flex items-center justify-center font-bold uppercase tracking-tighter text-sm md:text-xl ${item.color} ${item.size} ${item.shape} ${item.text || "text-white shadow-2xl"}`}
              style={{ 
                left: `${10 + i * 15}%`, 
                top: `${15 + (i % 3) * 15}%`,
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
              }}
            >
              {item.label}
            </motion.div>
          ))}
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <span className="text-[20vw] font-display font-black">DRAG</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-8 right-8 z-[100]"
        >
          <MagneticButton 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-4 bg-accent text-black rounded-full shadow-2xl"
          >
            <ArrowRight className="-rotate-90" size={24} />
          </MagneticButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div>
          <div className="text-3xl font-display font-bold mb-4 tracking-tighter">
            AETHER<span className="text-accent">.</span>
          </div>
          <p className="text-white/40 max-w-xs">
            A creative developer flex piece exploring the boundaries of web motion.
          </p>
        </div>
        
        <div className="flex gap-8">
          {[Github, Twitter, Globe].map((Icon, i) => (
            <MagneticButton key={i} className="p-4 glass rounded-full hover:text-accent transition-colors">
              <Icon size={20} />
            </MagneticButton>
          ))}
        </div>
        
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-white/20 mb-2">Designed & Built by</p>
          <p className="font-display font-medium">Creative Lab 2026</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[1000] bg-black flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl font-display font-bold tracking-tighter"
            >
              AETHER<motion.span 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-accent"
              >.</motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CustomCursor />
      <Navbar />
      <BackToTop />
      
      <main className="glow-mesh">
        <Hero />
        
        <ExperimentSection />

        <ParallaxSection offset={-100}>
          <FeatureGrid />
        </ParallaxSection>

        <section className="py-32 px-6 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="text-6xl md:text-[10vw] font-display font-bold leading-none tracking-tighter mb-12">
              BEYOND THE<br />
              <span className="text-accent">PIXELS</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed">
              We don't just build websites. We create digital atmospheres that 
              breathe, react, and resonate with the human experience.
            </p>
          </motion.div>
        </section>

        <DraggablePlayground />

        <VaultSection />
        
        <section className="py-64 px-6 text-center overflow-hidden">
          <motion.div
            style={{ x: "-20%" }}
            animate={{ x: "20%" }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="whitespace-nowrap"
          >
            <span className="text-[15vw] font-display font-black opacity-5 outline-text">
              INTERACTIVE • IMMERSIVE • CINEMATIC • FLUID • 
            </span>
          </motion.div>
        </section>

        <Footer />
      </main>

      <style>{`
        .outline-text {
          -webkit-text-stroke: 1px white;
          color: transparent;
        }
      `}</style>
    </div>
  );
}
