import { useContext } from "react";
import { TransitionContext } from "providers/transition-context";

const useTransitionContext = () => {
    const context = useContext(TransitionContext);
    if (context === undefined) {
        throw new Error(`useTransitionContext must be used within a TransitionContextProvider`);
    }
    return context;
}

export default useTransitionContext