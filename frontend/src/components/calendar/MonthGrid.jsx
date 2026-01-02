import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import EventPill from './EventPill';

const MonthGrid = ({ currentDate, tasks, projects }) => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="flex-1 flex flex-col bg-zen-bg overflow-hidden">
            {/* Weekday Header */}
            <div className="grid grid-cols-7 border-b border-zen-border">
                {weekDays.map(day => (
                    <div key={day} className="py-2 text-center text-xs font-mono text-txt-dim uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 grid grid-cols-7 auto-rows-fr">
                {days.map((day, i) => {
                    // Filter tasks for this day
                    const dayTasks = tasks.filter(task =>
                        task.dueDate && isSameDay(new Date(task.dueDate), day)
                    );

                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isDayToday = isToday(day);

                    return (
                        <div
                            key={day.toString()}
                            className={`
                                border-b border-r border-zen-border p-2 flex flex-col relative group transition-colors
                                ${!isCurrentMonth ? 'bg-zinc-900/30' : 'bg-zen-bg'}
                                ${isDayToday ? 'bg-zinc-900/50' : ''}
                                ${i % 7 === 6 ? 'border-r-0' : ''} /* Remove right border for last col if needed, but grid handles layout usually. */
                            `}
                        >
                            <span
                                className={`
                                    text-xs font-mono mb-2 w-6 h-6 flex items-center justify-center rounded-full
                                    ${!isCurrentMonth ? 'text-zinc-700' : 'text-txt-muted'}
                                    ${isDayToday ? 'bg-indigo-600 text-white font-bold' : ''}
                                `}
                            >
                                {format(day, dateFormat)}
                            </span>

                            <div className="flex-1 overflow-y-auto no-scrollbar space-y-0.5">
                                {dayTasks.map(task => {
                                    const project = projects.find(p => p._id === task.projectId);
                                    const color = project?.color || '#71717a';
                                    return (
                                        <EventPill key={task._id} task={task} color={color} />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Helper since I didn't import format from date-fns in the top
import { format } from 'date-fns';

export default MonthGrid;
