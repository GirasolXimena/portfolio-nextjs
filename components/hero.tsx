"use client";
import { motion } from "framer-motion";

import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { SparklesCore } from "./ui/sparkles";

export default function Hero({ name }: { name: string }) {
  return (
    <HeroHighlight className="flex flex-col gap-4">
      <motion.h1
        whileHover={{
          scale: 1.2,
          underlineThickness: "8px",
        }}
        initial={{
          opacity: 0,
          y: 20,
          underlineThickness: "2px",
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug underline und"
      >
        Hi! I&apos;m {name}!
      </motion.h1>
      <motion.h2
        className="text-xl"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
          delay: 0.5,
        }}
      >
        I&apos;m a{" "}
        <Highlight className="text-black dark:text-white">
          Design Systems Engineer
        </Highlight>{" "}
        based in Minneapolis, MN.
      </motion.h2>
      <div className="cta">
        <button className="btn btn-accent">Connect with me</button>
        or try changing the
        <div className="relative">
          <button className="btn btn-link">site theme</button>
          or
          <button className="btn btn-link">adding music</button>
          <SparklesCore
            background="transparent"
            className="absolute top-full"
          />
        </div>
      </div>
    </HeroHighlight>
  );
}
