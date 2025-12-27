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

  // Fixed daily and weekly totals in minutes
  const dailyMinutes = 3 * 60 + 30; // 3 hours 30 minutes
  const weeklyMinutes = 20 * 60 + 30; // example 20 hours 30 minutes

  return (
    <main className="relative min-h-svh w-screen overflow-hidden">
      <SplashCursor
        // containerClassName="min-h-svh w-screen"
        // usePrimaryColors={true}
        containerClassName="absolute inset-0 pointer-events-none"
        usePrimaryColors
      />

      <div className={classNames("relative min-h-svh", merryWeather.className)}>
        <ArrowDown />

        <div className="absolute top-[20%] md:top-[40%] max-w-5xl flex-col space-y-4 justify-center px-8 md:px-24 lg:ml-14">
          <h1 className="text-2xl font-medium md:mr-4 md:text-4xl">
            Welcome to my{" "}
            <span className="font-bold">personal portfolio — </span> or, as I
            like to call it, my{" "}
            <span className="italic border-b">playground</span> on the web.
          </h1>
          <section className="relative z-10">
            <p className="text-base md:text-md lg:text-lg text-justify">
              I&apos;m Dale Larroder — a Software Engineer and forever a student
              of the craft. I love building things for the web and am always on
              the lookout for new challenges and opportunities to learn. Right
              now, I&apos;m building cool things at{" "}
              <a
                href="https://www.aphex.co/"
                className="underline-magical"
                target="_blank"
                rel="noreferrer"
                data-skip-splash-cursor
              >
                Aphex
              </a>
              .
            </p>
          </section>
          <h2
            className={`text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 mb-1 ${mukta.className}`}
          >
            Wakatime
          </h2>
          <div
            className={`flex flex-wrap gap-4 max-w-5xl text-base md:text-md lg:text-lg ${mukta.className}`}
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
          <section className="relative z-10 flex space-x-4 items-center text-sm">
            <div>
              <p>More about me: </p>
              <div className="flex -ml-2">
                <Link
                  href="https://www.linkedin.com/in/dale-larroder/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="linkedin"
                  data-skip-splash-cursor
                >
                  <LinkedinIcon className="h-9 w-9" />
                </Link>
                <Link
                  href="https://github.com/dlarroder"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="github"
                  data-skip-splash-cursor
                >
                  <GithubIcon className="h-9 w-9" />
                </Link>
                <Link
                  href="https://x.com/dalelarroder"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="twitter"
                  data-skip-splash-cursor
                >
                  <XIcon className="h-9 w-9" />
                </Link>
                <Link
                  href="mailto:hi@dalelarroder.com"
                  aria-label="email"
                  rel="noreferrer"
                  data-skip-splash-cursor
                >
                  <AtSignIcon className="h-9 w-9" />
                </Link>
              </div>
            </div>
            <div className="h-14 border-l border-gray-300" />
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
    </main>
  );
}
