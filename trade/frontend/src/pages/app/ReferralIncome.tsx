import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  ArrowUpRight,
  Filter,
  RefreshCw
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Transaction = {
  id: string;
  amount: number;
  type: string;
  income_source: string;
  description: string;
  timestamp: string;
};

type DashboardData = {
  income_breakdown: Array<{
    source: string;
    amount: number;
  }>;
  recent_transactions: Transaction[];
};

const ReferralIncome: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<string>('ALL');
  const [levelFilter, setLevelFilter] = useState<string>('ALL');

  const { data: dashboardData, isLoading, refetch } = useQuery<DashboardData>({ 
    queryKey: ['dashboard'], 
    queryFn: () => api<DashboardData>('/api/user/dashboard') 
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getReferralLevel = (description: string) => {
    const levelMatch = description.match(/level\s*(\d+)|L(\d+)/i);
    if (levelMatch) {
      return parseInt(levelMatch[1] || levelMatch[2]);
    }
    return 1; // Default to level 1 if no level specified
  };

  const filterTransactionsByTime = (transactions: Transaction[]) => {
    if (timeFilter === 'ALL') return transactions;
    
    const now = new Date();
    const filterDate = new Date();
    
    switch (timeFilter) {
      case '7D':
        filterDate.setDate(now.getDate() - 7);
        break;
      case '30D':
        filterDate.setDate(now.getDate() - 30);
        break;
      case '90D':
        filterDate.setDate(now.getDate() - 90);
        break;
      default:
        return transactions;
    }
    
    return transactions.filter(t => new Date(t.timestamp) >= filterDate);
  };

  // Get referral-related transactions
  const referralTransactions = dashboardData?.recent_transactions?.filter(
    transaction => 
      transaction.type === 'credit' && 
      (transaction.income_source === 'referral_income' || 
       transaction.description.toLowerCase().includes('referral'))
  ) || [];

  // Apply filters
  const filteredTransactions = filterTransactionsByTime(referralTransactions).filter(
    transaction => {
      if (levelFilter === 'ALL') return true;
      const level = getReferralLevel(transaction.description);
      return level.toString() === levelFilter;
    }
  );

  // Calculate totals
  const totalReferralIncome = dashboardData?.income_breakdown?.find(
    item => item.source === 'referral_income'
  )?.amount || 0;

  const periodTotal = filteredTransactions.reduce(
    (sum, transaction) => sum + Number(transaction.amount), 
    0
  );

  const levelBreakdown = filteredTransactions.reduce((acc, transaction) => {
    const level = getReferralLevel(transaction.description);
    if (!acc[level]) {
      acc[level] = { count: 0, amount: 0 };
    }
    acc[level].count++;
    acc[level].amount += Number(transaction.amount);
    return acc;
  }, {} as { [key: number]: { count: number; amount: number } });

  const getLevelColor = (level: number) => {
    const colors = [
      '#3b82f6', // Level 1 - Blue
      '#10b981', // Level 2 - Green  
      '#f59e0b', // Level 3 - Yellow
      '#8b5cf6', // Level 4 - Purple
      '#ef4444', // Level 5 - Red
      '#06b6d4', // Level 6 - Cyan
      '#84cc16', // Level 7 - Lime
    ];
    return colors[(level - 1) % colors.length] || '#6b7280';
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">Referral Income</h1>
          <p className="text-muted-foreground mt-2">
            Track your multi-level referral commissions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
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
      <div>
        <h1 className="text-2xl font-bold text-yellow-500">Referral Income</h1>
        <p className="text-muted-foreground mt-2">
          Track your multi-level referral commissions and earnings
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Referral Income</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(Number(totalReferralIncome))}</p>
                <p className="text-xs text-muted-foreground mt-1">All-time earnings</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Period Total</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(periodTotal)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {timeFilter === 'ALL' ? 'All transactions' : `Last ${timeFilter}`}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                <p className="text-2xl font-bold text-purple-600">{filteredTransactions.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Referral commissions</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Time</SelectItem>
                <SelectItem value="7D">Last 7 Days</SelectItem>
                <SelectItem value="30D">Last 30 Days</SelectItem>
                <SelectItem value="90D">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Levels</SelectItem>
                {Array.from({ length: 7 }, (_, i) => i + 1).map((level) => (
                  <SelectItem key={level} value={level.toString()}>
                    Level {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={() => {
                setTimeFilter('ALL');
                setLevelFilter('ALL');
              }}
            >
              Clear Filters
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => refetch()}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Level Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Income by Level</CardTitle>
          <CardDescription>Breakdown of referral income by commission levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(levelBreakdown)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([level, data]) => (
              <Card key={level} className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: getLevelColor(Number(level)) }}
                      />
                      <span className="font-semibold">Level {level}</span>
                    </div>
                    <Badge variant="secondary">{data.count} transactions</Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: getLevelColor(Number(level)) }}>
                      {formatCurrency(data.amount)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Avg: {formatCurrency(data.amount / data.count)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {Object.keys(levelBreakdown).length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">No referral income found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your filters or refer more people to start earning
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transactions History */}
      <Card>
        <CardHeader>
          <CardTitle>Referral Income History</CardTitle>
          <CardDescription>
            Detailed list of all referral commission transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => {
              const level = getReferralLevel(transaction.description);
              return (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <ArrowUpRight className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium">{formatCurrency(Number(transaction.amount))}</p>
                        <Badge style={{ backgroundColor: getLevelColor(level) }}>
                          Level {level}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{transaction.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{formatDate(transaction.timestamp)}</p>
                  </div>
                </div>
              );
            })}
            
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground">No referral transactions found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {timeFilter !== 'ALL' || levelFilter !== 'ALL' 
                    ? 'Try adjusting your filters to see more transactions' 
                    : 'Start referring people to earn referral commissions'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralIncome;