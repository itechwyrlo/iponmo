type NavTab = 'home' | 'profile';

interface BottomNavProps {
  active: NavTab;
  onChange: (tab: NavTab) => void;
}

const navItems: { key: NavTab; label: string; icon: string }[] = [
  { key: 'home', label: 'Home', icon: '⌂' },
  { key: 'profile', label: 'Profile', icon: '○' },
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.key}
          className={`nav-item ${active === item.key ? 'active' : ''}`}
          onClick={() => onChange(item.key)}
        >
          <span style={{ fontSize: 20 }}>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}
