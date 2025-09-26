import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Crown, 
  TrendingUp, 
  DollarSign, 
  Target,
  Users,
  Award,
  ArrowUp,
  RefreshCw,
  CheckCircle
} from 'lucide-react';

type SalaryStatus = {
  totalVolume: number;
  directReferrals: number;
  totalDownline: number;
  currentRank: string | null;
  ranks: Array<{ 
    rankName: string; 
    threshold: number; 
    salary: number; 
    isAchieved: boolean; 
    progress: number; 
    volumeNeeded: number 
  }>;
};

type DashboardData = {
  income_breakdown: Array<{
    source: string;
    amount: number;
  }>;
};

const SalaryIncome: React.FC = () => {
  const { data: salaryData, isLoading: salaryLoading, refetch } = useQuery<SalaryStatus>({ 
    queryKey: ['salary-status'], 
    queryFn: () => api<SalaryStatus>('/api/user/salary-status') 
  });

  const { data: dashboardData, isLoading: dashboardLoading } = useQuery<DashboardData>({ 
    queryKey: ['dashboard'], 
    queryFn: () => api<DashboardData>('/api/user/dashboard') 
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatVolume = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalSalaryIncome = dashboardData?.income_breakdown?.find(
    item => item.source === 'salary_income'
  )?.amount || 0;

  const currentRankData = salaryData?.ranks?.find(rank => rank.isAchieved);
  const nextRankData = salaryData?.ranks?.find(rank => !rank.isAchieved);

  const getRankColor = (rankName: string) => {
    const colors: { [key: string]: string } = {
      'Rank 1': '#3b82f6', // Blue
      'Rank 2': '#10b981', // Green
      'Rank 3': '#f59e0b', // Yellow
      'Rank 4': '#8b5cf6', // Purple
      'Rank 5': '#ef4444', // Red
    };
    return colors[rankName] || '#6b7280';
  };

  const getRankIcon = (rankName: string, isAchieved: boolean) => {
    if (isAchieved) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    return <Target className="h-5 w-5 text-muted-foreground" />;
  };

  if (salaryLoading || dashboardLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">Salary Income</h1>
          <p className="text-muted-foreground mt-2">
            Track your rank-based salary earnings and progression
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-8 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">Salary Income</h1>
          <p className="text-muted-foreground mt-2">
            Track your rank-based salary earnings and progression
          </p>
        </div>
        <Button variant="outline" onClick={() => refetch()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Rank</p>
                <p className="text-2xl font-bold text-purple-600">
                  {salaryData?.currentRank || 'No Rank'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Monthly: {currentRankData ? formatCurrency(currentRankData.salary) : '$0'}
                </p>
              </div>
              <Crown className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Salary Earned</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(Number(totalSalaryIncome))}</p>
                <p className="text-xs text-muted-foreground mt-1">All-time</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Business Volume</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatVolume(salaryData?.totalVolume || 0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Team total</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Team Size</p>
                <p className="text-2xl font-bold text-orange-600">{salaryData?.totalDownline || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Direct: {salaryData?.directReferrals || 0}
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Rank Progress */}
      {nextRankData && (
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowUp className="h-5 w-5 text-yellow-600" />
              <span>Next Rank Progress</span>
            </CardTitle>
            <CardDescription>You're working towards {nextRankData.rankName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{nextRankData.rankName}</p>
                <p className="text-sm text-muted-foreground">
                  Monthly Salary: {formatCurrency(nextRankData.salary)}
                </p>
              </div>
              <Badge 
                className="text-lg px-4 py-2"
                style={{ backgroundColor: getRankColor(nextRankData.rankName) }}
              >
                +{formatCurrency(nextRankData.salary - (currentRankData?.salary || 0))}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to {nextRankData.rankName}</span>
                <span>{Math.round(nextRankData.progress * 100)}%</span>
              </div>
              <Progress value={nextRankData.progress * 100} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Current: {formatVolume(salaryData?.totalVolume || 0)}</span>
                <span>Target: {formatVolume(nextRankData.threshold)}</span>
              </div>
            </div>
            
            <div className="p-3 bg-white rounded-lg border">
              <p className="text-sm">
                <strong>Need {formatVolume(nextRankData.volumeNeeded)} more</strong> in team business volume to reach {nextRankData.rankName}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Ranks Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Rank System Overview</span>
          </CardTitle>
          <CardDescription>
            Complete salary structure and your progress across all ranks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salaryData?.ranks?.map((rank) => (
              <Card 
                key={rank.rankName} 
                className={`transition-all duration-200 ${
                  rank.isAchieved 
                    ? 'border-green-300 bg-green-50' 
                    : 'hover:border-gray-300'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(rank.rankName, rank.isAchieved)}
                      <h3 className="font-semibold" style={{ color: getRankColor(rank.rankName) }}>
                        {rank.rankName}
                      </h3>
                    </div>
                    <Badge 
                      variant={rank.isAchieved ? "default" : "secondary"}
                      style={rank.isAchieved ? { backgroundColor: getRankColor(rank.rankName) } : {}}
                    >
                      {formatCurrency(rank.salary)}/mo
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="text-muted-foreground">Required Volume:</p>
                      <p className="font-medium">{formatVolume(rank.threshold)}</p>
                    </div>
                    
                    {!rank.isAchieved && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span>{Math.round(rank.progress * 100)}%</span>
                        </div>
                        <Progress value={rank.progress * 100} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Need {formatVolume(rank.volumeNeeded)} more
                        </p>
                      </div>
                    )}
                    
                    {rank.isAchieved && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Achieved!</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rank Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>How Salary Income Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">🎯 Qualification Requirements</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Build team business volume through referrals</li>
                <li>• Volume includes all investments from your downline</li>
                <li>• Maintain rank to continue receiving monthly salary</li>
                <li>• Higher ranks unlock higher monthly payments</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">💰 Salary Benefits</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Monthly recurring income based on rank</li>
                <li>• Passive income that continues as long as rank is maintained</li>
                <li>• Compounds with other income sources</li>
                <li>• Recognition and status within the community</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips for Rank Advancement</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Focus on helping your team succeed - their volume counts towards your rank</li>
              <li>• Encourage larger investments from your referrals</li>
              <li>• Build both left and right legs for balanced growth</li>
              <li>• Stay active and engaged to maintain team motivation</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryIncome;