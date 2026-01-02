import { Check } from 'lucide-react';

const CalendarSidebar = ({ projects, selectedProjectIds, onToggleProject }) => {
    return (
        <div className="w-64 bg-zen-bg border-r border-zen-border flex flex-col h-full flex-shrink-0">
            <div className="p-4 border-b border-zen-border">
                <h2 className="text-sm font-semibold text-txt-main tracking-tight">Projects</h2>
                <p className="text-xs text-txt-muted mt-1">Filter events by project</p>
            </div>

            <div className="p-4 space-y-2 overflow-y-auto flex-1">
                {projects.map((project) => {
                    const isSelected = selectedProjectIds.includes(project._id);
                    return (
                        <div
                            key={project._id}
                            onClick={() => onToggleProject(project._id)}
                            className={`
                                flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-colors border
                                ${isSelected
                                    ? 'bg-zen-subtle border-zen-border text-txt-main'
                                    : 'bg-transparent border-transparent text-txt-muted hover:bg-zen-subtle/50'}
                            `}
                        >
                            <div
                                className={`
                                    w-4 h-4 rounded border flex items-center justify-center transition-colors
                                    ${isSelected ? 'border-transparent' : 'border-zinc-700'}
                                `}
                                style={{
                                    backgroundColor: isSelected ? project.color || '#6366f1' : 'transparent',
                                }}
                            >
                                {isSelected && <Check size={10} className="text-white" />}
                            </div>
                            <span className="text-sm font-medium truncate select-none">{project.name}</span>
                        </div>
                    );
                })}

                {projects.length === 0 && (
                    <p className="text-xs text-txt-dim text-center py-4">No projects found.</p>
                )}
            </div>
        </div>
    );
};

export default CalendarSidebar;
