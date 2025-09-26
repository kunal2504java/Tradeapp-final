import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, CreditCard, Shield, Clock } from 'lucide-react';
import CryptoDepositDialog from '@/components/CryptoDepositDialog';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

interface WalletAddress {
  blockchain: string;
  address: string;
}

const CryptoDeposit: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [walletAddresses, setWalletAddresses] = useState<WalletAddress[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const fetchWalletAddresses = async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/user/wallet-addresses', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWalletAddresses(data.walletAddresses || []);
      } else {
        console.error('Failed to fetch wallet addresses');
        toast.error('Failed to load wallet addresses');
      }
    } catch (error) {
      console.error('Error fetching wallet addresses:', error);
      toast.error('Error loading wallet addresses');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletAddresses();
  }, [token]);

  const handleDepositClick = () => {
    if (walletAddresses.length === 0) {
      toast.error('No wallet addresses configured. Please contact support.');
      return;
    }
    setIsDialogOpen(true);
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'All deposits are secured with advanced blockchain encryption',
    },
    {
      icon: Clock,
      title: 'Fast Processing',
      description: 'Deposits are typically confirmed within 10-30 minutes',
    },
    {
      icon: Wallet,
      title: 'Multiple Cryptocurrencies',
      description: 'Support for Bitcoin, Ethereum, USDT, USDC, and more',
    },
    {
      icon: CreditCard,
      title: 'Instant Credit',
      description: 'Funds are credited to your account upon confirmation',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-yellow-500">Crypto Deposit</h1>
        <p className="text-muted-foreground mt-2">
          Fund your account with cryptocurrency deposits
        </p>
      </div>

      {/* Main Action Card */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Make a Crypto Deposit</CardTitle>
          <CardDescription>
            Click the button below to get your deposit address and start funding your account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-8">
          <Button
            onClick={handleDepositClick}
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Loading...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-5 w-5" />
                Start Deposit
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <feature.icon className="h-8 w-8 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Deposit</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                1
              </span>
              <span>Click the "Start Deposit" button above</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                2
              </span>
              <span>Select your preferred cryptocurrency from the dropdown</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                3
              </span>
              <span>Copy the wallet address or scan the QR code with your wallet app</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                4
              </span>
              <span>Send your crypto to the provided address (ensure correct network)</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                5
              </span>
              <span>Wait for blockchain confirmation (typically 10-30 minutes)</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                6
              </span>
              <span>Your account will be credited automatically upon confirmation</span>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Deposit Dialog */}
      <CryptoDepositDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        walletAddresses={walletAddresses}
      />
    </div>
  );
};

export default CryptoDeposit;