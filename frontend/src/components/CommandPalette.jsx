import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, ArrowRight } from 'lucide-react';

const CommandPalette = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onClose(); // Toggle handled by parent usually, but here we assume 'isOpen' is controlled
            }
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    const handleNavigate = (path) => {
        navigate(path);
        onClose();
        setQuery('');
    };

    // Mock results for demo
    const mockResults = [
        { id: 1, label: 'Go to Dashboard', path: '/', type: 'Navigation' },
        { id: 2, label: 'Create New Project', path: '/', action: true, type: 'Action' }, // Just navs to dash for now
        { id: 3, label: 'Profile Settings', path: '/profile', type: 'Settings' },
    ].filter(item => item.label.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[20vh] p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-xl bg-zen-bg border border-zen-border rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Input Area */}
                <div className="flex items-center px-4 border-b border-zen-border">
                    <Search className="w-5 h-5 text-txt-dim" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Type a command or search..."
                        className="w-full bg-transparent border-none px-4 py-4 text-txt-main placeholder-txt-dim focus:ring-0 text-lg"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="flex gap-1">
                        <kbd className="px-2 py-0.5 text-xs font-mono text-txt-dim bg-zen-subtle rounded border border-zen-border">ESC</kbd>
                    </div>
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto p-2">
                    {mockResults.length > 0 ? (
                        <div className="space-y-1">
                            {mockResults.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigate(item.path)}
                                    className="w-full text-left px-3 py-2 rounded flex items-center justify-between group hover:bg-zen-subtle transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Command className="w-4 h-4 text-txt-dim group-hover:text-txt-main" />
                                        <span className="text-txt-muted group-hover:text-txt-main">{item.label}</span>
                                    </div>
                                    <ArrowRight className="w-3 h-3 text-txt-dim opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center text-txt-dim text-sm">
                            No results found.
                        </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-zen-border px-2">
                        <p className="text-xs text-txt-dim">Pro Tip: Use <span className="font-mono">Tab</span> to navigate results.</p>
                    </div>
                </div>
            </div>

            {/* Backdrop click to close */}
            <div className="absolute inset-0 -z-10" onClick={onClose}></div>
        </div>
    );
};

export default CommandPalette;
