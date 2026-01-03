import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plus, ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react';

// Sparkline Chart
const Sparkline = ({ data, color = '#BFB3FD', height = 40 }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox={`0 0 100 ${height}`} className="w-full h-full">
            <defs>
                <linearGradient id={`sparkGrad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon
                points={`0,${height} ${points} 100,${height}`}
                fill={`url(#sparkGrad-${color.replace('#', '')})`}
            />
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

// Circular Progress
const CircularProgress = ({ value, size = 140, strokeWidth = 10 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(191, 179, 253, 0.1)" strokeWidth={strokeWidth} />
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="url(#progressGrad)" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
                <defs>
                    <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#BFB3FD" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{value}%</span>
            </div>
        </div>
    );
};

// Glass Card Component with perfect glassmorphism and hover effects
const GlassCard = ({ children, className = '', hoverEffect = true }) => {
    return (
        <div
            className={`
                relative rounded-2xl p-5 overflow-hidden
                transition-all duration-500 ease-out
                ${hoverEffect ? 'hover:scale-[1.02] hover:-translate-y-1' : ''}
                group
                ${className}
            `}
            style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
        >
            {/* Metallic shine effect on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                    background: 'linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.03) 35%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.03) 65%, transparent 80%)',
                    transform: 'translateX(-100%)',
                    animation: 'none'
                }}
            />

            {/* Animated gradient sweep on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, rgba(191, 179, 253, 0.08) 0%, transparent 50%, rgba(139, 92, 246, 0.08) 100%)'
                }}
            />

            {/* Top shine line */}
            <div
                className="absolute top-0 left-0 right-0 h-[1px] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)'
                }}
            />

            {/* Glow effect on hover */}
            <div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                style={{
                    background: 'linear-gradient(135deg, rgba(191, 179, 253, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)'
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [newProject, setNewProject] = useState({ name: '', description: '', startDate: '', endDate: '' });

    const topAssets = [
        { label: 'Active Projects', value: '12', change: '+7%', isPositive: true, chartData: [30, 45, 35, 60, 50, 70, 65, 80] },
        { label: 'Tasks Completed', value: '48', change: '-5%', isPositive: false, chartData: [80, 70, 75, 60, 65, 50, 55, 45] },
        { label: 'Team Members', value: '24', change: '+12%', isPositive: true, chartData: [20, 35, 25, 45, 40, 55, 60, 72] },
        { label: 'On Track', value: '92%', change: '+3%', isPositive: true, chartData: [60, 55, 70, 65, 80, 75, 85, 92] },
    ];

    const recentActivity = [
        { type: 'success', title: 'Sprint Review', project: 'Website Redesign', time: 'Just now', value: '+15 tasks' },
        { type: 'success', title: 'Milestone Completed', project: 'Mobile App', time: '2h ago', value: 'Phase 2' },
        { type: 'pending', title: 'Code Review', project: 'API Integration', time: '4h ago', value: 'Pending' },
        { type: 'success', title: 'Design Approved', project: 'Dashboard UI', time: '1d ago', value: 'Approved' },
    ];

    const latestUpdates = [
        { title: 'Website Redesign', change: '+2 tasks', type: 'add' },
        { title: 'Mobile App MVP', change: '-1 blocker', type: 'remove' },
        { title: 'API Integration', change: '+5 commits', type: 'add' },
        { title: 'Dashboard UI', change: '+1 review', type: 'add' },
    ];

    const dummyProjects = [
        { _id: '1', name: 'Website Redesign', status: 'In Progress', progress: 65, deadline: '2024-03-01', startDate: '2024-01-15', endDate: '2024-03-01', description: 'Complete overhaul of company website' },
        { _id: '2', name: 'Mobile App MVP', status: 'In Progress', progress: 40, deadline: '2024-04-15', startDate: '2024-02-01', endDate: '2024-04-15', description: 'First version of mobile app' },
        { _id: '3', name: 'API Integration', status: 'Completed', progress: 100, deadline: '2024-01-30', startDate: '2024-01-01', endDate: '2024-01-30', description: 'Third-party API integrations' },
    ];

    useEffect(() => { fetchProjects(); }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await API.get('/projects');
            setProjects(data.length > 0 ? data : dummyProjects);
        } catch (error) {
            setProjects(dummyProjects);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            await API.post('/projects', newProject);
            setShowModal(false);
            setNewProject({ name: '', description: '', startDate: '', endDate: '' });
            fetchProjects();
        } catch (error) {
            alert('Failed to create project.');
        }
    };

    return (
        <div className="space-y-6 pb-8">
            {/* CSS for shimmer animation */}
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .glass-card:hover .shimmer-effect {
                    animation: shimmer 1.5s ease-in-out;
                }
            `}</style>

            {/* Top Assets */}
            <div>
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-white font-semibold text-lg">Top Assets</h3>
                        <p className="text-gray-500 text-xs mt-0.5">Your project metrics</p>
                    </div>
                    {user?.role === 'admin' && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                            style={{ backgroundColor: '#BFB3FD', color: '#0a0a0f' }}
                        >
                            <Plus className="w-4 h-4" />
                            New Project
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {topAssets.map((asset, idx) => (
                        <div
                            key={idx}
                            className="glass-card relative rounded-2xl p-5 overflow-hidden cursor-pointer
                                transition-all duration-500 ease-out
                                hover:scale-[1.03] hover:-translate-y-2
                                group"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.04) 100%)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                            }}
                        >
                            {/* Shimmer sweep effect */}
                            <div
                                className="shimmer-effect absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.15) 50%, transparent 60%)',
                                    transform: 'translateX(-100%)'
                                }}
                            />

                            {/* Metallic gradient on hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                                style={{
                                    background: `linear-gradient(135deg, 
                                        rgba(191, 179, 253, 0.15) 0%, 
                                        rgba(139, 92, 246, 0.05) 25%,
                                        rgba(88, 28, 135, 0.1) 50%,
                                        rgba(139, 92, 246, 0.05) 75%,
                                        rgba(191, 179, 253, 0.15) 100%)`
                                }}
                            />

                            {/* Top shine */}
                            <div
                                className="absolute top-0 left-0 right-0 h-px group-hover:opacity-100 opacity-40 transition-opacity duration-500"
                                style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)' }}
                            />

                            {/* Border glow on hover */}
                            <div
                                className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(191, 179, 253, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(191, 179, 253, 0.4) 100%)',
                                    filter: 'blur(8px)'
                                }}
                            />

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="flex items-center gap-2.5 mb-4">
                                    <div
                                        className="w-3 h-3 rounded-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-purple-400/50"
                                        style={{ backgroundColor: '#BFB3FD' }}
                                    />
                                    <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">{asset.label}</span>
                                </div>

                                <div className="flex items-end justify-between">
                                    <div>
                                        <span className="text-3xl font-bold text-white group-hover:text-white transition-all duration-300">{asset.value}</span>
                                        <div className={`flex items-center gap-1 mt-1.5 text-xs ${asset.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                            {asset.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                            {asset.change}
                                        </div>
                                    </div>
                                    <div className="w-24 h-12 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                                        <Sparkline data={asset.chartData} color={asset.isPositive ? '#22c55e' : '#ef4444'} height={48} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Latest Activity */}
                <div className="lg:col-span-2">
                    <GlassCard hoverEffect={false} className="h-full">
                        <div className="border-b border-white/5 pb-4 mb-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-semibold">Latest Activity</h3>
                                <p className="text-gray-500 text-xs mt-0.5">Real-time project updates</p>
                            </div>
                            <button className="text-gray-400 text-xs hover:text-white transition-colors">View All</button>
                        </div>

                        <div className="space-y-1">
                            {recentActivity.map((activity, idx) => (
                                <div key={idx} className="flex items-center justify-between py-3 px-2 -mx-2 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ${activity.type === 'success' ? 'bg-green-400 shadow-lg shadow-green-400/30' : 'bg-yellow-400 shadow-lg shadow-yellow-400/30'}`} />
                                        <div>
                                            <p className="text-white text-sm font-medium">{activity.title}</p>
                                            <p className="text-gray-500 text-xs">From: {activity.project}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white text-sm">{activity.value}</p>
                                        <p className="text-gray-500 text-xs">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Success Rate */}
                    <GlassCard>
                        <h3 className="text-white font-semibold mb-1">Success Rate</h3>
                        <p className="text-gray-500 text-xs mb-6">Project completion</p>
                        <div className="flex items-center justify-center">
                            <CircularProgress value={95} />
                        </div>
                    </GlassCard>

                    {/* Latest Updates */}
                    <GlassCard hoverEffect={false}>
                        <h3 className="text-white font-semibold mb-4">Latest Updates</h3>
                        <div className="space-y-1">
                            {latestUpdates.map((update, idx) => (
                                <div key={idx} className="flex items-center justify-between py-2.5 px-2 -mx-2 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <ChevronRight className="w-4 h-4 text-gray-600" />
                                        <span className="text-white text-sm">{update.title}</span>
                                    </div>
                                    <span className={`text-xs font-medium ${update.type === 'add' ? 'text-green-400' : 'text-red-400'}`}>
                                        {update.change}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>

            {/* Projects Table */}
            <GlassCard hoverEffect={false} className="!p-0">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-white font-semibold">Active Projects</h3>
                    <div className="flex items-center gap-2">
                        {['All', 'Active', 'Completed'].map((filter, idx) => (
                            <button
                                key={filter}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${idx === 0 ? 'text-white bg-white/10' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                                <th className="px-6 py-3 font-medium">Project</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Progress</th>
                                <th className="px-4 py-3 font-medium">Deadline</th>
                                <th className="px-4 py-3 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {(projects.length > 0 ? projects : dummyProjects).map((project) => (
                                <tr key={project._id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <Link to={`/project/${project._id}`} className="flex items-center gap-3 group">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(191, 179, 253, 0.1)' }}>
                                                <div className="w-3 h-3 rounded" style={{ backgroundColor: '#BFB3FD' }} />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium group-hover:text-purple-300 transition-colors">{project.name}</p>
                                                <p className="text-gray-500 text-xs">{project.description?.slice(0, 35)}...</p>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${project.status === 'Completed' ? 'bg-green-500/10 text-green-400' : 'bg-purple-500/10 text-purple-400'}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-20 bg-white/5 rounded-full h-1.5">
                                                <div className="h-1.5 rounded-full" style={{ width: `${project.progress}%`, backgroundColor: '#BFB3FD' }} />
                                            </div>
                                            <span className="text-white text-sm">{project.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-gray-400 text-sm">
                                        {new Date(project.deadline || project.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </td>
                                    <td className="px-4 py-4">
                                        <Link to={`/project/${project._id}`} className="text-xs text-gray-400 hover:text-white transition-colors">View →</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>

            {/* Create Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div
                        className="w-full max-w-lg p-6 rounded-2xl relative"
                        style={{
                            background: 'linear-gradient(135deg, rgba(30, 30, 40, 0.95) 0%, rgba(20, 20, 30, 0.98) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        <h3 className="text-xl font-bold text-white mb-6">Create New Project</h3>
                        <form onSubmit={handleCreateProject} className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">Project Name</label>
                                <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors" placeholder="e.g. Website Redesign" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">Description</label>
                                <textarea required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors min-h-[100px] resize-none" placeholder="Brief description..." value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">Start Date</label>
                                    <input type="date" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm focus:outline-none focus:border-purple-500/50 transition-colors" value={newProject.startDate} onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">End Date</label>
                                    <input type="date" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm focus:outline-none focus:border-purple-500/50 transition-colors" value={newProject.endDate} onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })} />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white transition-colors border border-white/10">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/20" style={{ backgroundColor: '#BFB3FD', color: '#0a0a0f' }}>Create Project</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
