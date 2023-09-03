import Navbar from "./navbar";
import HeaderControls from "./header-controls";

function DefaultHeader({ segment}: { segment: string}) {
  return (
    <>
      {segment !== 'home' && <Navbar segment={segment} />}
      <HeaderControls segment={segment} />
    </>
  )
}
export default DefaultHeader;
