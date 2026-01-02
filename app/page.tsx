// import Contact from "./components/contact";
import Hero from "./components/hero/hero";
import Intro from "./components/intro";
import ClipPathLinks from "./components/mega-ui/links/ClipPathLinks";
import { ImageTrail } from "./components/mega-ui/mouse-image-trail/ImageTrail";
import { ScrollProvider } from "./components/providers/ScrollProvider";
import ScrollProgressBar from "./components/scroll-progress-bar";
import Works from "./components/work/works";

export default function Home() {
  return (
    <ScrollProvider>
      <ScrollProgressBar />
      <Hero />
      <Intro />
      {/* <ImageTrail /> */}
      <Works />
      <ClipPathLinks />
    </ScrollProvider>
  );
}
