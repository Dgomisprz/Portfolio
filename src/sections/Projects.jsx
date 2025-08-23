
import { motion } from 'framer-motion';
import projects from '../constants/projects';
import { useState, useEffect, useRef } from 'react';
import { Lens } from '../components/Lens';
import InteractiveHoverButton from '../components/AnimatedButton';


const Projects = () => {

  const [isVisible, setIsVisible] = useState(false);
      const sectionRef = useRef(null);
  
      useEffect(() => {
          const observer = new IntersectionObserver(
              ([entry]) => {
                  if (entry.isIntersecting) {
                      setIsVisible(true);
                      observer.disconnect();
                  }
              },
              {
                  threshold: 0.2, 
              }
          );
  
          if (sectionRef.current) {
              observer.observe(sectionRef.current);
          }
  
          return () => {
              if (sectionRef.current) {
                  observer.unobserve(sectionRef.current);
              }
          };
      }, []);
  return (
    <section ref={sectionRef} className="c-space section-spacing">
      <h2 className={`text-heading transition-all duration-1000 ease-out  ${
                    isVisible 
                        ? 'translate-y-0 opacity-100' 
                        : '-translate-y-full opacity-0'
                } `}>PROJECTS</h2>
      <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 auto-rows-fr mt-12 transition-all duration-1000 ease-out ${
                    isVisible 
                        ? '-translate-y-0 opacity-100' 
                        : 'translate-y-full opacity-0'
                }`}>
        {projects.map((project) => (
          
            <motion.div
              className="relative grid-default-color rounded-lg shadow-lg overflow-hidden h-full"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-64 overflow-hidden rounded-t-lg">
                   <Lens zoomFactor={1.3} lensSize={170}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </Lens>
              </div>
              <div className="p-6 flex flex-col">
                <h3 className="headtext font-bold">{project.title}</h3>
                <p className="subtext mt-2 flex-1 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.technologies.map((tech, index) => (
                    <img
                      key={index}
                      src={`/assets/logos/${tech}.svg`}
                      alt={tech}
                      className="w-6 h-6"
                      title={tech}
                    />
                  ))}
                </div>
                <div className='mt-10' >
                  {project.link && (
                    <InteractiveHoverButton onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")} >
                      Check the project
                    </InteractiveHoverButton>
                  
                )}
                </div>
                
              </div>
            </motion.div>
          
        ))}
      </div>
    </section>
  );
};

export default Projects;
