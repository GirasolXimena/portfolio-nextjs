'use client'
import { usePathname } from 'next/navigation';
import { useMouseInput } from 'hooks/useMouseInput';
import CompositeProvider from "providers/composite-context";
import TransitionContext from 'providers/transition-context';

export function Providers({ children }) {
  const pathname = usePathname();
  useMouseInput();

  return (
    <CompositeProvider>
      <TransitionContext key={pathname}>
        {children}
      </TransitionContext>
    </CompositeProvider>
  )
}

export default Providers