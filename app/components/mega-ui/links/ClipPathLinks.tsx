"use client";

import { MouseEvent } from "react";
import {
  SiAdobe,
  SiApple,
  SiCalendly,
  SiFacebook,
  SiGithub,
  SiGmail,
  SiGoogle,
  SiLinkedin,
  SiReaddotcv,
  SiShopify,
  SiSoundcloud,
  SiSpotify,
  SiTiktok,
  SiX,
  SiLeetcode,
} from "react-icons/si";
import { MdWork } from "react-icons/md";
import { PiCertificateBold, PiReadCvLogoBold } from "react-icons/pi";
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
const link = <img src="/static/images/aphex-apps.webp" alt="" />;

/* ----------------------------- */
/* Grid Layout                   */
/* ----------------------------- */

const LinksGrid = () => {
  return (
    <div className="h-full p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="h-full grid grid-rows-3 grid-rows-[1fr_1.2fr_1fr] border border-neutral-900 divide-y divide-neutral-900">
        <div className="grid grid-cols-2 divide-x divide-neutral-900">
          <LinkBox
            Icon={SiLinkedin}
            href="https://www.linkedin.com/in/ilham-saleh-430289218/"
          />
          <LinkBox Icon={SiGithub} href="https://github.com/ilham-saleh" />
        </div>

        <div className="grid grid-cols-4 divide-x divide-neutral-900">
          <LinkBox Icon={SiGmail} href="mailto:ilham2saleh@gmail.com" />
          <LinkBox Icon={PiReadCvLogoBold} href="/static/IlhamCV.pdf" />
          <LinkBox
            Icon={SiCalendly}
            href="https://calendly.com/ilham2saleh/30min"
          />
          <LinkBox Icon={MdWork} href="http://localhost:3000/projects" />
        </div>

        <div className="grid grid-cols-3 divide-x divide-neutral-900">
          <LinkBox
            Icon={PiCertificateBold}
            href="https://drive.google.com/file/d/1jYfezVpUHdgDvRwnAYTF-BOJmTvuQ6v1/view?usp=sharing"
          />
          <LinkBox Icon={SiX} href="https://x.com/" />
          <LinkBox
            Icon={SiLeetcode}
            href="https://leetcode.com/u/ilham-saleh/"
          />
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
      target="_blank"
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
