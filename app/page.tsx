import About from "./components/sections/About";
import Clients from "./components/sections/Clients";
import Contact from "./components/sections/Contact";
import EducationSection from "./components/sections/Education";
import Education from "./components/sections/Education";
import Experience from "./components/sections/Experience";
import Hero from "./components/sections/Hero";
import LogoGallery from "./components/sections/LogoGallery";
import Projects from "./components/sections/Projects";
import { EDUCATION } from "./data/education.data";

export default function Home() {
  return (
    <main className="py-20 space-y-32 bg-gray-200">
      <section className="min-h-[80vh]">
        <Hero />
      </section>

      <section className="min-h-[80vh]">
        <Projects />
      </section>

      <section className="min-h-[80vh]">
        <LogoGallery />
      </section>

      <section className="">
        <Clients />
      </section>

      <section className="min-h-[80vh]">
        <About />
      </section>

      <section className="min-h-[80vh]">
        <EducationSection items={EDUCATION} />
      </section>

      <section className="min-h-[80vh]">
        <Contact />
      </section>

    </main>
  );
}
