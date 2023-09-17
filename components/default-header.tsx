import Navbar from "./navbar";
import HeaderControls from "./header-controls";

function DefaultHeader({ segment}: { segment: string}) {
  return (
    <>
      <Navbar segment={segment} />
      <HeaderControls segment={segment} />
    </>
  )
}
export default DefaultHeader;
