const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function getProfile(token) {
    const response = await fetch(`${BASE_URL}/api/profiles`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
    });
    if (!response.ok)
        throw new Error('Failed to load profile.');
    return response.json();
}
