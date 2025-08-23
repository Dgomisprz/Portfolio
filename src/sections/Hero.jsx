import React from 'react';
import HeroText from '../components/HeroText';

import RoundedImage from '../components/RoundedImage';


const Hero = () => {
    return (<section className='flex flex-col items-center justify-start pt-16 md:pt-24 min-h-screen overflow-hidden c-space'>
            <RoundedImage />
            <HeroText />
            
        </section>) }

export default Hero;