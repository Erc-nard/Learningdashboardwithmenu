type Tab = 'main' | 'add' | 'calendar' | 'settings';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems: { id: Tab; emoji: string; label: string }[] = [
    { id: 'main', emoji: '🏠', label: '메인' },
    { id: 'add', emoji: '➕', label: '추가' },
    { id: 'calendar', emoji: '📅', label: '달력' },
    { id: 'settings', emoji: '⚙️', label: '설정' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === item.id
                ? 'bg-secondary text-secondary-foreground'
                : 'text-muted-foreground hover:bg-accent'
            }`}
          >
            <span className="text-2xl mb-1">{item.emoji}</span>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export type { Tab };
