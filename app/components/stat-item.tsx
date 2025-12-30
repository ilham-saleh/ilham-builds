import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function StatItem({ title, children }: Props) {
  return (
    <div
      className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 rounded-md
                w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
    >
      <p className="font-bold text-gray-800 dark:text-white">{title}</p>
      <span className="text-gray-700 dark:text-gray-400">{children}</span>
    </div>
  );
}
