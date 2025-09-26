import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { 
  History, 
  ArrowDownRight, 
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  RefreshCw,
  Wallet,
  PiggyBank
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Withdrawal = {
  id: string;
  amount: number;
  type: 'income' | 'investment';
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REJECTED';
  blockchain: string;
  address: string | null;
  investmentId: string | null;
  packageName: string | null;
  description: string;
  timestamp: string;
};

type WithdrawalHistoryResponse = {
  withdrawals: Withdrawal[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
};

const WithdrawalHistory: React.FC = React.memo(() => {
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const { data, isLoading, refetch } = useQuery<WithdrawalHistoryResponse>({
    queryKey: ['withdrawal-history', typeFilter, statusFilter],
    queryFn: () => {
      const params = new URLSearchParams();
      if (typeFilter !== 'ALL') params.append('type', typeFilter);
      if (statusFilter !== 'ALL') params.append('status', statusFilter);
      
      return api<WithdrawalHistoryResponse>(`/api/withdrawal/history?${params.toString()}`);
    },
    staleTime: 30 * 1000, // 30 seconds
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    keepPreviousData: true
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'FAILED':
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'FAILED':
      case 'REJECTED':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'investment' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-blue-100 text-blue-800';
  };

  const getTypeIcon = (type: string) => {
    return type === 'investment' 
      ? <PiggyBank className="h-4 w-4" />
      : <Wallet className="h-4 w-4" />;
  };

  const getBlockchainColor = (blockchain: string) => {
    const colors: { [key: string]: string } = {
      BTC: 'bg-orange-100 text-orange-800',
      ETH: 'bg-blue-100 text-blue-800',
      USDT: 'bg-green-100 text-green-800',
      USDC: 'bg-blue-100 text-blue-600',
      BNB: 'bg-yellow-100 text-yellow-800',
    };
    return colors[blockchain] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">Withdrawal History</h1>
          <p className="text-muted-foreground mt-2">
            Track all your withdrawal requests and their status
          </p>
        </div>
        
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const withdrawals = data?.withdrawals || [];
  const totalWithdrawals = withdrawals.length;
  const completedWithdrawals = withdrawals.filter(w => w.status === 'COMPLETED');
  const pendingWithdrawals = withdrawals.filter(w => w.status === 'PENDING');
  const failedWithdrawals = withdrawals.filter(w => ['FAILED', 'REJECTED'].includes(w.status));

  const totalCompleted = completedWithdrawals.reduce((sum, w) => sum + w.amount, 0);
  const totalPending = pendingWithdrawals.reduce((sum, w) => sum + w.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">Withdrawal History</h1>
          <p className="text-muted-foreground mt-2">
            Complete history of all your withdrawal requests and their status
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
                <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold text-blue-600">{totalWithdrawals}</p>
                <p className="text-xs text-muted-foreground mt-1">All withdrawals</p>
              </div>
              <History className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedWithdrawals.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(totalCompleted)}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingWithdrawals.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(totalPending)}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failed/Rejected</p>
                <p className="text-2xl font-bold text-red-600">{failedWithdrawals.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Issues resolved</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter Withdrawals</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="income">Income Withdrawals</SelectItem>
                  <SelectItem value="investment">Investment Withdrawals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setTypeFilter('ALL');
                  setStatusFilter('ALL');
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawal List */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Detailed list of all withdrawal transactions
            {(typeFilter !== 'ALL' || statusFilter !== 'ALL') && 
              ` (filtered by ${typeFilter !== 'ALL' ? typeFilter : ''}${typeFilter !== 'ALL' && statusFilter !== 'ALL' ? ' and ' : ''}${statusFilter !== 'ALL' ? statusFilter.toLowerCase() : ''})`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {withdrawals.length === 0 ? (
            <div className="text-center py-12">
              <ArrowDownRight className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                {(typeFilter !== 'ALL' || statusFilter !== 'ALL') 
                  ? 'No withdrawals match your filters' 
                  : 'No withdrawals found'
                }
              </h3>
              <p className="text-muted-foreground">
                {(typeFilter !== 'ALL' || statusFilter !== 'ALL') 
                  ? 'Try adjusting your filter criteria to see more transactions'
                  : "You haven't made any withdrawal requests yet"
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {withdrawals.map((withdrawal) => (
                <div key={withdrawal.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {getTypeIcon(withdrawal.type)}
                        </div>
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <p className="font-semibold text-lg">{formatCurrency(withdrawal.amount)}</p>
                          <Badge className={getTypeColor(withdrawal.type)}>
                            {withdrawal.type === 'investment' ? 'Investment' : 'Income'}
                          </Badge>
                          <Badge className={getStatusColor(withdrawal.status)}>
                            {getStatusIcon(withdrawal.status)}
                            <span className="ml-1">{withdrawal.status}</span>
                          </Badge>
                        </div>
                        
                        {/* Description */}
                        <p className="text-sm text-muted-foreground mb-3 break-words">
                          {withdrawal.description}
                        </p>
                        
                        {/* Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                          <div>
                            <p className="text-muted-foreground">Blockchain</p>
                            <Badge className={getBlockchainColor(withdrawal.blockchain)} size="sm">
                              {withdrawal.blockchain}
                            </Badge>
                          </div>
                          
                          {withdrawal.address && (
                            <div>
                              <p className="text-muted-foreground">Address</p>
                              <p className="font-mono text-xs">{withdrawal.address}</p>
                            </div>
                          )}
                          
                          {withdrawal.packageName && (
                            <div>
                              <p className="text-muted-foreground">Package</p>
                              <p className="font-medium">{withdrawal.packageName}</p>
                            </div>
                          )}
                          
                          <div>
                            <p className="text-muted-foreground">Date</p>
                            <p className="font-medium">{formatDate(withdrawal.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status-specific information */}
                  {withdrawal.status === 'PENDING' && (
                    <div className="mt-3 p-2 bg-yellow-50 rounded border border-yellow-200">
                      <p className="text-sm text-yellow-800">
                        ⏳ Processing your withdrawal request. 
                        {withdrawal.type === 'investment' 
                          ? ' Investment withdrawals take 3-5 business days.'
                          : ' Income withdrawals take 24-48 hours.'
                        }
                      </p>
                    </div>
                  )}
                  
                  {withdrawal.status === 'COMPLETED' && (
                    <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
                      <p className="text-sm text-green-800">
                        ✅ Withdrawal completed successfully. Check your crypto wallet.
                      </p>
                    </div>
                  )}
                  
                  {['FAILED', 'REJECTED'].includes(withdrawal.status) && (
                    <div className="mt-3 p-2 bg-red-50 rounded border border-red-200">
                      <p className="text-sm text-red-800">
                        ❌ Withdrawal {withdrawal.status.toLowerCase()}. Please contact support if you need assistance.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
});

export default WithdrawalHistory;
