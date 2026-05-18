import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LearningPage from './pages/LearningPage';
import SolvedExamplesPage from './pages/SolvedExamplesPage';
import ProblemSolverPage from './pages/ProblemSolverPage';
import QuizPage from './pages/QuizPage';
import GraphVisualizationPage from './pages/GraphVisualizationPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LearningPage />} />
            <Route path="/examples" element={<SolvedExamplesPage />} />
            <Route path="/solver" element={<ProblemSolverPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/visualize" element={<GraphVisualizationPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* Future routes will go here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
