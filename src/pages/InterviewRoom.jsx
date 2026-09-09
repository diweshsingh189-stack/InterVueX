import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Send, 
  SkipForward, 
  ChevronLeft, 
  ChevronRight, 
  AlertOctagon, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle,
  Award,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Eye,
  CornerDownRight,
  BrainCircuit,
  Code2,
  Hourglass
} from 'lucide-react';
import WebcamPreview from '../components/WebcamPreview';
import CodingEditor from '../components/CodingEditor';
import { speechService } from '../services/speechService';
import { evaluateAnswer } from '../services/evaluationService';
import { adaptiveService } from '../services/adaptiveService';
import { formatTime, getScoreColor, getScoreLabel } from '../utils/formatters';

export default function InterviewRoom({ session, onFinishInterview, onExit, userProfile }) {
  const [sessionQuestions, setSessionQuestions] = useState(() => session?.questions || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qIndex]: { text, evaluation, timestamp } }
  const [currentText, setCurrentText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [adaptiveNotice, setAdaptiveNotice] = useState(null);
  
  // Audio state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  
  // Timers state
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timeLimit = session?.perQuestionTimeLimit ?? 120; // 0 for untimed
  const [questionTimeLeft, setQuestionTimeLeft] = useState(timeLimit);
  const [showEndModal, setShowEndModal] = useState(false);

  const currentQuestion = sessionQuestions[currentIndex];
  const totalQuestions = sessionQuestions.length;
  const isCodingQuestion = session?.typeId === 'coding' || currentQuestion?.type === 'coding';

  // Overall session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Per-question countdown timer
  useEffect(() => {
    if (!timeLimit || timeLimit <= 0) return;
    setQuestionTimeLeft(timeLimit);

    const qTimer = setInterval(() => {
      setQuestionTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(qTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(qTimer);
  }, [currentIndex, timeLimit]);

  // When question changes, speak question aloud & load existing answer if any
  useEffect(() => {
    if (currentQuestion) {
      // Load saved answer for this index
      if (userAnswers[currentIndex]) {
        setCurrentText(userAnswers[currentIndex].text || userAnswers[currentIndex].userAnswer || '');
        setCurrentFeedback(userAnswers[currentIndex].evaluation || null);
      } else {
        const defaultCode = currentQuestion.starterCode?.javascript || '';
        setCurrentText(isCodingQuestion ? defaultCode : '');
        setCurrentFeedback(null);
      }

      // Voice read aloud
      setIsSpeaking(true);
      speechService.speak(currentQuestion.question, () => {
        setIsSpeaking(false);
      });
    }

    return () => {
      speechService.stopSpeaking();
      speechService.stopListening();
      setIsListening(false);
    };
  }, [currentIndex, currentQuestion, isCodingQuestion]);

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      speechService.stopSpeaking();
      setIsSpeaking(false);
    } else if (currentQuestion) {
      setIsSpeaking(true);
      speechService.speak(currentQuestion.question, () => {
        setIsSpeaking(false);
      });
    }
  };

  const handleToggleListen = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
    } else {
      const success = speechService.startListening(
        (transcript) => {
          setCurrentText((prev) => {
            return isCodingQuestion ? prev + '\n// ' + transcript : transcript;
          });
        },
        (error) => {
          console.warn('Voice recognition error:', error);
          setIsListening(false);
        }
      );
      if (success) {
        setIsListening(true);
      } else {
        setVoiceSupported(false);
      }
    }
  };

  const handleSubmitAnswer = async () => {
    if (!currentText.trim() || isEvaluating) return;
    setIsEvaluating(true);
    speechService.stopListening();
    setIsListening(false);

    try {
      const evaluation = await evaluateAnswer(
        currentQuestion,
        currentText,
        { apiKey: userProfile?.apiKey }
      );

      const updatedAnswers = {
        ...userAnswers,
        [currentIndex]: {
          questionId: currentQuestion.id,
          question: currentQuestion.question,
          category: currentQuestion.category,
          userAnswer: currentText.trim(),
          evaluation,
          timestamp: new Date().toISOString()
        }
      };

      setUserAnswers(updatedAnswers);
      setCurrentFeedback(evaluation);

      // Adaptive Difficulty Adjustment
      if (session?.isAdaptive && currentIndex < totalQuestions - 1) {
        const { nextDifficulty, reason } = adaptiveService.getNextDifficulty(
          evaluation.overallScore,
          currentQuestion.difficulty || session.difficulty || 'medium'
        );

        setAdaptiveNotice(reason);

        // Replace the next upcoming question with calibrated difficulty
        const nextQ = sessionQuestions[currentIndex + 1];
        if (nextQ && nextQ.difficulty !== nextDifficulty) {
          const replacement = adaptiveService.getAdaptiveReplacement(
            session.roleId,
            session.typeId,
            nextDifficulty,
            sessionQuestions.map(q => q.id)
          );

          if (replacement) {
            const updatedList = [...sessionQuestions];
            updatedList[currentIndex + 1] = replacement;
            setSessionQuestions(updatedList);
          }
        }
      }
    } catch (err) {
      console.error('Evaluation failed:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSkipQuestion = () => {
    speechService.stopSpeaking();
    speechService.stopListening();
    setIsListening(false);

    // Record skipped
    const updatedAnswers = {
      ...userAnswers,
      [currentIndex]: {
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        category: currentQuestion.category,
        userAnswer: '[Skipped by candidate]',
        evaluation: {
          overallScore: 0.0,
          scores: { technical: 0, relevance: 0, clarity: 0, communication: 0, completeness: 0, confidence: 0 },
          doneWell: 'Identified unfamiliar territory quickly.',
          improvement: 'Question was skipped. Review key concepts for this topic.',
          suggestedApproach: currentQuestion.idealAnswer || 'Prepare foundational definitions and system trade-offs.',
          tip: currentQuestion.tips || 'Even an incomplete attempt is better than skipping in real interviews.'
        },
        timestamp: new Date().toISOString()
      }
    };

    setUserAnswers(updatedAnswers);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCompleteInterview = () => {
    speechService.stopSpeaking();
    speechService.stopListening();

    // Compile final results
    const answersList = Object.values(userAnswers);
    const answeredCount = answersList.filter(a => a.userAnswer !== '[Skipped by candidate]').length;
    
    // Calculate aggregate scores
    let totalScore = 0;
    let sumTech = 0;
    let sumRel = 0;
    let sumClar = 0;
    let sumComm = 0;
    let sumComp = 0;
    let sumConf = 0;

    answersList.forEach(a => {
      const e = a.evaluation;
      totalScore += e.overallScore;
      sumTech += e.scores.technical;
      sumRel += e.scores.relevance;
      sumClar += e.scores.clarity;
      sumComm += e.scores.communication;
      sumComp += e.scores.completeness;
      sumConf += e.scores.confidence;
    });

    const evaluatedCount = answersList.length || 1;
    const overallScore = Number((totalScore / totalQuestions).toFixed(1));
    const problemSolvingScore = Number((((sumTech + sumRel) / 2) / evaluatedCount).toFixed(1));
    const behavioralScore = Number((((sumComm + sumConf) / 2) / evaluatedCount).toFixed(1));

    const scores = {
      technical: Number((sumTech / evaluatedCount).toFixed(1)),
      relevance: Number((sumRel / evaluatedCount).toFixed(1)),
      clarity: Number((sumClar / evaluatedCount).toFixed(1)),
      communication: Number((sumComm / evaluatedCount).toFixed(1)),
      completeness: Number((sumComp / evaluatedCount).toFixed(1)),
      confidence: Number((sumConf / evaluatedCount).toFixed(1)),
      problemSolving: problemSolvingScore,
      behavioral: behavioralScore
    };

    const strongAnswers = answersList
      .filter(a => a.evaluation.overallScore >= 7.5)
      .map(a => a.question);

    const weakAreas = answersList
      .filter(a => a.evaluation.overallScore < 7.5)
      .map(a => `${a.category || 'Topic'}: ${a.evaluation.improvement}`);

    const finalReport = {
      id: `inv-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      role: session.roleName,
      roleId: session.roleId,
      company: session.companyName || 'General Tech',
      level: session.levelName,
      type: session.typeName,
      difficulty: session.difficulty,
      isAdaptive: session.isAdaptive || false,
      isResumeBased: session.isResumeBased || false,
      questionCount: totalQuestions,
      answeredCount,
      durationSeconds: elapsedSeconds,
      overallScore,
      scores,
      status: overallScore >= 7.0 ? 'Passed' : 'Needs Practice',
      summary: overallScore >= 8.0 
        ? 'High-caliber technical performance with structured system justifications and articulate delivery.'
        : 'Good fundamental awareness. Refine deeper edge-case coverage and STAR structure for maximum scoring.',
      weakAreas: weakAreas.length > 0 ? weakAreas : ['Further polish architectural trade-off explanations'],
      strongAreas: strongAnswers.length > 0 ? strongAnswers : ['Clear conceptual articulation'],
      recommendations: `Focus on mastering ${session.roleName} design patterns and practicing timed code execution.`,
      answers: answersList
    };

    onFinishInterview(finalReport);
  };

  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const wordCount = currentText.trim() ? currentText.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Top Bar: Progress, Question Timer, Overall Timer, End Session */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        backgroundColor: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1rem 1.5rem',
        marginBottom: '1.25rem'
      }}>
        {/* Role & Question indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '0.05em' }}>
              {session.companyName && session.companyName !== 'All Companies' ? `${session.companyName} • ` : ''}
              {session.roleName} &bull; {session.typeName}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Question {currentIndex + 1} <span style={{ color: 'var(--text-dim)', fontWeight: 500 }}>of {totalQuestions}</span>
            </div>
          </div>
        </div>

        {/* Center Progress Bar */}
        <div style={{ flex: '1 1 180px', maxWidth: '260px', margin: '0 0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            <span>Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div style={{ height: '6px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--accent-cyan)', transition: 'width 0.3s ease' }} />
          </div>
        </div>

        {/* Right Timers & End Button */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
          {/* Per-Question Countdown */}
          {timeLimit > 0 && (
            <div 
              title="Time remaining for current question"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: questionTimeLeft <= 30 ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-secondary)',
                border: questionTimeLeft <= 30 ? '1px solid #EF4444' : '1px solid var(--border-subtle)',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: questionTimeLeft <= 30 ? '#EF4444' : 'var(--text-primary)',
                fontWeight: questionTimeLeft <= 30 ? 700 : 500
              }}
            >
              <Hourglass size={15} style={{ color: questionTimeLeft <= 30 ? '#EF4444' : 'var(--accent-cyan)' }} />
              <span>{formatTime(questionTimeLeft)}</span>
            </div>
          )}

          {/* Overall Duration */}
          <div 
            title="Total interview session duration"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--text-primary)'
            }}
          >
            <Clock size={15} style={{ color: 'var(--accent-cyan)' }} />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          <button
            onClick={() => setShowEndModal(true)}
            className="btn btn-sm btn-ghost"
            style={{ color: '#94A3B8', border: '1px solid var(--border-subtle)' }}
          >
            End Interview
          </button>
        </div>
      </div>

      {/* Adaptive Mode Badge Notice if triggered */}
      {adaptiveNotice && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--accent-cyan-light)',
          border: '1px solid var(--accent-cyan)',
          padding: '0.6rem 1rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.825rem',
          color: 'var(--text-primary)',
          marginBottom: '1.25rem'
        }}>
          <BrainCircuit size={16} style={{ color: 'var(--accent-cyan)' }} />
          <span><strong>Adaptive Engine:</strong> {adaptiveNotice}</span>
        </div>
      )}

      {/* Stage: Live Video & AI Interviewer Visualizer */}
      <WebcamPreview isSpeaking={isSpeaking} isListening={isListening} />

      {/* Main Question Display Card */}
      <div className="card" style={{ marginBottom: '1.5rem', position: 'relative' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-cyan">
              {currentQuestion?.category || 'Technical Question'}
            </span>
            {currentQuestion?.difficulty && (
              <span className="badge" style={{ textTransform: 'capitalize' }}>
                {currentQuestion.difficulty}
              </span>
            )}
          </div>
          <button
            onClick={handleToggleSpeak}
            className="btn btn-sm btn-secondary"
            title={isSpeaking ? 'Mute question voice' : 'Read question aloud'}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
          >
            {isSpeaking ? <><VolumeX size={15} /> Mute Voice</> : <><Volume2 size={15} /> Read Aloud</>}
          </button>
        </div>

        <h2 style={{
          fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: '1.45',
          marginBottom: '0.75rem'
        }}>
          {currentQuestion?.question}
        </h2>

        {currentQuestion?.tips && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.825rem',
            color: 'var(--text-muted)',
            backgroundColor: 'var(--bg-secondary)',
            padding: '0.5rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <Lightbulb size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
            <span><strong>Interviewer Hint:</strong> {currentQuestion.tips}</span>
          </div>
        )}
      </div>

      {/* CODING MODE OR STANDARD RESPONSE WORKSPACE */}
      {isCodingQuestion ? (
        <CodingEditor
          question={currentQuestion}
          initialCode={currentText}
          onChangeCode={(code) => setCurrentText(code)}
        />
      ) : (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Your Response</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({wordCount} words)</span>
            </div>

            <button
              onClick={handleToggleListen}
              className={`btn btn-sm ${isListening ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem' }}
            >
              {isListening ? (
                <><MicOff size={15} /> Stop Voice Recording</>
              ) : (
                <><Mic size={15} style={{ color: 'var(--accent-cyan)' }} /> Answer with Voice</>
              )}
            </button>
          </div>

          <textarea
            className="form-textarea"
            style={{
              minHeight: '150px',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              backgroundColor: 'var(--bg-secondary)',
              borderColor: isListening ? 'var(--accent-cyan)' : 'var(--border-subtle)'
            }}
            placeholder="Type or speak your answer here. Explain your reasoning clearly, define key mechanisms, and mention real-world trade-offs..."
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            disabled={isEvaluating}
          />
        </div>
      )}

      {/* Action Controls Bar */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem 1.5rem' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* Navigation Prev/Skip */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="btn btn-sm btn-ghost"
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <button
              onClick={handleSkipQuestion}
              className="btn btn-sm btn-ghost"
              style={{ color: 'var(--text-muted)' }}
            >
              <SkipForward size={16} /> Skip
            </button>
          </div>

          {/* Submit / Next Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              onClick={handleSubmitAnswer}
              disabled={!currentText.trim() || isEvaluating}
              className="btn btn-primary"
            >
              {isEvaluating ? (
                <><RefreshCw size={16} className="live-dot" /> Evaluating Rubric...</>
              ) : (
                <><Send size={16} /> Submit & Evaluate</>
              )}
            </button>

            {currentIndex === totalQuestions - 1 ? (
              <button
                onClick={handleCompleteInterview}
                className="btn btn-secondary"
                style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}
              >
                Finish & View Report <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn btn-secondary"
              >
                Next Question <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Real-Time Evaluation Feedback Modal/Box */}
      {currentFeedback && (
        <div className="card" style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--accent-cyan)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--surface-card)',
                border: '2px solid var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                fontWeight: 800,
                color: 'var(--accent-cyan)'
              }}>
                {currentFeedback.overallScore}
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>AI Rubric Scorecard</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {getScoreLabel(currentFeedback.overallScore)} &bull; Real-time Semantic Evaluation
                </span>
              </div>
            </div>

            {/* Micro Scores Grid */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              <span className="badge">Tech: {currentFeedback.scores?.technical}</span>
              <span className="badge">Rel: {currentFeedback.scores?.relevance}</span>
              <span className="badge">Clarity: {currentFeedback.scores?.clarity}</span>
              <span className="badge">Comm: {currentFeedback.scores?.communication}</span>
              <span className="badge">Complete: {currentFeedback.scores?.completeness}</span>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1rem' }}>
            <div style={{
              backgroundColor: 'var(--surface-card)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                <CheckCircle2 size={16} /> Strong Aspects
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {currentFeedback.doneWell}
              </p>
            </div>

            <div style={{
              backgroundColor: 'var(--surface-card)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#F59E0B', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                <AlertOctagon size={16} /> Actionable Improvement
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {currentFeedback.improvement}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal to Exit/End Early */}
      {showEndModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              End Interview Session Early?
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              You have answered {Object.keys(userAnswers).length} of {totalQuestions} questions. Do you want to compile your final analytics scorecard now or return to dashboard?
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setShowEndModal(false)}
                className="btn btn-secondary"
              >
                Resume Interview
              </button>
              <button
                onClick={() => {
                  setShowEndModal(false);
                  handleCompleteInterview();
                }}
                className="btn btn-primary"
              >
                Finish & View Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
