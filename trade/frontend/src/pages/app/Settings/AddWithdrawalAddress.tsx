import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Wallet, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  DollarSign, 
  Lock, 
  Unlock,
  AlertTriangle,
  Info,
  Copy,
  Check,
  Bitcoin,
  Zap
} from 'lucide-react';

type WithdrawalAddress = {
  id: string;
  address: string;
  label: string;
  isSelected: boolean;
  createdAt: string;
};

type WithdrawalAddresses = Record<string, WithdrawalAddress[]>;

type WalletBalance = {
  total: number;
  withdrawable: number;
  locked: number;
  withdrawalFee: number;
  minWithdrawal: number;
  netWithdrawable: number;
};

const SUPPORTED_BLOCKCHAINS = [
  { value: 'BTC', label: 'Bitcoin (BTC)', icon: Bitcoin },
  { value: 'ETH', label: 'Ethereum (ETH)', icon: Zap },
  { value: 'USDT', label: 'Tether (USDT)', icon: DollarSign },
  { value: 'USDC', label: 'USD Coin (USDC)', icon: DollarSign },
  { value: 'BNB', label: 'BNB Chain', icon: Zap },
  { value: 'ADA', label: 'Cardano (ADA)', icon: Zap },
  { value: 'SOL', label: 'Solana (SOL)', icon: Zap },
  { value: 'MATIC', label: 'Polygon (MATIC)', icon: Zap }
];

export default function AddWithdrawalAddress() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Form state
  const [newAddress, setNewAddress] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [selectedBlockchain, setSelectedBlockchain] = useState('');
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  // Query to get withdrawal addresses
  const { data: addressesData, isLoading: addressesLoading } = useQuery({
    queryKey: ['withdrawal-addresses'],
    queryFn: () => api<{ success: boolean; addresses: WithdrawalAddresses }>('/api/user/withdrawal-addresses'),
    retry: 1
  });

  // Query to get wallet balance
  const { data: balanceData, isLoading: balanceLoading } = useQuery({
    queryKey: ['wallet-balance'],
    queryFn: () => api<{ success: boolean; balance: WalletBalance }>('/api/user/wallet-balance'),
    retry: 1
  });

  // Add address mutation
  const addAddressMutation = useMutation({
    mutationFn: (data: { blockchain: string; address: string; label?: string }) =>
      api('/api/user/withdrawal-addresses', {
        method: 'POST',
        body: data
      }),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Withdrawal address added successfully",
        variant: "default"
      });
      
      // Clear form
      setNewAddress('');
      setNewLabel('');
      setSelectedBlockchain('');
      
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['withdrawal-addresses'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || 'Failed to add withdrawal address',
        variant: "destructive"
      });
    }
  });

  // Select address mutation
  const selectAddressMutation = useMutation({
    mutationFn: (addressId: string) =>
      api(`/api/user/withdrawal-addresses/${addressId}/select`, {
        method: 'PUT'
      }),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Withdrawal address selected successfully",
        variant: "default"
      });
      
      queryClient.invalidateQueries({ queryKey: ['withdrawal-addresses'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || 'Failed to select withdrawal address',
        variant: "destructive"
      });
    }
  });

  // Delete address mutation
  const deleteAddressMutation = useMutation({
    mutationFn: (addressId: string) =>
      api(`/api/user/withdrawal-addresses/${addressId}`, {
        method: 'DELETE'
      }),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Withdrawal address deleted successfully",
        variant: "default"
      });
      
      queryClient.invalidateQueries({ queryKey: ['withdrawal-addresses'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || 'Failed to delete withdrawal address',
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBlockchain || !newAddress) {
      toast({
        title: "Error",
        description: "Please select a blockchain and enter an address",
        variant: "destructive"
      });
      return;
    }

    addAddressMutation.mutate({
      blockchain: selectedBlockchain,
      address: newAddress.trim(),
      label: newLabel.trim() || undefined
    });
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
    
    toast({
      title: "Copied",
      description: "Address copied to clipboard",
      variant: "default"
    });
  };

  const formatAddress = (address: string) => {
    if (address.length <= 16) return address;
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  const getBlockchainIcon = (blockchain: string) => {
    const blockchainInfo = SUPPORTED_BLOCKCHAINS.find(b => b.value === blockchain);
    const IconComponent = blockchainInfo?.icon || Wallet;
    return <IconComponent size={16} />;
  };

  if (addressesLoading || balanceLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const addresses = addressesData?.addresses || {};
  const balance = balanceData?.balance;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-yellow-500 flex items-center gap-2">
          <Wallet size={24} />
          Add Withdrawal Address
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your cryptocurrency withdrawal addresses
        </p>
      </div>

      {/* Balance Information Card */}
      {balance && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign size={20} />
              Wallet Balance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Balance</p>
                <p className="text-xl font-bold text-green-500">${balance.total.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Unlock size={12} />
                  Withdrawable
                </p>
                <p className="text-xl font-bold text-blue-500">${balance.withdrawable.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Lock size={12} />
                  Locked
                </p>
                <p className="text-xl font-bold text-orange-500">${balance.locked.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Net Withdrawable</p>
                <p className="text-xl font-bold text-purple-500">${balance.netWithdrawable.toFixed(2)}</p>
              </div>
            </div>
            
            <Alert className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Withdrawal Fee: ${balance.withdrawalFee.toFixed(2)} per transaction</strong>
                <br />
                Minimum withdrawal amount: ${balance.minWithdrawal.toFixed(2)}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Add New Address Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus size={20} />
            Add New Withdrawal Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="blockchain">Blockchain</Label>
                <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blockchain" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_BLOCKCHAINS.map((blockchain) => (
                      <SelectItem key={blockchain.value} value={blockchain.value}>
                        <div className="flex items-center gap-2">
                          <blockchain.icon size={16} />
                          {blockchain.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="label">Label (Optional)</Label>
                <Input
                  id="label"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="e.g., Main Wallet, Exchange Wallet"
                  maxLength={100}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Wallet Address</Label>
              <Input
                id="address"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Enter your wallet address"
                required
                maxLength={200}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              disabled={addAddressMutation.isPending}
            >
              {addAddressMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                  Adding Address...
                </div>
              ) : (
                <>
                  <Plus size={16} className="mr-2" />
                  Add Withdrawal Address
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Current Addresses */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-yellow-500">Your Withdrawal Addresses</h2>
        
        {Object.keys(addresses).length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Wallet size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No withdrawal addresses added yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Add your first withdrawal address above to get started
              </p>
            </CardContent>
          </Card>
        ) : (
          Object.entries(addresses).map(([blockchain, blockchainAddresses]) => (
            <Card key={blockchain}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getBlockchainIcon(blockchain)}
                  {SUPPORTED_BLOCKCHAINS.find(b => b.value === blockchain)?.label || blockchain}
                  <Badge variant="secondary">{blockchainAddresses.length} address{blockchainAddresses.length !== 1 ? 'es' : ''}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {blockchainAddresses.map((addr) => (
                    <div key={addr.id} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                      <div className="flex items-center gap-3 flex-1">
                        {addr.isSelected ? (
                          <CheckCircle2 className="text-green-500" size={20} />
                        ) : (
                          <Circle className="text-muted-foreground" size={20} />
                        )}
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{addr.label}</p>
                            {addr.isSelected && <Badge variant="default">Selected</Badge>}
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground font-mono">
                              {formatAddress(addr.address)}
                            </p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleCopyAddress(addr.address)}
                            >
                              {copiedAddress === addr.address ? (
                                <Check size={12} className="text-green-500" />
                              ) : (
                                <Copy size={12} />
                              )}
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Added {new Date(addr.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!addr.isSelected && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => selectAddressMutation.mutate(addr.id)}
                            disabled={selectAddressMutation.isPending}
                          >
                            Select
                          </Button>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this address?')) {
                              deleteAddressMutation.mutate(addr.id);
                            }
                          }}
                          disabled={deleteAddressMutation.isPending}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Withdrawal Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info size={20} />
            Withdrawal Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> Always double-check your withdrawal address before adding it. 
                Incorrect addresses may result in permanent loss of funds.
              </AlertDescription>
            </Alert>

            <div className="space-y-3 text-sm">
              <h4 className="font-semibold">Withdrawal Process:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Minimum withdrawal amount: ${balance?.minWithdrawal.toFixed(2) || '10.00'}</li>
                <li>• Withdrawal fee: ${balance?.withdrawalFee.toFixed(2) || '1.00'} per transaction</li>
                <li>• Processing time: 1-24 hours for most cryptocurrencies</li>
                <li>• Network confirmations required vary by blockchain</li>
              </ul>

              <h4 className="font-semibold mt-4">Security Guidelines:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Only add addresses from wallets you control</li>
                <li>• Verify address format matches the selected blockchain</li>
                <li>• Test with small amounts first for new addresses</li>
                <li>• Keep your withdrawal addresses updated and secure</li>
                <li>• Contact support if you need assistance</li>
              </ul>

              <h4 className="font-semibold mt-4">Supported Networks:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {SUPPORTED_BLOCKCHAINS.map((blockchain) => (
                  <div key={blockchain.value} className="flex items-center gap-2 text-muted-foreground">
                    <blockchain.icon size={14} />
                    <span className="text-xs">{blockchain.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}