import { motion } from 'framer-motion';
import { Mail, Clock, Shield, User } from 'lucide-react';

const MemberCard = ({ member, onResend }) => {
    const isPending = member.status === 'pending';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`
                flex items-center gap-4 p-4 rounded-lg border transition-all relative group
                ${isPending
                    ? 'border-dashed border-zinc-700 bg-zen-subtle/30'
                    : 'border-zen-border bg-zen-surface'}
            `}
        >
            {/* Avatar */}
            <div className={`
                w-10 h-10 rounded-full flex items-center justify-center border font-medium text-sm
                ${isPending ? 'border-zinc-700 text-zinc-500 bg-transparent' : 'border-zen-border bg-zen-subtle text-txt-main'}
            `}>
                {isPending ? <Clock size={16} /> : (member.name?.charAt(0) || <User size={16} />)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h3 className={`font-medium text-sm ${isPending ? 'text-txt-muted italic' : 'text-txt-main'}`}>
                        {isPending ? 'Pending Invite' : member.name}
                    </h3>
                    {member.role === 'admin' && (
                        <span className="text-[10px] font-mono border border-indigo-900 text-indigo-400 bg-indigo-950/30 px-1.5 rounded">
                            ADMIN
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 text-xs text-txt-dim">
                    <Mail size={12} />
                    <span className="truncate">{member.email}</span>
                </div>
            </div>

            {/* Actions */}
            {isPending && (
                <button
                    onClick={() => onResend(member.email)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-xs text-indigo-400 hover:bg-indigo-950/30 rounded"
                >
                    Resend
                </button>
            )}
        </motion.div>
    );
};

export default MemberCard;
