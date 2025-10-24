import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { calculateBurnoutRisk, mockAnalyzeText, getRiskColorClass, getRiskLabel } from '@/lib/hrUtils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Activity, MessageSquare, TrendingDown, TrendingUp } from 'lucide-react';

export default function EmployeePortal() {
  const { updateOrgRisk, loggedInUser } = useApp();
  const [clarity, setClarity] = useState(3);
  const [balance, setBalance] = useState(3);
  const [workHours, setWorkHours] = useState(40);
  const [meetings, setMeetings] = useState(8);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const sentiment = feedbackText ? mockAnalyzeText(feedbackText).sentiment : 3;
  const personalRisk = calculateBurnoutRisk(workHours, meetings, sentiment);

  const handleSubmit = () => {
    console.log('✅ Feedback submitted successfully', { 
      clarity, 
      balance, 
      workHours, 
      meetings, 
      feedbackText,
      personalRisk,
      sentiment
    });
    
    const riskShift = clarity < 3 || balance < 3 ? 10 : -5;
    updateOrgRisk(riskShift);
    setFeedbackSent(true);

    // Reset form after submission
    setTimeout(() => {
      setFeedbackSent(false);
      setFeedbackText('');
    }, 5000);
  };

  const emotionAnalysis = feedbackText ? mockAnalyzeText(feedbackText) : null;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            My Well-being Portal
          </h1>
          <p className="text-muted-foreground">Welcome back, {loggedInUser?.name}</p>
        </div>

        {feedbackSent && (
          <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-6 mb-6 animate-pulse-glow">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-lg font-semibold text-green-400">✅ Feedback Sent!</p>
                <p className="text-sm text-muted-foreground">
                  Your input updated the HR Dashboard in real time.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-card p-6 rounded-lg shadow-lg border-2 border-primary">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="w-5 h-5 text-yellow-400" />
              <h2 className="text-xl font-semibold text-foreground">Personal Burnout Risk</h2>
            </div>
            <div className="flex items-end space-x-4 mb-4">
              <p className={`text-5xl font-bold ${getRiskColorClass(personalRisk)} transition-all duration-500`}>
                {personalRisk}%
              </p>
              <div className="pb-2">
                <span className={`text-sm font-medium ${getRiskColorClass(personalRisk)}`}>
                  {getRiskLabel(personalRisk)}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on your work hours, meetings, and sentiment analysis
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg border-2 border-secondary">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Emotion Analyzer</h3>
            </div>
            {emotionAnalysis ? (
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground mb-2">Detected emotions:</div>
                {emotionAnalysis.emotions.map((emotion, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <span className="text-2xl" title={emotion.emotion}>{emotion.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">{emotion.emotion}</span>
                        <span className="text-xs text-muted-foreground">{emotion.score}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-2.5 rounded-full transition-all duration-500 ${emotion.color}`}
                          style={{ width: `${emotion.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl mb-2">🤔</div>
                <p className="text-sm text-muted-foreground italic">
                  Enter feedback below to analyze your emotional state
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg border-2 border-primary">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Monthly Feedback Form</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Work Hours (per week): <span className="text-primary font-mono">{workHours}</span>
              </label>
              <Slider
                value={[workHours]}
                onValueChange={(value) => setWorkHours(value[0])}
                min={20}
                max={70}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>20h</span>
                <span>70h</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Meetings (per week): <span className="text-primary font-mono">{meetings}</span>
              </label>
              <Slider
                value={[meetings]}
                onValueChange={(value) => setMeetings(value[0])}
                min={0}
                max={25}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span>25</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Clarity of Goals (1-5): <span className="text-primary font-mono">{clarity}</span>
              </label>
              <Slider
                value={[clarity]}
                onValueChange={(value) => setClarity(value[0])}
                min={1}
                max={5}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Very Unclear</span>
                <span>Very Clear</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Work-Life Balance (1-5): <span className="text-primary font-mono">{balance}</span>
              </label>
              <Slider
                value={[balance]}
                onValueChange={(value) => setBalance(value[0])}
                min={1}
                max={5}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Additional Feedback (Optional)
              </label>
              <Textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Share your thoughts, concerns, or suggestions..."
                className="w-full min-h-24"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                {clarity < 3 || balance < 3 ? (
                  <span className="flex items-center text-orange-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    This will increase org risk by ~10%
                  </span>
                ) : (
                  <span className="flex items-center text-green-400">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    This will decrease org risk by ~5%
                  </span>
                )}
              </div>
              <Button
                onClick={handleSubmit}
                className="px-8"
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
