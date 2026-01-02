const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a task title']
    },
    description: {
        type: String
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    status: {
        type: String,
        enum: ['To-Do', 'In Progress', 'Done'],
        default: 'To-Do'
    },
    dueDate: {
        type: Date
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', taskSchema);
