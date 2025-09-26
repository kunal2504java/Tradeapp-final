import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Wallet, TrendingUp, RefreshCw } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

interface DepositTransaction {
  id: string;
  amount: number;
  blockchain: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  description?: string;
  timestamp: string;
  txHash?: string;
}

const DepositHistory: React.FC = () => {
  const [deposits, setDeposits] = useState<DepositTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const { token } = useAuth();

  const fetchDepositHistory = async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/user/deposit-history', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDeposits(data.deposits || []);
      } else {
        console.error('Failed to fetch deposit history');
        toast.error('Failed to load deposit history');
      }
    } catch (error) {
      console.error('Error fetching deposit history:', error);
      toast.error('Error loading deposit history');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepositHistory();
  }, [token]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'FAILED':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getBlockchainColor = (blockchain: string) => {
    const colors: { [key: string]: string } = {
      BTC: 'bg-orange-100 text-orange-800',
      ETH: 'bg-blue-100 text-blue-800',
      USDT: 'bg-green-100 text-green-800',
      USDC: 'bg-blue-100 text-blue-600',
      BNB: 'bg-yellow-100 text-yellow-800',
      ADA: 'bg-blue-100 text-blue-700',
      SOL: 'bg-purple-100 text-purple-800',
      MATIC: 'bg-purple-100 text-purple-600',
    };
    return colors[blockchain] || 'bg-gray-100 text-gray-800';
  };

  const filteredDeposits = deposits.filter(deposit => 
    filterStatus === 'ALL' || deposit.status === filterStatus
  );

  const totalDeposits = deposits.reduce((sum, deposit) => 
    deposit.status === 'COMPLETED' ? sum + deposit.amount : sum, 0
  );

  const pendingDeposits = deposits.filter(d => d.status === 'PENDING').length;
  const completedDeposits = deposits.filter(d => d.status === 'COMPLETED').length;

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">Deposit History</h1>
          <p className="text-muted-foreground mt-2">
            Track all your cryptocurrency deposits and their status
          </p>
        </div>
        <Button 
          onClick={fetchDepositHistory} 
          disabled={isLoading}
          variant="outline"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Deposits</p>
                <p className="text-2xl font-bold text-green-600">{formatAmount(totalDeposits)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-blue-600">{completedDeposits}</p>
              </div>
              <Wallet className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingDeposits}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                View and filter your deposit transactions
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Filter by status:</span>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
              <span className="ml-2">Loading deposit history...</span>
            </div>
          ) : filteredDeposits.length === 0 ? (
            <div className="text-center py-8">
              <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">No deposits found</p>
              <p className="text-sm text-muted-foreground mt-1">
                {filterStatus === 'ALL' 
                  ? "You haven't made any deposits yet." 
                  : `No ${filterStatus.toLowerCase()} deposits found.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDeposits.map((deposit) => (
                <div
                  key={deposit.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-yellow-600" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium">{formatAmount(deposit.amount)}</p>
                        <Badge className={getBlockchainColor(deposit.blockchain)}>
                          {deposit.blockchain}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {deposit.description || 'Cryptocurrency deposit'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(deposit.timestamp)}
                      </p>
                      {deposit.txHash && (
                        <p className="text-xs text-blue-600 mt-1 font-mono">
                          TX: {deposit.txHash.substring(0, 20)}...
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Badge className={getStatusColor(deposit.status)}>
                      {deposit.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DepositHistory;