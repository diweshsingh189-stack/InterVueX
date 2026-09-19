/**
 * InterVueX AI Evaluation Engine
 * Evaluates candidate answers on Relevance, Technical Accuracy, Clarity,
 * Communication, Completeness, and Confidence.
 * Supports both standard verbal/text questions and interactive coding executions.
 */
import { executeCode } from './codeExecutionService';

export async function evaluateAnswer(questionObj, userAnswer, sessionContext = {}) {
  const isCoding = questionObj?.type === 'coding' || sessionContext?.typeId === 'coding';
  const cleaned = (userAnswer || '').trim();

  // If user provided a real Gemini API Key in settings, call Gemini directly
  if (sessionContext.apiKey) {
    try {
      const apiResult = await callGeminiEvaluation(questionObj, userAnswer, sessionContext.apiKey);
      if (apiResult) return formatEvaluationResponse(apiResult, questionObj);
    } catch (err) {
      console.warn('Live API evaluation fallback to built-in semantic evaluator:', err);
    }
  }

  // Handle Coding Evaluation
  if (isCoding) {
    return evaluateCodingAnswer(questionObj, userAnswer, sessionContext);
  }

  // Handle Textual / Verbal Technical & Behavioral Evaluation
  return evaluateTextAnswer(questionObj, cleaned);
}

/**
 * Evaluates Coding Round Submissions
 */
async function evaluateCodingAnswer(questionObj, code, sessionContext) {
  const cleaned = (code || '').trim();
  const language = sessionContext.language || 'javascript';

  if (!cleaned || cleaned.length < 15) {
    return {
      overallScore: 2.0,
      status: 'Incorrect',
      statusLabel: 'No Solution Provided',
      scores: {
        technical: 2.0,
        relevance: 2.0,
        clarity: 2.5,
        communication: 2.0,
        completeness: 1.5,
        confidence: 2.0
      },
      verdict: 'The submitted code is empty or incomplete.',
      doneWell: 'Opened the coding sandbox.',
      improvement: 'Write the complete algorithm and test against all visible test cases.',
      suggestedApproach: questionObj.idealAnswer || 'Implement the optimal O(n) solution using two-pointer or hash map.',
      tip: questionObj.tips || 'Start by outlining the algorithmic steps in comments before writing code.',
      testSummary: '0 / 0 Test Cases Passed'
    };
  }

  // Run execution sandbox against question test cases
  const execResult = await executeCode(cleaned, language, questionObj);
  const { allPassed, passCount, totalCount, syntaxError } = execResult;

  const testPassRatio = totalCount > 0 ? (passCount / totalCount) : 0;
  
  // Calculate scoring dimensions
  let technical = 0;
  let relevance = 0;
  let completeness = 0;
  let clarity = 0;
  let communication = 0;
  let confidence = 0;

  if (allPassed) {
    technical = 9.5;
    relevance = 9.5;
    completeness = 9.5;
    clarity = 8.5;
    communication = 8.0;
    confidence = 9.0;
  } else if (testPassRatio >= 0.5) {
    technical = 6.8;
    relevance = 7.5;
    completeness = 6.5;
    clarity = 7.0;
    communication = 7.0;
    confidence = 6.5;
  } else {
    technical = syntaxError ? 3.0 : 4.5;
    relevance = 5.0;
    completeness = 4.0;
    clarity = 5.5;
    communication = 5.0;
    confidence = 4.0;
  }

  const overall = Number(((technical * 0.4) + (relevance * 0.2) + (completeness * 0.2) + (clarity * 0.1) + (confidence * 0.1)).toFixed(1));

  let status = 'Correct';
  let verdict = `All ${totalCount} test cases passed with correct algorithmic logic!`;
  if (!allPassed) {
    if (passCount > 0) {
      status = 'Partially Correct';
      verdict = `Passed ${passCount} of ${totalCount} test cases. Some boundary or edge cases failed.`;
    } else {
      status = 'Incorrect';
      verdict = syntaxError 
        ? `Compilation or syntax error: ${syntaxError}`
        : `Failed all test cases. The output does not match expected results.`;
    }
  }

  let doneWell = allPassed 
    ? 'Optimal time and space complexity with clean algorithmic structure.'
    : (passCount > 0 ? `Successfully solved basic test cases (${passCount}/${totalCount}).` : 'Attempted function structure.');

  let improvement = allPassed 
    ? 'Consider adding edge case validations (e.g. null/empty inputs).'
    : (syntaxError ? `Fix syntax/compilation issues: ${syntaxError}` : 'Review corner cases and verify pointer or loop termination logic.');

  return {
    overallScore: Math.min(10, Math.max(1, overall)),
    status,
    statusLabel: status,
    verdict,
    scores: {
      technical,
      relevance,
      clarity,
      communication,
      completeness,
      confidence
    },
    doneWell,
    improvement,
    suggestedApproach: questionObj.idealAnswer || 'Check optimal approach in question bank.',
    tip: questionObj.tips || 'Always dry-run your solution with edge cases (empty arrays, duplicates, single elements).',
    testSummary: `${passCount} / ${totalCount} Test Cases Passed (${Math.round(testPassRatio * 100)}%)`,
    execResult
  };
}

/**
 * Evaluates Textual / Conceptual Technical & Behavioral Answers
 */
function evaluateTextAnswer(questionObj, cleaned) {
  const wordCount = cleaned.split(/\s+/).filter(Boolean).length;

  // Check if answer is too short
  if (wordCount < 5) {
    return {
      overallScore: 2.0,
      status: 'Incorrect',
      statusLabel: 'Incomplete Response',
      scores: {
        relevance: 2.0,
        technical: 2.0,
        clarity: 3.0,
        communication: 2.5,
        completeness: 1.5,
        confidence: 2.0
      },
      verdict: 'Answer is too brief to evaluate technical depth or communication ability.',
      doneWell: 'Initiated a response.',
      improvement: 'Elaborate on core concepts, mechanics, and trade-offs.',
      suggestedApproach: questionObj.idealAnswer || `Address: ${questionObj.keyConcepts ? questionObj.keyConcepts.join(', ') : 'the core problem and trade-offs'}.`,
      tip: questionObj.tips || 'Aim for at least 3-4 structured sentences covering concepts, mechanics, and concrete examples.'
    };
  }

  const lowerAnswer = cleaned.toLowerCase();
  const concepts = questionObj.keyConcepts || [];
  
  // Concept match analysis
  const matchedList = [];
  const missingList = [];

  concepts.forEach(concept => {
    const words = concept.toLowerCase().split(' ');
    const hasMatch = words.some(w => w.length > 3 && lowerAnswer.includes(w)) || lowerAnswer.includes(concept.toLowerCase());
    if (hasMatch) matchedList.push(concept);
    else missingList.push(concept);
  });

  const conceptCoverage = concepts.length > 0 ? (matchedList.length / concepts.length) : 0.7;

  // Length and structural depth heuristics
  const lengthScore = Math.min(10, Math.max(4, (wordCount / 35) * 6));
  
  // Check structural markers
  const structureWords = ['because', 'for example', 'such as', 'trade-off', 'first', 'second', 'result', 'benefit', 'approach', 'mitigate', 'prevent', 'situation', 'task', 'action'];
  const structureMatches = structureWords.filter(w => lowerAnswer.includes(w)).length;
  const structureBonus = Math.min(2.0, structureMatches * 0.5);

  // Calculate dimension scores
  let technical = Math.min(10, Math.max(3.5, (conceptCoverage * 6.5) + (structureBonus * 0.8) + (lengthScore * 0.2)));
  let relevance = Math.min(10, Math.max(4.0, (conceptCoverage * 7.0) + 2.5));
  let clarity = Math.min(10, Math.max(4.5, 6.0 + (structureBonus * 1.5) - (wordCount > 300 ? 1.0 : 0)));
  let communication = Math.min(10, Math.max(4.0, 5.5 + structureBonus + (wordCount >= 25 && wordCount <= 180 ? 1.5 : 0.5)));
  let completeness = Math.min(10, Math.max(3.0, (conceptCoverage * 6.0) + (lengthScore * 0.35)));
  let confidence = Math.min(10, Math.max(4.0, 6.5 + (structureBonus * 1.0) - (lowerAnswer.includes('maybe') || lowerAnswer.includes('i guess') || lowerAnswer.includes('not sure') ? 2.0 : 0)));

  technical = Number(technical.toFixed(1));
  relevance = Number(relevance.toFixed(1));
  clarity = Number(clarity.toFixed(1));
  communication = Number(communication.toFixed(1));
  completeness = Number(completeness.toFixed(1));
  confidence = Number(confidence.toFixed(1));

  const overall = Number(((technical * 0.35) + (relevance * 0.25) + (clarity * 0.15) + (communication * 0.15) + (completeness * 0.10)).toFixed(1));

  let status = 'Correct';
  let verdict = 'Comprehensive and well-structured answer with strong technical depth.';
  if (overall < 5.0) {
    status = 'Incorrect';
    verdict = 'Response lacks key technical concepts and foundational depth.';
  } else if (overall < 7.5) {
    status = 'Partially Correct';
    verdict = 'Accurate high-level understanding, but missing critical production details or edge cases.';
  }

  let doneWell = matchedList.length >= 2 
    ? `Strong articulation of core concepts (${matchedList.slice(0, 2).join(', ')}).`
    : (structureMatches >= 2 ? 'Well-structured narrative with logical cause-and-effect explanations.' : 'Clear fundamental awareness.');

  let improvement = missingList.length > 0 
    ? `Key concepts to deepen: ${missingList.slice(0, 2).join(', ')}.`
    : (wordCount < 30 ? 'Elaborate further with a concrete production example or architectural trade-off.' : 'Refine deeper edge-case coverage.');

  return {
    overallScore: Math.min(10, Math.max(1, overall)),
    status,
    statusLabel: status,
    verdict,
    scores: {
      technical,
      relevance,
      clarity,
      communication,
      completeness,
      confidence
    },
    doneWell,
    improvement,
    suggestedApproach: questionObj.idealAnswer || 'Begin with a concise definition, explain the underlying mechanism, and conclude with a production trade-off.',
    tip: questionObj.tips || 'Keep responses structured using bullet points or chronological steps for optimal interviewer clarity.',
    matchedConcepts: matchedList,
    missingConcepts: missingList
  };
}

function formatEvaluationResponse(apiResult, questionObj) {
  const overall = apiResult.overallScore || 7.0;
  let status = 'Correct';
  if (overall < 5.0) status = 'Incorrect';
  else if (overall < 7.5) status = 'Partially Correct';

  return {
    overallScore: overall,
    status,
    statusLabel: status,
    verdict: apiResult.doneWell || (status === 'Correct' ? 'High-quality technical explanation.' : 'Needs refinement.'),
    scores: apiResult.scores || { technical: overall, relevance: overall, clarity: overall, communication: overall, completeness: overall, confidence: overall },
    doneWell: apiResult.doneWell || 'Addressed key points clearly.',
    improvement: apiResult.improvement || 'Incorporate more production trade-offs.',
    suggestedApproach: apiResult.suggestedApproach || questionObj.idealAnswer || '',
    tip: apiResult.tip || questionObj.tips || ''
  };
}

async function callGeminiEvaluation(questionObj, userAnswer, apiKey) {
  const prompt = `You are a senior technical interviewer evaluating a candidate's response.
Question: ${questionObj.question}
Category: ${questionObj.category || 'Engineering'}
Expected Key Concepts: ${questionObj.keyConcepts ? questionObj.keyConcepts.join(', ') : 'General technical competency'}
Candidate's Answer: "${userAnswer}"

Evaluate strictly and return JSON with this exact structure:
{
  "overallScore": 8.5,
  "scores": {
    "technical": 8.5,
    "relevance": 9.0,
    "clarity": 8.0,
    "communication": 8.0,
    "completeness": 8.5,
    "confidence": 8.5
  },
  "doneWell": "What the candidate did well in 1-2 sentences",
  "improvement": "What could be improved in 1-2 sentences",
  "suggestedApproach": "A concise model answer",
  "tip": "One short practical interview tip"
}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    })
  });

  if (!response.ok) throw new Error(`API error ${response.status}`);
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(text);
}
