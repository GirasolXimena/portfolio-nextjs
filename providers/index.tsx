
import CompositeProvider from "providers/composite-context";

export function Providers({ children }) {

  return (
    <CompositeProvider>
      {children}
    </CompositeProvider>
  )
}

export default Providers