import React from 'react';
import AuroraBackground from './AuroraBackground';

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
}

const Hero = ({ title, subtitle, buttonText }: HeroProps) => {
  return (
      <div className="relative bg-gray-900 pt-14 isolate overflow-hidden">
      <AuroraBackground />
      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="text-left">
          <h1 
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl" 
            style={{ textWrap: 'balance' }}
            suppressHydrationWarning={true}
          >
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl">{subtitle}</p>
          <div className="mt-10 flex items-center justify-start gap-x-6">
            <a
              href="#"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-indigo-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-4">
                {buttonText}
              </span>
              <span aria-hidden="true" className="absolute right-6 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                &gt;
              </span>
            </a>
          </div>
        </div>
      </div>
      <div
        className="absolute z-10 bottom-0 left-0 w-full h-20"
        style={{ transform: 'translateY(1px)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
          <path
            className="fill-gray-50 dark:fill-[#061423]"
            fillOpacity="1"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
