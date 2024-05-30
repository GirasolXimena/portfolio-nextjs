import Navbar from "./navbar";

function DefaultHeader({ segment = "" }: { segment?: string }) {
  return <Navbar segment={segment} />;
}
export default DefaultHeader;
