import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, Eye, EyeOff, CheckCircle, XCircle, Clock } from 'lucide-react';

type PasswordStatus = {
  hasPassword: boolean;
  canChangePassword: boolean;
  daysUntilCanChange: number;
  lastUpdated: string | null;
};

export default function ChangePasswordPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Query to get password status
  const { data: passwordStatus, isLoading: statusLoading } = useQuery({
    queryKey: ['password-status'],
    queryFn: () => api<PasswordStatus>('/api/user/password-status'),
    retry: 1
  });

  // Mutation to change password
  const changePasswordMutation = useMutation({
    mutationFn: (data: { currentPassword?: string; newPassword: string; confirmPassword: string }) =>
      api('/api/user/change-password', {
        method: 'POST',
        body: data
      }),
    onSuccess: (data: { success: boolean; message: string }) => {
      toast({
        title: "Success",
        description: data.message,
        variant: "default"
      });
      
      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Refresh password status
      queryClient.invalidateQueries({ queryKey: ['password-status'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.error || 'Failed to change password';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error", 
        description: "New passwords don't match",
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive"
      });
      return;
    }

    const requestData: { currentPassword?: string; newPassword: string; confirmPassword: string } = {
      newPassword,
      confirmPassword
    };

    if (passwordStatus?.hasPassword) {
      requestData.currentPassword = currentPassword;
    }

    changePasswordMutation.mutate(requestData);
  };

  // Password validation
  const isPasswordValid = newPassword.length >= 8;
  const doPasswordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
  const isCurrentPasswordRequired = passwordStatus?.hasPassword && !currentPassword;

  if (statusLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-yellow-500 flex items-center gap-2">
          <Lock size={24} />
          Change Profile Password
        </h1>
        <p className="text-muted-foreground mt-2">
          {passwordStatus?.hasPassword 
            ? 'Update your account password' 
            : 'Create a password to enable email/password login'
          }
        </p>
      </div>

      {/* Password Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {passwordStatus?.hasPassword ? (
              <CheckCircle className="text-green-500" size={20} />
            ) : (
              <XCircle className="text-red-500" size={20} />
            )}
            Password Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span>Password Set:</span>
            <span className={passwordStatus?.hasPassword ? 'text-green-500' : 'text-red-500'}>
              {passwordStatus?.hasPassword ? 'Yes' : 'No'}
            </span>
          </div>
          
          {passwordStatus?.hasPassword && passwordStatus.lastUpdated && (
            <div className="flex items-center justify-between">
              <span>Last Updated:</span>
              <span className="text-muted-foreground">
                {new Date(passwordStatus.lastUpdated).toLocaleDateString()}
              </span>
            </div>
          )}

          {!passwordStatus?.canChangePassword && passwordStatus?.daysUntilCanChange > 0 && (
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                You can change your password in {passwordStatus.daysUntilCanChange} day(s). 
                Passwords can only be changed once every 7 days.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Password Change Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {passwordStatus?.hasPassword ? 'Change Password' : 'Create Password'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password (only if user already has one) */}
            {passwordStatus?.hasPassword && (
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                    disabled={!passwordStatus?.canChangePassword}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 8 characters)"
                  required
                  disabled={!passwordStatus?.canChangePassword}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {newPassword.length > 0 && (
                <div className={`text-sm ${isPasswordValid ? 'text-green-500' : 'text-red-500'}`}>
                  {isPasswordValid ? '✓ Password meets requirements' : '✗ Password must be at least 8 characters'}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  disabled={!passwordStatus?.canChangePassword}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {confirmPassword.length > 0 && (
                <div className={`text-sm ${doPasswordsMatch ? 'text-green-500' : 'text-red-500'}`}>
                  {doPasswordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              disabled={
                changePasswordMutation.isPending || 
                !passwordStatus?.canChangePassword ||
                !isPasswordValid ||
                !doPasswordsMatch ||
                isCurrentPasswordRequired
              }
            >
              {changePasswordMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                  {passwordStatus?.hasPassword ? 'Updating Password...' : 'Creating Password...'}
                </div>
              ) : (
                passwordStatus?.hasPassword ? 'Update Password' : 'Create Password'
              )}
            </Button>

            {!passwordStatus?.canChangePassword && passwordStatus?.daysUntilCanChange > 0 && (
              <p className="text-sm text-muted-foreground text-center">
                Password changes are limited to once every 7 days for security.
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Password Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Minimum 8 characters long</li>
            <li>• Can only be changed once every 7 days</li>
            <li>• Use a strong, unique password</li>
            <li>• After setting a password, you can login with email and password</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}