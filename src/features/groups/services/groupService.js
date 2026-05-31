import { apiFetch } from '../../auth/services/apiFetch';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const JSON_CONTENT = { 'Content-Type': 'application/json' };
export async function getGroups(token) {
    const response = await apiFetch(`${BASE_URL}/api/groups`, {}, token);
    if (!response.ok)
        throw new Error('Failed to load groups.');
    const body = await response.json();
    return body.data;
}
export async function getGroupDetail(token, groupId) {
    const response = await apiFetch(`${BASE_URL}/api/groups/${groupId}`, {}, token);
    if (!response.ok)
        throw new Error('Failed to load group.');
    return response.json();
}
export async function getGroupMembers(token, groupId) {
    const response = await apiFetch(`${BASE_URL}/api/groups/${groupId}/members`, {}, token);
    if (!response.ok)
        throw new Error('Failed to load members.');
    return response.json();
}
export async function getGroupPayments(token, groupId) {
    const response = await apiFetch(`${BASE_URL}/api/groups/${groupId}/payments`, {}, token);
    if (!response.ok)
        throw new Error('Failed to load payments.');
    return response.json();
}
export async function getGroupHistory(token, groupId) {
    const response = await apiFetch(`${BASE_URL}/api/groups/${groupId}/history`, {}, token);
    if (!response.ok)
        throw new Error('Failed to load history.');
    return response.json();
}
export async function createGroup(token, data) {
    const response = await apiFetch(`${BASE_URL}/api/groups`, {
        method: 'POST',
        headers: JSON_CONTENT,
        body: JSON.stringify(data),
    }, token);
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to create group.' }));
        throw new Error(error.message ?? 'Failed to create group.');
    }
    return response.json();
}
export async function markPaymentAsPaid(token, groupId, memberId) {
    const response = await apiFetch(`${BASE_URL}/api/groups/${groupId}/payments/${memberId}/paid`, { method: 'PATCH' }, token);
    if (!response.ok)
        throw new Error('Failed to mark payment.');
}
export async function addMember(token, groupId, data) {
    const response = await apiFetch(`${BASE_URL}/api/groups/${groupId}/members`, {
        method: 'POST',
        headers: JSON_CONTENT,
        body: JSON.stringify(data),
    }, token);
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to add member.' }));
        throw new Error(error.message ?? 'Failed to add member.');
    }
}
