import { useApp } from '@/contexts/AppContext';
import { getRiskColorClass, getRiskBgClass, getRiskLabel } from '@/lib/hrUtils';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, Users, Calendar } from 'lucide-react';

export default function HRDashboard() {
  const { orgBurnoutRisk } = useApp();

  const moraleTrend = [
    { week: 'W1', score: 72 },
    { week: 'W2', score: 68 },
    { week: 'W3', score: 75 },
    { week: 'W4', score: 71 },
    { week: 'W5', score: 78 },
  ];

  const collaborationData = [
    { dept: 'Eng', score: 82 },
    { dept: 'Design', score: 91 },
    { dept: 'Marketing', score: 76 },
    { dept: 'Sales', score: 68 },
  ];

  const emotionDistribution = [
    { level: 'Very Low', percentage: 15, color: 'bg-green-500' },
    { level: 'Low', percentage: 28, color: 'bg-blue-400' },
    { level: 'Moderate', percentage: 32, color: 'bg-yellow-400' },
    { level: 'High', percentage: 18, color: 'bg-orange-500' },
    { level: 'Critical', percentage: 7, color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">HR Dashboard</h1>
          <p className="text-muted-foreground">Real-time organizational health monitoring</p>
        </div>

        {/* Organizational Burnout Risk - Live Updates */}
        <div className="bg-card p-8 rounded-lg border-2 border-primary shadow-lg mb-6 animate-pulse-glow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Activity className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Organizational Burnout Risk</h2>
            </div>
            <div className="text-sm text-muted-foreground">Updates in real-time</div>
          </div>
          <div className="flex items-end space-x-6">
            <p className={`text-6xl font-bold ${getRiskColorClass(orgBurnoutRisk)} transition-all duration-500`}>
              {orgBurnoutRisk}%
            </p>
            <div className="pb-3">
              <span className={`text-lg font-medium ${getRiskColorClass(orgBurnoutRisk)}`}>
                {getRiskLabel(orgBurnoutRisk)}
              </span>
            </div>
          </div>
          <div className="mt-4 bg-muted rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 ${getRiskBgClass(orgBurnoutRisk)} transition-all duration-500`}
              style={{ width: `${orgBurnoutRisk}%` }}
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Morale Trend */}
          <div className="bg-card p-6 rounded-lg border border-border shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-semibold text-foreground">Morale Trend (5 weeks)</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={moraleTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Collaboration Score */}
          <div className="bg-card p-6 rounded-lg border border-border shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Collaboration Score by Department</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={collaborationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="dept" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
                <Bar dataKey="score" fill="#06B6D4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Emotion Spectrum Distribution */}
        <div className="bg-card p-6 rounded-lg border border-border shadow-lg">
          <div className="flex items-center space-x-2 mb-6">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Emotion Spectrum Distribution</h3>
          </div>
          <div className="space-y-4">
            {emotionDistribution.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{item.level}</span>
                  <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-4 ${item.color} transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
