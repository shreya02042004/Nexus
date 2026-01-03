import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Plus, Search, Grid3X3, List, Filter, MoreHorizontal,
    Calendar, Users, ArrowUpRight, ChevronDown
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const Projects = () => {
    const { user } = useAuth();
    const [viewMode, setViewMode] = useState('grid');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showNewModal, setShowNewModal] = useState(false);

    // Dummy projects data
    const projects = [
        {
            _id: '1',
            name: 'Website Redesign',
            description: 'Complete overhaul of the company website with modern design and improved UX',
            status: 'In Progress',
            progress: 65,
            deadline: '2024-03-15',
            team: ['A', 'S', 'M', 'J'],
            tasksCompleted: 24,
            totalTasks: 36,
            color: '#8B5CF6'
        },
        {
            _id: '2',
            name: 'Mobile App MVP',
            description: 'First version of mobile application for iOS and Android platforms',
            status: 'In Progress',
            progress: 40,
            deadline: '2024-04-20',
            team: ['E', 'J', 'T'],
            tasksCompleted: 12,
            totalTasks: 30,
            color: '#22c55e'
        },
        {
            _id: '3',
            name: 'API Integration',
            description: 'Third-party API integrations for payment processing and analytics',
            status: 'Completed',
            progress: 100,
            deadline: '2024-01-30',
            team: ['T', 'M'],
            tasksCompleted: 18,
            totalTasks: 18,
            color: '#f59e0b'
        },
        {
            _id: '4',
            name: 'Dashboard Analytics',
            description: 'Build comprehensive analytics dashboard with real-time data visualization',
            status: 'In Progress',
            progress: 25,
            deadline: '2024-05-01',
            team: ['A', 'S'],
            tasksCompleted: 5,
            totalTasks: 20,
            color: '#ef4444'
        },
        {
            _id: '5',
            name: 'User Authentication',
            description: 'Implement OAuth, 2FA, and enhanced security features',
            status: 'Review',
            progress: 90,
            deadline: '2024-02-28',
            team: ['M', 'J', 'E'],
            tasksCompleted: 27,
            totalTasks: 30,
            color: '#06b6d4'
        },
        {
            _id: '6',
            name: 'Database Migration',
            description: 'Migrate from legacy database to new cloud infrastructure',
            status: 'Planning',
            progress: 10,
            deadline: '2024-06-15',
            team: ['T'],
            tasksCompleted: 2,
            totalTasks: 20,
            color: '#ec4899'
        }
    ];

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || p.status.toLowerCase().includes(filterStatus.toLowerCase());
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-500/10 text-green-400';
            case 'In Progress': return 'bg-purple-500/10 text-purple-400';
            case 'Review': return 'bg-yellow-500/10 text-yellow-400';
            case 'Planning': return 'bg-blue-500/10 text-blue-400';
            default: return 'bg-gray-500/10 text-gray-400';
        }
    };

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Projects</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage and track all your projects</p>
                </div>

                {user?.role === 'admin' && (
                    <button
                        onClick={() => setShowNewModal(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:shadow-purple-500/20"
                        style={{ backgroundColor: '#BFB3FD', color: '#0a0a0f' }}
                    >
                        <Plus className="w-4 h-4" />
                        New Project
                    </button>
                )}
            </div>

            {/* Filters Bar */}
            <GlassCard hoverEffect={false} padding="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            {['all', 'active', 'completed'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${filterStatus === status
                                            ? 'bg-white/10 text-white'
                                            : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center bg-white/5 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Projects Grid/List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredProjects.map((project) => (
                        <Link to={`/project/${project._id}`} key={project._id}>
                            <GlassCard className="h-full">
                                {/* Color accent bar */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                                    style={{ backgroundColor: project.color }}
                                />

                                <div className="pt-2">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                            {project.status}
                                        </span>
                                        <button className="text-gray-500 hover:text-white transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                        {project.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Progress */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between text-xs mb-1.5">
                                            <span className="text-gray-400">Progress</span>
                                            <span className="text-white font-medium">{project.progress}%</span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-1.5">
                                            <div
                                                className="h-1.5 rounded-full transition-all"
                                                style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                                            />
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                        {/* Team */}
                                        <div className="flex -space-x-2">
                                            {project.team.slice(0, 4).map((member, idx) => (
                                                <div
                                                    key={idx}
                                                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium text-white border-2 border-[#0a0a0f]"
                                                    style={{ backgroundColor: project.color, opacity: 1 - idx * 0.15 }}
                                                >
                                                    {member}
                                                </div>
                                            ))}
                                            {project.team.length > 4 && (
                                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-gray-400 bg-white/10 border-2 border-[#0a0a0f]">
                                                    +{project.team.length - 4}
                                                </div>
                                            )}
                                        </div>

                                        {/* Deadline */}
                                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </Link>
                    ))}
                </div>
            ) : (
                /* List View */
                <GlassCard hoverEffect={false} padding="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                                    <th className="px-6 py-4 font-medium">Project</th>
                                    <th className="px-4 py-4 font-medium">Status</th>
                                    <th className="px-4 py-4 font-medium">Progress</th>
                                    <th className="px-4 py-4 font-medium">Team</th>
                                    <th className="px-4 py-4 font-medium">Deadline</th>
                                    <th className="px-4 py-4 font-medium"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredProjects.map((project) => (
                                    <tr key={project._id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-3 h-10 rounded-full"
                                                    style={{ backgroundColor: project.color }}
                                                />
                                                <div>
                                                    <p className="text-white font-medium">{project.name}</p>
                                                    <p className="text-gray-500 text-xs">{project.tasksCompleted}/{project.totalTasks} tasks</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-20 bg-white/5 rounded-full h-1.5">
                                                    <div
                                                        className="h-1.5 rounded-full"
                                                        style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                                                    />
                                                </div>
                                                <span className="text-white text-sm">{project.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex -space-x-2">
                                                {project.team.slice(0, 3).map((member, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium text-white border-2 border-[#0a0a0f]"
                                                        style={{ backgroundColor: project.color }}
                                                    >
                                                        {member}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-gray-400 text-sm">
                                            {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="px-4 py-4">
                                            <Link
                                                to={`/project/${project._id}`}
                                                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                                            >
                                                View <ArrowUpRight className="w-3 h-3" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: 'Total Projects', value: projects.length },
                    { label: 'In Progress', value: projects.filter(p => p.status === 'In Progress').length },
                    { label: 'Completed', value: projects.filter(p => p.status === 'Completed').length },
                    { label: 'Team Members', value: 12 },
                ].map((stat, idx) => (
                    <GlassCard key={idx} hoverEffect={false} padding="p-4">
                        <p className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</p>
                        <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};

export default Projects;
