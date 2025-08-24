import React from 'react';
import HeroText from '../components/HeroText';

import RoundedImage from '../components/RoundedImage';
import AuroraHero from '../components/AuroraHero';


const Hero = () => {
    return (<section className='flex flex-col items-center justify-start pt-16 md:pt-24 min-h-screen overflow-hidden c-space'>
            <RoundedImage />
            <HeroText />
            <AuroraHero />
            
        </section>) }

export default Hero;