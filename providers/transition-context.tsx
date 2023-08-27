import { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type TransitionContextType = {
  children: ReactNode;
  key?: string | number;
}

const TransitionContext: FC<TransitionContextType> = ({ children, key }) => (
  <AnimatePresence>
    <motion.div
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, type: 'tween' }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default TransitionContext
