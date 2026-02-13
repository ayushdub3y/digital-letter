
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, ChevronRight, RefreshCw, Star } from 'lucide-react';

// --- Types ---
type Page = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// --- Components ---

const FloatingHearts = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute"
        >
          <Heart size={12 + Math.random() * 20} className="text-pink-200 fill-pink-200" />
        </motion.div>
      ))}
    </div>
  );
};

const PageWrapper: React.FC<{ children: React.ReactNode; bgColor?: string; bgImage?: string }> = ({ 
  children, 
  bgColor = "bg-pink-50",
  bgImage
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen w-full flex flex-col items-center justify-center p-6 relative ${bgColor} transition-colors duration-1000`}
      style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      <div className="z-10 w-full max-w-2xl text-center">
        {children}
      </div>
    </motion.div>
  );
};

const ContinueButton: React.FC<{ onClick: () => void; text?: string; className?: string }> = ({ onClick, text = "Continue →", className = "" }) => (
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(244, 114, 182, 0.4)" }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`fixed bottom-8 right-8 px-6 py-3 bg-pink-400 text-white rounded-full shadow-lg font-medium tracking-wide z-50 ${className}`}
  >
    {text}
  </motion.button>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(1);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showDoodle, setShowDoodle] = useState<boolean | null>(null);
  const [valentineAnswered, setValentineAnswered] = useState(false);
  const [secretRevealed, setSecretRevealed] = useState(false);

  const nextPage = () => setCurrentPage((prev) => (prev < 8 ? (prev + 1) as Page : prev));
  const restart = () => {
    setCurrentPage(1);
    setIsEnvelopeOpen(false);
    setShowDoodle(null);
    setValentineAnswered(false);
    setSecretRevealed(false);
  };

  return (
    <div className="antialiased text-gray-800">
      <AnimatePresence mode="wait">
        {/* PAGE 1: Landing */}
        {currentPage === 1 && (
          <PageWrapper key="page1" bgColor="bg-gradient-to-br from-pink-50 to-pink-100">
            <FloatingHearts />
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl md:text-5xl font-handwritten text-pink-500 mb-12 drop-shadow-sm px-4"
            >
              “A special delivery… <br/> made with all my love 💌”
            </motion.h1>
            
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="relative w-64 h-48 mx-auto animate-float"
            >
              {/* Illustrated Mail Truck */}
              <div className="absolute inset-0 bg-pink-200 rounded-2xl shadow-inner overflow-hidden border-4 border-white">
                <div className="w-full h-1/2 bg-white opacity-40"></div>
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                   <Heart className="text-pink-400 fill-pink-400" size={48} />
                </div>
              </div>
              <div className="absolute -bottom-4 left-4 w-12 h-12 bg-gray-700 rounded-full border-4 border-white"></div>
              <div className="absolute -bottom-4 right-4 w-12 h-12 bg-gray-700 rounded-full border-4 border-white"></div>
              <div className="absolute top-4 right-0 w-16 h-12 bg-white rounded-l-lg opacity-60"></div>
            </motion.div>
            
            <ContinueButton onClick={nextPage} />
          </PageWrapper>
        )}

        {/* PAGE 2: Open the Letter */}
        {currentPage === 2 && (
          <PageWrapper key="page2" bgColor="bg-rose-100">
            <h2 className="text-2xl font-medium text-rose-700 mb-8">This is for you.</h2>
            <div className="relative flex justify-center items-center h-80">
              <motion.div 
                layout
                onClick={() => setIsEnvelopeOpen(true)}
                className={`relative cursor-pointer transition-all duration-700 ${isEnvelopeOpen ? 'transform -translate-y-10 scale-110' : ''}`}
              >
                {!isEnvelopeOpen ? (
                  <div className="relative w-64 h-44 bg-rose-200 rounded-lg shadow-xl flex items-center justify-center border-2 border-rose-300">
                    <div className="absolute top-0 left-0 w-full h-full bg-rose-200 clip-path-envelope"></div>
                    <Heart size={40} className="text-rose-500 fill-rose-400 z-10" />
                  </div>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-6 shadow-2xl rounded-sm max-w-sm border-t-8 border-rose-400 relative"
                  >
                    <img 
                      src="https://i.postimg.cc/gjHScxFC/Whats-App-Image-LOVE-TIMES.jpg" 
                      alt="Love Photo" 
                      className="w-full h-48 object-cover rounded-md mb-4 shadow-sm"
                    />
                    <p className="font-handwritten text-rose-800 text-2xl leading-relaxed text-left">
                      “Hi love, <br/>
                      I don’t always say everything I feel, but I wanted to make something that shows you just how much you mean to me.”
                    </p>
                    <div className="absolute -top-4 -right-4 animate-sparkle">
                      <Star size={32} className="text-yellow-300 fill-yellow-200" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
            {isEnvelopeOpen && <ContinueButton onClick={nextPage} text="Next →" />}
          </PageWrapper>
        )}

        {/* PAGE 3: Why I Love You */}
        {currentPage === 3 && (
          <PageWrapper key="page3" bgColor="bg-pink-50">
            <h2 className="text-3xl font-pacifico text-pink-400 mb-10">Why I Love You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-16">
              {[
                "The way you care, even when you pretend you don’t.",
                "How safe I feel when I’m talking to you.",
                "The way your voice instantly calms me.",
                "Your smile — it genuinely makes my day better.",
                "The way you make ordinary moments feel special."
              ].map((reason, idx) => (
                <motion.div
                  key={idx}
                  initial={{ rotate: idx % 2 === 0 ? -2 : 2, y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                  className="bg-white p-4 shadow-md rounded-sm border border-pink-100 flex flex-col items-center"
                >
                  <div className="w-full aspect-square bg-pink-100 rounded-sm mb-4 flex items-center justify-center overflow-hidden">
                    <Heart className="text-pink-300 fill-pink-50" size={40} />
                  </div>
                  <p className="text-sm font-medium text-pink-600 italic">“{reason}”</p>
                </motion.div>
              ))}
            </div>
            <ContinueButton onClick={nextPage} text="Keep Going →" />
          </PageWrapper>
        )}

        {/* PAGE 4: Our Memories */}
        {currentPage === 4 && (
          <PageWrapper key="page4" bgColor="bg-stone-50">
            <div className="border-4 border-dashed border-pink-200 p-8 rounded-3xl bg-white shadow-lg">
               <h2 className="text-2xl font-handwritten text-pink-500 mb-6">I doodled something for you, wanna see?</h2>
               
               {showDoodle === null && (
                 <div className="flex gap-4 justify-center">
                    <button 
                      onClick={() => setShowDoodle(true)}
                      className="px-8 py-2 bg-pink-400 text-white rounded-full hover:bg-pink-500 transition-colors"
                    >
                      Yes!
                    </button>
                    <button 
                      onClick={() => alert("Oh come on, you know you want to! ❤️")}
                      className="px-8 py-2 border-2 border-pink-400 text-pink-400 rounded-full hover:bg-pink-50 transition-colors"
                    >
                      No
                    </button>
                 </div>
               )}

               {showDoodle && (
                 <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                 >
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="w-full max-w-[280px] aspect-[3/4] bg-pink-50 rounded-xl flex items-center justify-center border-2 border-pink-200 shadow-xl overflow-hidden"
                    >
                      <img 
                        src="https://i.postimg.cc/0j0W5zRh/Whats-App-Image-tv-girl.jpg" 
                        alt="Doodle Reveal" 
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <p className="mt-4 text-pink-400 italic font-medium">Handcrafted with love...</p>
                 </motion.div>
               )}
            </div>
            {showDoodle && <ContinueButton onClick={nextPage} text="Next →" />}
          </PageWrapper>
        )}

        {/* PAGE 5: Little Things About You */}
        {currentPage === 5 && (
          <PageWrapper key="page5" bgColor="bg-rose-50">
            <h2 className="text-3xl font-pacifico text-rose-400 mb-8">Little Things About You</h2>
            <div className="space-y-4 text-left max-w-md mx-auto">
              {[
                "The way you listen to me.",
                "How you try, even when things aren’t easy.",
                "The little things you do that you don’t even notice.",
                "Your kindness.",
                "Your presence — it means more than you know."
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-rose-100"
                >
                  <Heart className="text-rose-400 fill-rose-100 flex-shrink-0" size={20} />
                  <span className="text-rose-700 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
            <ContinueButton onClick={nextPage} />
          </PageWrapper>
        )}

        {/* PAGE 6: The Question */}
        {currentPage === 6 && (
          <PageWrapper key="page6" bgColor="bg-pink-100">
            <motion.h2 
              className="text-4xl md:text-6xl font-pacifico text-pink-500 mb-12 drop-shadow-md"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
            >
              Will you be my Valentine?
            </motion.h2>

            {!valentineAnswered ? (
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "#ec4899" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setValentineAnswered(true)}
                  className="px-12 py-4 bg-pink-500 text-white rounded-full text-xl font-bold shadow-lg"
                >
                  Yes 💗
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "#f472b6" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setValentineAnswered(true)}
                  className="px-12 py-4 bg-pink-400 text-white rounded-full text-xl font-bold shadow-lg"
                >
                  Of course 💕
                </motion.button>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="relative">
                   <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-pink-400 blur-3xl opacity-30 rounded-full"
                   ></motion.div>
                   <p className="text-3xl font-handwritten text-pink-600 z-10 relative mt-4">
                     “I’m really lucky to have you.”
                   </p>
                </div>
                <ContinueButton onClick={nextPage} text="Next →" className="static mt-12 mb-0" />
              </motion.div>
            )}
          </PageWrapper>
        )}

        {/* PAGE 7: Secret Message */}
        {currentPage === 7 && (
          <PageWrapper key="page7" bgColor="bg-rose-200">
            {!secretRevealed ? (
              <motion.div 
                onClick={() => setSecretRevealed(true)}
                whileHover={{ scale: 1.02 }}
                className="bg-white/40 backdrop-blur-md p-12 rounded-3xl cursor-pointer border border-white/50 shadow-xl group"
              >
                <h3 className="text-2xl font-medium text-rose-900 group-hover:text-rose-700 transition-colors">
                  There’s something important I want you to read.
                </h3>
                <div className="mt-6 text-rose-500">
                  <Mail className="mx-auto" size={48} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 p-10 rounded-3xl shadow-2xl relative overflow-hidden"
              >
                <FloatingHearts />
                <div className="relative z-10 text-rose-800 space-y-4 text-xl md:text-2xl leading-relaxed font-handwritten">
                  <p>“I don’t just like you. I care about you deeply.”</p>
                  <p>“You’ve become someone I think about, someone I appreciate, and someone I’m truly grateful for.”</p>
                  <p>“Thank you for being in my life.”</p>
                </div>
                <ContinueButton onClick={nextPage} text="Final Page →" className="static mt-8" />
              </motion.div>
            )}
          </PageWrapper>
        )}

        {/* PAGE 8: Ending Page */}
        {currentPage === 8 && (
          <PageWrapper key="page8" bgImage="https://i.postimg.cc/mkyXZPfp/last-background-image.jpg">
             <div className="bg-black/20 absolute inset-0 backdrop-blur-[2px]"></div>
             <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative z-10 text-white text-center"
             >
                <div className="mb-8">
                   <Heart size={80} className="mx-auto text-pink-400 fill-pink-400 animate-pulse" />
                </div>
                <h2 className="text-5xl md:text-7xl font-pacifico mb-4 drop-shadow-lg">With all my heart,</h2>
                <h3 className="text-4xl md:text-6xl font-handwritten drop-shadow-lg">Haggu 💌</h3>
                
                <motion.button
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                  onClick={restart}
                  className="mt-16 flex items-center gap-2 mx-auto bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-white border border-white/30 hover:bg-white/40 transition-colors"
                >
                  <RefreshCw size={20} />
                  <span>Start Again ↺</span>
                </motion.button>
             </motion.div>
             <FloatingHearts />
          </PageWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
