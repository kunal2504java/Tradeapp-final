import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface WalletAddress {
  blockchain: string;
  address: string;
}

interface CryptoDepositDialogProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddresses: WalletAddress[];
}

const CryptoDepositDialog: React.FC<CryptoDepositDialogProps> = ({
  isOpen,
  onClose,
  walletAddresses,
}) => {
  const [selectedBlockchain, setSelectedBlockchain] = useState<string>('');
  const [copiedAddress, setCopiedAddress] = useState<string>('');

  const selectedAddress = walletAddresses.find(
    (wallet) => wallet.blockchain === selectedBlockchain
  )?.address;

  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      toast.success('Address copied to clipboard!');
      
      // Reset copy state after 2 seconds
      setTimeout(() => setCopiedAddress(''), 2000);
    } catch (error) {
      toast.error('Failed to copy address');
    }
  };

  const blockchainOptions = [
    { value: 'BTC', label: 'Bitcoin (BTC)', color: 'text-orange-500' },
    { value: 'ETH', label: 'Ethereum (ETH)', color: 'text-blue-500' },
    { value: 'USDT', label: 'Tether (USDT)', color: 'text-green-500' },
    { value: 'USDC', label: 'USD Coin (USDC)', color: 'text-blue-600' },
    { value: 'BNB', label: 'Binance Coin (BNB)', color: 'text-yellow-600' },
    { value: 'ADA', label: 'Cardano (ADA)', color: 'text-blue-700' },
    { value: 'SOL', label: 'Solana (SOL)', color: 'text-purple-500' },
    { value: 'MATIC', label: 'Polygon (MATIC)', color: 'text-purple-600' },
  ];

  const getQRCodeUrl = (address: string, blockchain: string) => {
    // Using QR Server API to generate QR codes
    const qrData = `${blockchain.toLowerCase()}:${address}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-yellow-500">Crypto Deposit</DialogTitle>
          <DialogDescription>
            Select a blockchain and send your crypto to the provided address
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Blockchain Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Blockchain</label>
            <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
              <SelectTrigger>
                <SelectValue placeholder="Choose blockchain network" />
              </SelectTrigger>
              <SelectContent>
                {blockchainOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={!walletAddresses.some(w => w.blockchain === option.value)}
                  >
                    <span className={option.color}>{option.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Address and QR Code */}
          {selectedAddress && (
            <Card>
              <CardContent className="p-6 space-y-4">
                {/* QR Code */}
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <img
                      src={getQRCodeUrl(selectedAddress, selectedBlockchain)}
                      alt="QR Code"
                      className="w-48 h-48"
                      onError={(e) => {
                        // Fallback QR code placeholder
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="100" y="100" text-anchor="middle" dy=".3em" fill="%236b7280" font-family="sans-serif" font-size="12">QR Code</text></svg>';
                      }}
                    />
                  </div>
                </div>

                {/* Network Info */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Send {selectedBlockchain} to this address
                  </p>
                  <p className="text-xs text-yellow-600 mt-1">
                    Network: {selectedBlockchain}
                  </p>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Wallet Address</label>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border">
                    <code className="flex-1 text-sm font-mono text-gray-700 break-all">
                      {selectedAddress}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyAddress(selectedAddress)}
                      className="flex-shrink-0 h-8 w-8 p-0"
                    >
                      {copiedAddress === selectedAddress ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Important Notice</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Only send {selectedBlockchain} to this address</li>
                    <li>• Sending other cryptocurrencies may result in permanent loss</li>
                    <li>• Ensure you're using the correct network</li>
                    <li>• Deposits may take 10-30 minutes to confirm</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {!selectedAddress && selectedBlockchain && (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  No wallet address configured for {selectedBlockchain}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Please contact support to set up this cryptocurrency
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CryptoDepositDialog;