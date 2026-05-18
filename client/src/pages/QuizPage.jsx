import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Clock, Trophy, Target, ArrowRight, RotateCcw, AlertCircle } from 'lucide-react';
import { InlineMath } from 'react-katex';
import { quizQuestions } from '../data/quizQuestions';

const QuizPage = () => {
  const [setup, setSetup] = useState(true);
  const [difficulty, setDifficulty] = useState('Medium');
  const [numQuestions, setNumQuestions] = useState(5);
  const [timeLimit, setTimeLimit] = useState(10); // in minutes
  
  const [activeQuiz, setActiveQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  
  const [showResults, setShowResults] = useState(false);

  const startQuiz = () => {
    // Filter by difficulty or just take random for MVP
    let pool = [...quizQuestions];
    pool.sort(() => 0.5 - Math.random());
    setQuestions(pool.slice(0, numQuestions));
    
    setAnswers({});
    setCurrentIdx(0);
    setTimeLeft(timeLimit * 60);
    setSetup(false);
    setActiveQuiz(true);
  };

  useEffect(() => {
    let timer;
    if (activeQuiz && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (activeQuiz && timeLeft === 0) {
      finishQuiz();
    }
    return () => clearInterval(timer);
  }, [activeQuiz, timeLeft]);

  const handleSelectAnswer = (optIdx) => {
    setAnswers({ ...answers, [currentIdx]: optIdx });
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setActiveQuiz(false);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setShowResults(false);
    setSetup(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correct++;
    });
    return correct;
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const renderMath = (text) => {
    const parts = text.split('$');
    return parts.map((p, i) => i % 2 === 1 ? <InlineMath key={i} math={p} /> : <span key={i}>{p}</span>);
  };

  if (setup) {
    return (
      <div className="min-h-screen bg-slate-950 pt-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto glass-card border-cyan-500/30">
          <div className="flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mx-auto mb-6">
            <BrainCircuit className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold text-center text-white mb-2">Quiz Setup</h1>
          <p className="text-slate-400 text-center mb-8">Customize your practice session.</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Number of Questions</label>
              <input type="range" min="3" max="10" value={numQuestions} onChange={(e) => setNumQuestions(parseInt(e.target.value))} className="w-full accent-cyan-500" />
              <div className="text-right text-cyan-400 font-bold">{numQuestions} Questions</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Time Limit (Minutes)</label>
              <input type="range" min="1" max="30" value={timeLimit} onChange={(e) => setTimeLimit(parseInt(e.target.value))} className="w-full accent-purple-500" />
              <div className="text-right text-purple-400 font-bold">{timeLimit} Minutes</div>
            </div>

            <button onClick={startQuiz} className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
              Start Quiz Now
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (activeQuiz) {
    const q = questions[currentIdx];
    const progress = ((currentIdx) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-slate-950 pt-10 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 bg-slate-900/50 p-4 rounded-xl border border-white/10">
            <div className="flex gap-4">
              <div className="text-slate-300 font-medium">Question {currentIdx + 1} of {questions.length}</div>
            </div>
            <div className={`flex items-center gap-2 font-bold px-4 py-1 rounded-full ${timeLeft < 60 ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-cyan-500/20 text-cyan-400'}`}>
              <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>

          {/* Question Card */}
          <motion.div key={currentIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card">
            <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold uppercase rounded-full mb-4">
              {q.category}
            </span>
            <h2 className="text-xl md:text-2xl font-medium text-white mb-8 leading-relaxed">
              {renderMath(q.question)}
            </h2>

            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectAnswer(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    answers[currentIdx] === i
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-900/50 border-white/10 text-slate-300 hover:bg-white/5 hover:border-white/20'
                  }`}
                >
                  <span className="inline-block w-8 font-bold text-slate-500 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {renderMath(opt)}
                </button>
              ))}
            </div>

            <div className="mt-10 flex justify-end">
              <button
                onClick={nextQuestion}
                disabled={answers[currentIdx] === undefined}
                className="px-8 py-3 bg-white text-slate-900 hover:bg-cyan-400 rounded-full font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {currentIdx === questions.length - 1 ? 'Finish' : 'Next'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-slate-950 pt-16 px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto glass-card">
          <div className="text-center mb-10">
            <div className="inline-block p-4 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-600/20 mb-4">
              <Trophy className="w-12 h-12 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-2">Quiz Completed!</h1>
            <p className="text-slate-400">Here's how you did on the Double Integration quiz.</p>
          </div>

          <div className="flex justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">Correct</div>
            </div>
            <div className="w-px bg-white/10"></div>
            <div className="text-center">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
                {percentage}%
              </div>
              <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">Accuracy</div>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Review</h3>
            {questions.map((q, idx) => (
              <div key={idx} className={`p-4 rounded-lg border ${answers[idx] === q.correctAnswer ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                <p className="text-slate-200 mb-2 font-medium">{idx + 1}. {renderMath(q.question)}</p>
                <p className="text-sm">
                  <span className="text-slate-400">Your answer: </span>
                  <span className={answers[idx] === q.correctAnswer ? 'text-emerald-400' : 'text-red-400'}>
                    {answers[idx] !== undefined ? renderMath(q.options[answers[idx]]) : 'Skipped'}
                  </span>
                </p>
                {answers[idx] !== q.correctAnswer && (
                  <p className="text-sm mt-1">
                    <span className="text-slate-400">Correct answer: </span>
                    <span className="text-emerald-400">{renderMath(q.options[q.correctAnswer])}</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          <button onClick={resetQuiz} className="w-full py-4 glass hover:bg-white/10 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
            <RotateCcw className="w-5 h-5" /> Take Another Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default QuizPage;
