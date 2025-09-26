import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, 
  TrendingUp, 
  DollarSign, 
  Target,
  ArrowUpRight,
  Filter,
  RefreshCw,
  Calendar
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

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
  direct_team: number;
};

const DirectIncome: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<string>('ALL');

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

  // Get direct income transactions
  const directIncomeTransactions = dashboardData?.recent_transactions?.filter(
    transaction => 
      transaction.type === 'credit' && 
      (transaction.income_source === 'direct_income' || 
       transaction.description.toLowerCase().includes('direct'))
  ) || [];

  // Apply time filter
  const filteredTransactions = filterTransactionsByTime(directIncomeTransactions);

  // Calculate totals
  const totalDirectIncome = dashboardData?.income_breakdown?.find(
    item => item.source === 'direct_income'
  )?.amount || 0;

  const periodTotal = filteredTransactions.reduce(
    (sum, transaction) => sum + Number(transaction.amount), 
    0
  );

  const directTeamCount = dashboardData?.direct_team || 0;
  const averagePerReferral = directTeamCount > 0 ? Number(totalDirectIncome) / directTeamCount : 0;

  // Group transactions by month for chart
  const monthlyData = filteredTransactions.reduce((acc, transaction) => {
    const month = new Date(transaction.timestamp).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
    
    if (!acc[month]) {
      acc[month] = { month, amount: 0, count: 0 };
    }
    
    acc[month].amount += Number(transaction.amount);
    acc[month].count += 1;
    
    return acc;
  }, {} as { [key: string]: { month: string; amount: number; count: number } });

  const chartData = Object.values(monthlyData).sort((a, b) => 
    new Date(a.month).getTime() - new Date(b.month).getTime()
  );

  // Group transactions by week for recent activity
  const weeklyBreakdown = filteredTransactions
    .filter(t => {
      const transactionDate = new Date(t.timestamp);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return transactionDate >= thirtyDaysAgo;
    })
    .reduce((acc, transaction) => {
      const weekStart = new Date(transaction.timestamp);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekKey = weekStart.toDateString();
      
      if (!acc[weekKey]) {
        acc[weekKey] = { count: 0, amount: 0 };
      }
      
      acc[weekKey].count++;
      acc[weekKey].amount += Number(transaction.amount);
      
      return acc;
    }, {} as { [key: string]: { count: number; amount: number } });

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">Direct Income</h1>
          <p className="text-muted-foreground mt-2">
            Track your first-level referral bonuses
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
      <div>
        <h1 className="text-2xl font-bold text-yellow-500">Direct Income</h1>
        <p className="text-muted-foreground mt-2">
          Track your first-level referral bonuses and direct team earnings
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Direct Income</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(Number(totalDirectIncome))}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Direct Referrals</p>
                <p className="text-2xl font-bold text-purple-600">{directTeamCount}</p>
                <p className="text-xs text-muted-foreground mt-1">Active team members</p>
              </div>
              <UserPlus className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg per Referral</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(averagePerReferral)}</p>
                <p className="text-xs text-muted-foreground mt-1">Income per member</p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Monthly Direct Income</span>
            </CardTitle>
            <CardDescription>Direct income trend by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(Number(value)), 'Income']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Bar dataKey="amount" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters & Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Time Period</label>
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
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setTimeFilter('ALL')}
                className="flex-1"
              >
                Clear Filter
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => refetch()}
                className="flex-1"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Quick Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Transactions:</span>
                  <span className="text-sm font-medium">{filteredTransactions.length}</span>
                </div>
                {chartData.length > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Best Month:</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(Math.max(...chartData.map(d => d.amount)))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg Monthly:</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(chartData.reduce((sum, d) => sum + d.amount, 0) / chartData.length)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions History */}
      <Card>
        <CardHeader>
          <CardTitle>Direct Income History</CardTitle>
          <CardDescription>
            Detailed list of all direct referral bonus transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <ArrowUpRight className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium">{formatCurrency(Number(transaction.amount))}</p>
                      <Badge className="bg-orange-100 text-orange-800">
                        Direct Bonus
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{transaction.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{formatDate(transaction.timestamp)}</p>
                </div>
              </div>
            ))}
            
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8">
                <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground">No direct income transactions found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {timeFilter !== 'ALL' 
                    ? 'Try adjusting your time filter to see more transactions' 
                    : 'Start referring people directly to earn direct bonuses'}
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Tip:</strong> Direct income is earned when someone you personally refer makes an investment or generates activity.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DirectIncome;