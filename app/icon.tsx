import { NAME } from "lib/data";
import { ImageResponse } from "next/og";

// Route segment config
// export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

// Image generation
export default function Icon() {
  const name = NAME;
  const firstInitial = name.split(" ")[0][0];
  const lastInitial = name.split(" ")[1][0];
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#323313",
          borderRadius: "25%",
          fontSize: 24,
        }}
      >
        <span
          style={{
            color: "magenta",
          }}
        >
          {firstInitial}
        </span>
        <span
          style={{
            color: "cyan",
          }}
        >
          {lastInitial}
        </span>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
