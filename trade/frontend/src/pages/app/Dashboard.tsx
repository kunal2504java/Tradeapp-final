import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { useEffect, useState } from 'react';

type DashboardData = {
  total_investment: number;
  wallet_balance: number;
  recent_transactions: Array<{ id: string; amount: number; type: 'credit'|'debit'; income_source: string; description: string; timestamp: string }>;
  network_size: number;
};

export default function DashboardPage() {
  const { data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => api<DashboardData>('/api/user/dashboard'),
  });
  const { data: history } = useQuery({
    queryKey: ['profit-history'],
    queryFn: () => api<Array<{ month: string; profit: number }>>('/api/user/profit-history?months=12'),
  });
  const { data: breakdown } = useQuery({
    queryKey: ['income-breakdown'],
    queryFn: () => api<Array<{ source: string; amount: number }>>('/api/user/income-breakdown?months=12'),
  });

  const [animateVals, setAnimateVals] = useState({ inv: 0, bal: 0, net: 0 });
  useEffect(() => {
    const targetInv = Number(data?.total_investment ?? 0);
    const targetBal = Number(data?.wallet_balance ?? 0);
    const targetNet = Number(data?.network_size ?? 0);
    const duration = 600;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setAnimateVals({ inv: Math.round(targetInv * p), bal: Math.round(targetBal * p), net: Math.round(targetNet * p) });
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [data]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Investment" value={`$${animateVals.inv.toLocaleString()}`} />
        <StatCard title="Wallet Balance" value={`$${animateVals.bal.toLocaleString()}`} />
        <StatCard title="Network Size" value={`${animateVals.net.toLocaleString()}`} />
        <StatCard title="Monthly Profit" value="$—" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data?.recent_transactions?.map((t) => (
              <div key={t.id} className="flex justify-between border-b border-border pb-2">
                <div>
                  <div className="font-medium">{t.description || t.income_source}</div>
                  <div className="text-sm text-muted-foreground">{new Date(t.timestamp).toLocaleString()}</div>
                </div>
                <div className={t.type === 'credit' ? 'text-green-500' : 'text-red-500'}>
                  {t.type === 'credit' ? '+' : '-'}${Number(t.amount).toFixed(2)}
                </div>
              </div>
            ))}
            {!data?.recent_transactions?.length && <div className="text-sm text-muted-foreground">No transactions yet.</div>}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Income Breakdown</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie dataKey="amount" nameKey="source" data={Array.isArray(breakdown) ? breakdown : []} outerRadius={110}>
                {Array.isArray(breakdown) ? breakdown.map((_, i) => (
                  <Cell key={i} fill={["#FFB900","#22c55e","#3b82f6","#ef4444","#a855f7"][i % 5]} />
                )) : []}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Profit Trend (12 months)</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={Array.isArray(history) ? history : []} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="month" tick={{ fill: 'currentColor' }} />
              <YAxis tick={{ fill: 'currentColor' }} />
              <Tooltip />
              <Line type="monotone" dataKey="profit" stroke="#FFB900" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  );
}


