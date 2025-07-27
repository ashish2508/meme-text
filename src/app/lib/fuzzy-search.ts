
export default function fuzzySearch(query: string, text: string): boolean {
  const normalizedQuery = query.toLowerCase().trim();
  const normalizedText = text.toLowerCase();
  
  if (normalizedQuery.length <= 2) return normalizedText === normalizedQuery || normalizedText.includes(normalizedQuery);
  
  if (normalizedText.includes(normalizedQuery)) return true;  
  
  let queryIndex = 0, matchCount = 0;
  for (let i = 0; i < normalizedText.length && queryIndex < normalizedQuery.length; i++) {
    if (normalizedText[i] === normalizedQuery[queryIndex]) {
      matchCount++;
      queryIndex++;
    }
  }
  const matchRatio = matchCount / normalizedQuery.length;
  return matchRatio >= 0.7;
}
