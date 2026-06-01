import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';

type NavTab = 'home' | 'profile';

const tabRoutes: Record<NavTab, string> = {
  home: '/',
  profile: '/profile',
};

function getActiveTab(pathname: string): NavTab {
  if (pathname.startsWith('/profile')) return 'profile';
  return 'home';
}

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = getActiveTab(location.pathname);
  const showNav = !location.pathname.startsWith('/groups/');

  function handleTabChange(tab: NavTab) {
    navigate(tabRoutes[tab]);
  }

  return (
    <>
      <Outlet />
      {showNav && <BottomNav active={activeTab} onChange={handleTabChange} />}
    </>
  );
}
