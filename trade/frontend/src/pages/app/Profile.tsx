import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type Profile = { id: string; full_name: string; email: string; referral_code: string; sponsor_id: string | null; created_at: string };

export default function ProfilePage() {
  const { data, isLoading, error } = useQuery({ 
    queryKey: ['profile'], 
    queryFn: () => api<Profile>('/api/user/profile'),
    retry: 1
  });
  
  console.log('Profile data:', data);
  console.log('Profile loading:', isLoading);
  console.log('Profile error:', error);
  
  if (isLoading) return <Card><CardContent>Loading profile...</CardContent></Card>;
  if (error) return <Card><CardContent>Error loading profile: {String(error)}</CardContent></Card>;
  
  return (
    <Card>
      <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        <div><span className="text-muted-foreground">Name:</span> {data?.full_name || '—'}</div>
        <div><span className="text-muted-foreground">Email:</span> {data?.email || '—'}</div>
        <div><span className="text-muted-foreground">Referral Code:</span> <span className="font-mono">{data?.referral_code || '—'}</span></div>
        <div><span className="text-muted-foreground">Joined:</span> {data?.created_at ? new Date(data.created_at).toLocaleDateString() : '—'}</div>
        <div className="mt-4 text-xs text-muted-foreground">Debug: {JSON.stringify(data)}</div>
      </CardContent>
    </Card>
  );
}


