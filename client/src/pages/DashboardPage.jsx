import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Target, Clock, TrendingUp, Trophy, AlertTriangle } from 'lucide-react';

const DashboardPage = () => {
  // Mock data for the MVP
  const stats = {
    totalQuizzes: 12,
    avgAccuracy: 78,
    totalTime: "4h 20m",
    overallProgress: 65,
    weakTopics: ["Polar Coordinates", "Changing Order of Integration"],
    strongTopics: ["Cartesian Integrals", "Geometrical Meaning"]
  };

  const recentHistory = [
    { date: "Oct 15", score: "8/10", accuracy: 80, difficulty: "Medium" },
    { date: "Oct 12", score: "9/10", accuracy: 90, difficulty: "Easy" },
    { date: "Oct 10", score: "5/10", accuracy: 50, difficulty: "Hard" },
    { date: "Oct 05", score: "7/10", accuracy: 70, difficulty: "Medium" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
            <LayoutDashboard className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white">Student Dashboard</h1>
            <p className="text-slate-400">Track your progress and identify areas for improvement.</p>
          </div>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Overall Progress</span>
              <Target className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{stats.overallProgress}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full" style={{ width: `${stats.overallProgress}%` }}></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Avg Accuracy</span>
              <Trophy className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{stats.avgAccuracy}%</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-right">Across {stats.totalQuizzes} quizzes</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Time Spent</span>
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-white">{stats.totalTime}</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-right">In active practice</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Quizzes Taken</span>
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-white">{stats.totalQuizzes}</span>
            </div>
            <p className="text-xs text-emerald-500 mt-2 text-right flex justify-end items-center gap-1">
              +2 this week
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent History Table */}
          <div className="lg:col-span-2 glass-card">
            <h2 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Recent Quiz History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-sm border-b border-white/5">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Difficulty</th>
                    <th className="pb-3 font-medium">Score</th>
                    <th className="pb-3 font-medium">Accuracy</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {recentHistory.map((item, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4">{item.date}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          item.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' :
                          item.difficulty === 'Medium' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {item.difficulty}
                        </span>
                      </td>
                      <td className="py-4 font-bold text-white">{item.score}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <span className={item.accuracy >= 80 ? 'text-emerald-400' : item.accuracy >= 70 ? 'text-orange-400' : 'text-red-400'}>
                            {item.accuracy}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Topic Analysis */}
          <div className="space-y-8">
            <div className="glass-card bg-red-950/20 border-red-500/20">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" /> Focus Areas
              </h2>
              <ul className="space-y-3 text-slate-300 text-sm">
                {stats.weakTopics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    {topic}
                  </li>
                ))}
              </ul>
              <button className="mt-6 text-xs text-red-400 hover:text-red-300 underline font-medium">
                Review these chapters
              </button>
            </div>

            <div className="glass-card bg-emerald-950/20 border-emerald-500/20">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-emerald-400" /> Strong Topics
              </h2>
              <ul className="space-y-3 text-slate-300 text-sm">
                {stats.strongTopics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
