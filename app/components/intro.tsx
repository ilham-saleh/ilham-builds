// REFACTORED VERSION USING LENIS FOR SMOOTH SCROLL-BASED OPACITY ANIMATION

// "use client";

// import { useEffect, useRef } from "react";

// export default function Intro() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const blocks = Array.from(
//       container.querySelectorAll<HTMLElement>(".intro-text")
//     );

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("is-active");
//           } else {
//             entry.target.classList.remove("is-active");
//           }
//         });
//       },
//       {
//         root: null,
//         threshold: 0.6,
//       }
//     );

//     blocks.forEach((block) => observer.observe(block));

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       id="intro"
//       className="relative z-10 bg-black text-white dark:bg-white dark:text-black"
//     >
//       <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-10 py-24 text-4xl font-semibold tracking-tight md:py-28 md:text-6xl lg:px-20 lg:py-3 lg:text-7xl">
//         <div className="leading-[1.15] space-y-6">
//           <p className="intro-text">I love coding.</p>

//           <p className="intro-text">
//             I use my passion and skills to build digital products and
//             experiences.
//           </p>

//           <p className="intro-text">
//             I&apos;m passionate about pixel-perfect UI and intuitively
//             implemented UX.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useLenis } from "lenis/dist/lenis-react";
import { useRef, useState } from "react";

function opacityForBlock(sectionProgress: number, blockNumber: number) {
  const progress = sectionProgress - blockNumber;

  if (progress >= 0 && progress < 1) {
    return 1;
  }

  return 0.2;
}

export default function Intro() {
  const [scrollY, setScrollY] = useState(0);

  useLenis(({ scroll }) => {
    setScrollY(scroll);
  });

  const refContainer = useRef<HTMLDivElement>(null);
  const numOfPages = 3;
  let progress = 0;
  const { current: elContainer } = refContainer;

  if (elContainer) {
    const { clientHeight, offsetTop } = elContainer;
    const screenH = window.innerHeight;
    const halfH = screenH / 2;

    const percentY =
      Math.min(
        clientHeight + halfH,
        Math.max(-screenH, scrollY - offsetTop) + halfH
      ) / clientHeight;

    progress = Math.min(numOfPages - 0.5, Math.max(0.5, percentY * numOfPages));
  }

  return (
    <div
      ref={refContainer}
      className="relative z-10 bg-black text-white dark:bg-white  dark:text-black"
      id="intro"
    >
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-10 py-24 text-4xl font-semibold tracking-tight md:py-28 md:text-6xl lg:px-20 lg:py-3 lg:text-7xl">
        <div className="leading-[1.15]">
          <div
            className="intro-text"
            style={{ opacity: opacityForBlock(progress, 0) }}
          >
            I love coding.
          </div>
          <span
            className="intro-text inline-block after:content-['_']"
            style={{ opacity: opacityForBlock(progress, 1) }}
          >
            I use my passion and skills to build digital products and
            experiences.
          </span>
          <span
            className="intro-text inline-block"
            style={{ opacity: opacityForBlock(progress, 2) }}
          >
            I&apos;m passionate about cutting-edge, pixel perfect UI and
            intuitively implemented UX.
          </span>
        </div>
      </div>
    </div>
  );
}
