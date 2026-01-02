const Project = require('../models/Project');

// @desc    Create new project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
    try {
        // Add user to req.body
        req.body.createdBy = req.user.id;

        const project = await Project.create(req.body);

        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('members', 'name email').populate('createdBy', 'name');
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Private
const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('members', 'name email')
            .populate('createdBy', 'name');

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin or maybe Leader? Requirement says Admin only for creation, keeping update flexible or restricted to Admin for now as implied by 'Project Manager')
// For simplicity and typical requirements, usually Project Managers update too. Let's assume Admin/Project Manager.
const updateProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if user is admin (Assuming only admins update for strict role adherence as per prompt "Project Manager")
        if (req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to update project' });
        }

        project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to delete project' });
        }

        await project.remove(); // Note: Mongoose 6+ might need findByIdAndDelete or project.deleteOne()

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        // If using Mongoose 6+, project.remove() is deprecated in favor of project.deleteOne()
        // Let's try deleteOne for safety
        try {
            await Project.deleteOne({ _id: req.params.id });
            res.status(200).json({ id: req.params.id });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
};
