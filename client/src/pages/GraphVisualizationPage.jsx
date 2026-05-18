import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { motion } from 'framer-motion';
import { BrainCircuit, Settings2, Maximize2 } from 'lucide-react';
import { BlockMath } from 'react-katex';

const GraphVisualizationPage = () => {
  const [surfaceData, setSurfaceData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [functionType, setFunctionType] = useState('paraboloid');
  const [loading, setLoading] = useState(true);

  const generateData = (type) => {
    setLoading(true);
    // Simulate generation time for dramatic effect
    setTimeout(() => {
      let z_data = [];
      let x_data = [];
      let y_data = [];
      
      const size = 30;
      
      for (let i = 0; i < size; i++) {
        let z_row = [];
        let x_val = -2 + (4 * i) / (size - 1);
        x_data.push(x_val);
        for (let j = 0; j < size; j++) {
          let y_val = -2 + (4 * j) / (size - 1);
          if (i === 0) y_data.push(y_val);
          
          let z;
          if (type === 'paraboloid') z = Math.pow(x_val, 2) + Math.pow(y_val, 2);
          else if (type === 'saddle') z = Math.pow(x_val, 2) - Math.pow(y_val, 2);
          else if (type === 'wave') z = Math.sin(x_val * 2) + Math.cos(y_val * 2);
          
          z_row.push(z);
        }
        z_data.push(z_row);
      }
      
      setSurfaceData([{
        z: z_data,
        x: x_data,
        y: y_data,
        type: 'surface',
        colorscale: 'Viridis',
        opacity: 0.8,
        contours: {
          z: { show: true, usecolormap: true, highlightcolor: "limegreen", project: { z: true } }
        }
      }]);
      
      // Add a highlighted region (e.g., a square region in the xy plane)
      let region_z = [];
      let region_x = [-1, -1, 1, 1];
      let region_y = [-1, 1, -1, 1];
      
      for (let i = 0; i < 4; i++) {
        region_z.push([0, 0]);
      }
      
      setRegionData([{
        x: [-1, 1, 1, -1, -1],
        y: [-1, -1, 1, 1, -1],
        z: [0, 0, 0, 0, 0],
        type: 'scatter3d',
        mode: 'lines',
        line: { color: 'red', width: 4 },
        name: 'Integration Region'
      }]);
      
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    generateData(functionType);
  }, [functionType]);

  const formulas = {
    paraboloid: "z = x^2 + y^2",
    saddle: "z = x^2 - y^2",
    wave: "z = \\sin(2x) + \\cos(2y)"
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Controls Sidebar */}
        <div className="w-full lg:w-1/4 space-y-6">
          <div className="glass-card">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-cyan-400" /> Visualization Controls
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Surface Function</label>
                <div className="space-y-2">
                  <button 
                    onClick={() => setFunctionType('paraboloid')}
                    className={`w-full text-left px-4 py-2 rounded-lg border transition-all ${functionType === 'paraboloid' ? 'bg-cyan-500/20 border-cyan-500/50 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'}`}
                  >
                    Paraboloid
                  </button>
                  <button 
                    onClick={() => setFunctionType('saddle')}
                    className={`w-full text-left px-4 py-2 rounded-lg border transition-all ${functionType === 'saddle' ? 'bg-cyan-500/20 border-cyan-500/50 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'}`}
                  >
                    Saddle
                  </button>
                  <button 
                    onClick={() => setFunctionType('wave')}
                    className={`w-full text-left px-4 py-2 rounded-lg border transition-all ${functionType === 'wave' ? 'bg-cyan-500/20 border-cyan-500/50 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'}`}
                  >
                    Trigonometric Wave
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg border border-white/5">
                <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">Current Equation</p>
                <div className="text-cyan-300">
                  <BlockMath math={formulas[functionType]} />
                </div>
              </div>
              
              <div className="p-4 bg-cyan-950/30 rounded-lg border border-cyan-500/20">
                <p className="text-sm text-cyan-200">
                  <strong>Tip:</strong> Drag to rotate the graph. Scroll to zoom in and out. The red square indicates the region of integration $R = [-1, 1] \\times [-1, 1]$.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Graph Container */}
        <div className="w-full lg:w-3/4">
          <div className="glass-card h-[600px] relative overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-purple-400" /> Interactive 3D Plot
              </h2>
              <button className="text-slate-400 hover:text-white transition-colors p-2 bg-white/5 rounded-lg">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-grow w-full relative bg-slate-900/50 rounded-xl overflow-hidden flex items-center justify-center">
              {loading ? (
                <div className="text-cyan-400 animate-pulse flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
                  Rendering Math...
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full absolute inset-0">
                  <Plot
                    data={[...surfaceData, ...regionData]}
                    layout={{
                      autosize: true,
                      margin: { l: 0, r: 0, b: 0, t: 0 },
                      paper_bgcolor: 'rgba(0,0,0,0)',
                      plot_bgcolor: 'rgba(0,0,0,0)',
                      scene: {
                        xaxis: { color: '#94a3b8', gridcolor: '#334155' },
                        yaxis: { color: '#94a3b8', gridcolor: '#334155' },
                        zaxis: { color: '#94a3b8', gridcolor: '#334155' },
                        camera: { eye: { x: 1.5, y: 1.5, z: 1.2 } }
                      }
                    }}
                    useResizeHandler={true}
                    style={{ width: '100%', height: '100%' }}
                    config={{ responsive: true, displayModeBar: false }}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GraphVisualizationPage;
