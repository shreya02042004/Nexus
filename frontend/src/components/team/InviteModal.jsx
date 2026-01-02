import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

const InviteModal = ({ isOpen, onClose, onInvite }) => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('member');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onInvite(email, role);
        setLoading(false);
        setEmail('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-zen-surface border border-zen-border rounded-lg w-full max-w-md p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-txt-main">Invite Member</h2>
                    <button onClick={onClose} className="text-txt-muted hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-mono text-txt-dim mb-1.5 uppercase">Email Address</label>
                        <input
                            type="email"
                            required
                            className="input-zen"
                            placeholder="colleague@nexus.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-txt-dim mb-1.5 uppercase">Role</label>
                        <div className="grid grid-cols-2 gap-3">
                            {['member', 'admin'].map((r) => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setRole(r)}
                                    className={`
                                        px-3 py-2 rounded text-sm font-medium border text-center capitalize transition-colors
                                        ${role === r
                                            ? 'bg-txt-main text-black border-txt-main'
                                            : 'bg-transparent border-zen-border text-txt-muted hover:border-txt-muted'}
                                    `}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-zen btn-zen-primary"
                        >
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Send Invitation'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InviteModal;
