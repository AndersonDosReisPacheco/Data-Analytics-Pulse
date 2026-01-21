const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// @route   GET /api/analytics
// @desc    Get all analytics data
// @access  Private
router.get('/', analyticsController.getAnalytics);

// @route   POST /api/analytics
// @desc    Create new analytics metric
// @access  Private
router.post('/', analyticsController.createAnalytics);

// @route   PUT /api/analytics/:id
// @desc    Update analytics metric
// @access  Private
router.put('/:id', analyticsController.updateAnalytics);

// @route   DELETE /api/analytics/:id
// @desc    Delete analytics metric
// @access  Private
router.delete('/:id', analyticsController.deleteAnalytics);

module.exports = router;
