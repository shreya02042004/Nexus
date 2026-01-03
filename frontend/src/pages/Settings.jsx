import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/ui/GlassCard';
import {
    User, Palette, Bell, Shield, Save, Camera, Moon, Sun,
    Mail, Lock, Eye, EyeOff, Check
} from 'lucide-react';

const Settings = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);
    const [saved, setSaved] = useState(false);

    const [profile, setProfile] = useState({
        name: user?.name || 'User',
        email: user?.email || 'user@email.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [preferences, setPreferences] = useState({
        theme: 'dark',
        accentColor: '#BFB3FD',
        compactMode: false
    });

    const [notifications, setNotifications] = useState({
        email: true,
        desktop: true,
        taskReminders: true,
        projectUpdates: true,
        teamActivity: false,
        weeklyDigest: true
    });

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    const accentColors = [
        '#BFB3FD', '#8B5CF6', '#EC4899', '#F59E0B', '#22C55E', '#06B6D4', '#EF4444', '#3B82F6'
    ];

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-gray-500 text-sm mt-1">Manage your account and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <GlassCard hoverEffect={false} padding="p-2">
                        <nav className="space-y-1">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                                ? 'bg-white/10 text-white'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </GlassCard>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <>
                            <GlassCard hoverEffect={false}>
                                <h3 className="text-white font-semibold mb-6">Profile Information</h3>

                                {/* Avatar */}
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="relative">
                                        <div
                                            className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white"
                                            style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #BFB3FD 100%)' }}
                                        >
                                            {profile.name.charAt(0)}
                                        </div>
                                        <button className="absolute -bottom-1 -right-1 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                                            <Camera className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{profile.name}</p>
                                        <p className="text-gray-500 text-sm">{user?.role || 'Member'}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">Full Name</label>
                                        <input
                                            type="text"
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">Email</label>
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                                        />
                                    </div>
                                </div>
                            </GlassCard>

                            <GlassCard hoverEffect={false}>
                                <h3 className="text-white font-semibold mb-6">Change Password</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">Current Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={profile.currentPassword}
                                                onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">New Password</label>
                                            <input
                                                type="password"
                                                value={profile.newPassword}
                                                onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">Confirm Password</label>
                                            <input
                                                type="password"
                                                value={profile.confirmPassword}
                                                onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </>
                    )}

                    {/* Appearance Tab */}
                    {activeTab === 'appearance' && (
                        <GlassCard hoverEffect={false}>
                            <h3 className="text-white font-semibold mb-6">Appearance</h3>

                            {/* Theme */}
                            <div className="mb-6">
                                <label className="block text-xs text-gray-400 mb-3 uppercase tracking-wider">Theme</label>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setPreferences({ ...preferences, theme: 'light' })}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${preferences.theme === 'light'
                                                ? 'border-purple-500 bg-white/10'
                                                : 'border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <Sun className="w-5 h-5 text-yellow-400" />
                                        <span className="text-white">Light</span>
                                    </button>
                                    <button
                                        onClick={() => setPreferences({ ...preferences, theme: 'dark' })}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${preferences.theme === 'dark'
                                                ? 'border-purple-500 bg-white/10'
                                                : 'border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <Moon className="w-5 h-5 text-purple-400" />
                                        <span className="text-white">Dark</span>
                                    </button>
                                </div>
                            </div>

                            {/* Accent Color */}
                            <div className="mb-6">
                                <label className="block text-xs text-gray-400 mb-3 uppercase tracking-wider">Accent Color</label>
                                <div className="flex gap-3">
                                    {accentColors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setPreferences({ ...preferences, accentColor: color })}
                                            className={`w-10 h-10 rounded-xl transition-all ${preferences.accentColor === color
                                                    ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0f]'
                                                    : 'hover:scale-110'
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Compact Mode */}
                            <div className="flex items-center justify-between py-3 border-t border-white/5">
                                <div>
                                    <p className="text-white font-medium">Compact Mode</p>
                                    <p className="text-gray-500 text-sm">Reduce spacing and padding</p>
                                </div>
                                <button
                                    onClick={() => setPreferences({ ...preferences, compactMode: !preferences.compactMode })}
                                    className={`w-12 h-6 rounded-full p-1 transition-colors ${preferences.compactMode ? 'bg-purple-500' : 'bg-white/10'
                                        }`}
                                >
                                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${preferences.compactMode ? 'translate-x-6' : ''
                                        }`} />
                                </button>
                            </div>
                        </GlassCard>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <GlassCard hoverEffect={false}>
                            <h3 className="text-white font-semibold mb-6">Notification Preferences</h3>

                            <div className="space-y-4">
                                {[
                                    { key: 'email', label: 'Email Notifications', desc: 'Receive notifications via email' },
                                    { key: 'desktop', label: 'Desktop Notifications', desc: 'Show browser notifications' },
                                    { key: 'taskReminders', label: 'Task Reminders', desc: 'Get reminded about upcoming tasks' },
                                    { key: 'projectUpdates', label: 'Project Updates', desc: 'Notify about project changes' },
                                    { key: 'teamActivity', label: 'Team Activity', desc: 'Updates about team member actions' },
                                    { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of weekly progress' },
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                        <div>
                                            <p className="text-white font-medium">{item.label}</p>
                                            <p className="text-gray-500 text-sm">{item.desc}</p>
                                        </div>
                                        <button
                                            onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                                            className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications[item.key] ? 'bg-purple-500' : 'bg-white/10'
                                                }`}
                                        >
                                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications[item.key] ? 'translate-x-6' : ''
                                                }`} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <GlassCard hoverEffect={false}>
                            <h3 className="text-white font-semibold mb-6">Security Settings</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-4 border-b border-white/5">
                                    <div>
                                        <p className="text-white font-medium">Two-Factor Authentication</p>
                                        <p className="text-gray-500 text-sm">Add an extra layer of security</p>
                                    </div>
                                    <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors">
                                        Enable
                                    </button>
                                </div>

                                <div className="flex items-center justify-between py-4 border-b border-white/5">
                                    <div>
                                        <p className="text-white font-medium">Active Sessions</p>
                                        <p className="text-gray-500 text-sm">Manage your logged in devices</p>
                                    </div>
                                    <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors">
                                        View All
                                    </button>
                                </div>

                                <div className="flex items-center justify-between py-4">
                                    <div>
                                        <p className="text-red-400 font-medium">Delete Account</p>
                                        <p className="text-gray-500 text-sm">Permanently delete your account</p>
                                    </div>
                                    <button className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-colors">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    )}

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${saved
                                    ? 'bg-green-500 text-white'
                                    : 'hover:shadow-lg hover:shadow-purple-500/20'
                                }`}
                            style={!saved ? { backgroundColor: '#BFB3FD', color: '#0a0a0f' } : {}}
                        >
                            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                            {saved ? 'Saved!' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
