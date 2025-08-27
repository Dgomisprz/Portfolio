import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import projects from '../constants/projects';

const Lens = React.lazy(() => import('../components/Lens'));
const InteractiveHoverButton = React.lazy(() => import('../components/AnimatedButton'));

const ProjectCard = memo(({ project, index }) => (
  <motion.div
    className="relative grid-default-color rounded-lg shadow-lg overflow-hidden h-full"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="w-full h-40 md:h-64 overflow-hidden rounded-t-lg">
      <React.Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse" />}>
        <Lens zoomFactor={1.3} lensSize={170}>
          <picture>
            <source srcSet={`${project.image.replace('.png', '.webp').replace('.jpg', '.webp')}`} type="image/webp" />
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </Lens>
      </React.Suspense>
    </div>
    
    <div className="md:p-6 flex flex-col">
      <h3 className="headtext font-bold">{project.title}</h3>
      <p className="subtext mt-2 flex-1">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {project.technologies.map((tech, techIndex) => (
          <picture key={techIndex}>
            <source srcSet={`/assets/logos/${tech}.svg`} type="image/svg+xml" />
            <img
              src={`/assets/logos/${tech}.svg`}
              alt={tech}
              className="w-6 h-6"
              title={tech}
              loading="lazy"
              decoding="async"
            />
          </picture>
        ))}
      </div>
      
      <div className="mt-10">
        {project.link && (
          <React.Suspense fallback={<div className="w-32 h-10 bg-gray-200 rounded animate-pulse" />}>
            <InteractiveHoverButton 
              onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
            >
              Check the project
            </InteractiveHoverButton>
          </React.Suspense>
        )}
      </div>
    </div>
  </motion.div>
));

ProjectCard.displayName = 'ProjectCard';

const Projects = memo(() => {
  const [sectionRef, isVisible] = useIntersectionObserver();

  const memoizedProjects = useMemo(() => projects, []);

  return (
    <section ref={sectionRef} className="c-space section-spacing">
      <h2 className={`text-heading transition-all duration-1000 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}>
        PROJECTS
      </h2>
      
      <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 auto-rows-fr mt-12 transition-all duration-1000 ease-out ${
        isVisible 
          ? '-translate-y-0 opacity-100' 
          : 'translate-y-full opacity-0'
      }`}>
        {memoizedProjects.map((project, index) => (
          <ProjectCard 
            key={`${project.title}-${index}`} 
            project={project} 
            index={index}
          />
        ))}
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';
export default Projects;