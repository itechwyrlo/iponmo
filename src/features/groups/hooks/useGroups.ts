import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { getGroups } from '../services/groupService';
import type { GroupSummary } from '../types/group.types';

interface UseGroupsResult {
  groups: GroupSummary[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGroups(): UseGroupsResult {
  const { token } = useAuthContext();
  const [groups, setGroups] = useState<GroupSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    getGroups(token)
      .then((data) => { if (!cancelled) setGroups(data); })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load groups.');
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [token, trigger]);

  function refetch() { setTrigger((prev) => prev + 1); }

  return { groups, loading, error, refetch };
}
