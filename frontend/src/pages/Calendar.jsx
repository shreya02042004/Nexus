import { useState, useEffect } from 'react';
import { addMonths, subMonths, format } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import CalendarSidebar from '../components/calendar/CalendarSidebar';
import MonthGrid from '../components/calendar/MonthGrid';
import api from '../services/api';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedProjectIds, setSelectedProjectIds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [projectsRes, tasksRes] = await Promise.all([
                api.get('/projects'),
                api.get('/tasks') // Assuming endpoint returns all tasks or you might want to filter by month if API supports it
            ]);

            const allProjects = projectsRes.data;
            setProjects(allProjects);
            // Default select all
            setSelectedProjectIds(allProjects.map(p => p._id));

            // Assuming simplified tasks response for now
            setTasks(tasksRes.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch calendar data", error);
            setLoading(false);
        }
    };

    const handleToggleProject = (projectId) => {
        if (selectedProjectIds.includes(projectId)) {
            setSelectedProjectIds(prev => prev.filter(id => id !== projectId));
        } else {
            setSelectedProjectIds(prev => [...prev, projectId]);
        }
    };

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const goToToday = () => setCurrentDate(new Date());

    const filteredTasks = tasks.filter(task =>
        // Only show task if its project is selected
        selectedProjectIds.includes(task.projectId) ||
        (task.projectId && selectedProjectIds.includes(task.projectId._id)) // Handle populated objects if API returns them
    );

    if (loading) return <div className="h-full flex items-center justify-center text-txt-muted">Loading Calendar...</div>;

    return (
        <div className="h-full flex flex-col bg-zen-bg overflow-hidden relative">
            {/* Header */}
            <div className="h-16 border-b border-zen-border flex items-center justify-between px-6 bg-zen-bg shrink-0">
                <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-txt-muted" />
                    <h1 className="text-xl font-bold text-txt-main tracking-tight">
                        {format(currentDate, 'MMMM yyyy')}
                    </h1>
                </div>

                <div className="flex items-center gap-1 bg-zen-subtle border border-zen-border rounded p-1">
                    <button onClick={prevMonth} className="p-1 px-2 text-txt-muted hover:text-white hover:bg-zinc-700/50 rounded transition-colors">
                        <ChevronLeft size={16} />
                    </button>
                    <button onClick={goToToday} className="px-3 py-1 text-xs font-medium text-txt-main hover:bg-zinc-700/50 rounded transition-colors">
                        Today
                    </button>
                    <button onClick={nextMonth} className="p-1 px-2 text-txt-muted hover:text-white hover:bg-zinc-700/50 rounded transition-colors">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-1 min-h-0">
                <CalendarSidebar
                    projects={projects}
                    selectedProjectIds={selectedProjectIds}
                    onToggleProject={handleToggleProject}
                />
                <MonthGrid
                    currentDate={currentDate}
                    tasks={filteredTasks}
                    projects={projects}
                />
            </div>
        </div>
    );
};

export default Calendar;
