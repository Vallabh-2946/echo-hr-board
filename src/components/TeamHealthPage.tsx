import { getRiskColorClass, getRiskBgClass } from '@/lib/hrUtils';
import { Users, TrendingUp, TrendingDown } from 'lucide-react';

export default function TeamHealthPage() {
  const teams = [
    { name: 'Engineering', members: 42, burnoutRisk: 58, trend: 5, satisfaction: 72 },
    { name: 'Design', members: 18, burnoutRisk: 32, trend: -3, satisfaction: 88 },
    { name: 'Marketing', members: 25, burnoutRisk: 45, trend: 2, satisfaction: 76 },
    { name: 'Sales', members: 32, burnoutRisk: 62, trend: 8, satisfaction: 68 },
    { name: 'Customer Support', members: 10, burnoutRisk: 28, trend: -5, satisfaction: 92 },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Team Health</h1>
          <p className="text-muted-foreground">Department-level burnout risk and satisfaction metrics</p>
        </div>

        <div className="space-y-4">
          {teams.map((team, idx) => (
            <div
              key={idx}
              className="bg-card p-6 rounded-lg shadow-lg border-2 border-secondary hover:border-primary transition-all duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-lg font-semibold text-foreground">{team.name}</div>
                    <div className="text-sm text-muted-foreground">{team.members} members</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-1">Burnout Risk</div>
                  <div className="flex items-center space-x-2">
                    <div className={`text-2xl font-bold ${getRiskColorClass(team.burnoutRisk)}`}>
                      {team.burnoutRisk}%
                    </div>
                    {team.trend > 0 ? (
                      <TrendingUp className="w-4 h-4 text-red-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-green-400" />
                    )}
                    <span className={team.trend > 0 ? 'text-red-400 text-sm' : 'text-green-400 text-sm'}>
                      {Math.abs(team.trend)}%
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-1">Satisfaction</div>
                  <div className="text-2xl font-bold text-foreground">{team.satisfaction}%</div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-2">Risk Level</div>
                  <div className="bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 ${getRiskBgClass(team.burnoutRisk)} transition-all duration-500`}
                      style={{ width: `${team.burnoutRisk}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
