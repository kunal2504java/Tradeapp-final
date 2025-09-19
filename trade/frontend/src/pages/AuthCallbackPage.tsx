import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      setToken(token);
      navigate('/app', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate, searchParams, setToken]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Signing you in, please wait...</p>
    </div>
  );
}

