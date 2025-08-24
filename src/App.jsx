import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";

import Footer from "./sections/Footer";
import About from "./sections/About"; 
import Projects from "./sections/Projects";

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
        <Navbar />
        <section id="home">
          <Hero />
          
        </section>
        
        <section id="about">
          <About />
        </section>
        <section id="work">
          <Projects />
        </section>
        <Footer />      
        
    </div>
  );
};

export default App;