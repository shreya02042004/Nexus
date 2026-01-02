import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { ArrowLeft, Plus, Calendar, Flag, CheckCircle, Circle, Clock, Trash2 } from 'lucide-react';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'To-Do',
        dueDate: ''
    });

    const fetchProjectDetails = useCallback(async () => {
        try {
            const { data: projectData } = await API.get(`/projects/${id}`);
            setProject(projectData);

            const { data: tasksData } = await API.get(`/tasks/project/${id}`);
            setTasks(tasksData);
        } catch (error) {
            console.error("Failed to fetch project details", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProjectDetails();
    }, [fetchProjectDetails]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await API.post('/tasks', { ...newTask, projectId: id });
            setShowModal(false);
            setNewTask({ title: '', description: '', priority: 'Medium', status: 'To-Do', dueDate: '' });
            fetchProjectDetails();
        } catch (error) {
            console.error("Failed to create task", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Delete this task?')) {
            try {
                await API.delete(`/tasks/${taskId}`);
                setTasks(tasks.filter(t => t._id !== taskId));
            } catch (error) {
                console.error("Failed to delete task", error);
            }
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await API.put(`/tasks/${taskId}`, { status: newStatus });
            setTasks(tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
        } catch (error) {
            console.error("Failed to update status", error);
        }
    }

    // Helper to render priority icon
    const getPriorityIcon = (p) => {
        if (p === 'High') return <Flag size={14} className="text-red-500 fill-red-500/20" />;
        if (p === 'Medium') return <Flag size={14} className="text-yellow-500" />;
        return <Flag size={14} className="text-blue-500" />;
    }

    if (loading) return <div className="text-center p-10 text-txt-dim">Loading...</div>;
    if (!project) return <div className="text-center p-10 text-txt-dim">Project not found</div>;

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zen-border">
                <div className="flex items-center gap-4">
                    <Link to="/" className="p-2 rounded hover:bg-zen-subtle text-txt-muted hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white leading-tight">
                            {project.name}
                        </h1>
                        <p className="text-sm text-txt-muted mt-0.5">{project.description}</p>
                    </div>
                </div>
                <button onClick={() => setShowModal(true)} className="btn-zen btn-zen-primary gap-2 shadow-glow">
                    <Plus size={16} />
                    <span>Add Task</span>
                </button>
            </div>

            {/* Board */}
            <div className="flex-1 overflow-x-auto">
                <div className="flex h-full gap-6 min-w-[800px]">
                    {/* Column */}
                    {['To-Do', 'In Progress', 'Done'].map((status) => (
                        <div key={status} className="flex-1 flex flex-col min-w-[300px]">
                            <div className="flex items-center justify-between mb-4 px-2">
                                <h3 className="text-sm font-bold text-txt-muted uppercase tracking-wider flex items-center gap-2">
                                    {status === 'To-Do' && <Circle size={14} />}
                                    {status === 'In Progress' && <Clock size={14} />}
                                    {status === 'Done' && <CheckCircle size={14} />}
                                    {status}
                                </h3>
                                <span className="text-xs font-mono text-txt-dim bg-zen-subtle px-2 py-0.5 rounded">
                                    {tasks.filter(t => t.status === status).length}
                                </span>
                            </div>

                            <div className="flex-1 bg-zen-surface/30 rounded-lg p-3 space-y-3 overflow-y-auto">
                                {tasks.filter(t => t.status === status).map((task) => (
                                    <div key={task._id} className="slab p-4 bg-zen-bg hover:border-txt-muted transition-colors group">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-sm font-medium text-white group-hover:text-accent-primary transition-colors">{task.title}</h4>
                                            <button onClick={() => handleDeleteTask(task._id)} className="text-zen-border group-hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>

                                        {task.description && <p className="text-xs text-txt-muted mb-3 line-clamp-2">{task.description}</p>}

                                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zen-border/50">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1.5 text-xs text-txt-dim" title={`Priority: ${task.priority}`}>
                                                    {getPriorityIcon(task.priority)}
                                                    <span>{task.priority}</span>
                                                </div>
                                                {task.dueDate && (
                                                    <div className="flex items-center gap-1.5 text-xs text-txt-dim font-mono">
                                                        <Calendar size={12} />
                                                        <span>{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Quick Move Arrows */}
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {status !== 'To-Do' && (
                                                    <button onClick={() => handleStatusChange(task._id, 'To-Do')} className="p-1 hover:bg-zen-subtle rounded text-txt-dim hover:text-white" title="Move to To-Do">&laquo;</button>
                                                )}
                                                {status !== 'Done' && (
                                                    <button onClick={() => handleStatusChange(task._id, status === 'To-Do' ? 'In Progress' : 'Done')} className="p-1 hover:bg-zen-subtle rounded text-txt-dim hover:text-white" title="Move Forward">&raquo;</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Empty Ghost Card for "To-Do" */}
                                {status === 'To-Do' && (
                                    <button onClick={() => { setShowModal(true); setNewTask(prev => ({ ...prev, status: 'To-Do' })) }} className="w-full py-3 border border-dashed border-zen-border rounded text-xs text-txt-dim hover:text-white hover:border-txt-dim transition-colors flex items-center justify-center gap-2">
                                        <Plus size={14} /> Add Task
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Task Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="slab w-full max-w-lg p-6 bg-zen-bg relative animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-bold mb-6">Add New Task</h3>
                        <form onSubmit={handleCreateTask} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-txt-muted mb-1 uppercase">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="input-zen"
                                    placeholder="Task title..."
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-txt-muted mb-1 uppercase">Description</label>
                                <textarea
                                    className="input-zen min-h-[80px]"
                                    placeholder="Details..."
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-txt-muted mb-1 uppercase">Priority</label>
                                    <select
                                        className="input-zen"
                                        value={newTask.priority}
                                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                    >
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-txt-muted mb-1 uppercase">Due Date</label>
                                    <input
                                        type="date"
                                        className="input-zen text-txt-muted"
                                        value={newTask.dueDate}
                                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="btn-zen btn-zen-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-zen btn-zen-primary">
                                    Create Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
