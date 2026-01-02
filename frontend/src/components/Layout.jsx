import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutGrid,
    FolderKanban,
    CheckSquare,
    Settings,
    LogOut,
    Calendar,
    Menu,
    X,
    UserPlus,
    Command
} from 'lucide-react';
import CommandPalette from './CommandPalette';


const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(true); // Default open on desktop
    const [isCmdOpen, setCmdOpen] = useState(false);

    const navItems = [
        { label: 'Dashboard', icon: LayoutGrid, path: '/' },
        { label: 'Calendar', icon: Calendar, path: '/calendar' },
        { label: 'Projects', icon: FolderKanban, path: '/' },
        { label: 'My Tasks', icon: CheckSquare, path: '#' },
        { label: 'Settings', icon: Settings, path: '/settings' },
    ];


    return (
        <div className="min-h-screen bg-zen-bg text-txt-main flex font-sans">
            <CommandPalette isOpen={isCmdOpen} onClose={() => setCmdOpen(false)} />

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-zen-bg border-r border-zen-border transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:relative lg:translate-x-0`}
            >
                <div className="h-full flex flex-col p-4">
                    {/* Brand */}
                    <div className="flex items-center gap-2 px-2 pb-8 pt-2">
                        <div className="px-2 py-1 rounded bg-white flex items-center justify-center">
                            <span className="text-black font-bold text-sm tracking-tighter">NEXUS</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1 flex-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition-colors ${isActive
                                        ? 'bg-zen-subtle text-txt-main'
                                        : 'text-txt-muted hover:text-txt-main hover:bg-zen-subtle/50'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            );
                        })}

                        <Link
                            to="/settings?tab=team"
                            className="w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-medium text-txt-muted hover:text-txt-main hover:bg-zen-subtle/50 transition-colors text-left mt-2"
                        >
                            <UserPlus className="w-4 h-4" />
                            Team & Access
                        </Link>
                    </nav>

                    {/* User Profile */}
                    <div className="pt-4 border-t border-zen-border mt-auto">
                        <div className="flex items-center gap-3 px-2 mb-4">
                            <div className="w-8 h-8 rounded bg-zen-subtle border border-zen-border flex items-center justify-center text-xs font-medium">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{user?.name}</p>
                                <p className="text-xs text-txt-dim truncate">{user?.role}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-2 px-2 py-2 text-sm text-txt-muted hover:text-red-400 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-14 border-b border-zen-border flex items-center justify-between px-6 bg-zen-bg/50 backdrop-blur sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden text-txt-muted">
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        {/* Breadcrumb Mock */}
                        <div className="hidden md:flex items-center text-sm text-txt-muted">
                            <span>Nexus</span>
                            <span className="mx-2">/</span>
                            <span className="text-txt-main">{location.pathname === '/' ? 'Dashboard' : 'Project'}</span>
                        </div>
                    </div>

                    {/* Command Trigger */}
                    <button
                        onClick={() => setCmdOpen(true)}
                        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded border border-zen-border bg-zen-subtle hover:border-txt-dim transition-colors group"
                    >
                        <Command className="w-3 h-3 text-txt-dim group-hover:text-txt-main" />
                        <span className="text-xs text-txt-muted group-hover:text-txt-main">Search...</span>
                        <kbd className="ml-2 text-[10px] font-mono text-txt-dim bg-black/20 px-1 rounded">⌘K</kbd>
                    </button>

                    <button onClick={() => setCmdOpen(true)} className="md:hidden text-txt-muted">
                        <Command size={20} />
                    </button>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
