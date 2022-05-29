import { FunctionComponent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type PageTransitionProps = {};

export const PageTransition: FunctionComponent<PageTransitionProps> = ({ children }) => {
  const variants = {
    hidden: { opacity: 0, x: 200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  return (
    <motion.div
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ type: 'linear' }} // Set the transition to linear
      className=""
    >
      {children}
    </motion.div>
  );
};

export const PagePresence: FunctionComponent<PageTransitionProps> = ({ children }) => {
  function backTop() {
    window.scrollTo(0, 0);
  }
  return (
    <AnimatePresence exitBeforeEnter initial={false} onExitComplete={backTop}>
      {children}
    </AnimatePresence>
  );
};
