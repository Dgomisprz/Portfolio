import { useState, useEffect } from 'react';
import MorphingText from './MorphingText';

const HeroText = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="z-10 mt-4 text-center rounded-3xl bg-clipltext">
            {/* Desktop and Mobile - now both centered */}
            <div className="flex flex-col items-center space-y-4">
                <h1 className={`text-4xl font-medium transition-all duration-1000 ease-out ${
                    isVisible 
                        ? 'translate-x-0 opacity-100' 
                        : '-translate-x-full opacity-0'
                }`}>
                    Hi I'm Dani
                </h1>
                
 
                <MorphingText texts={["Front-end", "Web", "Mobile"]} />
                <h2 className={`text-2xl font-bold transition-all duration-1000 ease-out delay-300 ${
                    isVisible 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-full opacity-0'
                }`}>
                    Developer
                </h2>
                
                <p className={`text-lg text-neutral-400 text-center max-w-md transition-all duration-1000 ease-out delay-600 ${
                    isVisible 
                        ? 'translate-x-0 opacity-100' 
                        : '-translate-x-full opacity-0'
                }`}>
                    I create web applications that are not only functional but also visually appealing.
                </p>
            </div>
        </div>
    );
}

export default HeroText;