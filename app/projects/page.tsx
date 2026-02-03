import Projects from "app/projects/projects";
import { Fragment } from "react";
import Header from "../components/header";

// export const metadata = {
//   title: "Projects",
//   description: "My Projects - Ilham Saleh",
// };

export default function Page() {
  return (
    <>
      <Header title="Projects" />
      <div className="space-y-2 md:space-y-5">
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Here are some of my selected projects worth sharing.
        </p>
      </div>
      <Projects />
    </>
  );
}
