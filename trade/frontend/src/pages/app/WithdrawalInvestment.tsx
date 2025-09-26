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
  PiggyBank, 
  Lock, 
  Unlock, 
  ArrowDownRight, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  TrendingUp,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

type Investment = {
  id: string;
  amount: number;
  package_name: string;
  start_date: string;
  unlock_date: string;
  status: string;
  monthly_profit_rate: number;
  withdrawal_eligible: boolean;
  eligible_date: string;
  days_until_eligible: number;
  lock_period_months: number;
};

const WithdrawalInvestment: React.FC = React.memo(() => {
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [withdrawalAddress, setWithdrawalAddress] = useState<string>('');
  const [selectedBlockchain, setSelectedBlockchain] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  const { data: investments, isLoading, refetch } = useQuery<Investment[]>({
    queryKey: ['withdrawal-investments'],
    queryFn: () => api<{ investments: Investment[] }>('/api/withdrawal/investments').then(res => res.investments),
    staleTime: 60 * 1000, // 60 seconds
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });

  const withdrawMutation = useMutation({
    mutationFn: (data: { investment_id: string; withdrawal_address: string; blockchain: string }) =>
      api('/api/withdrawal/investment', { method: 'POST', body: data }),
    onSuccess: (data) => {
      toast.success(data.message || 'Investment withdrawal request submitted successfully!');
      setIsDialogOpen(false);
      setSelectedInvestment(null);
      setWithdrawalAddress('');
      setSelectedBlockchain('');
      queryClient.invalidateQueries({ queryKey: ['withdrawal-investments'] });
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleWithdrawClick = (investment: Investment) => {
    if (!investment.withdrawal_eligible) {
      toast.error(`Investment locked until ${formatDate(investment.eligible_date)}`);
      return;
    }
    setSelectedInvestment(investment);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedInvestment) {
      toast.error('No investment selected');
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
      investment_id: selectedInvestment.id,
      withdrawal_address: withdrawalAddress.trim(),
      blockchain: selectedBlockchain
    });
  };

  const getLockProgress = (investment: Investment) => {
    if (investment.withdrawal_eligible) return 100;
    const totalDays = investment.lock_period_months * 30; // Approximate
    const daysPassed = totalDays - investment.days_until_eligible;
    return (daysPassed / totalDays) * 100;
  };

  const blockchainOptions = [
    { value: 'BTC', label: 'Bitcoin (BTC)', icon: '₿', color: 'text-orange-500' },
    { value: 'ETH', label: 'Ethereum (ETH)', icon: 'Ξ', color: 'text-blue-500' },
    { value: 'USDT', label: 'Tether (USDT)', icon: '₮', color: 'text-green-500' },
    { value: 'USDC', label: 'USD Coin (USDC)', icon: '$', color: 'text-blue-600' },
    { value: 'BNB', label: 'Binance Coin (BNB)', icon: 'B', color: 'text-yellow-600' },
  ];

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">Withdrawal Investment</h1>
          <p className="text-muted-foreground mt-2">
            Withdraw your investment principal after lock period
          </p>
        </div>
        
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const eligibleInvestments = investments?.filter(inv => inv.withdrawal_eligible) || [];
  const lockedInvestments = investments?.filter(inv => !inv.withdrawal_eligible && inv.status === 'active') || [];
  const withdrawingInvestments = investments?.filter(inv => inv.status === 'withdrawing') || [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">Withdrawal Investment</h1>
          <p className="text-muted-foreground mt-2">
            Withdraw your investment principal after the 6-month lock period
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
                <p className="text-sm font-medium text-muted-foreground">Eligible to Withdraw</p>
                <p className="text-2xl font-bold text-green-600">{eligibleInvestments.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(eligibleInvestments.reduce((sum, inv) => sum + inv.amount, 0))}
                </p>
              </div>
              <Unlock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Still Locked</p>
                <p className="text-2xl font-bold text-orange-600">{lockedInvestments.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(lockedInvestments.reduce((sum, inv) => sum + inv.amount, 0))}
                </p>
              </div>
              <Lock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold text-purple-600">{withdrawingInvestments.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(withdrawingInvestments.reduce((sum, inv) => sum + inv.amount, 0))}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Investments</p>
                <p className="text-2xl font-bold text-blue-600">{investments?.length || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(investments?.reduce((sum, inv) => sum + inv.amount, 0) || 0)}
                </p>
              </div>
              <PiggyBank className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Information */}
      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription>
          <strong>6-Month Lock Period:</strong> Investments are locked for 6 months from the investment date. 
          You can withdraw the principal amount after this period, but you'll lose future profit earnings.
        </AlertDescription>
      </Alert>

      {/* Eligible for Withdrawal */}
      {eligibleInvestments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Unlock className="h-5 w-5 text-green-500" />
              <span>Ready for Withdrawal</span>
            </CardTitle>
            <CardDescription>
              These investments have completed the 6-month lock period and can be withdrawn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eligibleInvestments.map((investment) => (
                <div key={investment.id} className="border rounded-lg p-4 bg-green-50 border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{investment.package_name}</h3>
                        <Badge className="bg-green-100 text-green-800">Unlocked</Badge>
                        <Badge variant="outline">{investment.monthly_profit_rate}% monthly</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Investment Amount</p>
                          <p className="font-semibold">{formatCurrency(investment.amount)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Start Date</p>
                          <p className="font-semibold">{formatDate(investment.start_date)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Unlock Date</p>
                          <p className="font-semibold">{formatDate(investment.eligible_date)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <p className="font-semibold text-green-600">Available</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleWithdrawClick(investment)}
                      className="ml-4"
                      disabled={investment.status === 'withdrawing'}
                    >
                      <ArrowDownRight className="mr-2 h-4 w-4" />
                      Withdraw
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Locked Investments */}
      {lockedInvestments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-orange-500" />
              <span>Locked Investments</span>
            </CardTitle>
            <CardDescription>
              These investments are still in their 6-month lock period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lockedInvestments.map((investment) => (
                <div key={investment.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-lg">{investment.package_name}</h3>
                      <Badge variant="secondary">Locked</Badge>
                      <Badge variant="outline">{investment.monthly_profit_rate}% monthly</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Unlocks in</p>
                      <p className="font-semibold text-orange-600">{investment.days_until_eligible} days</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Investment Amount</p>
                      <p className="font-semibold">{formatCurrency(investment.amount)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p className="font-semibold">{formatDate(investment.start_date)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Unlock Date</p>
                      <p className="font-semibold">{formatDate(investment.eligible_date)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Lock Period</p>
                      <p className="font-semibold">{investment.lock_period_months} months</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Lock Progress</span>
                      <span>{Math.round(getLockProgress(investment))}%</span>
                    </div>
                    <Progress value={getLockProgress(investment)} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Withdrawals */}
      {withdrawingInvestments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-500" />
              <span>Processing Withdrawals</span>
            </CardTitle>
            <CardDescription>
              These withdrawal requests are being processed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {withdrawingInvestments.map((investment) => (
                <div key={investment.id} className="border rounded-lg p-4 bg-purple-50 border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{investment.package_name}</h3>
                        <Badge className="bg-purple-100 text-purple-800">Processing</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Amount</p>
                          <p className="font-semibold">{formatCurrency(investment.amount)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Processing Time</p>
                          <p className="font-semibold">3-5 business days</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-purple-600">
                      <Clock className="h-5 w-5" />
                      <span className="font-medium">In Progress</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Investments */}
      {(!investments || investments.length === 0) && (
        <Card>
          <CardContent className="p-12 text-center">
            <PiggyBank className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Investments Found</h3>
            <p className="text-muted-foreground">
              You don't have any investments yet. Make an investment to start earning and withdraw later.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Withdrawal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Withdraw Investment</DialogTitle>
            <DialogDescription>
              {selectedInvestment && (
                <>
                  Withdraw {formatCurrency(selectedInvestment.amount)} from {selectedInvestment.package_name}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedInvestment && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Investment Details */}
              <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package:</span>
                  <span className="font-medium">{selectedInvestment.package_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-bold text-lg">{formatCurrency(selectedInvestment.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Investment Date:</span>
                  <span className="font-medium">{formatDate(selectedInvestment.start_date)}</span>
                </div>
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
                <Input
                  id="address"
                  placeholder="Enter your crypto wallet address"
                  value={withdrawalAddress}
                  onChange={(e) => setWithdrawalAddress(e.target.value)}
                  disabled={isSubmitting}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Ensure this address supports the selected blockchain
                </p>
              </div>

              {/* Warning */}
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Warning:</strong> Withdrawing your investment will stop all future profit earnings from this package.
                </AlertDescription>
              </Alert>

              {/* Submit Buttons */}
              <div className="flex space-x-2 justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting || !withdrawalAddress || !selectedBlockchain}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="mr-2 h-4 w-4" />
                      Confirm Withdrawal
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default WithdrawalInvestment;
