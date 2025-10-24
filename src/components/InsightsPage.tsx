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
    {
      title: 'Remote Work Impact',
      description: 'Hybrid workers report 15% higher work-life balance satisfaction than full-time office workers.',
      icon: TrendingUp,
      color: 'text-purple-400',
    },
    {
      title: 'Burnout Risk Prediction',
      description: 'Sales team projected to reach high-risk burnout levels in 3 weeks without intervention.',
      icon: TrendingUp,
      color: 'text-red-400',
    },
    {
      title: 'Training ROI Success',
      description: 'Teams that completed stress management training show 23% lower burnout risk.',
      icon: Users,
      color: 'text-emerald-400',
    },
    {
      title: 'Communication Patterns',
      description: 'After-hours messaging increased 35% this month, correlating with higher stress levels.',
      icon: MessageSquare,
      color: 'text-orange-400',
    },
    {
      title: 'Manager Support Score',
      description: 'Employees with weekly 1-on-1s report 40% higher clarity and goal alignment.',
      icon: Users,
      color: 'text-indigo-400',
    },
    {
      title: 'Productivity vs. Well-being',
      description: 'Optimal productivity achieved at 42-45 work hours/week, declining sharply above 50 hours.',
      icon: TrendingUp,
      color: 'text-teal-400',
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
