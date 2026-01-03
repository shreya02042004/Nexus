import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/ui/GlassCard';
import {
    ArrowLeft, MoreHorizontal, Calendar, Users, FileText, Lightbulb,
    CheckCircle, Clock, AlertCircle, Plus, GripVertical, User,
    Upload, File, Image, FileVideo, Trash2, Download, ExternalLink
} from 'lucide-react';

const ProjectDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    // Dummy project data
    const project = {
        _id: id,
        name: 'Website Redesign',
        description: 'Complete overhaul of the company website with modern design principles, improved user experience, and mobile-first approach.',
        status: 'In Progress',
        progress: 65,
        startDate: '2024-01-15',
        deadline: '2024-03-15',
        color: '#8B5CF6',
        team: [
            { id: 1, name: 'Alex Johnson', role: 'Project Lead', avatar: 'A', tasksCompleted: 12, totalTasks: 15 },
            { id: 2, name: 'Sarah Chen', role: 'UI Designer', avatar: 'S', tasksCompleted: 8, totalTasks: 10 },
            { id: 3, name: 'Mike Wilson', role: 'Backend Dev', avatar: 'M', tasksCompleted: 6, totalTasks: 12 },
            { id: 4, name: 'Jessica Lee', role: 'Frontend Dev', avatar: 'J', tasksCompleted: 10, totalTasks: 14 },
        ]
    };

    // Kanban data
    const kanbanColumns = [
        {
            id: 'todo',
            title: 'To Do',
            color: '#6b7280',
            tasks: [
                { id: 1, title: 'Design landing page header', priority: 'High', assignee: 'S', dueDate: '2024-02-20' },
                { id: 2, title: 'Create responsive navigation', priority: 'Medium', assignee: 'J', dueDate: '2024-02-22' },
            ]
        },
        {
            id: 'progress',
            title: 'In Progress',
            color: '#8B5CF6',
            tasks: [
                { id: 3, title: 'Implement authentication flow', priority: 'High', assignee: 'M', dueDate: '2024-02-18' },
                { id: 4, title: 'Build dashboard components', priority: 'Medium', assignee: 'J', dueDate: '2024-02-25' },
                { id: 5, title: 'API integration for user data', priority: 'Low', assignee: 'M', dueDate: '2024-02-28' },
            ]
        },
        {
            id: 'review',
            title: 'Review',
            color: '#f59e0b',
            tasks: [
                { id: 6, title: 'Homepage design review', priority: 'High', assignee: 'A', dueDate: '2024-02-15' },
            ]
        },
        {
            id: 'done',
            title: 'Done',
            color: '#22c55e',
            tasks: [
                { id: 7, title: 'Project setup & config', priority: 'High', assignee: 'A', dueDate: '2024-01-20' },
                { id: 8, title: 'Design system creation', priority: 'High', assignee: 'S', dueDate: '2024-01-25' },
                { id: 9, title: 'Database schema design', priority: 'Medium', assignee: 'M', dueDate: '2024-01-28' },
            ]
        }
    ];

    // Documents data
    const documents = [
        { id: 1, name: 'Project Requirements.pdf', type: 'pdf', size: '2.4 MB', uploadedBy: 'Alex', date: '2024-01-15' },
        { id: 2, name: 'Design Mockups.fig', type: 'figma', size: '15.8 MB', uploadedBy: 'Sarah', date: '2024-01-20' },
        { id: 3, name: 'API Documentation.pdf', type: 'pdf', size: '1.2 MB', uploadedBy: 'Mike', date: '2024-02-01' },
        { id: 4, name: 'User Flow Diagram.png', type: 'image', size: '890 KB', uploadedBy: 'Sarah', date: '2024-02-05' },
    ];

    const tabs = [
        { id: 'overview', label: 'Overview', icon: CheckCircle },
        { id: 'kanban', label: 'Tasks', icon: GripVertical },
        { id: 'team', label: 'Team', icon: Users },
        { id: 'documents', label: 'Documents', icon: FileText },
        { id: 'brainstorm', label: 'Brainstorm', icon: Lightbulb },
    ];

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'Medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'Low': return 'bg-green-500/10 text-green-400 border-green-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    const getFileIcon = (type) => {
        switch (type) {
            case 'pdf': return <File className="w-5 h-5 text-red-400" />;
            case 'image': return <Image className="w-5 h-5 text-blue-400" />;
            case 'video': return <FileVideo className="w-5 h-5 text-purple-400" />;
            default: return <FileText className="w-5 h-5 text-gray-400" />;
        }
    };

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/" className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-white">{project.name}</h1>
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400">
                                {project.status}
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm max-w-2xl">{project.description}</p>
                    </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 w-fit">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                    ? 'bg-white/10 text-white'
                                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Stats */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Progress Card */}
                        <GlassCard hoverEffect={false}>
                            <h3 className="text-white font-semibold mb-4">Project Progress</h3>
                            <div className="flex items-center gap-6">
                                <div className="relative w-32 h-32">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                                        <circle cx="64" cy="64" r="56" fill="none" stroke="#8B5CF6" strokeWidth="12"
                                            strokeDasharray={`${project.progress * 3.52} 352`} strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">{project.progress}%</span>
                                    </div>
                                </div>
                                <div className="flex-1 grid grid-cols-2 gap-4">
                                    <div className="p-3 rounded-xl bg-white/5">
                                        <p className="text-gray-500 text-xs">Tasks Completed</p>
                                        <p className="text-xl font-bold text-white">36/52</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-white/5">
                                        <p className="text-gray-500 text-xs">Days Remaining</p>
                                        <p className="text-xl font-bold text-white">24</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-white/5">
                                        <p className="text-gray-500 text-xs">Team Members</p>
                                        <p className="text-xl font-bold text-white">{project.team.length}</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-white/5">
                                        <p className="text-gray-500 text-xs">Documents</p>
                                        <p className="text-xl font-bold text-white">{documents.length}</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Recent Activity */}
                        <GlassCard hoverEffect={false}>
                            <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
                            <div className="space-y-3">
                                {[
                                    { action: 'completed task', item: 'Design system creation', user: 'Sarah', time: '2 hours ago' },
                                    { action: 'added document', item: 'API Documentation.pdf', user: 'Mike', time: '5 hours ago' },
                                    { action: 'commented on', item: 'Homepage design review', user: 'Alex', time: '1 day ago' },
                                    { action: 'moved task to Review', item: 'Homepage design', user: 'Sarah', time: '1 day ago' },
                                ].map((activity, idx) => (
                                    <div key={idx} className="flex items-center gap-3 py-2">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                                            style={{ backgroundColor: '#8B5CF6' }}>
                                            {activity.user[0]}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-white">
                                                <span className="font-medium">{activity.user}</span>
                                                <span className="text-gray-400"> {activity.action} </span>
                                                <span className="text-purple-400">{activity.item}</span>
                                            </p>
                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Timeline */}
                        <GlassCard hoverEffect={false}>
                            <h3 className="text-white font-semibold mb-4">Timeline</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">Start Date</span>
                                    <span className="text-white text-sm">{new Date(project.startDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">Deadline</span>
                                    <span className="text-white text-sm">{new Date(project.deadline).toLocaleDateString()}</span>
                                </div>
                                <div className="w-full bg-white/5 rounded-full h-2 mt-2">
                                    <div className="h-2 rounded-full" style={{ width: '60%', backgroundColor: '#8B5CF6' }} />
                                </div>
                            </div>
                        </GlassCard>

                        {/* Team Preview */}
                        <GlassCard hoverEffect={false}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-semibold">Team</h3>
                                <button className="text-xs text-purple-400 hover:text-purple-300">View All</button>
                            </div>
                            <div className="space-y-3">
                                {project.team.slice(0, 3).map((member) => (
                                    <div key={member.id} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                                            style={{ backgroundColor: '#8B5CF6' }}>
                                            {member.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-white">{member.name}</p>
                                            <p className="text-xs text-gray-500">{member.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>
                </div>
            )}

            {activeTab === 'kanban' && (
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {kanbanColumns.map((column) => (
                        <div key={column.id} className="flex-shrink-0 w-72">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: column.color }} />
                                <h3 className="text-white font-medium">{column.title}</h3>
                                <span className="text-gray-500 text-sm">({column.tasks.length})</span>
                            </div>
                            <div className="space-y-3">
                                {column.tasks.map((task) => (
                                    <GlassCard key={task.id} padding="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                                                {task.priority}
                                            </span>
                                            <button className="text-gray-500 hover:text-white">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-white text-sm font-medium mb-3">{task.title}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                                                style={{ backgroundColor: '#8B5CF6' }}>
                                                {task.assignee}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                                <button className="w-full py-3 rounded-xl border border-dashed border-white/10 text-gray-500 text-sm hover:border-white/20 hover:text-gray-400 transition-colors flex items-center justify-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add Task
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'team' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {project.team.map((member) => (
                        <GlassCard key={member.id}>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white mb-3"
                                    style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #BFB3FD 100%)' }}>
                                    {member.avatar}
                                </div>
                                <h3 className="text-white font-semibold">{member.name}</h3>
                                <p className="text-gray-500 text-sm mb-4">{member.role}</p>
                                <div className="flex items-center justify-center gap-4 text-center">
                                    <div>
                                        <p className="text-xl font-bold text-white">{member.tasksCompleted}</p>
                                        <p className="text-xs text-gray-500">Completed</p>
                                    </div>
                                    <div className="w-px h-8 bg-white/10" />
                                    <div>
                                        <p className="text-xl font-bold text-white">{Math.round((member.tasksCompleted / member.totalTasks) * 100)}%</p>
                                        <p className="text-xs text-gray-500">Efficiency</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                    <GlassCard className="flex items-center justify-center min-h-[200px] border-dashed !border-white/10">
                        <button className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors">
                            <Plus className="w-8 h-8" />
                            <span className="text-sm">Add Member</span>
                        </button>
                    </GlassCard>
                </div>
            )}

            {activeTab === 'documents' && (
                <div className="space-y-6">
                    {/* Upload Zone */}
                    <GlassCard hoverEffect={false} padding="p-8">
                        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
                            <Upload className="w-10 h-10 mx-auto text-gray-500 mb-3" />
                            <p className="text-white font-medium mb-1">Drop files here or click to upload</p>
                            <p className="text-gray-500 text-sm">PDF, DOC, Images up to 50MB</p>
                        </div>
                    </GlassCard>

                    {/* Documents List */}
                    <GlassCard hoverEffect={false} padding="p-0">
                        <div className="px-6 py-4 border-b border-white/5">
                            <h3 className="text-white font-semibold">Project Documents</h3>
                        </div>
                        <div className="divide-y divide-white/5">
                            {documents.map((doc) => (
                                <div key={doc.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                            {getFileIcon(doc.type)}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{doc.name}</p>
                                            <p className="text-gray-500 text-xs">{doc.size} • Uploaded by {doc.uploadedBy} • {doc.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-red-400 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            )}

            {activeTab === 'brainstorm' && (
                <GlassCard hoverEffect={false} padding="p-6">
                    <div className="text-center py-12">
                        <Lightbulb className="w-16 h-16 mx-auto text-purple-400 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Brainstorming Board</h3>
                        <p className="text-gray-500 mb-6">Create diagrams, flowcharts, and collaborate with your team</p>
                        <Link
                            to={`/project/${id}/brainstorm`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:shadow-purple-500/20"
                            style={{ backgroundColor: '#BFB3FD', color: '#0a0a0f' }}
                        >
                            <ExternalLink className="w-4 h-4" />
                            Open Full Board
                        </Link>
                    </div>
                </GlassCard>
            )}
        </div>
    );
};

export default ProjectDetails;
