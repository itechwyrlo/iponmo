import { useState, useEffect } from 'react';
import type { ProfileResponse } from '../types/profile.types';
import { getProfile } from '../services/profileService';
import { useAuthContext } from '../../../context/AuthContext';

interface UseProfileReturn {
  profile: ProfileResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProfile(): UseProfileReturn {
  const { token } = useAuthContext();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    getProfile(token)
      .then((data) => { if (!cancelled) setProfile(data); })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load profile.');
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [token, trigger]);

  function refetch() { setTrigger((prev) => prev + 1); }

  return { profile, loading, error, refetch };
}
