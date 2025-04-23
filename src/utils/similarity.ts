
import { KnowledgeBaseEntry } from '@/data/knowledgeBase';
import { PreviousCase } from '@/data/previousCases';

// Function to tokenize text into words
export function tokenize(text: string): string[] {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2);
}

// Find knowledge base entries that match the query
export function findKnowledgeBaseMatches(query: string, knowledgeBase: KnowledgeBaseEntry[]): KnowledgeBaseEntry | null {
  const queryTokens = tokenize(query);
  let bestMatch: KnowledgeBaseEntry | null = null;
  let highestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    // Check for keyword matches
    for (const token of queryTokens) {
      if (entry.keywords.some(keyword => keyword.includes(token) || token.includes(keyword))) {
        score++;
      }
    }
    
    // Check if the title contains any query tokens
    const titleTokens = tokenize(entry.title);
    for (const token of queryTokens) {
      if (titleTokens.some(titleToken => titleToken.includes(token) || token.includes(titleToken))) {
        score += 2; // Title matches are weighted higher
      }
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  // Only return a match if the score is significant
  return highestScore > 1 ? bestMatch : null;
}

// Calculate similarity score between two texts
function calculateSimilarity(text1: string[], text2: string[]): number {
  let matches = 0;
  
  for (const token1 of text1) {
    if (text2.some(token2 => token1.includes(token2) || token2.includes(token1))) {
      matches++;
    }
  }
  
  return matches / Math.max(text1.length, text2.length, 1);
}

// Find similar previous cases to the query
export function findSimilarCases(query: string, previousCases: PreviousCase[], limit: number = 5): PreviousCase[] {
  const queryTokens = tokenize(query);
  
  // Calculate similarity scores for each case
  const scoredCases = previousCases.map(caseItem => {
    const caseTokens = [
      ...tokenize(caseItem.title),
      ...tokenize(caseItem.description)
    ];
    
    return {
      case: caseItem,
      score: calculateSimilarity(queryTokens, caseTokens)
    };
  });
  
  // Sort by similarity score (highest first)
  const sortedCases = scoredCases
    .sort((a, b) => b.score - a.score)
    .map(item => item.case);
  
  // Return top N cases
  return sortedCases.slice(0, limit);
}
