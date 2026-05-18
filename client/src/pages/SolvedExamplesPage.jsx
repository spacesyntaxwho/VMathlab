import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, HelpCircle, Activity, SkipForward, RotateCcw } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const examples = [
  {
    id: 1,
    title: "Double Integral over a Rectangular Region",
    problem: "Evaluate the double integral of $f(x, y) = x^2 y$ over the region $R = [0, 2] \\times [1, 3]$.",
    hint: "Use Fubini's theorem. You can integrate with respect to either x or y first, since the limits are constants.",
    steps: [
      {
        text: "Set up the iterated integral.",
        math: "\\int_{1}^{3} \\int_{0}^{2} x^2 y \\,dx \\,dy"
      },
      {
        text: "Evaluate the inner integral with respect to x. Treat y as a constant.",
        math: "\\int_{0}^{2} x^2 y \\,dx = y \\left[ \\frac{x^3}{3} \\right]_{0}^{2} = y \\left( \\frac{8}{3} - 0 \\right) = \\frac{8}{3}y"
      },
      {
        text: "Substitute the result back into the outer integral.",
        math: "\\int_{1}^{3} \\frac{8}{3}y \\,dy"
      },
      {
        text: "Evaluate the outer integral with respect to y.",
        math: "\\frac{8}{3} \\left[ \\frac{y^2}{2} \\right]_{1}^{3} = \\frac{8}{3} \\left( \\frac{9}{2} - \\frac{1}{2} \\right)"
      },
      {
        text: "Simplify to get the final answer.",
        math: "\\frac{8}{3} (4) = \\frac{32}{3}"
      }
    ]
  },
  {
    id: 2,
    title: "Double Integral over a General Region",
    problem: "Evaluate $\\iint_D (x+2y) \\,dA$, where D is the region bounded by $y = 2x^2$ and $y = 1 + x^2$.",
    hint: "First, find the points of intersection of the two parabolas to determine the limits for x.",
    steps: [
      {
        text: "Find the intersection points by setting the equations equal to each other.",
        math: "2x^2 = 1 + x^2 \\implies x^2 = 1 \\implies x = -1, x = 1"
      },
      {
        text: "Determine the top and bottom curves. On $[-1, 1]$, $1+x^2 \\ge 2x^2$. Set up the integral.",
        math: "\\int_{-1}^{1} \\int_{2x^2}^{1+x^2} (x+2y) \\,dy \\,dx"
      },
      {
        text: "Integrate with respect to y.",
        math: "\\int_{-1}^{1} \\left[ xy + y^2 \\right]_{2x^2}^{1+x^2} \\,dx"
      },
      {
        text: "Substitute the y limits and simplify the integrand.",
        math: "\\int_{-1}^{1} (x(1+x^2) + (1+x^2)^2) - (x(2x^2) + (2x^2)^2) \\,dx"
      },
      {
        text: "Expand the terms.",
        math: "\\int_{-1}^{1} (x + x^3 + 1 + 2x^2 + x^4 - 2x^3 - 4x^4) \\,dx"
      },
      {
        text: "Combine like terms.",
        math: "\\int_{-1}^{1} (-3x^4 - x^3 + 2x^2 + x + 1) \\,dx"
      },
      {
        text: "Integrate with respect to x.",
        math: "\\left[ -\\frac{3x^5}{5} - \\frac{x^4}{4} + \\frac{2x^3}{3} + \\frac{x^2}{2} + x \\right]_{-1}^{1}"
      },
      {
        text: "Evaluate the limits. Note that odd powers will double and even powers will cancel out.",
        math: "2 \\left( -\\frac{3}{5} + \\frac{2}{3} + 1 \\right) = 2 \\left( \\frac{-9+10+15}{15} \\right) = \\frac{32}{15}"
      }
    ]
  }
];

const renderMathText = (text) => {
  const parts = text.split('$');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <InlineMath key={index} math={part} />;
    }
    return <span key={index}>{part}</span>;
  });
};

const SolvedExamplesPage = () => {
  const [currentExampleId, setCurrentExampleId] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const activeExample = examples[currentExampleId];

  const handleNextStep = () => {
    if (currentStep < activeExample.steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setShowHint(false);
  };

  const switchExample = (index) => {
    setCurrentExampleId(index);
    setCurrentStep(0);
    setShowHint(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/4 space-y-6">
          <div className="glass-card">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" /> Problems
            </h2>
            <div className="space-y-2">
              {examples.map((ex, index) => (
                <button
                  key={ex.id}
                  onClick={() => switchExample(index)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
                    currentExampleId === index 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {ex.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-3/4 space-y-8">
          
          <div className="glass-card bg-slate-900/80 border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/10 rounded-full blur-2xl"></div>
            
            <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6">
              {activeExample.title}
            </h1>
            
            <div className="text-lg text-white mb-8 p-6 bg-white/5 rounded-xl border border-white/10">
              <strong>Problem:</strong> {renderMathText(activeExample.problem)}
            </div>

            {/* Hint Section */}
            <div className="mb-8">
              <button 
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <HelpCircle className="w-4 h-4" /> {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-3"
                  >
                    <div className="p-4 bg-cyan-950/30 border border-cyan-500/20 rounded-lg text-cyan-200 text-sm">
                      {activeExample.hint}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Steps Container */}
            <div className="space-y-6 relative border-l-2 border-slate-700 ml-4 pl-8 pt-2 pb-2">
              {activeExample.steps.map((step, idx) => {
                const isRevealed = idx < currentStep;
                const isCurrent = idx === currentStep - 1;
                
                if (!isRevealed) return null;
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`relative ${isCurrent ? 'opacity-100' : 'opacity-60'} transition-opacity duration-300`}
                  >
                    <div className={`absolute -left-[43px] top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCurrent 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]' 
                        : 'bg-slate-800 text-slate-400 border border-slate-600'
                    }`}>
                      {isCurrent ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    
                    <div className="mb-2 text-slate-300">
                      {renderMathText(step.text)}
                    </div>
                    <div className={`p-4 rounded-xl inline-block ${
                      isCurrent ? 'bg-white/10 border border-white/20' : 'bg-transparent'
                    }`}>
                      <div className={`text-xl ${isCurrent ? 'text-glow text-white' : 'text-slate-300'}`}>
                        <BlockMath math={step.math} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              
              {currentStep === activeExample.steps.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 rounded-xl text-center"
                >
                  <h3 className="text-xl font-bold text-green-400 mb-2">Problem Solved!</h3>
                  <p className="text-slate-300 text-sm">Great job following along the steps.</p>
                </motion.div>
              )}
            </div>

            {/* Controls */}
            <div className="mt-10 flex gap-4">
              {currentStep < activeExample.steps.length ? (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-full font-medium flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
                >
                  <SkipForward className="w-5 h-5" /> Reveal Next Step
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="px-6 py-3 glass hover:bg-white/10 text-white rounded-full font-medium flex items-center gap-2 transition-all"
                >
                  <RotateCcw className="w-5 h-5" /> Reset Problem
                </button>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolvedExamplesPage;
