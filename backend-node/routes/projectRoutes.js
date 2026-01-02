const express = require('express');
const router = express.Router();
const {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/roleMiddleware');

router.route('/')
    .post(protect, admin, createProject)
    .get(protect, getProjects);

router.route('/:id')
    .get(protect, getProject)
    .put(protect, admin, updateProject)
    .delete(protect, admin, deleteProject);

module.exports = router;
