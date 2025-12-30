"use client";

import React, { MouseEvent } from "react";
import {
  SiAdobe,
  SiApple,
  SiFacebook,
  SiGoogle,
  SiLinkedin,
  SiShopify,
  SiSoundcloud,
  SiSpotify,
  SiTiktok,
} from "react-icons/si";
import { useAnimate } from "framer-motion";
import { IconType } from "react-icons";

/* ----------------------------- */
/* Links Section                 */
/* ----------------------------- */

export default function ClipPathLinks() {
  return (
    <section
      className="
        w-screen
        bg-neutral-50
        text-black
        overflow-hidden
        h-[80vh] md:h-[70vh] 
      "
    >
      <LinksGrid />
    </section>
  );
}

/* ----------------------------- */
/* Grid Layout                   */
/* ----------------------------- */

const LinksGrid = () => {
  return (
    <div className="h-full p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="h-full grid grid-rows-3 grid-rows-[1fr_1.2fr_1fr] border border-neutral-900 divide-y divide-neutral-900">
        <div className="grid grid-cols-2 divide-x divide-neutral-900">
          <LinkBox Icon={SiGoogle} href="#" />
          <LinkBox Icon={SiShopify} href="#" />
        </div>

        <div className="grid grid-cols-4 divide-x divide-neutral-900">
          <LinkBox Icon={SiApple} href="#" />
          <LinkBox Icon={SiSoundcloud} href="#" />
          <LinkBox Icon={SiAdobe} href="#" />
          <LinkBox Icon={SiFacebook} href="#" />
        </div>

        <div className="grid grid-cols-3 divide-x divide-neutral-900">
          <LinkBox Icon={SiTiktok} href="#" />
          <LinkBox Icon={SiSpotify} href="#" />
          <LinkBox Icon={SiLinkedin} href="#" />
        </div>
      </div>
    </div>
  );
};

/* ----------------------------- */
/* Hover Animation Logic         */
/* ----------------------------- */

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

type Side = "top" | "left" | "bottom" | "right";

const ENTRANCE_KEYFRAMES: Record<Side, string[]> = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES: Record<Side, string[]> = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

/* ----------------------------- */
/* Link Box                      */
/* ----------------------------- */

const LinkBox = ({ Icon, href }: { Icon: IconType; href: string }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e: MouseEvent) => {
    const box = (e.currentTarget as HTMLElement).getBoundingClientRect();

    const distances = [
      { side: "left" as Side, value: Math.abs(e.clientX - box.left) },
      { side: "right" as Side, value: Math.abs(e.clientX - box.right) },
      { side: "top" as Side, value: Math.abs(e.clientY - box.top) },
      { side: "bottom" as Side, value: Math.abs(e.clientY - box.bottom) },
    ];

    return distances.sort((a, b) => a.value - b.value)[0].side;
  };

  const handleMouseEnter = (e: MouseEvent) => {
    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[getNearestSide(e)],
    });
  };

  const handleMouseLeave = (e: MouseEvent) => {
    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[getNearestSide(e)],
    });
  };

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-full w-full place-content-center"
    >
      <Icon className="text-black text-2xl sm:text-3xl lg:text-4xl" />

      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-neutral-900"
      >
        <Icon className="text-white text-2xl sm:text-3xl lg:text-4xl" />
      </div>
    </a>
  );
};
