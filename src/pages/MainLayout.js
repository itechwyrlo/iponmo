import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
const tabRoutes = {
    home: '/',
    profile: '/profile',
};
function getActiveTab(pathname) {
    if (pathname.startsWith('/profile'))
        return 'profile';
    return 'home';
}
export function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const activeTab = getActiveTab(location.pathname);
    const showNav = !location.pathname.startsWith('/groups/');
    function handleTabChange(tab) {
        navigate(tabRoutes[tab]);
    }
    return (_jsxs(_Fragment, { children: [_jsx(Outlet, {}), showNav && _jsx(BottomNav, { active: activeTab, onChange: handleTabChange })] }));
}
