// Reusable Glass Card Component with premium styling and hover effects
const GlassCard = ({
    children,
    className = '',
    hoverEffect = true,
    padding = 'p-5',
    onClick = null
}) => {
    return (
        <div
            className={`
                relative rounded-2xl overflow-hidden
                transition-all duration-500 ease-out
                ${hoverEffect ? 'hover:scale-[1.02] hover:-translate-y-1 cursor-pointer' : ''}
                ${padding}
                group
                ${className}
            `}
            style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.04) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
            }}
            onClick={onClick}
        >
            {/* Shimmer effect on hover */}
            {hoverEffect && (
                <div
                    className="shimmer-effect absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                    style={{
                        background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)',
                        transform: 'translateX(-100%)',
                        animation: 'shimmer 1.5s ease-in-out'
                    }}
                />
            )}

            {/* Metallic gradient on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                style={{
                    background: `linear-gradient(135deg, 
                        rgba(191, 179, 253, 0.12) 0%, 
                        rgba(139, 92, 246, 0.05) 25%,
                        rgba(88, 28, 135, 0.08) 50%,
                        rgba(139, 92, 246, 0.05) 75%,
                        rgba(191, 179, 253, 0.12) 100%)`
                }}
            />

            {/* Top shine */}
            <div
                className="absolute top-0 left-0 right-0 h-px opacity-40 group-hover:opacity-80 transition-opacity duration-500"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)' }}
            />

            {/* Border glow on hover */}
            {hoverEffect && (
                <div
                    className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{
                        background: 'linear-gradient(135deg, rgba(191, 179, 253, 0.3) 0%, rgba(139, 92, 246, 0.15) 100%)',
                        filter: 'blur(8px)'
                    }}
                />
            )}

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default GlassCard;
