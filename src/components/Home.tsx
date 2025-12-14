import React, { useState, useRef } from 'react';
import LandingPage from './LandingPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Home: React.FC = () => {
  const [showMain, setShowMain] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const scrollToMain = () => {
    if (mainContentRef.current) {
      // Remove loading screen before starting scroll
      setShowLoadingScreen(false);
      mainContentRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center'
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {showLoadingScreen && (
        <div className="absolute inset-0">
          <LandingPage onComplete={() => {
            setShowMain(true);
            // Wait for the fade out animation to complete before scrolling
            setTimeout(scrollToMain, 1000);
          }} />
        </div>
      )}
      
      <div 
        ref={mainContentRef}
        className={`min-h-screen text-white px-4 sm:p-8 font-display flex items-center justify-center transform transition-transform duration-1000 ${showMain ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg leading-relaxed">
              Hi! This is the <span className="line-through">wonderfully designed</span> website of Johnston Liu. 
              I'm from Vancouver, Canada, and I'm a senior at the University of Chicago pursuing a double major 
              in Mathematics and Computer Science.
            </p>
            
            <p className="text-base sm:text-lg leading-relaxed">
              I'm an incoming software engineer at Suno, starting sometime in Q2 2026 (TBD).
              This past summer, I was based in the Bay Area as an intern at Pure Storage working on the FlashBlade kernel team
              spending most of my time getting kernel modules and hardware devices to work. I also built
              an <a href="https://github.com/JohnstonLiu/ai-agent" className="text-blue-400 hover:text-blue-300 underline">AI Agent</a>.
              The summer prior, I was based in NYC as an intern at CMS Holdings performing research into trading 
              strategies and building research tools in Python. The summer prior to that, 
              I conducted mathematical research on symmetric monoidal preorders and their applications to finite 
              topological spaces. A paper communicating my findings can be found{' '} 
              <a href="/documents/reu_paper.pdf" className="text-blue-400 hover:text-blue-300 underline">
                here
              </a>. If you'd like to contact me, feel free to use any of the links below!
            </p>

            <div className="flex items-center justify-center gap-6 text-base sm:text-lg">
              <a 
                href="mailto:johnstonliu2004@gmail.com" 
                className="text-blue-400 hover:text-blue-300 relative group flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-lg" />
                Email
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a 
                href="https://github.com/JohnstonLiu" 
                className="text-blue-400 hover:text-blue-300 relative group flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faGithub} className="text-lg" />
                GitHub
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a 
                href="https://www.linkedin.com/in/johnston-liu/" 
                className="text-blue-400 hover:text-blue-300 relative group flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
                LinkedIn
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="https://blog.johnstonliu.me" 
                className="text-blue-400 hover:text-blue-300 relative group inline-flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faBook} className="text-lg" />
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>

          <footer className="mt-8 sm:mt-12 text-center text-gray-400 text-sm sm:text-base">
            <p>Designed by Johnston Liu © 2025</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home; 
