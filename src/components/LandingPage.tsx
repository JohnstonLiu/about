import React, { useState, useEffect } from 'react';

interface LandingPageProps {
  onComplete: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [messagePhase, setMessagePhase] = useState<'welcome' | 'input' | 'personalized'>('welcome');
  const [personalizedMsg, setPersonalizedMsg] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false);

  const initialMessage = `Welcome.
What's your name?`;

  const generatePersonalizedMessage = (name: string) => {
    if (name.toLowerCase() === 'johnston') {
      return 'Nice try buddy.';
    }

    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour >= 5 && hour < 12) {
      greeting = 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }

    return `${greeting}, ${name}! I'm Johnston.`;
  };

  useEffect(() => {
    // Cursor blink animation
    const cursorInterval = setInterval(() => {
      if (showPrompt) {
        setShowCursor(prev => !prev);
      }
    }, 1000);

    return () => clearInterval(cursorInterval);
  }, [showPrompt]);

  useEffect(() => {
    const typeMessage = async () => {
      if (messagePhase === 'welcome') {
        // Type "Welcome."
        for (let i = 0; i < 8; i++) {
          setCurrentIndex(i);
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        
        // Subtle pause after "Welcome."
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Type the rest of the message
        for (let i = 8; i < initialMessage.length; i++) {
          setCurrentIndex(i);
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        
        // Subtle pause after "What's your name?"
        await new Promise(resolve => setTimeout(resolve, 100));
        
        setIsTyping(false);
        setShowPrompt(true);
        setShowCursor(true);
        setMessagePhase('input');
      } else if (messagePhase === 'personalized') {
        // Reset states for the new message
        setIsTyping(true);
        setShowCursor(true);
        setCurrentIndex(0);

        // Type out the message
        for (let i = 0; i < personalizedMsg.length; i++) {
          setCurrentIndex(i);
          await new Promise(resolve => setTimeout(resolve, 30));
        }

        // Wait for the last character to be fully displayed
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Only then mark the message as complete
        setIsTyping(false);
        
        // Wait a moment before starting fade out
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Start fade out
        setIsFadingOut(true);
        
        // Wait for fade out animation to complete before calling onComplete
        setTimeout(onComplete, 500);
      }
    };

    typeMessage();
  }, [messagePhase, personalizedMsg]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && messagePhase === 'input' && userInput.trim()) {
      setPersonalizedMsg('');
      setCurrentIndex(0);
      const name = userInput.trim();
      // First clear the input
      setUserInput('');
      // Then update the message and phase together
      const newMessage = generatePersonalizedMessage(name);
      setPersonalizedMsg(newMessage);
      setMessagePhase('personalized');
    }
  };

  return (
    <div className={`min-h-screen bg-black text-white p-8 font-mono flex items-center justify-center transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-2xl w-full flex flex-col items-center">
        <div className="whitespace-pre-line mb-4 text-center">
          {messagePhase === 'welcome' || messagePhase === 'input'
            ? initialMessage.slice(0, currentIndex + 1)
            : messagePhase === 'personalized' && personalizedMsg.slice(0, currentIndex + 1)}
          <span className="inline-block w-[1ch]">
            {showCursor && isTyping ? '|' : '\u00A0'}
          </span>
        </div>
        
        {showPrompt && messagePhase === 'input' && (
          <div className="flex items-center justify-center w-full">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="bg-transparent border-none outline-none flex-1 text-white text-center max-w-xs md:focus:outline-none focus:ring-0 md:focus:ring-0 focus:border-none md:focus:border-none border-b border-white/30 focus:border-white/70 transition-colors duration-200 placeholder:text-white/30"
              style={{ caretColor: showCursor ? '#ffffff' : 'transparent' }}
              autoFocus
              spellCheck="false"
              autoComplete="off"
              placeholder="Type here..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage; 