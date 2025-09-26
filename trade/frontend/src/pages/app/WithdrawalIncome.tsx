import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  DollarSign, 
  ArrowDownRight, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Copy,
  RefreshCw
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert';
import { toast } from 'sonner';

type WithdrawalStats = {
  available_balance: number;
  pending_amount: number;
  pending_count: number;
  total_withdrawn: number;
  total_withdrawal_count: number;
};

const WithdrawalIncome: React.FC = React.memo(() => {
  const [amount, setAmount] = useState<string>('');
  const [withdrawalAddress, setWithdrawalAddress] = useState<string>('');
  const [selectedBlockchain, setSelectedBlockchain] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  const { data: stats, isLoading: statsLoading, refetch } = useQuery<WithdrawalStats>({
    queryKey: ['withdrawal-stats'],
    queryFn: () => api<{ stats: WithdrawalStats }>('/api/withdrawal/stats').then(res => res.stats),
    staleTime: 30 * 1000, // 30 seconds
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });

  const withdrawMutation = useMutation({
    mutationFn: (data: { amount: number; withdrawal_address: string; blockchain: string }) =>
      api('/api/withdrawal/income', { method: 'POST', body: data }),
    onSuccess: (data) => {
      toast.success(data.message || 'Withdrawal request submitted successfully!');
      setAmount('');
      setWithdrawalAddress('');
      setSelectedBlockchain('');
      queryClient.invalidateQueries({ queryKey: ['withdrawal-stats'] });
      queryClient.invalidateQueries({ queryKey: ['withdrawal-history'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to submit withdrawal request');
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const withdrawAmount = parseFloat(amount);
    
    if (!withdrawAmount || withdrawAmount <= 0) {
      toast.error('Please enter a valid withdrawal amount');
      return;
    }

    if (withdrawAmount < 10) {
      toast.error('Minimum withdrawal amount is $10');
      return;
    }

    if (withdrawAmount % 10 !== 0) {
      toast.error('Amount must be in multiples of $10');
      return;
    }

    if (!stats || withdrawAmount > stats.available_balance) {
      toast.error('Insufficient balance for this withdrawal');
      return;
    }

    if (!withdrawalAddress.trim()) {
      toast.error('Please enter a withdrawal address');
      return;
    }

    if (!selectedBlockchain) {
      toast.error('Please select a blockchain network');
      return;
    }

    setIsSubmitting(true);
    withdrawMutation.mutate({
      amount: withdrawAmount,
      withdrawal_address: withdrawalAddress.trim(),
      blockchain: selectedBlockchain
    });
  };

  const handleMaxAmount = () => {
    if (stats && stats.available_balance > 0) {
      // Round down to nearest $10
      const maxAmount = Math.floor(stats.available_balance / 10) * 10;
      setAmount(maxAmount.toString());
    }
  };

  const copyAddress = async () => {
    if (withdrawalAddress) {
      try {
        await navigator.clipboard.writeText(withdrawalAddress);
        toast.success('Address copied to clipboard!');
      } catch (error) {
        toast.error('Failed to copy address');
      }
    }
  };

  const blockchainOptions = [
    { value: 'BTC', label: 'Bitcoin (BTC)', icon: '₿', color: 'text-orange-500' },
    { value: 'ETH', label: 'Ethereum (ETH)', icon: 'Ξ', color: 'text-blue-500' },
    { value: 'USDT', label: 'Tether (USDT)', icon: '₮', color: 'text-green-500' },
    { value: 'USDC', label: 'USD Coin (USDC)', icon: '$', color: 'text-blue-600' },
    { value: 'BNB', label: 'Binance Coin (BNB)', icon: 'B', color: 'text-yellow-600' },
  ];

  if (statsLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">Withdrawal Income</h1>
          <p className="text-muted-foreground mt-2">
            Withdraw your earned income to your crypto wallet
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">Withdrawal Income</h1>
          <p className="text-muted-foreground mt-2">
            Withdraw your earned income to your cryptocurrency wallet
          </p>
        </div>
        <Button variant="outline" onClick={() => refetch()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(stats?.available_balance || 0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Ready to withdraw</p>
              </div>
              <Wallet className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Withdrawals</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(stats?.pending_amount || 0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats?.pending_count || 0} requests
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Withdrawn</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(stats?.total_withdrawn || 0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats?.total_withdrawal_count || 0} completed
                </p>
              </div>
              <ArrowDownRight className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Withdraw Income</span>
            </CardTitle>
            <CardDescription>
              Submit a request to withdraw your earned income
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount">Withdrawal Amount (USD)</Label>
                <div className="flex space-x-2">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="10"
                    step="10"
                    disabled={isSubmitting}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleMaxAmount}
                    disabled={isSubmitting || !stats || stats.available_balance <= 0}
                  >
                    Max
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Minimum: $10 • Must be in multiples of $10
                </p>
              </div>

              {/* Blockchain Selection */}
              <div className="space-y-2">
                <Label>Blockchain Network</Label>
                <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blockchain" />
                  </SelectTrigger>
                  <SelectContent>
                    {blockchainOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center space-x-2">
                          <span className={option.color}>{option.icon}</span>
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Withdrawal Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Withdrawal Address</Label>
                <div className="flex space-x-2">
                  <Input
                    id="address"
                    placeholder="Enter your crypto wallet address"
                    value={withdrawalAddress}
                    onChange={(e) => setWithdrawalAddress(e.target.value)}
                    disabled={isSubmitting}
                    className="font-mono text-sm"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={copyAddress}
                    disabled={!withdrawalAddress || isSubmitting}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Make sure this address supports the selected blockchain network
                </p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting || !stats || stats.available_balance <= 0}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="mr-2 h-4 w-4" />
                    Submit Withdrawal Request
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Information Panel */}
        <div className="space-y-6">
          {/* Processing Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Processing Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium">Processing Time</p>
                  <p className="text-sm text-muted-foreground">24-48 hours for income withdrawals</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <DollarSign className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Minimum Amount</p>
                  <p className="text-sm text-muted-foreground">$10 minimum, multiples of $10 only</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Wallet className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <p className="font-medium">Supported Networks</p>
                  <p className="text-sm text-muted-foreground">BTC, ETH, USDT, USDC, BNB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notices */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Ensure your withdrawal address is correct and supports the selected blockchain. 
              Transactions cannot be reversed once processed.
            </AlertDescription>
          </Alert>

          {/* Low Balance Warning */}
          {stats && stats.available_balance < 10 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Insufficient Balance:</strong> You need at least $10 to make a withdrawal. 
                Continue earning income to increase your balance.
              </AlertDescription>
            </Alert>
          )}

          {/* Recent Activity Summary */}
          {stats && (stats.pending_count > 0 || stats.total_withdrawal_count > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Withdrawal Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending:</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{stats.pending_count}</Badge>
                    <span className="font-medium">{formatCurrency(stats.pending_amount)}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed:</span>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">{stats.total_withdrawal_count}</Badge>
                    <span className="font-medium">{formatCurrency(stats.total_withdrawn)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
});

export default WithdrawalIncome;
