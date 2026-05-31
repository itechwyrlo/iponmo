import { useState, useEffect } from 'react';
import { getProfile } from '../services/profileService';
import { useAuthContext } from '../../../context/AuthContext';
export function useProfile() {
    const { token } = useAuthContext();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!token)
            return;
        setLoading(true);
        getProfile(token)
            .then(setProfile)
            .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load profile.'))
            .finally(() => setLoading(false));
    }, [token]);
    return { profile, loading, error };
}
