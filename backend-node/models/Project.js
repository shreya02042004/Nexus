const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a project name']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    startDate: {
        type: Date,
        required: [true, 'Please add a start date']
    },
    endDate: {
        type: Date,
        required: [true, 'Please add an end date']
    },
    status: {
        type: String,
        enum: ['Active', 'Completed'],
        default: 'Active'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    color: {
        type: String,
        default: '#6366f1' // Indigo-500
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema);
