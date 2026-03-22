import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") ||
        target.getAttribute("data-hover") === "true"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 2.5 : isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full z-[9999] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
};

export const MagneticButton = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * 0.4);
    y.set(distanceY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className={`relative group ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.div 
        className="absolute inset-0 bg-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
        layoutId="magnetic-glow"
      />
    </motion.button>
  );
};

export const MorphingCard = ({ title, description, icon: Icon }: any) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
      className="glass p-8 rounded-3xl relative overflow-hidden group cursor-none"
      data-hover="true"
    >
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-black transition-colors duration-500">
          <Icon size={24} />
        </div>
        <h3 className="text-2xl font-display font-bold mb-4">{title}</h3>
        <p className="text-white/60 leading-relaxed">{description}</p>
      </div>
      
      {/* Animated background gradient */}
      <motion.div 
        className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-700"
      />
    </motion.div>
  );
};

export const ParallaxSection = ({ children, offset = 50 }: { children: React.ReactNode, offset?: number }) => {
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      y.set(scrolled * (offset / 1000));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, y]);

  return (
    <motion.div style={{ y: springY }}>
      {children}
    </motion.div>
  );
};
