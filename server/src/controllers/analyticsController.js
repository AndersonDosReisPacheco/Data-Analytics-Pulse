const { prisma } = require("../config/db");

// @desc    Get all analytics data
// @route   GET /api/analytics
// @access  Private
const getAnalytics = async (req, res) => {
  try {
    const analytics = await prisma.analytics.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error(' Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching analytics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Create new analytics metric
// @route   POST /api/analytics
// @access  Private
const createAnalytics = async (req, res) => {
  try {
    const { metric, value, category, metadata } = req.body;

    const analytics = await prisma.analytics.create({
      data: {
        metric,
        value: parseFloat(value),
        category: category || 'other',
        userId: req.userId,
        metadata: metadata || {}
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error(' Create analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating analytics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update analytics metric
// @route   PUT /api/analytics/:id
// @access  Private
const updateAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    const { metric, value, category, metadata } = req.body;

    const analytics = await prisma.analytics.update({
      where: {
        id: parseInt(id),
        userId: req.userId
      },
      data: {
        metric,
        value: parseFloat(value),
        category,
        metadata
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error(' Update analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating analytics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete analytics metric
// @route   DELETE /api/analytics/:id
// @access  Private
const deleteAnalytics = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.analytics.delete({
      where: {
        id: parseInt(id),
        userId: req.userId
      }
    });

    res.json({
      success: true,
      message: 'Analytics deleted successfully'
    });
  } catch (error) {
    console.error(' Delete analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting analytics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getAnalytics,
  createAnalytics,
  updateAnalytics,
  deleteAnalytics
};
