import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import {
    Search, Upload, FolderOpen, File, Image, FileVideo, FileText,
    Download, Trash2, MoreHorizontal, Plus, Lock, Users, ChevronDown, Grid3X3, List
} from 'lucide-react';

const Documents = () => {
    const [activeSection, setActiveSection] = useState('project');
    const [selectedProject, setSelectedProject] = useState('Website Redesign');
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');

    const projects = ['Website Redesign', 'Mobile App MVP', 'API Integration', 'Dashboard Analytics'];

    // Project documents
    const projectDocuments = [
        { id: 1, name: 'Project Requirements.pdf', type: 'pdf', size: '2.4 MB', uploadedBy: 'Alex Johnson', date: '2024-01-15', project: 'Website Redesign' },
        { id: 2, name: 'Design Mockups.fig', type: 'figma', size: '15.8 MB', uploadedBy: 'Sarah Chen', date: '2024-01-20', project: 'Website Redesign' },
        { id: 3, name: 'API Documentation.pdf', type: 'pdf', size: '1.2 MB', uploadedBy: 'Mike Wilson', date: '2024-02-01', project: 'Website Redesign' },
        { id: 4, name: 'User Flow Diagram.png', type: 'image', size: '890 KB', uploadedBy: 'Sarah Chen', date: '2024-02-05', project: 'Website Redesign' },
        { id: 5, name: 'Brand Guidelines.pdf', type: 'pdf', size: '5.2 MB', uploadedBy: 'Alex Johnson', date: '2024-02-08', project: 'Website Redesign' },
        { id: 6, name: 'Demo Video.mp4', type: 'video', size: '45.6 MB', uploadedBy: 'Jessica Lee', date: '2024-02-10', project: 'Website Redesign' },
    ];

    // Personal documents
    const personalDocuments = [
        { id: 101, name: 'My Notes.pdf', type: 'pdf', size: '156 KB', date: '2024-02-12' },
        { id: 102, name: 'Resume.pdf', type: 'pdf', size: '245 KB', date: '2024-01-05' },
        { id: 103, name: 'Reference Materials.zip', type: 'other', size: '12.4 MB', date: '2024-02-01' },
        { id: 104, name: 'Screenshot.png', type: 'image', size: '1.2 MB', date: '2024-02-14' },
    ];

    const documents = activeSection === 'project'
        ? projectDocuments.filter(d => d.project === selectedProject)
        : personalDocuments;

    const filteredDocuments = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getFileIcon = (type) => {
        switch (type) {
            case 'pdf': return <FileText className="w-6 h-6 text-red-400" />;
            case 'image': return <Image className="w-6 h-6 text-blue-400" />;
            case 'video': return <FileVideo className="w-6 h-6 text-purple-400" />;
            case 'figma': return <File className="w-6 h-6 text-pink-400" />;
            default: return <File className="w-6 h-6 text-gray-400" />;
        }
    };

    const getFileColor = (type) => {
        switch (type) {
            case 'pdf': return 'rgba(239, 68, 68, 0.1)';
            case 'image': return 'rgba(59, 130, 246, 0.1)';
            case 'video': return 'rgba(139, 92, 246, 0.1)';
            case 'figma': return 'rgba(236, 72, 153, 0.1)';
            default: return 'rgba(107, 114, 128, 0.1)';
        }
    };

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Documents</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage project and personal files</p>
                </div>

                <button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:shadow-purple-500/20"
                    style={{ backgroundColor: '#BFB3FD', color: '#0a0a0f' }}
                >
                    <Upload className="w-4 h-4" />
                    Upload File
                </button>
            </div>

            {/* Section Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 w-fit">
                <button
                    onClick={() => setActiveSection('project')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === 'project'
                            ? 'bg-white/10 text-white'
                            : 'text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <Users className="w-4 h-4" />
                    Project Documents
                </button>
                <button
                    onClick={() => setActiveSection('personal')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === 'personal'
                            ? 'bg-white/10 text-white'
                            : 'text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <Lock className="w-4 h-4" />
                    Personal Documents
                </button>
            </div>

            {/* Filters */}
            <GlassCard hoverEffect={false} padding="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
                        {/* Project Selector (only for project docs) */}
                        {activeSection === 'project' && (
                            <div className="relative">
                                <select
                                    value={selectedProject}
                                    onChange={(e) => setSelectedProject(e.target.value)}
                                    className="appearance-none px-4 py-2.5 pr-10 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors cursor-pointer"
                                >
                                    {projects.map((project) => (
                                        <option key={project} value={project} className="bg-[#1a1a25]">{project}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                            </div>
                        )}

                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search files..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                            />
                        </div>
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
            </GlassCard>

            {/* Upload Zone */}
            <GlassCard hoverEffect={false} padding="p-6">
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 mx-auto text-gray-500 mb-3" />
                    <p className="text-white font-medium mb-1">Drop files here or click to upload</p>
                    <p className="text-gray-500 text-sm">
                        {activeSection === 'project'
                            ? `Files will be shared with all members of ${selectedProject}`
                            : 'Personal files are only visible to you'
                        }
                    </p>
                </div>
            </GlassCard>

            {/* Files */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredDocuments.map((doc) => (
                        <GlassCard key={doc.id} padding="p-4">
                            <div className="text-center">
                                <div
                                    className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-3"
                                    style={{ backgroundColor: getFileColor(doc.type) }}
                                >
                                    {getFileIcon(doc.type)}
                                </div>
                                <p className="text-white text-sm font-medium truncate mb-1">{doc.name}</p>
                                <p className="text-gray-500 text-xs">{doc.size}</p>
                                <p className="text-gray-600 text-xs mt-1">{doc.date}</p>
                            </div>
                        </GlassCard>
                    ))}

                    {/* Add placeholder */}
                    <GlassCard className="border-dashed !border-white/10 min-h-[140px] flex items-center justify-center">
                        <button className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors">
                            <Plus className="w-6 h-6" />
                            <span className="text-xs">Upload</span>
                        </button>
                    </GlassCard>
                </div>
            ) : (
                <GlassCard hoverEffect={false} padding="p-0">
                    <div className="divide-y divide-white/5">
                        {filteredDocuments.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: getFileColor(doc.type) }}
                                    >
                                        {getFileIcon(doc.type)}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{doc.name}</p>
                                        <p className="text-gray-500 text-xs">
                                            {doc.size} • {doc.date}
                                            {doc.uploadedBy && ` • Uploaded by ${doc.uploadedBy}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                                        <Download className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-red-400 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            )}

            {/* Personal docs notice */}
            {activeSection === 'personal' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <Lock className="w-5 h-5 text-purple-400" />
                    <p className="text-purple-300 text-sm">Personal documents are private and only visible to you.</p>
                </div>
            )}
        </div>
    );
};

export default Documents;
