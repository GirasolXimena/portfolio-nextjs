"use client";
import Navbar from "./navbar";
import HeaderControls from "./header-controls";
import { useSelectedLayoutSegment } from "next/navigation";

function DefaultHeader() {
  const segment = useSelectedLayoutSegment() || 'home';
  return (
    <>
      {segment !== 'home' && <Navbar segment={segment} />}
      <HeaderControls segment={segment} />
    </>
  )
}
export default DefaultHeader;
