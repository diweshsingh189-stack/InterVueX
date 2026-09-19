import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Play, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Terminal, 
  Sparkles,
  Layers,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { 
  getQuestionTestCases, 
  getQuestionStarterCode, 
  executeCode 
} from '../services/codeExecutionService';

const DEFAULT_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript (Node.js)' },
  { id: 'python', name: 'Python 3' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++ (g++)' }
];

export default function CodingEditor({ 
  question, 
  initialCode = '', 
  onChangeCode, 
  onRunComplete 
}) {
  const [language, setLanguage] = useState('javascript');
  const [codeByLang, setCodeByLang] = useState({});
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [activeTab, setActiveTab] = useState('testcases'); // 'testcases' | 'output'

  // Get accurate test cases for this specific question
  const currentTestCases = getQuestionTestCases(question);

  // Sync code whenever question changes
  useEffect(() => {
    const defaultStarter = getQuestionStarterCode(question, language);
    const initialOrStored = initialCode || defaultStarter;
    setCode(initialOrStored);
    setCodeByLang(prev => ({
      ...prev,
      [`${question?.id}_${language}`]: initialOrStored
    }));
    setTestResults(null);
    setActiveTab('testcases');
  }, [question?.id]);

  // Handle language switch
  const handleLanguageChange = (newLang) => {
    // Save current code
    setCodeByLang(prev => ({
      ...prev,
      [`${question?.id}_${language}`]: code
    }));

    setLanguage(newLang);

    // Retrieve saved code for new language or load question starter template
    const saved = codeByLang[`${question?.id}_${newLang}`];
    const newCode = saved || getQuestionStarterCode(question, newLang);
    setCode(newCode);
    onChangeCode?.(newCode, newLang);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    setCodeByLang(prev => ({
      ...prev,
      [`${question?.id}_${language}`]: newCode
    }));
    onChangeCode?.(newCode, language);
  };

  const handleKeyDown = (e) => {
    // Handle tab key in code editor
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const updated = code.substring(0, start) + '  ' + code.substring(end);
      setCode(updated);
      onChangeCode?.(updated, language);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleReset = () => {
    const starter = getQuestionStarterCode(question, language);
    setCode(starter);
    setCodeByLang(prev => ({
      ...prev,
      [`${question?.id}_${language}`]: starter
    }));
    onChangeCode?.(starter, language);
    setTestResults(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setActiveTab('output');

    try {
      const executionResult = await executeCode(code, language, question);
      setTestResults(executionResult);
      onRunComplete?.(executionResult);
    } catch (err) {
      console.error('Execution error:', err);
      const fallbackResult = {
        allPassed: false,
        passCount: 0,
        totalCount: currentTestCases.length,
        results: currentTestCases.map((tc, idx) => ({
          caseNum: idx + 1,
          input: tc.input,
          expected: tc.expected,
          actual: `Error: ${err.message}`,
          passed: false,
          error: err.message
        }))
      };
      setTestResults(fallbackResult);
      onRunComplete?.(fallbackResult);
    } finally {
      setIsRunning(false);
    }
  };

  const allPassed = testResults?.allPassed;
  const passCount = testResults?.passCount ?? 0;
  const totalCount = testResults?.totalCount ?? currentTestCases.length;

  return (
    <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
      {/* Editor Header Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 1.25rem',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        gap: '0.75rem'
      }}>
        {/* Language selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Code2 size={18} style={{ color: 'var(--accent-cyan)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Language:</span>
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="form-select"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.825rem',
              width: 'auto',
              backgroundColor: 'var(--surface-card)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {DEFAULT_LANGUAGES.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
          </select>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-sm btn-ghost"
            title="Reset to starter template"
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.65rem' }}
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button
            type="button"
            onClick={handleRunCode}
            disabled={isRunning}
            className="btn btn-sm btn-secondary"
            style={{
              fontSize: '0.8rem',
              padding: '0.35rem 0.85rem',
              borderColor: 'var(--accent-cyan)',
              color: 'var(--accent-cyan)'
            }}
          >
            <Play size={14} /> {isRunning ? 'Executing...' : 'Run Code'}
          </button>
        </div>
      </div>

      {/* Code Textarea / Sandbox */}
      <div style={{ position: 'relative', backgroundColor: 'var(--bg-primary)' }}>
        <textarea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          style={{
            width: '100%',
            minHeight: '270px',
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            padding: '1rem 1.25rem',
            border: 'none',
            outline: 'none',
            resize: 'vertical'
          }}
          placeholder="// Type your algorithm here..."
        />
      </div>

      {/* Test Cases & Console Output Panel */}
      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-secondary)',
        padding: '1rem 1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => setActiveTab('testcases')}
              className={`btn btn-sm ${activeTab === 'testcases' ? 'btn-secondary' : 'btn-ghost'}`}
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
            >
              <Layers size={13} /> Test Cases ({currentTestCases.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('output')}
              className={`btn btn-sm ${activeTab === 'output' ? 'btn-secondary' : 'btn-ghost'}`}
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
            >
              <Terminal size={13} /> Output Console {testResults && `(${passCount}/${totalCount} Passed)`}
            </button>
          </div>

          {testResults && (
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: allPassed ? 'var(--accent-cyan)' : '#EF4444',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              {allPassed ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
              {allPassed ? 'All Test Cases Passed' : `${passCount} / ${totalCount} Passed`}
            </span>
          )}
        </div>

        {/* Tab 1: Current Question Test Cases */}
        {activeTab === 'testcases' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {currentTestCases.map((tc, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: 'var(--surface-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.55rem 0.85rem',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <div style={{ wordBreak: 'break-word', minWidth: '180px', flex: '1 1 auto' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Case {idx + 1}: </span>
                  <span style={{ color: 'var(--text-primary)' }}>{tc.input}</span>
                </div>
                <div style={{ color: 'var(--accent-cyan)', whiteSpace: 'nowrap' }}>
                  Expected: {tc.expected}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Execution Results & Real Output */}
        {activeTab === 'output' && (
          <div>
            {isRunning ? (
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0' }}>
                <span className="live-dot" /> Compiling and executing test cases in sandbox...
              </div>
            ) : testResults ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {testResults.results.map((r) => (
                  <div
                    key={r.caseNum}
                    style={{
                      backgroundColor: 'var(--surface-card)',
                      border: r.passed ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                        Test Case {r.caseNum} {r.executionTimeMs && <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.72rem' }}>({r.executionTimeMs}ms)</span>}
                      </span>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        color: r.passed ? 'var(--accent-cyan)' : '#EF4444',
                        fontWeight: 700
                      }}>
                        {r.passed ? <><CheckCircle2 size={14} /> Passed</> : <><XCircle size={14} /> Failed</>}
                      </span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Input: <span style={{ color: 'var(--text-primary)' }}>{r.input}</span></div>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Expected: <span style={{ color: 'var(--accent-cyan)' }}>{r.expected}</span></div>
                    <div style={{ color: r.passed ? 'var(--text-secondary)' : '#EF4444' }}>
                      Actual: <span style={{ fontWeight: 600 }}>{r.actual}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', padding: '0.5rem 0' }}>
                Click "Run Code" above to execute your solution against the test cases.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
