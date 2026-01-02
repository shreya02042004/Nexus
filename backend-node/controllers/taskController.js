const Task = require('../models/Task');
const Project = require('../models/Project');

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private (Member/Admin)
const createTask = async (req, res) => {
    try {
        const { title, description, priority, status, dueDate, projectId, assignedTo } = req.body;

        // Check if project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const task = await Task.create({
            title,
            description,
            priority,
            status,
            dueDate,
            projectId,
            assignedTo
        });

        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get tasks by project
// @route   GET /api/tasks/project/:projectId
// @access  Private
const getTasksByProject = async (req, res) => {
    try {
        const tasks = await Task.find({ projectId: req.params.projectId })
            .populate('assignedTo', 'name email');

        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Attempt delete
        await Task.deleteOne({ _id: req.params.id });

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createTask,
    getTasksByProject,
    updateTask,
    deleteTask,
};
