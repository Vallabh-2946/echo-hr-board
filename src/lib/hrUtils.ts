// Calculate burnout risk based on hours, meetings, and sentiment
export function calculateBurnoutRisk(hours: number, meetings: number, sentiment: number): number {
  const hoursScore = Math.min(100, (hours / 60) * 100);
  const meetingsScore = Math.min(100, (meetings / 15) * 100);
  const sentimentScore = Math.max(0, 100 - sentiment * 20);
  
  const risk = hoursScore * 0.4 + meetingsScore * 0.3 + sentimentScore * 0.3;
  return Math.round(Math.min(100, Math.max(0, risk)));
}

// Analyze text for emotions with emojis and gradient colors
export function mockAnalyzeText(text: string) {
  const positiveWords = ['happy', 'great', 'excellent', 'good', 'love', 'enjoy', 'satisfied', 'comfortable'];
  const negativeWords = ['stressed', 'tired', 'exhausted', 'overwhelmed', 'frustrated', 'anxious', 'worried', 'burnout'];
  
  let positiveCount = 0, negativeCount = 0;
  const lowerText = text.toLowerCase();
  positiveWords.forEach(w => { if (lowerText.includes(w)) positiveCount++; });
  negativeWords.forEach(w => { if (lowerText.includes(w)) negativeCount++; });
  
  const totalWords = text.split(/\s+/).length;
  const sentiment = Math.max(1, Math.min(5, 3 + (positiveCount - negativeCount)));

  return {
    sentiment,
    emotions: [
      { emotion: 'Happy', score: Math.round((positiveCount / Math.max(1, totalWords)) * 100), 
        emoji: '😊', color: 'bg-gradient-to-r from-yellow-400 to-amber-500' },
      { emotion: 'Stressed', score: Math.round((negativeCount / Math.max(1, totalWords)) * 100), 
        emoji: '😰', color: 'bg-gradient-to-r from-red-500 to-rose-600' },
      { emotion: 'Neutral', score: Math.round((1 - (positiveCount + negativeCount) / Math.max(1, totalWords)) * 80), 
        emoji: '😐', color: 'bg-gradient-to-r from-gray-400 to-gray-500' },
      { emotion: 'Anxious', score: Math.round((negativeCount / Math.max(1, totalWords)) * 90), 
        emoji: '😟', color: 'bg-gradient-to-r from-orange-500 to-red-500' },
    ]
  };
}

export function getRiskColorClass(risk: number): string {
  if (risk <= 20) return 'text-green-500';
  if (risk <= 40) return 'text-blue-400';
  if (risk <= 60) return 'text-yellow-400';
  if (risk <= 80) return 'text-orange-500';
  return 'text-red-500';
}

export function getRiskBgClass(risk: number): string {
  if (risk <= 20) return 'bg-green-500';
  if (risk <= 40) return 'bg-blue-400';
  if (risk <= 60) return 'bg-yellow-400';
  if (risk <= 80) return 'bg-orange-500';
  return 'bg-red-500';
}

export function getRiskLabel(risk: number): string {
  if (risk <= 20) return 'Very Low';
  if (risk <= 40) return 'Low';
  if (risk <= 60) return 'Moderate';
  if (risk <= 80) return 'High';
  return 'Critical';
}
