import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { getGroupDetail, getGroupMembers, getGroupPayments, getGroupHistory, markPaymentAsPaid, addMember, } from '../services/groupService';
import toast from 'react-hot-toast';
export function useGroupDetail(groupId) {
    const { token } = useAuthContext();
    const [detail, setDetail] = useState(null);
    const [members, setMembers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [history, setHistory] = useState([]);
    const [loadingDetail, setLoadingDetail] = useState(true);
    const [loadingTab, setLoadingTab] = useState(false);
    const [activeTab, setActiveTab] = useState('payments');
    const [loadedTabs, setLoadedTabs] = useState(new Set());
    useEffect(() => {
        if (!token)
            return;
        let cancelled = false;
        setLoadingDetail(true);
        getGroupDetail(token, groupId)
            .then((data) => { if (!cancelled)
            setDetail(data); })
            .catch(() => { if (!cancelled)
            toast.error('Failed to load group.'); })
            .finally(() => { if (!cancelled)
            setLoadingDetail(false); });
        return () => { cancelled = true; };
    }, [token, groupId]);
    useEffect(() => {
        if (!token || loadedTabs.has(activeTab))
            return;
        let cancelled = false;
        setLoadingTab(true);
        const fetchers = {
            payments: () => getGroupPayments(token, groupId)
                .then((data) => { if (!cancelled)
                setPayments(data); }),
            members: () => getGroupMembers(token, groupId)
                .then((data) => { if (!cancelled)
                setMembers(data); }),
            history: () => getGroupHistory(token, groupId)
                .then((data) => { if (!cancelled)
                setHistory(data); }),
        };
        fetchers[activeTab]()
            .catch(() => { if (!cancelled)
            toast.error(`Failed to load ${activeTab}.`); })
            .finally(() => {
            if (!cancelled) {
                setLoadingTab(false);
                setLoadedTabs((prev) => new Set(prev).add(activeTab));
            }
        });
        return () => { cancelled = true; };
    }, [token, groupId, activeTab, loadedTabs]);
    async function handleMarkPaid(memberId) {
        if (!token)
            return;
        try {
            await markPaymentAsPaid(token, groupId, memberId);
            setPayments((prev) => prev.map((p) => p.memberId === memberId
                ? { ...p, isPaid: true, paidAt: new Date().toISOString() }
                : p));
            toast.success('Payment confirmed.');
        }
        catch {
            toast.error('Failed to mark payment.');
        }
    }
    async function handleAddMember(accountId, slotNumber) {
        if (!token)
            return;
        await addMember(token, groupId, { accountId, slotNumber });
        const updated = await getGroupMembers(token, groupId);
        setMembers(updated);
    }
    return {
        detail,
        members,
        payments,
        history,
        loadingDetail,
        loadingTab,
        activeTab,
        setActiveTab,
        handleMarkPaid,
        handleAddMember,
    };
}
