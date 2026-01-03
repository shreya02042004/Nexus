import { useState } from 'react';
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
    Search,
    Bell,
    FileText,
    Sparkles
} from 'lucide-react';
import CommandPalette from './CommandPalette';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isCmdOpen, setCmdOpen] = useState(false);

    const overviewItems = [
        { label: 'Dashboard', icon: LayoutGrid, path: '/' },
        { label: 'Projects', icon: FolderKanban, path: '/projects' },
    ];

    const accountItems = [
        { label: 'My Tasks', icon: CheckSquare, path: '/tasks' },
        { label: 'Documents', icon: FileText, path: '/documents' },
        { label: 'Calendar', icon: Calendar, path: '/calendar' },
        { label: 'Settings', icon: Settings, path: '/settings' },
    ];

    const isActivePath = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <div className="min-h-screen flex" style={{ backgroundColor: '#0a0a0f' }}>
            <CommandPalette isOpen={isCmdOpen} onClose={() => setCmdOpen(false)} />

            {/* Glassmorphism Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:relative lg:translate-x-0`}
                style={{
                    background: 'linear-gradient(180deg, rgba(20, 20, 30, 0.8) 0%, rgba(15, 15, 25, 0.9) 100%)',
                    backdropFilter: 'blur(20px)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.06)'
                }}
            >
                <div className="h-full flex flex-col p-5">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-2 px-2 pb-8 pt-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#BFB3FD' }} />
                        <span className="text-white text-base font-medium tracking-tight">Nexus</span>
                    </Link>

                    {/* Overview Section */}
                    <div className="mb-2">
                        <span className="px-3 text-[10px] font-medium uppercase tracking-wider" style={{ color: '#87878B' }}>
                            Overview
                        </span>
                    </div>

                    {/* Overview Items */}
                    <nav className="space-y-1">
                        {overviewItems.map((item) => {
                            const isActive = isActivePath(item.path);
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                    style={isActive ? {
                                        background: 'linear-gradient(90deg, rgba(191, 179, 253, 0.15) 0%, transparent 100%)',
                                        borderLeft: '2px solid #BFB3FD'
                                    } : {}}
                                >
                                    <Icon className="w-4 h-4" style={isActive ? { color: '#BFB3FD' } : {}} />
                                    {item.label}
                                    {isActive && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#BFB3FD' }} />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Account Section */}
                    <div className="pt-6 pb-2">
                        <span className="px-3 text-[10px] font-medium uppercase tracking-wider" style={{ color: '#87878B' }}>
                            Account
                        </span>
                    </div>

                    {/* Account Items */}
                    <nav className="space-y-1 flex-1">
                        {accountItems.map((item) => {
                            const isActive = isActivePath(item.path);
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                    style={isActive ? {
                                        background: 'linear-gradient(90deg, rgba(191, 179, 253, 0.15) 0%, transparent 100%)',
                                        borderLeft: '2px solid #BFB3FD'
                                    } : {}}
                                >
                                    <Icon className="w-4 h-4" style={isActive ? { color: '#BFB3FD' } : {}} />
                                    {item.label}
                                    {isActive && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#BFB3FD' }} />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Dark Mode Toggle */}
                    <div className="py-4 border-t border-white/5">
                        <div className="flex items-center justify-between px-3 py-2">
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <Sparkles className="w-4 h-4" />
                                <span>Dark Mode</span>
                            </div>
                            <div
                                className="w-10 h-5 rounded-full p-0.5 cursor-pointer"
                                style={{ backgroundColor: '#BFB3FD' }}
                            >
                                <div className="w-4 h-4 rounded-full bg-white ml-auto" />
                            </div>
                        </div>
                    </div>

                    {/* Upgrade Card */}
                    <div
                        className="rounded-xl p-4 mb-4"
                        style={{
                            background: 'linear-gradient(135deg, rgba(191, 179, 253, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                            border: '1px solid rgba(191, 179, 253, 0.2)'
                        }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4" style={{ color: '#BFB3FD' }} />
                            <span className="text-white text-sm font-medium">Activate Super</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">Unlock all features</p>
                        <button
                            className="w-full py-2 rounded-lg text-xs font-medium text-white transition-all hover:opacity-90"
                            style={{ backgroundColor: '#BFB3FD' }}
                        >
                            Upgrade Now
                        </button>
                    </div>

                    {/* User Profile */}
                    <div className="pt-2 border-t border-white/5">
                        <div className="flex items-center gap-3 px-2 py-3">
                            <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium text-white"
                                style={{ background: 'linear-gradient(135deg, #BFB3FD 0%, #8B5CF6 100%)' }}
                            >
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email || 'user@email.com'}</p>
                            </div>
                            <button onClick={logout} className="text-gray-500 hover:text-red-400 transition-colors">
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header
                    className="h-16 flex items-center justify-between px-6 sticky top-0 z-30"
                    style={{
                        background: 'rgba(10, 10, 15, 0.8)',
                        backdropFilter: 'blur(20px)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                >
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden text-gray-400">
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>

                        {/* Welcome Message */}
                        <div className="hidden md:block">
                            <h1 className="text-white text-lg font-medium">
                                Welcome Back, <span style={{ color: '#BFB3FD' }}>{user?.name?.split(' ')[0] || 'User'}</span>
                            </h1>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <button
                            onClick={() => setCmdOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 text-sm transition-colors hover:bg-white/5"
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.06)'
                            }}
                        >
                            <Search className="w-4 h-4" />
                            <span className="hidden sm:inline">Search</span>
                            <kbd className="hidden sm:inline ml-2 text-[10px] font-mono text-gray-600 bg-black/30 px-1.5 py-0.5 rounded">⌘K</kbd>
                        </button>

                        {/* Notifications */}
                        <button
                            className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            <Bell className="w-5 h-5" />
                            <span
                                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                                style={{ backgroundColor: '#BFB3FD' }}
                            />
                        </button>

                        {/* User Avatar */}
                        <Link
                            to="/settings"
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium text-white cursor-pointer"
                            style={{ background: 'linear-gradient(135deg, #BFB3FD 0%, #8B5CF6 100%)' }}
                        >
                            {user?.name?.charAt(0) || 'U'}
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main
                    className="flex-1 p-6 overflow-auto"
                    style={{ backgroundColor: '#0a0a0f' }}
                >
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
