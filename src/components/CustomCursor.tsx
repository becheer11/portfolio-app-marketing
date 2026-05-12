import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hover-target')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-brand-accent pointer-events-none z-[200] mix-blend-screen hidden md:block"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', duration: 0, ease: 'linear' }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[200] hidden md:block flex items-center justify-center glow"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
      >
        <div className="absolute w-[2px] h-full bg-brand-accent/60 shadow-[0_0_8px_var(--color-brand-accent)]" />
        <div className="absolute w-full h-[2px] bg-brand-accent/60 shadow-[0_0_8px_var(--color-brand-accent)]" />
      </motion.div>
    </>
  );
}
