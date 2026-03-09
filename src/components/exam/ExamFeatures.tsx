import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { examPatterns } from '@/data/servicesData';
import { examQuestions, getRandomExam, ExamQuestion } from '@/data/examQuestions';
import { useLearning } from '@/context/LearningContext';
import { Target, Clock, CheckCircle, XCircle, ChevronRight, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';

export function ExamPatterns() {
  const { mode } = useLearning();
  const isExamLens = mode === 'exam';

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
        <Target size={20} className={isExamLens ? 'text-primary' : 'text-secondary'} /> Exam Pattern Detector
      </h2>
      <p className="text-sm text-muted-foreground mb-5">
        {isExamLens ? 'Spot these keywords in MLA-C01 questions to identify the correct service.' : 'Learn to spot keywords in exam questions that tell you the answer!'}
      </p>
      <div className="grid gap-2">
        {examPatterns.map((ep, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.02 }}
            className={`flex items-center gap-3 p-3 rounded-lg border bg-card transition-colors ${
              isExamLens ? 'border-border hover:border-primary/30' : 'border-border hover:border-secondary/30'
            }`}
          >
            <ChevronRight size={14} className={isExamLens ? 'text-primary' : 'text-secondary'} />
            <span className="text-sm text-muted-foreground flex-1">"{ep.pattern}"</span>
            <ArrowRight size={12} className="text-muted-foreground" />
            <span className={`text-sm font-semibold whitespace-nowrap ${isExamLens ? 'text-primary' : 'text-secondary'}`}>{ep.answer}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function MockExam() {
  const { mode } = useLearning();
  const isExamLens = mode === 'exam';
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [showExplanation, setShowExplanation] = useState(false);

  const startExam = useCallback(() => {
    const q = getRandomExam(20);
    setQuestions(q);
    setAnswers(Array(q.length).fill(null));
    setCurrentQ(0);
    setShowResults(false);
    setShowExplanation(false);
    setTimeLeft(30 * 60);
    setStarted(true);
  }, []);

  // Timer
  useEffect(() => {
    if (!started || showResults) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setShowResults(true);
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, showResults]);

  if (!started) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${isExamLens ? 'bg-primary/15' : 'bg-secondary/15'}`}>
          <Clock size={32} className={isExamLens ? 'text-primary' : 'text-secondary'} />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Mock Exam</h2>
        <p className="text-muted-foreground mb-2">20 scenario questions • 30 minute timer</p>
        <p className="text-xs text-muted-foreground mb-6">Questions sourced from Official MLA-C01 Exam Decks (Q1–Q220)</p>
        <button
          onClick={startExam}
          className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
            isExamLens
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
          }`}
        >
          Start Exam
        </button>
      </div>
    );
  }

  if (showResults) {
    const score = answers.filter((a, i) => a === questions[i]?.correct).length;
    const pct = Math.round((score / questions.length) * 100);
    const passed = pct >= 70;

    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className={`text-5xl font-bold mb-2 ${passed ? 'text-green-400' : 'text-destructive'}`}>{pct}%</div>
          <p className="text-muted-foreground">{score}/{questions.length} correct</p>
          <p className={`text-sm font-semibold mt-1 ${passed ? 'text-green-400' : 'text-destructive'}`}>
            {passed ? '✅ PASS — Great job!' : '❌ NEEDS REVIEW — Keep studying!'}
          </p>
        </div>

        <div className="space-y-3">
          {questions.map((q, i) => {
            const isCorrect = answers[i] === q.correct;
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`p-4 rounded-xl border ${isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-destructive/30 bg-destructive/5'}`}
              >
                <div className="flex items-start gap-2 mb-2">
                  {isCorrect
                    ? <CheckCircle size={16} className="text-green-400 mt-0.5 shrink-0" />
                    : <XCircle size={16} className="text-destructive mt-0.5 shrink-0" />}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-mono text-muted-foreground">Q#{q.id}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                        q.difficulty === 'hard' ? 'bg-destructive/10 text-destructive' :
                        q.difficulty === 'medium' ? 'bg-primary/10 text-primary' :
                        'bg-green-500/10 text-green-400'
                      }`}>{q.difficulty}</span>
                    </div>
                    <p className="text-xs text-foreground/80 mb-2">{q.question}</p>

                    {/* Show correct answer */}
                    {!isCorrect && (
                      <div className="text-xs mb-2">
                        <span className="text-red-400">Your answer: </span>
                        <span className="text-foreground/60">{answers[i] !== null ? q.options[answers[i]!] : 'Skipped'}</span>
                        <br />
                        <span className="text-green-400">Correct: </span>
                        <span className="text-foreground/80">{q.options[q.correct]}</span>
                      </div>
                    )}

                    {/* Visual explanation */}
                    <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
                      <p className="text-[10px] text-secondary">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex gap-3 mt-6 justify-center">
          <button
            onClick={startExam}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
          >
            <RotateCcw size={14} /> Retake Exam
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  if (!q) return null;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs text-muted-foreground">Question {currentQ + 1}/{questions.length}</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
              q.difficulty === 'hard' ? 'bg-destructive/10 text-destructive' :
              q.difficulty === 'medium' ? 'bg-primary/10 text-primary' :
              'bg-green-500/10 text-green-400'
            }`}>Q#{q.id} • {q.difficulty}</span>
            <span className="text-[9px] text-muted-foreground">{q.source}</span>
          </div>
        </div>
        <span className={`text-sm font-mono ${timeLeft < 300 ? 'text-destructive' : 'text-primary'}`}>
          {mins}:{secs.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Progress */}
      <div className="w-full h-1 bg-muted rounded-full mb-6">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
      </div>

      {/* Question */}
      <p className="text-sm text-foreground leading-relaxed mb-5">{q.question}</p>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {q.options.map((opt, i) => {
          const isSelected = answers[currentQ] === i;
          const showAnswer = showExplanation;
          let btnClass = 'w-full text-left text-sm px-4 py-3 rounded-lg border transition-all ';

          if (showAnswer) {
            if (i === q.correct) {
              btnClass += 'border-green-500/50 bg-green-500/10 text-green-400';
            } else if (isSelected) {
              btnClass += 'border-red-500/50 bg-red-500/10 text-red-400';
            } else {
              btnClass += 'border-border bg-muted/20 text-muted-foreground';
            }
          } else {
            btnClass += isSelected
              ? 'border-primary bg-primary/10 text-foreground'
              : 'border-border bg-card text-foreground/70 hover:border-primary/30';
          }

          return (
            <button
              key={i}
              onClick={() => {
                if (!showExplanation) {
                  const newAns = [...answers];
                  newAns[currentQ] = i;
                  setAnswers(newAns);
                }
              }}
              className={btnClass}
              disabled={showExplanation}
            >
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          );
        })}
      </div>

      {/* Check answer */}
      {answers[currentQ] !== null && !showExplanation && (
        <button
          onClick={() => setShowExplanation(true)}
          className="text-xs text-primary hover:underline mb-4 block"
        >
          Check Answer →
        </button>
      )}

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-3 rounded-lg bg-secondary/10 border border-secondary/20"
          >
            <p className="text-xs text-secondary">{q.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-2 border-t border-border">
        <button
          disabled={currentQ === 0}
          onClick={() => { setCurrentQ(c => c - 1); setShowExplanation(false); }}
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30"
        >
          ← Previous
        </button>

        {/* Question dots */}
        <div className="flex gap-1 flex-wrap justify-center max-w-xs">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentQ(i); setShowExplanation(false); }}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentQ ? 'bg-primary' :
                answers[i] !== null ? 'bg-foreground/40' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {currentQ < questions.length - 1 ? (
          <button
            onClick={() => { setCurrentQ(c => c + 1); setShowExplanation(false); }}
            className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={() => setShowResults(true)}
            className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Submit Exam
          </button>
        )}
      </div>
    </div>
  );
}
