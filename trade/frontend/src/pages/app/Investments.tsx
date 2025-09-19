import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

type Investment = { id: string; amount: number; package_name: string; monthly_profit_rate: number; status: string; start_date: string; unlock_date: string };

export default function InvestmentsPage() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['investments'], queryFn: () => api<Investment[]>('/api/investment/history') });
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [pkg, setPkg] = useState('Package 1');
  const [rate, setRate] = useState('6');
  const deposit = useMutation({
    mutationFn: () => api('/api/investment/deposit', { method: 'POST', body: { amount: Number(amount), package_name: pkg, monthly_profit_rate: Number(rate) } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['investments'] }),
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Make New Investment</CardTitle></CardHeader>
        <CardContent>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent text-foreground hover:shadow-gold-glow">Make New Investment</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New Investment</DialogTitle></DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <Input placeholder="Package" value={pkg} onChange={(e) => setPkg(e.target.value)} />
                <Input placeholder="Monthly % Rate" value={rate} onChange={(e) => setRate(e.target.value)} />
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => deposit.mutate()} disabled={deposit.isPending}>Confirm</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Investment History</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="py-2">Package</th>
                  <th>Amount</th>
                  <th>Rate %</th>
                  <th>Status</th>
                  <th>Start</th>
                  <th>Unlock</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) ? data.map((i) => (
                  <tr key={i.id} className="border-t border-border">
                    <td className="py-2">{i.package_name}</td>
                    <td>${Number(i.amount).toFixed(2)}</td>
                    <td>{Number(i.monthly_profit_rate).toFixed(2)}</td>
                    <td>{i.status}</td>
                    <td>{new Date(i.start_date).toLocaleDateString()}</td>
                    <td>{new Date(i.unlock_date).toLocaleDateString()}</td>
                  </tr>
                )) : []}
                {!data?.length && (
                  <tr><td colSpan={6} className="text-sm text-muted-foreground py-4">No investments yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


