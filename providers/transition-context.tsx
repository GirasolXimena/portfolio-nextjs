import { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type TransitionContextType = {
  children: ReactNode;
  transitionKey?: string | number;
}

const TransitionContext: FC<TransitionContextType> = ({ children, transitionKey }) => (
  <AnimatePresence>
    <motion.div
      key={transitionKey}
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
