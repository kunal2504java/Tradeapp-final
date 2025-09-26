import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  PieChart,
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

type DashboardData = {
  daily_income: number;
  total_income: number;
  total_withdrawal: number;
  wallet_balance: number;
  income_breakdown: Array<{
    source: string;
    amount: number;
  }>;
  recent_transactions: Array<{
    id: string;
    amount: number;
    type: string;
    income_source: string;
    description: string;
    timestamp: string;
  }>;
};

type ProfitHistory = Array<{
  month: string;
  profit: number;
}>;

type IncomeBreakdown = Array<{
  source: string;
  amount: number;
}>;

const MyIncome: React.FC = () => {
  const { data: dashboardData, isLoading: dashboardLoading } = useQuery<DashboardData>({ 
    queryKey: ['dashboard'], 
    queryFn: () => api<DashboardData>('/api/user/dashboard') 
  });

  const { data: profitHistory, isLoading: historyLoading } = useQuery<ProfitHistory>({ 
    queryKey: ['profit-history'], 
    queryFn: () => api<ProfitHistory>('/api/user/profit-history') 
  });

  const { data: incomeBreakdown, isLoading: breakdownLoading } = useQuery<IncomeBreakdown>({ 
    queryKey: ['income-breakdown'], 
    queryFn: () => api<IncomeBreakdown>('/api/user/income-breakdown') 
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

  const getIncomeSourceColor = (source: string) => {
    const colors: { [key: string]: string } = {
      trading_bonus: '#3b82f6',
      referral_income: '#10b981',
      direct_income: '#f59e0b',
      salary_income: '#8b5cf6',
      binary_bonus: '#ef4444',
      level_income: '#06b6d4',
      matching_bonus: '#84cc16',
    };
    return colors[source] || '#6b7280';
  };

  const getIncomeSourceName = (source: string) => {
    const names: { [key: string]: string } = {
      trading_bonus: 'Trading Bonus',
      referral_income: 'Referral Income',
      direct_income: 'Direct Income',
      salary_income: 'Salary Income',
      binary_bonus: 'Binary Bonus',
      level_income: 'Level Income',
      matching_bonus: 'Matching Bonus',
    };
    return names[source] || source;
  };

  const chartData = profitHistory?.map(item => ({
    month: new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
    profit: item.profit
  })) || [];

  const pieData = incomeBreakdown?.map(item => ({
    name: getIncomeSourceName(item.source),
    value: Number(item.amount),
    color: getIncomeSourceColor(item.source)
  })) || [];

  const availableBalance = Number(dashboardData?.wallet_balance || 0);
  const totalIncome = Number(dashboardData?.total_income || 0);
  const totalWithdrawal = Number(dashboardData?.total_withdrawal || 0);
  const dailyIncome = Number(dashboardData?.daily_income || 0);
  const netIncome = totalIncome - totalWithdrawal;

  if (dashboardLoading || historyLoading || breakdownLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">My Income</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive overview of your earnings and income sources
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-yellow-500">My Income</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive overview of your earnings and income sources
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Income</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(dailyIncome)}</p>
                <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalIncome)}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Net Income</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(netIncome)}</p>
                <p className="text-xs text-muted-foreground mt-1">Income - Withdrawals</p>
              </div>
              <PieChart className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold text-yellow-600">{formatCurrency(availableBalance)}</p>
                <p className="text-xs text-muted-foreground mt-1">Ready to withdraw</p>
              </div>
              <Wallet className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income History Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Income History</span>
            </CardTitle>
            <CardDescription>Monthly income trend over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(Number(value)), 'Income']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Income Sources Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Income Sources</span>
            </CardTitle>
            <CardDescription>Breakdown by income type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Income Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Income Breakdown</CardTitle>
          <CardDescription>Detailed breakdown of income by source</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {incomeBreakdown?.map((item) => (
              <div key={item.source} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: getIncomeSourceColor(item.source) }}
                  />
                  <div>
                    <p className="font-medium">{getIncomeSourceName(item.source)}</p>
                    <p className="text-sm text-muted-foreground">
                      {((Number(item.amount) / totalIncome) * 100).toFixed(1)}% of total income
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(Number(item.amount))}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest income transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData?.recent_transactions
              ?.filter(transaction => transaction.type === 'credit')
              ?.slice(0, 10)
              ?.map((transaction) => (
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
                      <Badge style={{ backgroundColor: getIncomeSourceColor(transaction.income_source) }}>
                        {getIncomeSourceName(transaction.income_source)}
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
            
            {(!dashboardData?.recent_transactions || 
              dashboardData.recent_transactions.filter(t => t.type === 'credit').length === 0) && (
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground">No income transactions yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Start earning by making investments and referring others
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyIncome;