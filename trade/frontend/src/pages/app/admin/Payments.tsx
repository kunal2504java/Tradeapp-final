import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

// This type defines the shape of the data we expect from the API
type PendingDeposit = {
  id: string;
  amount: number;
  timestamp: string;
  description: string;
  income_source: string;
  users: {
    full_name: string;
    email: string;
  };
};

export default function AdminPaymentsPage() {
  const queryClient = useQueryClient();

  // Fetching data with react-query from the correct endpoint
  const { data: deposits, isLoading, error } = useQuery<PendingDeposit[]>({
    queryKey: ['admin', 'pending-deposits'],
    queryFn: () => api('/api/admin/deposits/pending'),
  });

  // Mutation for approving a deposit
  const approveMutation = useMutation({
    mutationFn: (transactionId: string) => 
      api(`/api/admin/deposits/approve/${transactionId}`, { method: 'POST' }),
    onSuccess: () => {
      toast.success('Deposit approved successfully!');
      // Refetch the data to update the list
      queryClient.invalidateQueries({ queryKey: ['admin', 'pending-deposits'] });
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to approve deposit.');
    },
  });

  // Mutation for declining a deposit
  const declineMutation = useMutation({
    mutationFn: (transactionId: string) => 
      api(`/api/admin/deposits/reject/${transactionId}`, { method: 'POST' }),
    onSuccess: () => {
      toast.success('Deposit declined successfully!');
      // Refetch the data to update the list
      queryClient.invalidateQueries({ queryKey: ['admin', 'pending-deposits'] });
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to decline deposit.');
    },
  });

  // Helper function to get blockchain info from income_source
  const getBlockchainInfo = (incomeSource: string) => {
    if (incomeSource.includes('_deposit')) {
      const blockchain = incomeSource.replace('_deposit', '');
      return {
        symbol: blockchain,
        name: blockchain === 'BTC' ? 'Bitcoin' : 
              blockchain === 'ETH' ? 'Ethereum' :
              blockchain === 'USDT' ? 'Tether USD' :
              blockchain === 'USDC' ? 'USD Coin' :
              blockchain === 'BNB' ? 'Binance Coin' : blockchain
      };
    }
    return { symbol: 'MANUAL', name: 'Manual Deposit' };
  };

  // Helper function to render the main content
  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center text-muted-foreground py-8">Loading requests...</div>;
    }

    if (error) {
      return (
        <div className="text-center text-red-500 flex items-center justify-center gap-2 py-8">
            <AlertCircle className="h-4 w-4" />
            <span>Error loading requests: {error.message}</span>
        </div>
      );
    }

    if (!deposits || deposits.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-8">
          There are no pending deposit requests at the moment.
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Blockchain</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Requested On</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deposits.map((deposit) => {
            const blockchainInfo = getBlockchainInfo(deposit.income_source);
            return (
              <TableRow key={deposit.id}>
                <TableCell className="font-medium">{deposit.users.full_name}</TableCell>
                <TableCell>{deposit.users.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {blockchainInfo.symbol === 'BTC' ? '₿' :
                       blockchainInfo.symbol === 'ETH' ? 'Ξ' :
                       blockchainInfo.symbol === 'USDT' ? '₮' :
                       blockchainInfo.symbol === 'USDC' ? '$' :
                       blockchainInfo.symbol === 'BNB' ? 'B' : '💳'}
                    </span>
                    <span className="text-sm font-medium">{blockchainInfo.symbol}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">${Number(deposit.amount).toFixed(2)}</TableCell>
                <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                  {deposit.description}
                </TableCell>
                <TableCell className="text-sm">{new Date(deposit.timestamp).toLocaleString()}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-green-600 hover:bg-green-100 hover:text-green-700"
                      onClick={() => approveMutation.mutate(deposit.id)}
                      disabled={approveMutation.isPending || declineMutation.isPending}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-red-600 hover:bg-red-100 hover:text-red-700"
                      onClick={() => declineMutation.mutate(deposit.id)}
                      disabled={approveMutation.isPending || declineMutation.isPending}
                    >
                       <XCircle className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Deposit Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
}