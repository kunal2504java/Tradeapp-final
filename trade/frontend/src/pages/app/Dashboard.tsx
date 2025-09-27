import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target,
  Copy,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  DollarSign,
  BarChart3,
  UserCheck,
  Loader2
} from 'lucide-react';
import { useDashboardData } from '@/hooks/use-api';
import { toast } from '@/hooks/use-toast';
import CryptoPrices from '@/components/CryptoPrices';

const Dashboard: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const { data, loading, error } = useDashboardData();
  

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
        <span className="ml-2 text-muted-foreground">Loading dashboard...</span>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500 mb-2">Error loading dashboard</div>
        <div className="text-muted-foreground">{error}</div>
      </div>
    );
  }

  // If no data, show empty state
  if (!data) {
    return (
      <div className="p-6 text-center">
        <div className="text-muted-foreground">No dashboard data available</div>
      </div>
    );
  }

  // Use real data from API
  const userStats = {
    name: data.user_name,
    referralCode: data.referral_code,
    email: data.user_email,
    totalBalance: Number(data.wallet_balance),
    dailyIncome: Number(data.daily_income),
    totalIncome: Number(data.total_income),
    totalWithdrawal: Number(data.total_withdrawal),
    investment: Number(data.total_investment),
    rightLegBusiness: Number(data.right_leg_business),
    leftLegBusiness: Number(data.left_leg_business),
    totalBusiness: Number(data.total_business),
    directTeam: data.direct_team,
    totalTeam: data.total_team
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 rounded-lg p-6 border border-yellow-500/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* User Info */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Welcome Back!</h2>
            <p className="text-2xl font-bold text-yellow-500">{userStats.name}</p>
          </div>
          
          {/* Referral Code */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Referral Code</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-yellow-500 border-yellow-500/50 px-3 py-1">
                {userStats.referralCode}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-yellow-500/10"
                onClick={() => copyToClipboard(userStats.referralCode)}
              >
                <Copy size={14} />
              </Button>
            </div>
          </div>
          
          {/* Email */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Email ID</p>
            <p className="font-medium">{userStats.email}</p>
          </div>
        </div>
      </div>

      {/* Balance Section */}
      <Card className="border-yellow-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Total Balance</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                <Wallet size={16} className="mr-2" />
                Wallet
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-yellow-500 mb-4">
            {showBalance ? `$${userStats.totalBalance.toLocaleString()}` : '****'}
          </div>
        </CardContent>
      </Card>

      {/* Income & Withdrawal Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Daily Income */}
        <Card className="border-green-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp size={16} className="text-green-500" />
              Daily Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              ${userStats.dailyIncome.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Total Income */}
        <Card className="border-blue-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign size={16} className="text-blue-500" />
              Total Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              ${userStats.totalIncome.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Total Withdrawal */}
        <Card className="border-red-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingDown size={16} className="text-red-500" />
              Total Withdrawal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500 mb-3">
              ${userStats.totalWithdrawal.toLocaleString()}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full hover:bg-red-500/10 hover:border-red-500/50"
            >
              <ArrowUp size={14} className="mr-2" />
              Withdraw
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Business Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investment & Business */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Business Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                <p className="text-sm text-muted-foreground mb-1">Investment</p>
                <p className="text-xl font-bold text-yellow-500">${userStats.investment.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
                <p className="text-sm text-muted-foreground mb-1">Total Business</p>
                <p className="text-xl font-bold text-blue-500">${userStats.totalBusiness.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-500/5 rounded-lg border border-green-500/10">
                <span className="text-sm font-medium">Right Leg Business</span>
                <span className="font-bold text-green-500">${userStats.rightLegBusiness.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-500/5 rounded-lg border border-purple-500/10">
                <span className="text-sm font-medium">Left Leg Business</span>
                <span className="font-bold text-purple-500">${userStats.leftLegBusiness.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users size={18} />
              Team Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-500/5 rounded-lg border border-green-500/10">
                <UserCheck size={24} className="mx-auto mb-2 text-green-500" />
                <p className="text-sm text-muted-foreground mb-1">Direct Team</p>
                <p className="text-2xl font-bold text-green-500">{userStats.directTeam}</p>
              </div>
              <div className="text-center p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
                <Target size={24} className="mx-auto mb-2 text-blue-500" />
                <p className="text-sm text-muted-foreground mb-1">Total Team</p>
                <p className="text-2xl font-bold text-blue-500">{userStats.totalTeam}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Crypto Markets */}
      <CryptoPrices />
    </div>
  );
};

export default Dashboard;