"use client";

import { useEffect, useState } from "react";
import AnimatedNumber from "../components/animated-number";
import StatItem from "../components/stat-item";
import { getAllTimeCoding, hoursToMinutes } from "app/utils/getAllTimeCoding";

export default function CodingStats() {
  const START_DATE = new Date("2023-01-01"); // change if needed

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
    <div className="absolute bottom-6 left-6 z-20 text-sm text-white font-mono space-y-3">
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
  );
}
