import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, BookOpen, Calculator, PenTool, Lightbulb } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const chapters = [
  {
    id: 1,
    title: "1. Definition of Double Integration",
    explanation: "A double integral is the extension of a definite integral to two dimensions. Instead of integrating over an interval [a, b] on a line, we integrate over a region R in a 2D plane.",
    formula: "\\iint_R f(x, y) \\,dA",
    exampleProblem: "Evaluate the double integral of a constant function f(x,y) = 1 over a rectangular region R = [0,2] \\times [0,3].",
    exampleSolution: [
      "Set up the integral: $\\int_{0}^{2} \\int_{0}^{3} 1 \\,dy \\,dx$",
      "Integrate with respect to y first: $\\int_{0}^{2} [y]_{0}^{3} \\,dx$",
      "Substitute y limits: $\\int_{0}^{2} (3 - 0) \\,dx = \\int_{0}^{2} 3 \\,dx$",
      "Integrate with respect to x: $[3x]_{0}^{2} = 3(2) - 0 = 6$"
    ]
  },
  {
    id: 2,
    title: "2. Geometrical Meaning",
    explanation: "Geometrically, if f(x,y) \\ge 0, the double integral represents the volume of the solid bounded above by the surface z = f(x,y) and below by the region R in the xy-plane.",
    formula: "V = \\iint_R f(x, y) \\,dA",
    exampleProblem: "Find the volume under the surface z = x + y over the region R = [0,1] \\times [0,1].",
    exampleSolution: [
      "Volume integral: $V = \\int_{0}^{1} \\int_{0}^{1} (x + y) \\,dx \\,dy$",
      "Integrate wrt x: $\\int_{0}^{1} [\\frac{x^2}{2} + xy]_{0}^{1} \\,dy$",
      "Substitute limits: $\\int_{0}^{1} (\\frac{1}{2} + y) \\,dy$",
      "Integrate wrt y: $[\\frac{1}{2}y + \\frac{y^2}{2}]_{0}^{1} = \\frac{1}{2} + \\frac{1}{2} = 1$"
    ]
  },
  {
    id: 3,
    title: "3. Limits of Integration",
    explanation: "For a general region, the limits of integration might be functions of the other variable. It's crucial to sketch the region to determine if it is Type I (vertical slices) or Type II (horizontal slices).",
    formula: "\\int_{a}^{b} \\int_{g_1(x)}^{g_2(x)} f(x, y) \\,dy \\,dx",
    exampleProblem: "Set up the limits for integrating over the region bounded by y = x^2 and y = x.",
    exampleSolution: [
      "Find intersections: $x^2 = x \\Rightarrow x(x-1) = 0 \\Rightarrow x=0, x=1$",
      "The curve $y=x$ is above $y=x^2$ on $[0,1]$.",
      "Outer limits (x): $0$ to $1$.",
      "Inner limits (y): From the bottom curve $y=x^2$ to the top curve $y=x$.",
      "Integral: $\\int_{0}^{1} \\int_{x^2}^{x} f(x,y) \\,dy \\,dx$"
    ]
  },
  {
    id: 4,
    title: "4. Cartesian Integrals",
    explanation: "When evaluating a double integral in Cartesian (rectangular) coordinates, we perform iterated integration. Fubini's Theorem states we can change the order of integration if the function is continuous.",
    formula: "\\int \\int f(x,y) \\,dx \\,dy = \\int \\int f(x,y) \\,dy \\,dx",
    exampleProblem: "Evaluate $\\int_{0}^{1} \\int_{0}^{y} x^2 y \\,dx \\,dy$.",
    exampleSolution: [
      "Inner integral wrt x: $\\int_{0}^{y} x^2 y \\,dx = [\\frac{x^3}{3} y]_{0}^{y} = \\frac{y^4}{3}$",
      "Outer integral wrt y: $\\int_{0}^{1} \\frac{y^4}{3} \\,dy$",
      "Evaluate: $[\\frac{y^5}{15}]_{0}^{1} = \\frac{1}{15}$"
    ]
  },
  {
    id: 5,
    title: "5. Polar Coordinates",
    explanation: "For circular regions or integrands involving x^2 + y^2, polar coordinates are often easier. Remember the Jacobian determinant: dA = dx dy = r dr dθ.",
    formula: "\\iint_R f(x, y) \\,dx \\,dy = \\int_{\\alpha}^{\\beta} \\int_{r_1(\\theta)}^{r_2(\\theta)} f(r\\cos\\theta, r\\sin\\theta) r \\,dr \\,d\\theta",
    exampleProblem: "Evaluate the integral of $f(x,y) = e^{-(x^2+y^2)}$ over the unit circle $x^2+y^2 \\le 1$.",
    exampleSolution: [
      "Convert region to polar: $0 \\le r \\le 1, 0 \\le \\theta \\le 2\\pi$",
      "Substitute $x^2+y^2 = r^2$ and $dA = r \\,dr \\,d\\theta$",
      "Integral: $\\int_{0}^{2\\pi} \\int_{0}^{1} e^{-r^2} r \\,dr \\,d\\theta$",
      "Let $u = -r^2$, $du = -2r \\,dr$. Inner integral: $[-\\frac{1}{2} e^{-r^2}]_{0}^{1} = \\frac{1-e^{-1}}{2}$",
      "Outer integral: $\\int_{0}^{2\\pi} \\frac{1-e^{-1}}{2} \\,d\\theta = \\pi(1-e^{-1})$"
    ]
  },
  {
    id: 6,
    title: "6. Applications",
    explanation: "Double integrals are used in physics and engineering to compute mass, center of mass, moments of inertia, and electric charge distribution over a 2D lamina.",
    formula: "Mass: m = \\iint_D \\rho(x,y) \\,dA",
    exampleProblem: "Find the mass of a triangular lamina with vertices (0,0), (1,0), (0,1) and density $\\rho(x,y) = x$.",
    exampleSolution: [
      "Region limits: $x$ from $0$ to $1$, $y$ from $0$ to $1-x$.",
      "Integral: $m = \\int_{0}^{1} \\int_{0}^{1-x} x \\,dy \\,dx$",
      "Inner integral: $\\int_{0}^{1-x} x \\,dy = x[y]_{0}^{1-x} = x(1-x) = x - x^2$",
      "Outer integral: $\\int_{0}^{1} (x - x^2) \\,dx = [\\frac{x^2}{2} - \\frac{x^3}{3}]_{0}^{1}$",
      "Evaluate: $\\frac{1}{2} - \\frac{1}{3} = \\frac{1}{6}$"
    ]
  }
];

const LearningPage = () => {
  const [currentChapter, setCurrentChapter] = useState(0);

  const nextChapter = () => {
    if (currentChapter < chapters.length - 1) setCurrentChapter(prev => prev + 1);
  };

  const prevChapter = () => {
    if (currentChapter > 0) setCurrentChapter(prev => prev - 1);
  };

  const renderMathText = (text) => {
    // A simple parser to render inline math enclosed in $...$
    const parts = text.split('$');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <InlineMath key={index} math={part} />;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-1/4">
          <div className="glass-card sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" /> Chapters
            </h2>
            <div className="space-y-2">
              {chapters.map((ch, index) => (
                <button
                  key={ch.id}
                  onClick={() => setCurrentChapter(index)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
                    currentChapter === index 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {ch.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-3/4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentChapter}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Header */}
              <div>
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
                  {chapters[currentChapter].title}
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed">
                  {chapters[currentChapter].explanation}
                </p>
              </div>

              {/* Formula Card */}
              <div className="glass bg-cyan-950/20 border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl"></div>
                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Calculator className="w-4 h-4" /> Core Formula
                </h3>
                <div className="text-center overflow-x-auto p-4">
                  <div className="text-2xl text-white inline-block text-glow">
                    <BlockMath math={chapters[currentChapter].formula} />
                  </div>
                </div>
              </div>

              {/* Worked Example */}
              <div className="glass-card bg-slate-900/80 border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-purple-400" /> Worked Example
                </h3>
                <div className="mb-6 text-slate-200 font-medium">
                  <strong>Problem:</strong> {renderMathText(chapters[currentChapter].exampleProblem)}
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                    <PenTool className="w-4 h-4" /> Step-by-step Solution
                  </h4>
                  <div className="pl-4 border-l-2 border-purple-500/30 space-y-4">
                    {chapters[currentChapter].exampleSolution.map((step, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        key={idx} 
                        className="text-slate-300 leading-relaxed"
                      >
                        <span className="inline-block w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs text-center leading-6 mr-3 border border-white/5">
                          {idx + 1}
                        </span>
                        {renderMathText(step)}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 border-t border-white/10 pt-8">
            <button
              onClick={prevChapter}
              disabled={currentChapter === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                currentChapter === 0 
                  ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500' 
                  : 'glass hover:bg-white/10 text-white'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>
            
            <div className="text-slate-400 text-sm font-medium">
              {currentChapter + 1} of {chapters.length}
            </div>

            <button
              onClick={nextChapter}
              disabled={currentChapter === chapters.length - 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                currentChapter === chapters.length - 1
                  ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LearningPage;
