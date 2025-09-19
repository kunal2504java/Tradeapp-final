import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Copy, Users, Network, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

type Referral = {
  id: string;
  full_name: string;
  email: string;
  referral_code: string;
  created_at: string;
  _count: {
    other_users: number;
  };
};

type ReferralsResponse = {
  items: Referral[];
  total: number;
  limit: number;
  offset: number;
};

type UserProfile = {
  full_name: string;
  email: string;
  referral_code: string;
  sponsor_id: string | null;
  created_at: string;
};

export default function ReferralsPage() {
  const { toast } = useToast();
  
  // Fetch user profile to get referral code
  const { data: profile } = useQuery<UserProfile>({
    queryKey: ['profile'],
    queryFn: () => api<UserProfile>('/api/user/profile')
  });
  
  // Fetch referrals with refetch interval for real-time updates
  const { data, isLoading, error, refetch } = useQuery<ReferralsResponse>({ 
    queryKey: ['referrals'], 
    queryFn: () => api<ReferralsResponse>('/api/network/downline'),
    refetchInterval: 5000, // Refetch every 5 seconds to show new referrals
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Referral link copied to clipboard',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>My Referrals</CardTitle>
                <CardDescription>View and manage your direct referrals</CardDescription>
              </div>
              <Button variant="outline" size="sm" disabled>
                <Copy className="w-4 h-4 mr-2" />
                Copy Referral Link
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-destructive">
            Failed to load referrals. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  const referralLink = profile?.referral_code ? `${window.location.origin}/register?ref=${profile.referral_code}` : '';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle>My Referrals</CardTitle>
              <CardDescription>View and manage your direct referrals</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full sm:w-auto"
                onClick={() => copyToClipboard(referralLink)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Referral Link
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => refetch()}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Link to="/app/network" className="w-full sm:w-auto">
                <Button variant="outline" size="sm" className="w-full">
                  <Network className="w-4 h-4 mr-2" />
                  View Full Network
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data?.items?.length ? (
              <div className="space-y-2">
                {data.items.map((referral) => (
                  <div 
                    key={referral.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-medium">
                        {referral.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">
                          {referral.full_name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {referral.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 sm:mt-0">
                      <div className="text-sm text-muted-foreground">
                        <div>Joined: {formatDate(referral.created_at)}</div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>{referral._count.other_users} referrals</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <Users className="w-12 h-12 mx-auto text-muted-foreground" />
                <p className="text-lg font-medium">No referrals yet</p>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Share your referral link with others to start building your network
                </p>
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(referralLink)}
                    className="mt-2"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Referral Link
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
