const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authenticateToken = require('../middleware/authMiddleware');
const { getDiseaseInfo } = require('../utils/scraper');

/**
 * @swagger
 * /news/{disease}:
 *   get:
 *     summary: Get news for a specific disease
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: disease
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the disease
 *     responses:
 *       200:
 *         description: A list of news articles
 *       404:
 *         description: No news found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:disease', authenticateToken, newsController.getNews);

module.exports = router;
