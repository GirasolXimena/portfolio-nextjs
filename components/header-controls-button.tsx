'use client'
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
type HeaderControlsProps = {
  children: ReactNode;
  className: string;
}
function HeaderControlsButton({ children, className }: HeaderControlsProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 2 / 3
      }}
      whileHover={{
        scale: 1.15,
        opacity: 1,
      }}
      whileTap={{
        scale: 0.9,
        opacity: 1,
      }}
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      >
       {children} 
      </motion.div>
  )
}

export default HeaderControlsButton;