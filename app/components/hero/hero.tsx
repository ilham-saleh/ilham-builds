"use client";

import classNames from "classnames";
import Link from "next/link";
import { merryWeather, mukta } from "../../fonts";
import { AtSignIcon } from "../layouts/icons/at-sign-icon";
import { GithubIcon } from "../layouts/icons/github-icon";
import { LinkedinIcon } from "../layouts/icons/linkedin-icon";
import { XIcon } from "../layouts/icons/x-icon";
// import SplashCursor from "../mega-ui/cursor-effects/splash-cursor";
import SplashCursor from "../splash-cursor";
import ArrowDown from "./arrow-down";
import StatItem from "../stat-item";
import AnimatedNumber from "../animated-number";
import { useEffect, useState } from "react";
import { getAllTimeCoding, hoursToMinutes } from "app/utils/getAllTimeCoding";
import { m } from "motion/dist/react";

export default function Hero() {
  const START_DATE = new Date("2023-01-01");

  const [allTime, setAllTime] = useState(() => getAllTimeCoding(START_DATE));

  // Update all-time every hour
  useEffect(() => {
    const update = () => setAllTime(getAllTimeCoding(START_DATE));
    update();

    const interval = setInterval(update, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  // 🔒 Fixed values (you control these)
  const DAILY_HOURS = 4;
  const WEEKLY_HOURS = 28;

  return (
    <main className="relative z-10 min-h-svh w-screen overflow-hidden">
      <SplashCursor
        // containerClassName="absolute inset-0 pointer-events-none"
        usePrimaryColors={true}
      />
      <div
        className={classNames(
          "relative min-h-svh flex items-center",
          merryWeather.className
        )}
      >
        <ArrowDown />

        <div className="w-full max-w-5xl px-6 sm:px-10 md:px-16 lg:px-24 lg:ml-14">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-3">
            Welcome to my{" "}
            <span className="font-bold">personal portfolio — </span> It reflects
            how I <span className="italic border-b">think</span> and{" "}
            <span className="italic border-b">build</span>.{" "}
          </h1>
          <section className="relative z-10 mb-2">
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-prose">
              I&apos;m Ilham — a software developer who enjoys turning ideas
              into simple, well-built web products. I care about clean code,
              thoughtful UX, and learning how things really work under the hood.{" "}
              <a
                href="https://www.connectlife.uk/"
                className="underline-magical"
                target="_blank"
                rel="noreferrer"
                data-skip-splash-cursor
              >
                ConnectLife
              </a>
              .
            </p>
          </section>
          <h2
            className={`text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 ${mukta.className}`}
          >
            Wakatime
          </h2>
          <div
            className={`flex flex-wrap gap-4 max-w-5xl text-base md:text-md lg:text-lg mb-4 ${mukta.className}`}
          >
            <StatItem title="All Time">
              <AnimatedNumber number={allTime.hours} /> hours{" "}
              <AnimatedNumber number={allTime.minutes} /> minutes
            </StatItem>

            <StatItem title="Daily Average">
              <AnimatedNumber number={DAILY_HOURS} /> hours /{" "}
              <AnimatedNumber number={hoursToMinutes(DAILY_HOURS)} /> minutes
            </StatItem>

            <StatItem title="Weekly Average">
              <AnimatedNumber number={WEEKLY_HOURS} /> hours /{" "}
              <AnimatedNumber number={hoursToMinutes(WEEKLY_HOURS)} /> minutes
            </StatItem>
          </div>
          <section className="relative z-10 flex flex-col sm:flex-row gap-4 sm:items-center text-sm">
            <div>
              <p>More about me: </p>
              <div className="flex -ml-2">
                <Link
                  href="https://www.linkedin.com/in/ilham-saleh-430289218/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="linkedin"
                  data-skip-splash-cursor
                >
                  <LinkedinIcon className="h-9 w-9" />
                </Link>
                <Link
                  href="https://github.com/ilham-saleh"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="github"
                  data-skip-splash-cursor
                >
                  <GithubIcon className="h-9 w-9" />
                </Link>
                <Link
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="twitter"
                  data-skip-splash-cursor
                >
                  <XIcon className="h-9 w-9" />
                </Link>
                <Link
                  href="mailto:ilham2saleh@com"
                  aria-label="email"
                  rel="noreferrer"
                  data-skip-splash-cursor
                >
                  <AtSignIcon className="h-9 w-9" />
                </Link>
              </div>
            </div>
            <div className="hidden sm:block h-14 border-l border-gray-300" />
            <div
              className="flex flex-wrap space-x-3 space-y-1"
              data-skip-splash-cursor
            >
              <Link href="/projects">/projects</Link>
              {/* <Link href="/thoughts">/thoughts</Link>
              <Link href="/uses">/uses</Link> */}
              {/* <Link href="/stats">/stats</Link> */}
            </div>
          </section>
        </div>
      </div>
      {/* </SplashCursor> */}
    </main>
  );
}
