import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Monitor, Moon, Sun, Users, User } from 'lucide-react';
import TeamSection from '../components/team/TeamSection';

const Settings = () => {
    const { theme, setTheme } = useTheme();
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab === 'team') {
            setActiveTab('team');
        }
    }, [searchParams]);

    const themes = [
        { id: 'dark', label: 'Zen Dark', icon: Moon, description: 'Default high-contrast dark mode.' },
        { id: 'light', label: 'Zen Light', icon: Sun, description: 'Clean, bright workspace.' },
        { id: 'midnight', label: 'Midnight', icon: Monitor, description: 'Deep blue hues for night focus.' },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 tracking-tight">Settings</h1>

            {/* Tabs */}
            <div className="flex items-center gap-1 mb-8 border-b border-zen-border">
                <button
                    onClick={() => setActiveTab('general')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'general' ? 'border-txt-main text-txt-main' : 'border-transparent text-txt-muted hover:text-txt-main'}`}
                >
                    General
                </button>
                <button
                    onClick={() => setActiveTab('team')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'team' ? 'border-txt-main text-txt-main' : 'border-transparent text-txt-muted hover:text-txt-main'}`}
                >
                    Team & Access
                </button>
            </div>

            {activeTab === 'general' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                    <section className="slab p-6">
                        <h2 className="text-lg font-semibold mb-1">Appearance</h2>
                        <p className="text-txt-muted text-sm mb-6">Customize the look and feel of Nexus.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {themes.map((t) => {
                                const Icon = t.icon;
                                const isSelected = theme === t.id;
                                return (
                                    <button
                                        key={t.id}
                                        onClick={() => setTheme(t.id)}
                                        className={`
                                            flex flex-col items-start p-4 rounded-lg border text-left transition-all
                                            ${isSelected
                                                ? 'bg-zen-subtle border-txt-muted ring-1 ring-txt-muted'
                                                : 'bg-transparent border-zen-border hover:bg-zen-subtle/50'}
                                        `}
                                    >
                                        <div className="p-2 rounded bg-zen-bg border border-zen-border mb-3">
                                            <Icon size={20} className={isSelected ? 'text-txt-main' : 'text-txt-muted'} />
                                        </div>
                                        <span className={`font-medium mb-1 ${isSelected ? 'text-txt-main' : 'text-txt-muted'}`}>
                                            {t.label}
                                        </span>
                                        <p className="text-xs text-txt-dim">
                                            {t.description}
                                        </p>
                                    </button>
                                )
                            })}
                        </div>
                    </section>

                    <section className="slab p-6 opacity-50 pointer-events-none">
                        <h2 className="text-lg font-semibold mb-1">Account (Coming Soon)</h2>
                        <p className="text-txt-muted text-sm">Manage your profile and security.</p>
                    </section>
                </div>
            )}

            {activeTab === 'team' && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <TeamSection />
                </div>
            )}
        </div>
    );
};

export default Settings;
