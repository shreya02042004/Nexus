import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plus, Calendar, Clock, MoreHorizontal } from 'lucide-react';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [newProject, setNewProject] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await API.get('/projects');
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects", error);
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
            console.error("Failed to create project", error);
            alert('Failed to create project. Ensure you are an Admin.');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Slab */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Dashboard</h2>
                    <p className="text-txt-muted text-sm mt-1">Manage your projects and tasks.</p>
                </div>

                {user?.role === 'admin' && (
                    <button onClick={() => setShowModal(true)} className="btn-zen btn-zen-primary shadow-glow">
                        <Plus size={16} />
                        <span className="font-semibold">New Project</span>
                    </button>
                )}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Link to={`/project/${project._id}`} key={project._id} className="slab p-5 group block relative overflow-hidden">
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-3">
                                <span className={`badge text-[10px] uppercase tracking-wider font-bold ${project.status === 'Completed' ? 'badge-done' : 'badge-progress'}`}>
                                    {project.status}
                                </span>
                                <button className="text-txt-dim hover:text-white transition-colors">
                                    <MoreHorizontal size={16} />
                                </button>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-primary transition-colors">
                                {project.name}
                            </h3>

                            <p className="text-txt-muted text-sm line-clamp-2 mb-6 h-10">
                                {project.description}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-txt-dim font-mono border-t border-zen-border pt-3 mt-auto">
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={12} />
                                    <span>{new Date(project.startDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={12} />
                                    <span>{new Date(project.endDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                {/* Empty State / Add New Placeholder */}
                {user?.role === 'admin' && (
                    <button onClick={() => setShowModal(true)} className="slab p-5 border-dashed border-zen-border/50 hover:border-txt-muted/50 flex flex-col items-center justify-center text-txt-dim hover:text-txt-main transition-colors gap-3 min-h-[200px]">
                        <div className="w-10 h-10 rounded-full bg-zen-subtle flex items-center justify-center">
                            <Plus size={20} />
                        </div>
                        <span className="text-sm font-medium">Create New Project</span>
                    </button>
                )}
            </div>

            {/* Create Modal (Minimal) */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="slab w-full max-w-lg p-6 bg-zen-bg relative animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-bold mb-6">Create New Project</h3>
                        <form onSubmit={handleCreateProject} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-txt-muted mb-1 uppercase">Project Name</label>
                                <input
                                    type="text"
                                    required
                                    className="input-zen"
                                    placeholder="e.g. Website Redesign"
                                    value={newProject.name}
                                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-txt-muted mb-1 uppercase">Description</label>
                                <textarea
                                    required
                                    className="input-zen min-h-[100px]"
                                    placeholder="Brief description..."
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-txt-muted mb-1 uppercase">Start Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="input-zen text-txt-muted"
                                        value={newProject.startDate}
                                        onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-txt-muted mb-1 uppercase">End Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="input-zen text-txt-muted"
                                        value={newProject.endDate}
                                        onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <button type="button" onClick={() => setShowModal(false)} className="btn-zen btn-zen-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-zen btn-zen-primary">
                                    Create Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
