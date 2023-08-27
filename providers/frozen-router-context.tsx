import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context";
import { ReactNode, useContext, useRef } from "react";

const FrozenRouterContextProvider = ({ children }: { children: ReactNode }) => {
  const context = useContext(LayoutRouterContext)
  const frozen = useRef(context).current;
  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  )
}

export default FrozenRouterContextProvider;