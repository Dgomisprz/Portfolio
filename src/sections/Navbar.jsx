import React, { useState, useEffect } from "react";
import { motion } from 'motion/react';

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' }
];

function Navigation({ activeSection, onNavClick }) {
    return (
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
    );
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');


    const handleNavClick = (e, href) => {
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
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'work'];
            const scrollPosition = window.scrollY + 100; 

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
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
                        onClick={() => setIsOpen(!isOpen)} 
                        className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
                    >
                        <img 
                            src={isOpen ? "assets/close.svg" : "assets/menu.svg"} 
                            className="w-6 h-6" 
                            alt="toggle"
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
                    style={{ maxHeight: '100vh' }} 
                    transition={{ duration: 0.3 }}
                >
                    <nav className="pb-5">
                        <Navigation activeSection={activeSection} onNavClick={handleNavClick} />
                    </nav>
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;