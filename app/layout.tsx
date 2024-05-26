import { Metadata, Viewport } from "next";
import { inter } from "./fonts";
import "../styles/global.scss";
import styles from "../styles/layout.module.scss";
import Providers from "../providers";
import { ReactNode, StrictMode } from "react";
import DefaultLayout from "components/default-layout";
import { NAME } from "lib/data";

export const metadata: Metadata = {
  title: NAME,
  description: `${NAME} is a software engineer and designer based in Minneapolis, MN.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
  themeColor: "cyan",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html suppressHydrationWarning className={inter.variable} lang="en-us">
      <body className={styles.body}>
        <StrictMode>
          <Providers>
            <DefaultLayout>{children}</DefaultLayout>
          </Providers>
        </StrictMode>
      </body>
    </html>
  );
};

export default RootLayout;
