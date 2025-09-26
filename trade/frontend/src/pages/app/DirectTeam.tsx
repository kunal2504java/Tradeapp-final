import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, Calendar, Code } from 'lucide-react';

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

const DirectTeam: React.FC = () => {
  const { data: binaryTreeData, isLoading, error } = useQuery<BinaryTreeResponse>({ 
    queryKey: ['binary-tree'], 
    queryFn: () => api<BinaryTreeResponse>('/api/network/binary-tree') 
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const TeamMemberCard = ({ node, position, index }: { node: BinaryTreeNode; position: string; index?: number }) => (
    <Card className="w-full max-w-sm">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar with Position Badge */}
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt={node.full_name} />
              <AvatarFallback className={`text-lg font-bold ${
                position === 'LEFT' 
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' 
                  : 'bg-green-100 text-green-700 border-2 border-green-300'
              }`}>
                {node.full_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Badge 
              className={`absolute -top-1 -right-1 ${
                position === 'LEFT' 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {position === 'LEFT' ? 'L' : 'R'}
            </Badge>
            {index !== undefined && (
              <Badge variant="secondary" className="absolute -bottom-1 -left-1 text-xs">
                #{index + 1}
              </Badge>
            )}
          </div>

          {/* Member Info */}
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">{node.full_name}</h3>
            <p className="text-sm text-muted-foreground break-all">{node.email}</p>
            
            <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Joined {formatDate(node.created_at)}</span>
            </div>
            
            <div className="flex items-center justify-center space-x-1">
              <Code className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground">{node.referral_code}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EmptyPositionCard = ({ position }: { position: string }) => (
    <Card className="w-full max-w-sm border-dashed">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-dashed border-muted-foreground/30">
              <AvatarFallback className="bg-muted/20 text-muted-foreground">
                <Users className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <Badge 
              variant="outline" 
              className={`absolute -top-1 -right-1 ${
                position === 'LEFT' 
                  ? 'border-blue-300 text-blue-700' 
                  : 'border-green-300 text-green-700'
              }`}
            >
              {position === 'LEFT' ? 'L' : 'R'}
            </Badge>
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="font-medium text-muted-foreground">{position} Position</h3>
            <p className="text-sm text-muted-foreground">Available</p>
            <Badge variant="secondary" className="text-xs">
              Empty Slot
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">Direct Team</h1>
          <p className="text-muted-foreground mt-2">
            Your immediate left and right referrals
          </p>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">Direct Team</h1>
          <p className="text-muted-foreground mt-2">
            Your immediate left and right referrals
          </p>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-destructive text-center">
              Failed to load team data. Please try again later.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const leftMembers = binaryTreeData?.tree.left || [];
  const rightMembers = binaryTreeData?.tree.right || [];
  const totalDirects = leftMembers.length + rightMembers.length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-yellow-500">Direct Team</h1>
        <p className="text-muted-foreground mt-2">
          Your immediate left and right referrals in the binary structure
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Direct</p>
                <p className="text-2xl font-bold text-blue-600">{totalDirects}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Left Side</p>
                <p className="text-2xl font-bold text-blue-600">{leftMembers.length}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">L</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Right Side</p>
                <p className="text-2xl font-bold text-green-600">{rightMembers.length}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">R</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Binary Tree Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Binary Tree Structure</CardTitle>
          <CardDescription>
            Your position in the center with direct referrals on left and right sides
          </CardDescription>
        </CardHeader>
        <CardContent>
          {binaryTreeData?.tree ? (
            <div className="flex flex-col items-center space-y-8">
              {/* Root User (You) */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-yellow-300 shadow-lg">
                    <AvatarImage src="" alt={binaryTreeData.tree.user.full_name} />
                    <AvatarFallback className="bg-yellow-100 text-yellow-700 text-xl font-bold">
                      {binaryTreeData.tree.user.full_name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Badge className="absolute -top-2 -right-2 bg-yellow-500 hover:bg-yellow-600">
                    YOU
                  </Badge>
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
              {totalDirects > 0 && (
                <div className="flex justify-center w-full">
                  <div className="flex justify-between w-full max-w-4xl">
                    <div className="flex-1 h-px bg-border mt-4"></div>
                    <div className="w-4 h-px bg-border mt-4"></div>
                    <div className="flex-1 h-px bg-border mt-4"></div>
                  </div>
                </div>
              )}

              {/* Left and Right Teams */}
              <div className="flex justify-center w-full">
                <div className="flex justify-between w-full max-w-6xl gap-8">
                  {/* Left Side */}
                  <div className="flex-1">
                    <div className="text-center mb-6">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        Left Side ({leftMembers.length} users)
                      </Badge>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                      {leftMembers.length > 0 ? (
                        leftMembers.map((node, index) => (
                          <TeamMemberCard key={node.id} node={node} position="LEFT" index={index} />
                        ))
                      ) : (
                        <EmptyPositionCard position="LEFT" />
                      )}
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex-1">
                    <div className="text-center mb-6">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        Right Side ({rightMembers.length} users)
                      </Badge>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                      {rightMembers.length > 0 ? (
                        rightMembers.map((node, index) => (
                          <TeamMemberCard key={node.id} node={node} position="RIGHT" index={index} />
                        ))
                      ) : (
                        <EmptyPositionCard position="RIGHT" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">No direct referrals yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Share your referral code to start building your binary tree
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DirectTeam;