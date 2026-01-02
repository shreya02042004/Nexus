const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email for invitation'],
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
    },
    status: {
        type: String,
        enum: ['pending', 'accepted'],
        default: 'pending'
    },
    invitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Invitation', invitationSchema);
