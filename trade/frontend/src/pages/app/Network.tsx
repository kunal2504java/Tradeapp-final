import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

type GenealogyNode = {
  id: string;
  full_name: string;
  email: string;
  referral_code: string;
  created_at: string;
  level: number;
  position?: string;
};

type GenealogyResponse = {
  root: string;
  nodes: GenealogyNode[];
};

type BinaryTreeNode = {
  id: string;
  full_name: string;
  email: string;
  referral_code: string;
  created_at: string;
};

type BinaryTreeResponse = {
  tree: {
    user: BinaryTreeNode;
    left: BinaryTreeNode[];
    right: BinaryTreeNode[];
  };
};

export default function NetworkPage() {
  const { data: binaryTreeData, isLoading: binaryTreeLoading, error: binaryTreeError } = useQuery<BinaryTreeResponse>({ 
    queryKey: ['binary-tree'], 
    queryFn: () => api<BinaryTreeResponse>('/api/network/binary-tree') 
  });

  const { data, isLoading, error } = useQuery<GenealogyResponse>({ 
    queryKey: ['genealogy'], 
    queryFn: () => api<GenealogyResponse>('/api/network/genealogy') 
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const BinaryTreeNode = ({ node, position, index }: { node: BinaryTreeNode; position?: string; index?: number }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className={`flex items-center justify-center w-16 h-16 rounded-full font-bold text-lg border-2 shadow-lg ${
          position === 'LEFT' 
            ? 'bg-gradient-to-br from-blue-500/20 to-blue-500/10 text-blue-700 border-blue-500/30' 
            : 'bg-gradient-to-br from-green-500/20 to-green-500/10 text-green-700 border-green-500/30'
        }`}>
          {node.full_name.charAt(0).toUpperCase()}
        </div>
        {position && (
          <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold border-2 border-background ${
            position === 'LEFT' 
              ? 'bg-blue-500 text-white' 
              : 'bg-green-500 text-white'
          }`}>
            {position === 'LEFT' ? 'L' : 'R'}
          </div>
        )}
        {index !== undefined && (
          <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center font-bold border border-background">
            {index + 1}
          </div>
        )}
      </div>
      <div className="mt-3 text-center max-w-32">
        <div className="font-semibold text-sm truncate">{node.full_name}</div>
        <div className="text-xs text-muted-foreground truncate">{node.email}</div>
        <div className="text-xs text-muted-foreground mt-1">
          {formatDate(node.created_at)}
        </div>
        <div className="text-xs text-muted-foreground mt-1 font-mono">
          {node.referral_code}
        </div>
      </div>
    </div>
  );

  if (binaryTreeLoading || isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Network</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (binaryTreeError || error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Network</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-destructive">
            Failed to load network data. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Network Tree</h2>
        <Link to="/app/referrals">
          <Button variant="outline" size="sm">
            View Direct Referrals
          </Button>
        </Link>
      </div>

      {/* Binary Tree Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Binary Tree Structure</CardTitle>
          <CardDescription>Your direct referrals organized by left/right positioning</CardDescription>
        </CardHeader>
        <CardContent>
          {binaryTreeData?.tree ? (
            <div className="flex flex-col items-center space-y-8">
              {/* Root User */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-xl border-4 border-primary/30 shadow-xl">
                    {binaryTreeData.tree.user.full_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold border-2 border-background">
                    YOU
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="font-bold text-lg">{binaryTreeData.tree.user.full_name}</div>
                  <div className="text-sm text-muted-foreground">{binaryTreeData.tree.user.email}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Joined: {formatDate(binaryTreeData.tree.user.created_at)}
                  </div>
                </div>
              </div>

              {/* Connection Lines */}
              {(binaryTreeData.tree.left.length > 0 || binaryTreeData.tree.right.length > 0) && (
                <div className="flex justify-center w-full">
                  <div className="flex justify-between w-full max-w-4xl">
                    <div className="flex-1 h-px bg-border"></div>
                    <div className="w-4 h-px bg-border"></div>
                    <div className="flex-1 h-px bg-border"></div>
                  </div>
                </div>
              )}

              {/* Left and Right Sides */}
              <div className="flex justify-center w-full">
                <div className="flex justify-between w-full max-w-4xl gap-8">
                  {/* Left Side */}
                  <div className="flex-1">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        Left Side ({binaryTreeData.tree.left.length} users)
                      </div>
                    </div>
                    <div className="space-y-4">
                      {binaryTreeData.tree.left.length > 0 ? (
                        binaryTreeData.tree.left.map((node, index) => (
                          <div key={node.id} className="flex justify-center">
                            <BinaryTreeNode node={node} position="LEFT" index={index} />
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center py-8">
                          <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-muted/20">
                            <span className="text-muted-foreground text-xs font-medium">Empty</span>
                          </div>
                          <div className="mt-3 text-center">
                            <div className="text-sm font-medium text-muted-foreground">Left Position</div>
                            <div className="text-xs text-muted-foreground">Available</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex-1">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Right Side ({binaryTreeData.tree.right.length} users)
                      </div>
                    </div>
                    <div className="space-y-4">
                      {binaryTreeData.tree.right.length > 0 ? (
                        binaryTreeData.tree.right.map((node, index) => (
                          <div key={node.id} className="flex justify-center">
                            <BinaryTreeNode node={node} position="RIGHT" index={index} />
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center py-8">
                          <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-muted/20">
                            <span className="text-muted-foreground text-xs font-medium">Empty</span>
                          </div>
                          <div className="mt-3 text-center">
                            <div className="text-sm font-medium text-muted-foreground">Right Position</div>
                            <div className="text-xs text-muted-foreground">Available</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No referrals yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Share your referral code to start building your binary tree
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Full Network List */}
      <Card>
        <CardHeader>
          <CardTitle>Full Network</CardTitle>
          <CardDescription>Complete list of all users in your downline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data?.nodes?.length ? (
              <div className="space-y-2">
                {data.nodes.map((node) => (
                  <div 
                    key={node.id} 
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold border border-primary/20 shadow-sm">
                        {node.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">
                          {node.full_name}
                          <span className="ml-2 text-xs px-2 py-0.5 bg-muted rounded-full">
                            Level {node.level}
                          </span>
                          {node.position && (
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-medium ${
                              node.position === 'LEFT' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {node.position}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {node.email}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Joined: {formatDate(node.created_at)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Your network is empty</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Share your referral code to start building your network
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


