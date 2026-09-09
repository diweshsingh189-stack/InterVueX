/**
 * InterVueX AI Evaluation Engine
 * Evaluates candidate answers on Relevance, Technical Accuracy, Clarity,
 * Communication, Completeness, and Confidence.
 */

export async function evaluateAnswer(questionObj, userAnswer, sessionContext = {}) {
  const cleaned = (userAnswer || '').trim();
  const wordCount = cleaned.split(/\s+/).filter(Boolean).length;

  // Check if answer is too short or empty
  if (wordCount < 5) {
    return {
      overallScore: 2.0,
      scores: {
        relevance: 2.0,
        technical: 2.0,
        clarity: 3.0,
        communication: 2.5,
        completeness: 1.5,
        confidence: 2.0
      },
      doneWell: 'Initiated an answer.',
      improvement: 'The response is too brief to evaluate technical depth or communication ability.',
      suggestedApproach: `A thorough answer should address: ${questionObj.keyConcepts ? questionObj.keyConcepts.join(', ') : 'the core problem and trade-offs'}.`,
      tip: 'Aim for at least 3-4 structured sentences covering concepts, mechanics, and concrete examples.'
    };
  }

  // If user provided a real Gemini API Key in settings, call Gemini directly
  if (sessionContext.apiKey) {
    try {
      const apiResult = await callGeminiEvaluation(questionObj, userAnswer, sessionContext.apiKey);
      if (apiResult) return apiResult;
    } catch (err) {
      console.warn('Live API evaluation fallback to built-in semantic evaluator:', err);
    }
  }

  // High-Precision Heuristic & Semantic Concept Evaluator
  const lowerAnswer = cleaned.toLowerCase();
  const concepts = questionObj.keyConcepts || [];
  
  // Concept match count
  let matchedConcepts = 0;
  concepts.forEach(concept => {
    const words = concept.toLowerCase().split(' ');
    const hasMatch = words.some(w => w.length > 3 && lowerAnswer.includes(w)) || lowerAnswer.includes(concept.toLowerCase());
    if (hasMatch) matchedConcepts++;
  });

  const conceptCoverage = concepts.length > 0 ? (matchedConcepts / concepts.length) : 0.7;

  // Length and structural depth heuristics
  const lengthScore = Math.min(10, Math.max(4, (wordCount / 35) * 6));
  
  // Check for structural indicators (e.g. "first", "because", "trade-off", "example", "for instance", STAR markers)
  const structureWords = ['because', 'for example', 'such as', 'trade-off', 'first', 'second', 'result', 'benefit', 'approach', 'mitigate', 'prevent'];
  const structureMatches = structureWords.filter(w => lowerAnswer.includes(w)).length;
  const structureBonus = Math.min(2.0, structureMatches * 0.5);

  // Calculate dimension scores
  let technical = Math.min(10, Math.max(3.5, (conceptCoverage * 6.5) + (structureBonus * 0.8) + (lengthScore * 0.2)));
  let relevance = Math.min(10, Math.max(4.0, (conceptCoverage * 7.0) + 2.5));
  let clarity = Math.min(10, Math.max(4.5, 6.0 + (structureBonus * 1.5) - (wordCount > 300 ? 1.0 : 0)));
  let communication = Math.min(10, Math.max(4.0, 5.5 + structureBonus + (wordCount >= 25 && wordCount <= 180 ? 1.5 : 0.5)));
  let completeness = Math.min(10, Math.max(3.0, (conceptCoverage * 6.0) + (lengthScore * 0.35)));
  let confidence = Math.min(10, Math.max(4.0, 6.5 + (structureBonus * 1.0) - (lowerAnswer.includes('maybe') || lowerAnswer.includes('i guess') || lowerAnswer.includes('not sure') ? 2.0 : 0)));

  // Round scores to 1 decimal place
  technical = Number(technical.toFixed(1));
  relevance = Number(relevance.toFixed(1));
  clarity = Number(clarity.toFixed(1));
  communication = Number(communication.toFixed(1));
  completeness = Number(completeness.toFixed(1));
  confidence = Number(confidence.toFixed(1));

  const overall = Number(((technical * 0.35) + (relevance * 0.25) + (clarity * 0.15) + (communication * 0.15) + (completeness * 0.10)).toFixed(1));

  // Determine constructive insights
  let doneWell = 'Clear articulation of the fundamental principles and good pacing.';
  if (matchedConcepts >= 2) {
    doneWell = `Strong identification of core concepts (${concepts.slice(0, 2).join(', ')}).`;
  } else if (structureMatches >= 2) {
    doneWell = 'Well-structured narrative with logical cause-and-effect explanations.';
  }

  let improvement = 'Incorporate more specific technical terminology and practical edge-case trade-offs.';
  if (conceptCoverage < 0.5 && concepts.length > 0) {
    improvement = `Key concepts to deepen: ${concepts.filter(c => !lowerAnswer.includes(c.toLowerCase())).slice(0, 2).join(', ')}.`;
  } else if (wordCount < 30) {
    improvement = 'Elaborate further with a concrete production example or architectural trade-off.';
  }

  const suggestedApproach = questionObj.idealAnswer 
    ? questionObj.idealAnswer 
    : 'Begin with a concise definition, explain the underlying mechanism, and conclude with a production trade-off or real-world example.';

  const tip = questionObj.tips || 'Keep responses structured using bullet points or chronological steps for optimal interviewer clarity.';

  return {
    overallScore: Math.min(10, Math.max(1, overall)),
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
    suggestedApproach,
    tip
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
