import { LucideIcon } from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SideBarNavProps {
  navigationItems: NavigationItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function SideBarNav({
  navigationItems,
  activeTab,
  setActiveTab,
}: SideBarNavProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  activeTab === item.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-light">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
