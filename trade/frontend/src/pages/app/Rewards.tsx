import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type RewardStatus = { rewardId: string; rewardName: string; bonusAmount: number; timeframeInDays: number; status: 'in_progress'|'achieved'|'expired'; deadlineDate: string; remainingMs: number };

export default function RewardsPage() {
  const { data } = useQuery({ queryKey: ['rewards-status'], queryFn: () => api<RewardStatus[]>('/api/rewards/status') });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gold">Fast Track Rewards</h1>
        <p className="text-sm text-muted-foreground">Achieve Ranks quickly to earn exclusive bonuses!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.isArray(data) ? data.map(r => (
          <RewardCard key={r.rewardId} rewardName={r.rewardName} bonusAmount={r.bonusAmount} timeframeInDays={r.timeframeInDays} status={r.status} deadlineDate={r.deadlineDate} remainingMs={r.remainingMs} />
        )) : []}
      </div>
    </div>
  );
}

function RewardCard({ rewardName, bonusAmount, timeframeInDays, status, deadlineDate, remainingMs }: { rewardName: string; bonusAmount: number; timeframeInDays: number; status: 'in_progress'|'achieved'|'expired'; deadlineDate: string; remainingMs: number }) {
  return (
    <Card className="backdrop-blur-lg bg-white/5 border border-white/20 hover:border-[#FFB900]/50 transition-colors">
      <CardHeader>
        <CardTitle>{rewardName} — +${bonusAmount}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-3">Achieve the target rank within {timeframeInDays} days of joining.</div>
        {status === 'in_progress' && <Countdown deadline={new Date(deadlineDate).getTime()} now={Date.now()} />}
        {status === 'achieved' && <div className="text-green-500 font-medium">Reward Claimed!</div>}
        {status === 'expired' && <div className="text-red-500 font-medium">Time's Up!</div>}
      </CardContent>
    </Card>
  );
}

function Countdown({ deadline, now }: { deadline: number; now: number }) {
  const remaining = Math.max(0, deadline - now);
  const days = Math.floor(remaining / (24*60*60*1000));
  const hours = Math.floor((remaining % (24*60*60*1000)) / (60*60*1000));
  const minutes = Math.floor((remaining % (60*60*1000)) / (60*1000));
  const seconds = Math.floor((remaining % (60*1000)) / 1000);
  return (
    <div className="text-sm">
      Time remaining: <span className="font-mono">{days}d {hours}h {minutes}m {seconds}s</span>
    </div>
  );
}


