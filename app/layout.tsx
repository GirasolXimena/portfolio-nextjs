import { Metadata, Viewport } from "next";
import { inter } from "./fonts";
import "../styles/global.scss";
import styles from "../styles/layout.module.scss";
import Providers from "../providers";
import { ReactNode, StrictMode } from "react";
import DefaultLayout from "components/default-layout";
import { NAME } from "lib/data";
import clsx from 'clsx'
import '@mantine/core/styles.css';

import { ColorSchemeScript } from "@mantine/core";

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
    <html suppressHydrationWarning className={clsx(inter.variable, 'spectrum spectrum--light spectrum--large')} lang="en-us">
      <head>
        <ColorSchemeScript />
      </head>
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
