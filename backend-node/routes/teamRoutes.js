const express = require('express');
const router = express.Router();
const { getTeam, inviteMember } = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/roleMiddleware');

router.get('/', protect, getTeam);
router.post('/invite', protect, inviteMember);

module.exports = router;
