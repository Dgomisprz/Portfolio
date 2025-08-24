import React, { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { Meteors } from './Meteor';

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
const AuroraHero = () => {
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(175% 175% at 50% 0%, #020617 50%, ${color})`;

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 5,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  return (
    <motion.div style={{
        backgroundImage,
      }}
      className='absolute inset-0 -z-10'>
        <Meteors number={50} minDuration={8} maxDuration={16} angle={220} />
    </motion.div>
      
    
  );
};

export default AuroraHero;