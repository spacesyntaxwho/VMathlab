import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FunctionSquare, Settings2, Play, Activity, AreaChart, Loader2 } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';

const ProblemSolverPage = () => {
  const [integrand, setIntegrand] = useState('x^2 + y^2');
  const [coordSystem, setCoordSystem] = useState('cartesian');
  const [xMin, setXMin] = useState('0');
  const [xMax, setXMax] = useState('1');
  const [yMin, setYMin] = useState('0');
  const [yMax, setYMax] = useState('x');
  
  const [isSolving, setIsSolving] = useState(false);
  const [solution, setSolution] = useState(null);

  const handleSolve = () => {
    setIsSolving(true);
    setSolution(null);
    
    // Simulate backend computation time for the MVP
    setTimeout(() => {
      setIsSolving(false);
      setSolution({
        problem: `\\int_{${xMin}}^{${xMax}} \\int_{${yMin}}^{${yMax}} (${integrand}) \\,dy \\,dx`,
        steps: [
          `\\text{Inner integral: } \\int_{${yMin}}^{${yMax}} (${integrand}) \\,dy = \\left[ x^2y + \\frac{y^3}{3} \\right]_{0}^{x}`,
          `\\text{Substitute y limits: } x^2(x) + \\frac{x^3}{3} - (0) = x^3 + \\frac{x^3}{3} = \\frac{4x^3}{3}`,
          `\\text{Outer integral: } \\int_{${xMin}}^{${xMax}} \\frac{4x^3}{3} \\,dx = \\left[ \\frac{4x^4}{12} \\right]_{0}^{1} = \\left[ \\frac{x^4}{3} \\right]_{0}^{1}`,
          `\\text{Final Answer: } \\frac{1}{3}`
        ],
        finalAnswer: "\\frac{1}{3}"
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Input Panel */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="glass-card">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-cyan-400" /> Solver Config
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Coordinate System</label>
                <div className="flex rounded-md shadow-sm">
                  <button
                    onClick={() => setCoordSystem('cartesian')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-l-lg border ${
                      coordSystem === 'cartesian' 
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' 
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Cartesian
                  </button>
                  <button
                    onClick={() => setCoordSystem('polar')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-r-lg border-y border-r border-l-0 ${
                      coordSystem === 'polar' 
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' 
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Polar
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Integrand function, f({coordSystem==='cartesian'?'x,y':'r,θ'})</label>
                <input
                  type="text"
                  value={integrand}
                  onChange={(e) => setIntegrand(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                  placeholder="e.g. x^2 + y^2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Outer Lower Limit</label>
                  <input
                    type="text"
                    value={xMin}
                    onChange={(e) => setXMin(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Outer Upper Limit</label>
                  <input
                    type="text"
                    value={xMax}
                    onChange={(e) => setXMax(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Inner Lower Limit</label>
                  <input
                    type="text"
                    value={yMin}
                    onChange={(e) => setYMin(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Inner Upper Limit</label>
                  <input
                    type="text"
                    value={yMax}
                    onChange={(e) => setYMax(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <button
                onClick={handleSolve}
                disabled={isSolving}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all disabled:opacity-50"
              >
                {isSolving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
                {isSolving ? 'Computing...' : 'Solve Integral'}
              </button>
              <p className="text-xs text-slate-500 text-center mt-2">
                * Note: This is an MVP frontend mockup. Backend engine (MATLAB/Node) integration planned for Phase 2.
              </p>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="glass-card min-h-[500px] flex flex-col">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FunctionSquare className="w-5 h-5 text-purple-400" /> Solution Steps
              </h2>
              <button className="text-sm flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors">
                <AreaChart className="w-4 h-4" /> Visualize Region
              </button>
            </div>

            <div className="flex-grow flex flex-col">
              {!isSolving && !solution && (
                <div className="m-auto text-center opacity-50">
                  <Activity className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">Enter parameters and click Solve to see the step-by-step derivation.</p>
                </div>
              )}

              {isSolving && (
                <div className="m-auto text-center">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-cyan-400 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <p className="text-cyan-300 font-medium animate-pulse">Running symbolic computation engine...</p>
                </div>
              )}

              <AnimatePresence>
                {solution && !isSolving && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-center overflow-x-auto">
                      <span className="text-slate-400 text-sm block mb-2">Original Integral</span>
                      <div className="text-2xl text-white">
                        <BlockMath math={solution.problem} />
                      </div>
                    </div>

                    <div className="space-y-4 relative border-l-2 border-slate-700 ml-4 pl-6 pt-2 pb-2">
                      {solution.steps.map((step, idx) => (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.3 }}
                          key={idx}
                          className="relative"
                        >
                          <div className="absolute -left-[35px] top-3 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
                          <div className="p-4 bg-slate-900/50 rounded-lg border border-white/5 overflow-x-auto">
                            <BlockMath math={step} />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: solution.steps.length * 0.3 }}
                      className="mt-8 p-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl text-center"
                    >
                      <h3 className="text-sm font-bold text-purple-400 mb-2 uppercase tracking-widest">Final Result</h3>
                      <div className="text-4xl text-white text-glow">
                        <BlockMath math={solution.finalAnswer} />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProblemSolverPage;
