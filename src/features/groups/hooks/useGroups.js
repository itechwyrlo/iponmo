import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { getGroups } from '../services/groupService';
export function useGroups() {
    const { token } = useAuthContext();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trigger, setTrigger] = useState(0);
    useEffect(() => {
        if (!token)
            return;
        let cancelled = false;
        setLoading(true);
        setError(null);
        getGroups(token)
            .then((data) => { if (!cancelled)
            setGroups(data); })
            .catch((err) => {
            if (!cancelled)
                setError(err instanceof Error ? err.message : 'Failed to load groups.');
        })
            .finally(() => { if (!cancelled)
            setLoading(false); });
        return () => { cancelled = true; };
    }, [token, trigger]);
    function refetch() { setTrigger((prev) => prev + 1); }
    return { groups, loading, error, refetch };
}
