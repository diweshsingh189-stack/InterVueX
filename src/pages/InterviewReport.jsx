import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  ArrowRight, 
  Download, 
  Printer, 
  RotateCcw, 
  ChevronRight, 
  Clock, 
  Layers, 
  HelpCircle,
  FileText,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { RadarChart } from '../components/PerformanceChart';
import { formatTime, formatDate, getScoreColor, getScoreLabel } from '../utils/formatters';

export default function InterviewReport({ report, onRetake, onGoDashboard, onBrowseQuestions }) {
  if (!report) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>No interview report data available.</p>
        <button onClick={onGoDashboard} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Trigger celebratory confetti on high scores
  useEffect(() => {
    if (report.overallScore >= 8.0) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#06B6D4', '#38BDF8', '#0F172A', '#F8FAFC']
      });
    }
  }, [report.overallScore]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `InterVueX_Report_${report.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const scoreBars = [
    { label: 'Technical Accuracy', val: report.scores?.technical || 7.5 },
    { label: 'Problem Solving & Logic', val: report.scores?.problemSolving || report.scores?.technical || 7.8 },
    { label: 'Relevance to Question', val: report.scores?.relevance || 8.0 },
    { label: 'Clarity & Articulation', val: report.scores?.clarity || 7.8 },
    { label: 'Communication Structure', val: report.scores?.communication || 8.0 },
    { label: 'HR / Behavioral Delivery', val: report.scores?.behavioral || report.scores?.confidence || 8.2 },
    { label: 'Completeness', val: report.scores?.completeness || 7.6 }
  ];

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Action Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>Session Evaluation Report</span>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}>Performance Scorecard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {report.role} &bull; {report.level} &bull; {report.type} ({formatDate(report.date)})
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={handlePrint} className="btn btn-sm btn-secondary">
            <Printer size={16} /> Print Report
          </button>
          <button onClick={handleDownloadJSON} className="btn btn-sm btn-secondary">
            <Download size={16} /> Export JSON
          </button>
          <button onClick={onRetake} className="btn btn-sm btn-primary">
            <RotateCcw size={16} /> New Session
          </button>
        </div>
      </div>

      {/* Main Scorecard Banner */}
      <div style={{
        backgroundColor: 'var(--surface-card)',
        border: '1px solid var(--accent-cyan)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        alignItems: 'center',
        marginBottom: '2rem',
        boxShadow: '0 0 30px rgba(6, 182, 212, 0.12)'
      }}>
        {/* Left: Overall Score Dial */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            border: '4px solid var(--accent-cyan)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px var(--accent-cyan-glow)',
            flexShrink: 0
          }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              {report.overallScore}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>
              Out of 10
            </div>
          </div>

          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>
              {getScoreLabel(report.overallScore)}
            </span>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              {report.overallScore >= 8.0 ? 'Exceptional Candidate Level' : 'Solid Foundation Demonstrated'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              {report.summary}
            </p>
          </div>
        </div>

        {/* Right: Quick Stats Table */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Questions Answered</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {report.answeredCount || report.answers?.length || 0} / {report.questionCount || 5}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Session Duration</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {formatTime(report.durationSeconds || 420)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Difficulty Caliber</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'capitalize' }}>
              {report.difficulty || 'Medium'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Completion Status</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {report.status || 'Completed'}
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Visual Breakdown: Radar Chart & Metric Bars */}
      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        {/* Radar Skill Polygon */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="card-header" style={{ width: '100%', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>Skill Competency Radar</h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Multidimensional rubric assessment polygon.</p>
          </div>
          <RadarChart scores={report.scores} size={280} />
        </div>

        {/* Dimension Breakdown Progress Meters */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>Scoring Dimensions</h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Detailed breakdown across evaluation vectors.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {scoreBars.map((bar) => {
              const pct = Math.round((bar.val / 10) * 100);
              return (
                <div key={bar.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{bar.label}</span>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{bar.val} / 10</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', backgroundColor: 'var(--accent-cyan)', transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Strengths, Weaknesses, and Next Steps Grid */}
      <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
        {/* Strong Areas */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '1rem' }}>
            <CheckCircle2 size={20} />
            <span>Correct & Strong Answers</span>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {(report.strongAreas || []).map((item, idx) => (
              <li key={idx} style={{ display: 'flex', gap: '0.5rem', lineHeight: '1.5' }}>
                <span style={{ color: 'var(--accent-cyan)' }}>&bull;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weak Areas */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '1rem' }}>
            <AlertTriangle size={20} style={{ color: 'var(--accent-cyan)' }} />
            <span>Recommended Areas to Improve</span>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {(report.weakAreas || []).map((item, idx) => (
              <li key={idx} style={{ display: 'flex', gap: '0.5rem', lineHeight: '1.5' }}>
                <span style={{ color: 'var(--accent-cyan)' }}>&bull;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Next Practice Recommendation */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '1rem' }}>
              <TrendingUp size={20} />
              <span>Next Practice Recommendation</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
              {report.recommendations || 'Continue running mock sessions in Hard difficulty to build instinctual time-management.'}
            </p>
          </div>
          <button
            onClick={onBrowseQuestions}
            className="btn btn-sm btn-outline"
            style={{ width: '100%', justifyContent: 'space-between' }}
          >
            <span>Explore Topic Bank</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Full Question-by-Question Transcript & Feedback */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Question by Question Review</h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Full transcript of questions, your answers, and AI grading.</p>
          </div>
          <span className="badge badge-cyan">{report.answers?.length || 0} Questions Evaluated</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {(report.answers || []).map((ans, idx) => {
            const ev = ans.evaluation || {};
            const qScore = ev.overallScore || 0;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem'
                }}
              >
                {/* Question Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <span style={{ fontWeight: 800, color: 'var(--accent-cyan)', fontSize: '0.9rem' }}>Q{idx + 1}.</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{ans.question}</span>
                  </div>
                  <div style={{
                    backgroundColor: 'var(--surface-card)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--accent-cyan)',
                    whiteSpace: 'nowrap'
                  }}>
                    {qScore} / 10
                  </div>
                </div>

                {/* Candidate Answer */}
                <div style={{
                  backgroundColor: 'var(--surface-card)',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  marginBottom: '1rem',
                  borderLeft: '3px solid var(--accent-cyan)'
                }}>
                  <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Your Answer:</strong>
                  {ans.userAnswer}
                </div>

                {/* Feedback Grid */}
                <div className="grid-2" style={{ gap: '0.75rem', fontSize: '0.825rem' }}>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--accent-cyan)' }}>What went well:</strong> {ev.doneWell || 'Solid attempt.'}
                  </div>
                  <div style={{ color: 'var(--text-muted)' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Suggested Improvement:</strong> {ev.improvement || 'Incorporate more production trade-offs.'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
