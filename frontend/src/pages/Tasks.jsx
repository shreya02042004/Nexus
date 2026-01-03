import { useState } from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import {
    Search, Filter, Calendar, CheckCircle, Circle, Clock,
    AlertCircle, ChevronDown, MoreHorizontal, Plus
} from 'lucide-react';

const Tasks = () => {
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('dueDate');
    const [searchQuery, setSearchQuery] = useState('');

    // Dummy tasks data
    const tasks = [
        {
            id: 1,
            title: 'Design landing page header',
            description: 'Create responsive header with navigation and hero section',
            project: { name: 'Website Redesign', color: '#8B5CF6' },
            status: 'todo',
            priority: 'High',
            dueDate: '2024-02-20',
            assignee: 'You'
        },
        {
            id: 2,
            title: 'Implement authentication flow',
            description: 'Set up login, register, and password reset functionality',
            project: { name: 'Website Redesign', color: '#8B5CF6' },
            status: 'progress',
            priority: 'High',
            dueDate: '2024-02-18',
            assignee: 'You'
        },
        {
            id: 3,
            title: 'Build dashboard components',
            description: 'Create reusable chart and card components for dashboard',
            project: { name: 'Mobile App MVP', color: '#22c55e' },
            status: 'progress',
            priority: 'Medium',
            dueDate: '2024-02-25',
            assignee: 'You'
        },
        {
            id: 4,
            title: 'API integration for user data',
            description: 'Connect frontend to backend user endpoints',
            project: { name: 'API Integration', color: '#f59e0b' },
            status: 'todo',
            priority: 'Low',
            dueDate: '2024-02-28',
            assignee: 'You'
        },
        {
            id: 5,
            title: 'Homepage design review',
            description: 'Review and approve final homepage design mockups',
            project: { name: 'Website Redesign', color: '#8B5CF6' },
            status: 'review',
            priority: 'High',
            dueDate: '2024-02-15',
            assignee: 'You'
        },
        {
            id: 6,
            title: 'Write unit tests for auth module',
            description: 'Create comprehensive test suite for authentication',
            project: { name: 'Mobile App MVP', color: '#22c55e' },
            status: 'done',
            priority: 'Medium',
            dueDate: '2024-02-10',
            assignee: 'You'
        },
        {
            id: 7,
            title: 'Database schema optimization',
            description: 'Optimize queries and add proper indexes',
            project: { name: 'API Integration', color: '#f59e0b' },
            status: 'done',
            priority: 'High',
            dueDate: '2024-02-08',
            assignee: 'You'
        },
    ];

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all' || task.status === filter;
        return matchesSearch && matchesFilter;
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case 'done': return <CheckCircle className="w-4 h-4 text-green-400" />;
            case 'progress': return <Clock className="w-4 h-4 text-purple-400" />;
            case 'review': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
            default: return <Circle className="w-4 h-4 text-gray-400" />;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-500/10 text-red-400';
            case 'Medium': return 'bg-yellow-500/10 text-yellow-400';
            case 'Low': return 'bg-green-500/10 text-green-400';
            default: return 'bg-gray-500/10 text-gray-400';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'todo': return 'To Do';
            case 'progress': return 'In Progress';
            case 'review': return 'Review';
            case 'done': return 'Completed';
            default: return status;
        }
    };

    const tasksByStatus = {
        todo: filteredTasks.filter(t => t.status === 'todo'),
        progress: filteredTasks.filter(t => t.status === 'progress'),
        review: filteredTasks.filter(t => t.status === 'review'),
        done: filteredTasks.filter(t => t.status === 'done'),
    };

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">My Tasks</h1>
                    <p className="text-gray-500 text-sm mt-1">All tasks assigned to you across projects</p>
                </div>

                <button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:shadow-purple-500/20"
                    style={{ backgroundColor: '#BFB3FD', color: '#0a0a0f' }}
                >
                    <Plus className="w-4 h-4" />
                    Add Task
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: 'To Do', value: tasksByStatus.todo.length, color: '#6b7280' },
                    { label: 'In Progress', value: tasksByStatus.progress.length, color: '#8B5CF6' },
                    { label: 'Review', value: tasksByStatus.review.length, color: '#f59e0b' },
                    { label: 'Completed', value: tasksByStatus.done.length, color: '#22c55e' },
                ].map((stat, idx) => (
                    <GlassCard
                        key={idx}
                        hoverEffect={true}
                        padding="p-4"
                        onClick={() => setFilter(stat.label.toLowerCase().replace(' ', ''))}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }} />
                            <span className="text-gray-400 text-sm">{stat.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                    </GlassCard>
                ))}
            </div>

            {/* Filters */}
            <GlassCard hoverEffect={false} padding="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Filter */}
                        <div className="flex items-center gap-2">
                            {['all', 'todo', 'progress', 'review', 'done'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${filter === status
                                            ? 'bg-white/10 text-white'
                                            : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                        }`}
                                >
                                    {status === 'all' ? 'All' : getStatusLabel(status)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Tasks List */}
            <GlassCard hoverEffect={false} padding="p-0">
                <div className="divide-y divide-white/5">
                    {filteredTasks.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="text-gray-500">No tasks found</p>
                        </div>
                    ) : (
                        filteredTasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors"
                            >
                                {/* Status Icon */}
                                <button className="flex-shrink-0">
                                    {getStatusIcon(task.status)}
                                </button>

                                {/* Task Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <p className={`text-sm font-medium ${task.status === 'done' ? 'text-gray-500 line-through' : 'text-white'}`}>
                                            {task.title}
                                        </p>
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-xs truncate">{task.description}</p>
                                </div>

                                {/* Project */}
                                <div className="hidden sm:flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: task.project.color }} />
                                    <span className="text-gray-400 text-sm">{task.project.name}</span>
                                </div>

                                {/* Due Date */}
                                <div className="hidden md:flex items-center gap-1.5 text-gray-400 text-sm">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </div>

                                {/* Actions */}
                                <button className="text-gray-500 hover:text-white transition-colors">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </GlassCard>
        </div>
    );
};

export default Tasks;
