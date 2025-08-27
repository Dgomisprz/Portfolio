import React, {Suspense} from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Footer from "./sections/Footer";

const About = React.lazy(() => import("./sections/About"));   
const Projects = React.lazy(() => import("./sections/Projects"));
const SectionLoader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      
      <Suspense fallback={<SectionLoader />}>
        <section id="about">
          <About />
        </section>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <section id="work">
          <Projects />
        </section>
      </Suspense>
      
      <Footer />
    </div>
  );
};

export default App;