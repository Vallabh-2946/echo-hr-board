import { TrendingUp, Users, Calendar, MessageSquare } from 'lucide-react';

export default function InsightsPage() {
  const insights = [
    {
      title: 'Engagement Peak Times',
      description: 'Employees are most engaged between 10 AM - 12 PM on Tuesdays and Thursdays.',
      icon: TrendingUp,
      color: 'text-green-400',
    },
    {
      title: 'Meeting Fatigue Alert',
      description: 'Engineering team has 40% more meetings than company average. Consider restructuring.',
      icon: Calendar,
      color: 'text-yellow-400',
    },
    {
      title: 'Positive Feedback Trend',
      description: '78% of recent feedback mentions improved team collaboration.',
      icon: MessageSquare,
      color: 'text-primary',
    },
    {
      title: 'Department Health',
      description: 'Design team shows highest satisfaction scores this quarter (92%).',
      icon: Users,
      color: 'text-secondary',
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Insights</h1>
          <p className="text-muted-foreground">AI-powered organizational health insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, idx) => {
            const Icon = insight.icon;
            return (
              <div
                key={idx}
                className="bg-card p-6 rounded-lg shadow-lg border-2 border-secondary hover:border-primary transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className={insight.color}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
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
