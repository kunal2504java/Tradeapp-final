import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Copy, QrCode, Wallet, ArrowUpDown, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type Transaction = { 
  id: string; 
  amount: number; 
  type: 'credit'|'debit'; 
  income_source: string; 
  description: string; 
  timestamp: string;
  status: 'PENDING' | 'COMPLETED' | 'REJECTED';
};

type WalletAddress = {
  blockchain: string;
  address: string;
  created_at: string;
};

type Blockchain = {
  name: string;
  symbol: string;
  icon: string;
  minDeposit: number;
  minWithdraw: number;
};

export default function WalletPage() {
  const qc = useQueryClient();
  const { toast } = useToast();
  
  // Data fetching
  const { data: balanceData } = useQuery({ 
    queryKey: ['wallet','balance'], 
    queryFn: () => api<{ balance: number }>(`/api/wallet/balance`) 
  });
  
  const { data: txData } = useQuery({ 
    queryKey: ['wallet','tx'], 
    queryFn: () => api<{ items: Transaction[] }>(`/api/wallet/transactions`) 
  });
  
  const { data: addressesData } = useQuery({ 
    queryKey: ['wallet','addresses'], 
    queryFn: () => api<{ addresses: WalletAddress[] }>(`/api/wallet/addresses`) 
  });
  
  const { data: blockchainsData } = useQuery({ 
    queryKey: ['wallet','blockchains'], 
    queryFn: () => api<{ blockchains: Blockchain[] }>(`/api/wallet/blockchains`) 
  });

  // State for dialogs
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [selectedBlockchain, setSelectedBlockchain] = useState<string>('');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

  // Validation functions
  const validateAmount = (amount: string, minAmount: number) => {
    const num = Number(amount);
    if (isNaN(num) || num < minAmount) {
      return `Minimum amount is $${minAmount}`;
    }
    if (num % 10 !== 0) {
      return 'Please enter in multiples of $10';
    }
    return null;
  };

  const depositError = depositAmount ? validateAmount(depositAmount, 100) : null;
  const withdrawError = withdrawAmount ? validateAmount(withdrawAmount, 10) : null;

  // Mutations
  const depositMutation = useMutation({
    mutationFn: () => api(`/api/wallet/deposit-request`, { 
      method: 'POST', 
      body: { 
        amount: Number(depositAmount),
        blockchain: selectedBlockchain,
        transaction_hash: transactionHash || undefined
      } 
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['wallet'] });
      setDepositOpen(false);
      setDepositAmount('');
      setTransactionHash('');
      toast({
        title: 'Deposit Request Submitted',
        description: 'Your deposit request has been submitted for review.',
      });
    },
    onError: (err: any) => {
      toast({
        title: 'Deposit Failed',
        description: err?.message || 'Failed to submit deposit request',
        variant: 'destructive',
      });
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: () => api(`/api/wallet/withdraw`, { 
      method: 'POST', 
      body: { amount: Number(withdrawAmount) } 
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['wallet'] });
      setWithdrawOpen(false);
      setWithdrawAmount('');
      toast({
        title: 'Withdrawal Request Submitted',
        description: 'Your withdrawal request has been submitted.',
      });
    },
    onError: (err: any) => {
      toast({
        title: 'Withdrawal Failed',
        description: err?.message || 'Failed to submit withdrawal request',
        variant: 'destructive',
      });
    },
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Address copied to clipboard',
    });
  };

  const generateQRCode = (address: string) => {
    // In a real app, you'd use a QR code library like qrcode
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(address)}`;
  };

  const selectedAddress = addressesData?.addresses?.find(addr => addr.blockchain === selectedBlockchain);

  return (
    <div className="space-y-6">
      {/* Wallet Balance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Wallet Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-primary">
              ${Number(balanceData?.balance ?? 0).toFixed(2)}
            </div>
            <div className="flex gap-2">
              <Dialog open={depositOpen} onOpenChange={setDepositOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Deposit
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Request Deposit</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Select Blockchain</label>
                      <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose blockchain" />
                        </SelectTrigger>
                        <SelectContent>
                          {blockchainsData?.blockchains?.map((blockchain) => (
                            <SelectItem key={blockchain.symbol} value={blockchain.symbol}>
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{blockchain.icon}</span>
                                <span>{blockchain.name} ({blockchain.symbol})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedBlockchain && selectedAddress && (
                      <div className="space-y-3 p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Deposit Address:</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(selectedAddress.address)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-xs font-mono bg-background p-2 rounded border break-all">
                          {selectedAddress.address}
                        </div>
                        <div className="flex justify-center">
                          <img 
                            src={generateQRCode(selectedAddress.address)} 
                            alt="QR Code" 
                            className="w-32 h-32 border rounded"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium">Amount ($)</label>
                      <Input
                        placeholder="Enter amount"
                        value={depositAmount}
                        type="number"
                        onChange={(e) => setDepositAmount(e.target.value)}
                      />
                      {depositError && (
                        <div className="text-sm text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {depositError}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground mt-1">
                        Minimum: $100, Must be in multiples of $10
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Transaction Hash (Optional)</label>
                      <Input
                        placeholder="Enter transaction hash"
                        value={transactionHash}
                        onChange={(e) => setTransactionHash(e.target.value)}
                      />
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => depositMutation.mutate()}
                      disabled={depositMutation.isPending || !depositAmount || !selectedBlockchain || !!depositError}
                    >
                      {depositMutation.isPending ? 'Submitting...' : 'Submit Deposit Request'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Withdrawal</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Amount ($)</label>
                      <Input
                        placeholder="Enter amount"
                        value={withdrawAmount}
                        type="number"
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                      {withdrawError && (
                        <div className="text-sm text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {withdrawError}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground mt-1">
                        Minimum: $10, Must be in multiples of $10
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => withdrawMutation.mutate()}
                      disabled={withdrawMutation.isPending || !withdrawAmount || !!withdrawError}
                    >
                      {withdrawMutation.isPending ? 'Submitting...' : 'Submit Withdrawal Request'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your deposit and withdrawal history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {txData?.items?.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {tx.type === 'credit' ? '+' : '-'}
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {tx.description || tx.income_source}
                      {tx.status === 'PENDING' && <Badge variant="secondary">Pending</Badge>}
                      {tx.status === 'COMPLETED' && <Badge variant="default" className="bg-green-600">Completed</Badge>}
                      {tx.status === 'REJECTED' && <Badge variant="destructive">Rejected</Badge>}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(tx.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className={`font-semibold ${
                  tx.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {tx.type === 'credit' ? '+' : '-'}${Number(tx.amount).toFixed(2)}
                </div>
              </div>
            ))}
            {!txData?.items?.length && (
              <div className="text-center py-8 text-muted-foreground">
                <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No transactions yet</p>
                <p className="text-sm">Your deposit and withdrawal history will appear here</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
