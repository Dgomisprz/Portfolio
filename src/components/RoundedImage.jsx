import React, { useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';

const RoundedImage = ({ 
    src = "/assets/profile.jpg", 
    alt = "Profile Image", 
    size = "medium",
    showGlow = true,
    showBorder = true,
    className = ""
}) => {
    // Same colors as AuroraHero for perfect sync
    const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
    const color = useMotionValue(COLORS[0]);
    
    // Animation state
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Start color animation
        animate(color, COLORS, {
            ease: "easeInOut",
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror",
        });

        // Trigger entrance animation after component mounts
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    // Size variants
    const sizeClasses = {
        small: "w-32 h-32 md:w-40 md:h-40",
        medium: "w-48 h-48 md:w-64 md:h-64",
        large: "w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
    };

    return (
        <div className={`z-10 mt-4 md:mt-8 flex justify-center ${className}`}>
            <div className={`relative group transition-all duration-1000 ease-out ${
                isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : '-translate-y-full opacity-0'
            }`}>
                {/* Main rounded image */}
                <img 
                    src={src}
                    alt={alt}
                    className={`${sizeClasses[size]} rounded-full object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105`}
                />
                
                {/* Animated border synced with AuroraHero */}
                {showBorder && (
                    <motion.div 
                        className="absolute inset-0 rounded-full border-4 opacity-60 group-hover:opacity-90 transition-all duration-300 group-hover:scale-105"
                        style={{
                            borderColor: color
                        }}
                    />
                )}
                
                {/* Animated glow effect synced with AuroraHero */}
                {showGlow && (
                    <motion.div 
                        className="absolute inset-0 rounded-full opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-300 -z-10"
                        style={{
                            backgroundColor: color
                        }}
                    />
                )}
            </div>
        </div>
    );
};


export default RoundedImage;