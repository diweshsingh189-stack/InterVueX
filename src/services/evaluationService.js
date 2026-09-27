/**
 * InterVueX AI Evaluation Engine
 * Evaluates candidate answers strictly against the CURRENT question's
 * key concepts, ideal answer, and domain validation requirements.
 * Supports both standard verbal/text questions and interactive coding executions.
 */
import { executeCode } from './codeExecutionService.js';

export async function evaluateAnswer(questionObj, userAnswer, sessionContext = {}) {
  if (!questionObj) {
    return {
      overallScore: 0.0,
      status: 'Incorrect',
      statusLabel: 'No Question Context',
      scores: { technical: 0, relevance: 0, clarity: 0, communication: 0, completeness: 0, confidence: 0 },
      verdict: 'No question context provided for evaluation.',
      doneWell: 'N/A',
      improvement: 'Please ensure a valid question is selected.',
      suggestedApproach: '',
      tip: ''
    };
  }

  const isCoding = questionObj?.type === 'coding' || sessionContext?.typeId === 'coding';
  const cleaned = (userAnswer || '').trim();

  // If user provided a real Gemini API Key in settings, call Gemini directly
  if (sessionContext.apiKey) {
    try {
      const apiResult = await callGeminiEvaluation(questionObj, cleaned, sessionContext.apiKey);
      if (apiResult) return formatEvaluationResponse(apiResult, questionObj);
    } catch (err) {
      console.warn('Live API evaluation fallback to built-in semantic evaluator:', err);
    }
  }

  // Handle Coding Evaluation
  if (isCoding) {
    return evaluateCodingAnswer(questionObj, cleaned, sessionContext);
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
      suggestedApproach: questionObj.idealAnswer || 'Implement the optimal O(n) solution using appropriate data structures.',
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
    clarity = 8.8;
    communication = 8.5;
    confidence = 9.2;
  } else if (testPassRatio >= 0.5) {
    technical = 7.2;
    relevance = 7.8;
    completeness = 7.0;
    clarity = 7.2;
    communication = 7.0;
    confidence = 7.0;
  } else {
    technical = syntaxError ? 2.5 : 4.0;
    relevance = 4.5;
    completeness = 3.5;
    clarity = 5.0;
    communication = 4.5;
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
        : `Failed test cases. The output does not match expected results for this question.`;
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

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'against', 'between', 'into', 'through',
  'during', 'before', 'after', 'above', 'below', 'from', 'up', 'down', 'of', 'off', 'over', 'under',
  'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any',
  'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
  'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'should', 'now', 'what', 'which',
  'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'have', 'has', 'had', 'having', 'do', 'does',
  'did', 'doing', 'would', 'could', 'explain', 'describe', 'difference', 'differences', 'concept',
  'concepts', 'give', 'example', 'examples', 'using', 'used', 'mean', 'means', 'work', 'works', 'write'
]);

/**
 * Normalizes words to stems for flexible semantic matching
 */
function getStem(w) {
  return w.replace(/[^\w]/g, '').toLowerCase()
    .replace(/(ing|tion|tions|ed|es|s|ity|ities|able|ible|ment|ments|ize|ised|ized)$/g, '');
}

/**
 * Extracts meaningful non-stopword tokens
 */
function extractMeaningfulTokens(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !STOP_WORDS.has(w));
}

/**
 * Evaluates Textual / Conceptual Technical & Behavioral Answers ONLY against the current question
 */
function evaluateTextAnswer(questionObj, cleaned) {
  const words = cleaned.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Check if answer is empty or too short to have substance
  if (wordCount < 6) {
    return {
      overallScore: 2.0,
      status: 'Incorrect',
      statusLabel: 'Incomplete Response',
      scores: {
        relevance: 1.5,
        technical: 1.5,
        clarity: 2.5,
        communication: 2.0,
        completeness: 1.0,
        confidence: 2.0
      },
      verdict: 'Answer is too brief to evaluate technical depth or relevance to this question.',
      doneWell: 'Initiated a response.',
      improvement: 'Provide a structured explanation addressing the core mechanisms and trade-offs.',
      suggestedApproach: questionObj.idealAnswer || `Address: ${questionObj.keyConcepts ? questionObj.keyConcepts.join(', ') : 'the core problem and trade-offs'}.`,
      tip: questionObj.tips || 'Aim for at least 3-4 structured sentences covering concepts, mechanics, and concrete examples.'
    };
  }

  const lowerAnswer = cleaned.toLowerCase();
  const normalizedAnswerTokens = words.map(w => getStem(w)).filter(w => w.length >= 3);
  const isBehavioral = questionObj.type === 'behavioral' || questionObj.type === 'hr';

  // 1. Extract this question's key concepts
  let concepts = Array.isArray(questionObj.keyConcepts) ? [...questionObj.keyConcepts] : [];
  if (concepts.length === 0 && questionObj.idealAnswer) {
    const idealTokens = extractMeaningfulTokens(questionObj.idealAnswer);
    concepts = Array.from(new Set(idealTokens)).slice(0, 6);
  }

  // 2. Extract question title keywords & ideal answer keywords
  const questionKeywords = extractMeaningfulTokens(questionObj.question || '');
  const idealKeywords = extractMeaningfulTokens(questionObj.idealAnswer || '');

  // 3. Match candidate answer against THIS question's concepts
  const matchedConcepts = [];
  const missingConcepts = [];

  concepts.forEach(concept => {
    const rawConcept = concept.toLowerCase();
    const conceptTokens = extractMeaningfulTokens(rawConcept);

    // Direct substring match
    const exactMatch = lowerAnswer.includes(rawConcept);
    // Stem / token match
    const tokenMatch = conceptTokens.length > 0 && conceptTokens.some(ct => {
      const stem = getStem(ct);
      return stem.length >= 3 && (lowerAnswer.includes(ct) || lowerAnswer.includes(stem) || normalizedAnswerTokens.includes(stem));
    });

    if (exactMatch || tokenMatch) {
      matchedConcepts.push(concept);
    } else {
      missingConcepts.push(concept);
    }
  });

  // Check matching against question prompt keywords
  const matchedQuestionKeywords = questionKeywords.filter(qk => {
    const stem = getStem(qk);
    return lowerAnswer.includes(qk) || lowerAnswer.includes(stem) || normalizedAnswerTokens.includes(stem);
  });

  // Check matching against ideal answer keywords
  const matchedIdealKeywords = idealKeywords.filter(ik => {
    const stem = getStem(ik);
    return lowerAnswer.includes(ik) || lowerAnswer.includes(stem) || normalizedAnswerTokens.includes(stem);
  });

  const conceptCoverage = concepts.length > 0 ? (matchedConcepts.length / concepts.length) : 0;
  const questionKeywordRatio = questionKeywords.length > 0 ? (matchedQuestionKeywords.length / questionKeywords.length) : 0;
  const idealKeywordRatio = idealKeywords.length > 0 ? (matchedIdealKeywords.length / idealKeywords.length) : 0;

  // 4. Behavioral STAR method checking
  let starBonus = 0;
  if (isBehavioral) {
    const starIndicators = ['situation', 'task', 'action', 'result', 'impact', 'challenge', 'team', 'resolved', 'learned', 'outcome', 'lead', 'initiative', 'customer', 'conflict'];
    const starMatches = starIndicators.filter(si => lowerAnswer.includes(si)).length;
    starBonus = Math.min(2.0, starMatches * 0.4);
  }

  // 5. Structural & Reasoning Quality
  const structuralWords = ['because', 'for example', 'such as', 'trade-off', 'tradeoff', 'first', 'second', 'result', 'benefit', 'approach', 'mitigate', 'prevent', 'furthermore', 'however', 'in contrast', 'architecture'];
  const structureMatches = structuralWords.filter(w => lowerAnswer.includes(w)).length;
  const structureBonus = Math.min(1.5, structureMatches * 0.3);

  // 6. DETECT IRRELEVANT / WRONG-QUESTION ANSWERS
  // If the answer matches almost none of this question's concepts, keywords, or ideal answer:
  const isOffTopic = (conceptCoverage < 0.15 && questionKeywordRatio < 0.20 && idealKeywordRatio < 0.15 && matchedConcepts.length === 0);

  if (isOffTopic && !isBehavioral) {
    return {
      overallScore: 2.2,
      status: 'Incorrect',
      statusLabel: 'Irrelevant Answer',
      scores: {
        technical: 1.8,
        relevance: 1.2,
        clarity: 3.5,
        communication: 3.2,
        completeness: 1.0,
        confidence: 2.0
      },
      verdict: `The submitted answer does not address this question (${questionObj.category || 'Topic'}). An answer from a different topic or question cannot be accepted.`,
      doneWell: 'Submitted an articulate paragraph.',
      improvement: missingConcepts.length > 0 
        ? `Focus strictly on this question's requirements: ${missingConcepts.slice(0, 3).join(', ')}.`
        : `Answer the specific requirements of: "${questionObj.question}".`,
      suggestedApproach: questionObj.idealAnswer || 'Provide a structured solution focusing on the exact question requested.',
      tip: questionObj.tips || 'Carefully read the question prompt and address its core technical concepts.',
      matchedConcepts: [],
      missingConcepts: concepts
    };
  }

  // 7. Calculate Rubric Dimensions strictly for this question
  let relevance = 0;
  let technical = 0;
  let completeness = 0;
  let clarity = 0;
  let communication = 0;
  let confidence = 0;

  if (isBehavioral) {
    // Behavioral scoring
    const relevanceBase = Math.max(2.0, (questionKeywordRatio * 4.0) + (idealKeywordRatio * 4.0) + starBonus);
    relevance = Math.min(10, relevanceBase);
    technical = Math.min(10, Math.max(2.0, (starBonus * 3.5) + (structureBonus * 1.5) + (wordCount >= 40 ? 3.0 : 1.5)));
    completeness = Math.min(10, Math.max(2.0, (relevance * 0.5) + (starBonus * 2.0) + (wordCount >= 50 ? 2.5 : 1.0)));
    clarity = Math.min(10, Math.max(4.0, 5.5 + structureBonus + (wordCount >= 30 ? 1.5 : 0)));
    communication = Math.min(10, Math.max(4.0, 6.0 + (starBonus * 1.2) + structureBonus));
    confidence = Math.min(10, Math.max(4.0, 6.5 + (lowerAnswer.includes('i was able') || lowerAnswer.includes('i achieved') ? 1.5 : 0) - (lowerAnswer.includes('maybe') || lowerAnswer.includes('i guess') ? 1.5 : 0)));
  } else {
    // Technical conceptual scoring
    const lengthQuality = Math.min(2.5, (wordCount / 35) * 2.0);
    
    technical = Math.min(10, Math.max(1.5, (conceptCoverage * 7.0) + (idealKeywordRatio * 2.5) + (structureBonus * 0.5) + (lengthQuality * 0.5)));
    relevance = Math.min(10, Math.max(1.2, (conceptCoverage * 6.5) + (questionKeywordRatio * 2.5) + (idealKeywordRatio * 2.0)));
    completeness = Math.min(10, Math.max(1.0, (conceptCoverage * 7.5) + (idealKeywordRatio * 2.0) + (lengthQuality * 0.5)));
    clarity = Math.min(10, Math.max(3.5, 5.2 + (structureBonus * 2.0) + (wordCount >= 20 ? 1.5 : 0)));
    communication = Math.min(10, Math.max(3.5, 5.4 + structureBonus + (wordCount >= 20 ? 1.5 : 0)));
    confidence = Math.min(10, Math.max(3.0, 6.5 + (structureBonus * 1.0) - (lowerAnswer.includes('maybe') || lowerAnswer.includes('i guess') || lowerAnswer.includes('not sure') ? 2.0 : 0)));
  }

  technical = Number(technical.toFixed(1));
  relevance = Number(relevance.toFixed(1));
  clarity = Number(clarity.toFixed(1));
  communication = Number(communication.toFixed(1));
  completeness = Number(completeness.toFixed(1));
  confidence = Number(confidence.toFixed(1));

  let overall = Number(((technical * 0.35) + (relevance * 0.25) + (clarity * 0.15) + (communication * 0.15) + (completeness * 0.10)).toFixed(1));

  // If relevance is poor, penalize overall score
  if (relevance < 4.0) {
    overall = Math.min(overall, 3.8);
  }

  let status = 'Correct';
  let verdict = 'Comprehensive and well-structured answer with strong technical depth.';
  if (overall < 5.5) {
    status = 'Incorrect';
    verdict = isOffTopic 
      ? 'Response does not sufficiently address the core concepts of this question.'
      : 'Response lacks key technical mechanisms and depth required for this question.';
  } else if (overall < 7.0) {
    status = 'Partially Correct';
    verdict = 'Accurate understanding of high-level concepts, but missing deeper edge cases or concrete trade-offs.';
  }

  let doneWell = matchedConcepts.length >= 2 
    ? `Strong articulation of core concepts (${matchedConcepts.slice(0, 2).join(', ')}).`
    : (matchedConcepts.length === 1 
      ? `Correctly identified ${matchedConcepts[0]}.`
      : 'Clear communication style and foundational attempt.');

  let improvement = missingConcepts.length > 0 
    ? `Key concepts to deepen for this question: ${missingConcepts.slice(0, 3).join(', ')}.`
    : (wordCount < 35 ? 'Elaborate further with concrete architectural mechanisms and real-world trade-offs.' : 'Consider discussing edge cases, failure recovery, and performance trade-offs.');

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
    tip: questionObj.tips || 'Structure responses using clear points covering definitions, architecture, and real-world trade-offs.',
    matchedConcepts,
    missingConcepts
  };
}

function formatEvaluationResponse(apiResult, questionObj) {
  const overall = apiResult.overallScore || 7.0;
  let status = 'Correct';
  if (overall < 5.5) status = 'Incorrect';
  else if (overall < 7.5) status = 'Partially Correct';

  return {
    overallScore: overall,
    status,
    statusLabel: status,
    verdict: apiResult.verdict || apiResult.doneWell || (status === 'Correct' ? 'High-quality technical explanation.' : 'Needs refinement.'),
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
Ideal Reference Answer: ${questionObj.idealAnswer || 'N/A'}
Candidate's Answer: "${userAnswer}"

Evaluate strictly against this specific question only. If the candidate answers an unrelated question or off-topic prompt, mark overallScore < 4.0 and status 'Incorrect'.
Return JSON with this exact structure:
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
  "verdict": "Clear summary verdict",
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
