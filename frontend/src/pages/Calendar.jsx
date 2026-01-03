import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import {
    ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock,
    Users, Video, MapPin
} from 'lucide-react';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('month');
    const [selectedDate, setSelectedDate] = useState(null);

    // Dummy events
    const events = [
        { id: 1, title: 'Sprint Review', time: '10:00 AM', date: '2024-02-15', project: 'Website Redesign', color: '#8B5CF6', type: 'meeting' },
        { id: 2, title: 'Design Sync', time: '2:00 PM', date: '2024-02-15', project: 'Website Redesign', color: '#8B5CF6', type: 'meeting' },
        { id: 3, title: 'API Deadline', time: 'All Day', date: '2024-02-18', project: 'API Integration', color: '#f59e0b', type: 'deadline' },
        { id: 4, title: 'Team Standup', time: '9:00 AM', date: '2024-02-20', project: 'Mobile App MVP', color: '#22c55e', type: 'meeting' },
        { id: 5, title: 'Code Review', time: '3:00 PM', date: '2024-02-20', project: 'Website Redesign', color: '#8B5CF6', type: 'task' },
        { id: 6, title: 'Client Presentation', time: '11:00 AM', date: '2024-02-22', project: 'Website Redesign', color: '#8B5CF6', type: 'meeting' },
        { id: 7, title: 'MVP Launch', time: 'All Day', date: '2024-02-28', project: 'Mobile App MVP', color: '#22c55e', type: 'deadline' },
    ];

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];

        // Add empty slots for days before the first day
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null);
        }

        // Add all days in the month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    const getEventsForDate = (date) => {
        if (!date) return [];
        const dateStr = date.toISOString().split('T')[0];
        return events.filter(e => e.date === dateStr);
    };

    const navigateMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const isToday = (date) => {
        if (!date) return false;
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const days = getDaysInMonth(currentDate);

    // Upcoming events
    const upcomingEvents = events.filter(e => new Date(e.date) >= new Date()).slice(0, 5);

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Calendar</h1>
                    <p className="text-gray-500 text-sm mt-1">View and manage project events</p>
                </div>

                <button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:shadow-purple-500/20"
                    style={{ backgroundColor: '#BFB3FD', color: '#0a0a0f' }}
                >
                    <Plus className="w-4 h-4" />
                    Add Event
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Calendar Grid */}
                <div className="lg:col-span-3">
                    <GlassCard hoverEffect={false} padding="p-6">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => navigateMonth(-1)}
                                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <h2 className="text-xl font-semibold text-white">
                                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                                </h2>
                                <button
                                    onClick={() => navigateMonth(1)}
                                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentDate(new Date())}
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    Today
                                </button>
                                <div className="flex items-center bg-white/5 rounded-lg p-1">
                                    {['Week', 'Month'].map((v) => (
                                        <button
                                            key={v}
                                            onClick={() => setView(v.toLowerCase())}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === v.toLowerCase() ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'
                                                }`}
                                        >
                                            {v}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Days of Week */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {daysOfWeek.map((day) => (
                                <div key={day} className="text-center text-gray-500 text-sm py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7 gap-1">
                            {days.map((date, idx) => {
                                const dayEvents = getEventsForDate(date);
                                const isSelected = selectedDate && date && selectedDate.toDateString() === date.toDateString();

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => date && setSelectedDate(date)}
                                        className={`
                                            min-h-[100px] p-2 rounded-lg transition-all cursor-pointer
                                            ${date ? 'hover:bg-white/5' : ''}
                                            ${isToday(date) ? 'bg-purple-500/10 border border-purple-500/30' : ''}
                                            ${isSelected ? 'bg-white/10' : ''}
                                        `}
                                    >
                                        {date && (
                                            <>
                                                <span className={`text-sm ${isToday(date) ? 'text-purple-400 font-medium' : 'text-gray-400'}`}>
                                                    {date.getDate()}
                                                </span>
                                                <div className="mt-1 space-y-1">
                                                    {dayEvents.slice(0, 2).map((event) => (
                                                        <div
                                                            key={event.id}
                                                            className="px-2 py-1 rounded text-xs truncate"
                                                            style={{ backgroundColor: event.color + '20', color: event.color }}
                                                        >
                                                            {event.title}
                                                        </div>
                                                    ))}
                                                    {dayEvents.length > 2 && (
                                                        <span className="text-xs text-gray-500">+{dayEvents.length - 2} more</span>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </GlassCard>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Upcoming Events */}
                    <GlassCard hoverEffect={false}>
                        <h3 className="text-white font-semibold mb-4">Upcoming Events</h3>
                        <div className="space-y-3">
                            {upcomingEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                                >
                                    <div
                                        className="w-1 h-full min-h-[40px] rounded-full"
                                        style={{ backgroundColor: event.color }}
                                    />
                                    <div className="flex-1">
                                        <p className="text-white text-sm font-medium">{event.title}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Clock className="w-3 h-3 text-gray-500" />
                                            <span className="text-gray-500 text-xs">{event.time}</span>
                                        </div>
                                        <p className="text-gray-600 text-xs mt-0.5">{event.project}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    {/* Mini Stats */}
                    <GlassCard hoverEffect={false}>
                        <h3 className="text-white font-semibold mb-4">This Month</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Video className="w-4 h-4 text-purple-400" />
                                    <span className="text-gray-400 text-sm">Meetings</span>
                                </div>
                                <span className="text-white font-medium">8</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="w-4 h-4 text-yellow-400" />
                                    <span className="text-gray-400 text-sm">Deadlines</span>
                                </div>
                                <span className="text-white font-medium">3</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-green-400" />
                                    <span className="text-gray-400 text-sm">Team Events</span>
                                </div>
                                <span className="text-white font-medium">2</span>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
