import { useState, useEffect } from 'react';
import type { ProfileResponse } from '../types/profile.types';
import { getProfile } from '../services/profileService';
import { useAuthContext } from '../../../context/AuthContext';

interface UseProfileReturn {
  profile: ProfileResponse | null;
  loading: boolean;
  error: string | null;
}

export function useProfile(): UseProfileReturn {
  const { token } = useAuthContext();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getProfile(token)
      .then(setProfile)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Failed to load profile.')
      )
      .finally(() => setLoading(false));
  }, [token]);

  return { profile, loading, error };
}
