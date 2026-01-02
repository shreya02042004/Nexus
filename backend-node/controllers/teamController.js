const User = require('../models/User');
const Invitation = require('../models/Invitation');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// @desc    Get all team members (active and pending)
// @route   GET /api/team
// @access  Private
const getTeam = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        const invitations = await Invitation.find({ status: 'pending' });

        // Normalize data for frontend
        const activeMembers = users.map(user => ({
            ...user._doc,
            status: 'active'
        }));

        res.json({
            members: [...activeMembers, ...invitations]
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Invite a new member
// @route   POST /api/team/invite
// @access  Private (Any Member)
const inviteMember = async (req, res) => {
    try {
        const { email, role } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email is already a member.' });
        }

        // Check if invitation pending
        const invitationExists = await Invitation.findOne({ email, status: 'pending' });
        if (invitationExists) {
            return res.status(400).json({ message: 'Invitation already sent to this email.' });
        }

        // Generate Token
        const token = crypto.randomBytes(20).toString('hex');

        // Create Invitation
        const invitation = await Invitation.create({
            email,
            role,
            invitedBy: req.user._id,
            token
        });

        // Send Email via Nodemailer
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const inviteLink = `${process.env.BASE_URL}/register?token=${token}`;

            const mailOptions = {
                from: `"Nexus Team" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Join the Team on Nexus',
                html: `
                    <div style="background-color: #0B0B0B; color: #E5E5E5; padding: 40px; font-family: sans-serif; border-radius: 8px;">
                        <h1 style="color: #FFFFFF; letter-spacing: -1px; margin-bottom: 24px;">Nexus</h1>
                        <p style="font-size: 16px; margin-bottom: 32px; color: #A3A3A3;">
                            You have been invited to collaborate on Nexus. Join the workspace to start tracking tasks and projects.
                        </p>
                        <a href="${inviteLink}" style="background-color: #FFFFFF; color: #000000; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px;">
                            Join Nexus Team
                        </a>
                        <p style="margin-top: 40px; font-size: 12px; color: #525252;">
                            If you didn't expect this invitation, you can ignore this email.
                        </p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${email}`);
        } else {
            console.log(`Email MOCKED for ${email} (Configure .env to send real emails)`);
        }

        res.status(201).json(invitation);
    } catch (error) {
        console.error("Invite Error:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTeam,
    inviteMember
};
