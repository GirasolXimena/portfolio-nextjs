import React from "react";
import dynamic from "next/dynamic";
const OpenPropsGradientGenerator = dynamic(
  () => import("../../../components/open-props-gradient-generator"),
  { ssr: false }
);

function Page() {
  return (
    <article style={{
      height: '100%',
      // padding: '1rem',
      position: 'relative',
    }} id="page-gradient-generator">
      <h1>Generate Gradients using open-props</h1>
      <OpenPropsGradientGenerator />
    </article>
  )
}

export default Page