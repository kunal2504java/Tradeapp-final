import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type SalaryStatus = {
  totalVolume: number;
  directReferrals: number;
  totalDownline: number;
  currentRank: string | null;
  ranks: Array<{ 
    rankName: string; 
    threshold: number; 
    salary: number; 
    isAchieved: boolean; 
    progress: number; 
    volumeNeeded: number 
  }>;
};

export default function SalaryPage() {
  const { data } = useQuery({ queryKey: ['salary-status'], queryFn: () => api<SalaryStatus>('/api/user/salary-status') });
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="backdrop-blur-lg bg-white/5 border border-white/20">
          <CardHeader><CardTitle>Current Rank</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">{data?.currentRank ?? 'None'}</CardContent>
        </Card>
        <Card className="backdrop-blur-lg bg-white/5 border border-white/20">
          <CardHeader><CardTitle>Total Business Volume</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">${Number(data?.totalVolume ?? 0).toLocaleString()}</CardContent>
        </Card>
        <Card className="backdrop-blur-lg bg-white/5 border border-white/20">
          <CardHeader><CardTitle>Direct Referrals</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">{data?.directReferrals ?? 0}</CardContent>
        </Card>
        <Card className="backdrop-blur-lg bg-white/5 border border-white/20">
          <CardHeader><CardTitle>Total Downline</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">{data?.totalDownline ?? 0}</CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.ranks?.map(r => (
          <Card key={r.rankName} className={`backdrop-blur-lg bg-white/5 border ${r.isAchieved ? 'border-green-400/40' : 'border-white/20'}`}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>{r.rankName}</span>
                <span className="text-sm">${r.salary}/mo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm mb-2">Target Volume: ${r.threshold.toLocaleString()}</div>
              {!r.isAchieved && (
                <div className="text-sm mb-2 text-muted-foreground">Need ${r.volumeNeeded.toLocaleString()} more</div>
              )}
              <Progress label="Progress" value={Math.round(r.progress * 100)} />
              {r.isAchieved && (
                <div className="text-sm text-green-400 mt-2">✓ Achieved</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Progress({ label, value }: { label: string; value: number }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1"><span>{label}</span><span>{value}%</span></div>
      <div className="h-2 w-full bg-white/10 rounded">
        <div className="h-2 bg-[#FFB900] rounded" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}


