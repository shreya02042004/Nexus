const EventPill = ({ task, color }) => {
    return (
        <div
            className="mb-1 px-1.5 py-0.5 rounded text-[10px] font-medium truncate cursor-pointer transition-opacity hover:opacity-80 flex items-center gap-1 border border-white/5"
            style={{
                backgroundColor: `${color}20`, // 12% opacity
                color: color,
                borderLeft: `2px solid ${color}`
            }}
            title={task.title}
        >
            {task.title}
        </div>
    );
};

export default EventPill;
