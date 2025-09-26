import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Calendar, 
  Code, 
  TrendingUp,
  Filter
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type GenealogyNode = {
  id: string;
  full_name: string;
  email: string;
  referral_code: string;
  created_at: string;
  level: number;
  position?: 'LEFT' | 'RIGHT';
};

type GenealogyResponse = {
  root: string;
  nodes: GenealogyNode[];
};

const TotalTeam: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('ALL');
  const [positionFilter, setPositionFilter] = useState<string>('ALL');
  const [expandedLevels, setExpandedLevels] = useState<Set<number>>(new Set([1, 2])); // Start with levels 1 and 2 expanded

  const { data: genealogyData, isLoading, error } = useQuery<GenealogyResponse>({ 
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

  const toggleLevel = (level: number) => {
    const newExpanded = new Set(expandedLevels);
    if (newExpanded.has(level)) {
      newExpanded.delete(level);
    } else {
      newExpanded.add(level);
    }
    setExpandedLevels(newExpanded);
  };

  // Filter and search functionality
  const filteredNodes = genealogyData?.nodes?.filter((node) => {
    const matchesSearch = node.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         node.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         node.referral_code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = levelFilter === 'ALL' || node.level.toString() === levelFilter;
    const matchesPosition = positionFilter === 'ALL' || node.position === positionFilter;
    
    return matchesSearch && matchesLevel && matchesPosition;
  }) || [];

  // Group nodes by level
  const nodesByLevel = filteredNodes.reduce((acc, node) => {
    if (!acc[node.level]) {
      acc[node.level] = [];
    }
    acc[node.level].push(node);
    return acc;
  }, {} as Record<number, GenealogyNode[]>);

  const TeamMemberCard = ({ node }: { node: GenealogyNode }) => (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-shrink-0">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" alt={node.full_name} />
              <AvatarFallback className={`text-sm font-bold ${
                node.position === 'LEFT' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {node.full_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {node.position && (
              <Badge 
                className={`absolute -top-1 -right-1 text-xs ${
                  node.position === 'LEFT' 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {node.position === 'LEFT' ? 'L' : 'R'}
              </Badge>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold truncate">{node.full_name}</h3>
              <Badge variant="outline" className="text-xs">
                Level {node.level}
              </Badge>
              {node.position && (
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    node.position === 'LEFT' ? 'text-blue-700' : 'text-green-700'
                  }`}
                >
                  {node.position}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">{node.email}</p>
            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Joined {formatDate(node.created_at)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Code className="h-3 w-3" />
                <span className="font-mono">{node.referral_code}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">Total Team</h1>
          <p className="text-muted-foreground mt-2">
            Complete hierarchy of all team members
          </p>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
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
          <h1 className="text-2xl font-bold text-yellow-500">Total Team</h1>
          <p className="text-muted-foreground mt-2">
            Complete hierarchy of all team members
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

  const totalMembers = genealogyData?.nodes?.length || 0;
  const leftSideMembers = genealogyData?.nodes?.filter(n => n.position === 'LEFT').length || 0;
  const rightSideMembers = genealogyData?.nodes?.filter(n => n.position === 'RIGHT').length || 0;
  const maxLevel = Math.max(...(genealogyData?.nodes?.map(n => n.level) || [0]));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-yellow-500">Total Team</h1>
        <p className="text-muted-foreground mt-2">
          Complete hierarchy showing all team members across all levels
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold text-blue-600">{totalMembers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Left Side</p>
                <p className="text-2xl font-bold text-blue-600">{leftSideMembers}</p>
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
                <p className="text-2xl font-bold text-green-600">{rightSideMembers}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">R</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Max Depth</p>
                <p className="text-2xl font-bold text-purple-600">{maxLevel}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search name, email, or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Levels</SelectItem>
                {Array.from({ length: maxLevel }, (_, i) => i + 1).map((level) => (
                  <SelectItem key={level} value={level.toString()}>
                    Level {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Positions</SelectItem>
                <SelectItem value="LEFT">Left Side</SelectItem>
                <SelectItem value="RIGHT">Right Side</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setLevelFilter('ALL');
                setPositionFilter('ALL');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hierarchical Team Display */}
      <Card>
        <CardHeader>
          <CardTitle>Team Hierarchy</CardTitle>
          <CardDescription>
            Organized by levels - click to expand/collapse each level
          </CardDescription>
        </CardHeader>
        <CardContent>
          {totalMembers === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">No team members yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Share your referral code to start building your network
              </p>
            </div>
          ) : filteredNodes.length === 0 ? (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">No members match your filters</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your search terms or filters
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(nodesByLevel)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([level, nodes]) => (
                <div key={level} className="space-y-2">
                  <Button
                    variant="ghost"
                    onClick={() => toggleLevel(Number(level))}
                    className="w-full justify-between p-3 h-auto"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {expandedLevels.has(Number(level)) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <span className="font-semibold">Level {level}</span>
                      </div>
                      <Badge variant="secondary">
                        {nodes.length} member{nodes.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-100 text-blue-700">
                        L: {nodes.filter(n => n.position === 'LEFT').length}
                      </Badge>
                      <Badge className="bg-green-100 text-green-700">
                        R: {nodes.filter(n => n.position === 'RIGHT').length}
                      </Badge>
                    </div>
                  </Button>
                  
                  {expandedLevels.has(Number(level)) && (
                    <div className="ml-6 space-y-2 border-l-2 border-muted pl-4">
                      {nodes.map((node) => (
                        <TeamMemberCard key={node.id} node={node} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TotalTeam;