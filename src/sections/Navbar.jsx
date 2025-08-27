import React, { useState, useEffect, useCallback, memo } from "react";
import { motion } from 'framer-motion';
import { throttle } from '../utils/performance';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' }
];

const Navigation = memo(({ activeSection, onNavClick }) => (
  <ul className="nav-ul">
    {navItems.map((item) => (
      <li key={item.name} className="nav-li">
        <a 
          className={`nav-link transition-colors duration-200 ${
            activeSection === item.href.slice(1) 
              ? 'text-white font-semibold' 
              : 'text-neutral-400 hover:text-white'
          }`}
          href={item.href}
          onClick={(e) => onNavClick(e, item.href)}
        >
          {item.name}
        </a>
      </li>
    ))}
  </ul>
));

Navigation.displayName = 'Navigation';

const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const targetId = href.slice(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    setIsOpen(false);
  }, []);


  const handleScroll = useCallback(
    throttle(() => {
      const sections = ['home', 'about', 'work'];
      const scrollPosition = window.scrollY + 100; 

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <div className="inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40 lg:fixed lg:top-0">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a 
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white cursor-pointer"
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            Daniel
          </a>
          
          <button 
            onClick={toggleMenu} 
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <img 
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"} 
              className="w-6 h-6" 
              alt=""
              loading="eager"
            />
          </button>
          
          <nav className="hidden sm:flex">
            <Navigation activeSection={activeSection} onNavClick={handleNavClick} />
          </nav>
        </div>
      </div>
      
      {isOpen && (
        <motion.div 
          className="block overflow-hidden text-center sm:hidden" 
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }} 
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="pb-5">
            <Navigation activeSection={activeSection} onNavClick={handleNavClick} />
          </nav>
        </motion.div>
      )}
    </div>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;