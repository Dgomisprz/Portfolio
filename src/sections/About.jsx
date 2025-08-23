
import { Frameworks } from "../components/Frameworks";
import Globe from "../components/Globe";
import { useState, useEffect, useRef } from 'react';
import InteractiveHoverButton from '../components/AnimatedButton';


const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Detenemos la observación una vez que la sección es visible
                }
            },
            {
                threshold: 0.2, // Activa cuando el 20% de la sección es visible
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
                } `} >ABOUT ME</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-row-[18rem] mt-12">
                
                <div className={`relative flex items-end grid-default-color grid-1 transition-all duration-1000 ease-out ${
                    isVisible 
                        ? 'translate-x-0 opacity-100' 
                        : '-translate-x-full opacity-0'
                }`}>
                    
                    <img 
                        src="assets/coding-pov.png" 
                        className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5] opacity-40" 
                    />
                    <div className="z-10">
                        <p className="headtext">Hi, I'm Dani</p>
                        <p className="subtext"> 27-year-old developer passionate about new technologies and cooking. A dedicated worker, I love working in teams and building professional connections among people with shared interests, as well as strengthening and expanding my professional skills.</p>
                        
                    </div>
                    <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo"/>
                </div>

                <div className={`relative grid-default-color grid-1 transition-all duration-1000 ease-out delay-300 ${
                    isVisible
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                }`}>
                
                    <div className="relative z-30 flex flex-col">
                        <div className="w-full md:w-[70%] mb-6">
                            <p className="headtext">Stack</p>
                            <p className="subtext">
                                I specialize in a variety of languages and frameworks I learned over my study career, now focusing on front-end stack that allows me to create modern and intuitive web and mobile apps.
                            </p>
                        </div>
                        
                        <div className="mb-8 md:mb-4">
                            <InteractiveHoverButton onClick={() => window.open('/public/pdf/DaniGomisCV.pdf', '_blank')}>
                                Get my CV
                            </InteractiveHoverButton>
                        </div>
                    </div>
                    
                    <div className="absolute top-0 right-0 w-[60%] md:w-full h-full md:inset-y-9 md:start-[60%] scale-50 md:scale-125 z-10 opacity-30 md:opacity-100">
                        <Frameworks />
                    </div>
                </div>

                <div className={`relative grid-default-color grid-5 transition-all duration-1000 ease-out delay-600 ${
                    isVisible 
                        ? '-translate-y-0 opacity-100' 
                        : 'translate-y-full opacity-0'
                }`}>
                    
                    <div className="z-10 w-[50%]">
                        <p className="headtext">Located in</p>
                        <p className="subtext">
                            I'm based in Alicante, Spain.<br/>
                            And I'm open to remote work opportunities worldwide or relocate within Europe and Spain.
                        </p>
                        
                    </div>
                    <figure className="absolute left-[60%] top-[-25%]">
                        <Globe />
                    </figure>
                </div>

            </div>
        </section>
    );
};

export default About;