const express = require('express');
const router = express.Router();
const diseasesController = require('../controllers/diseasescontroller');
const authenticateToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Disease:
 *       type: object
 *       required:
 *         - id_name
 *         - name
 *       properties:
 *         id_diseases:
 *           type: integer
 *           description: The auto-generated ID of the disease
 *         id_name:
 *           type: string
 *           description: The name ID of the disease
 *         name:
 *           type: string
 *           description: The name of the disease
 *         detail:
 *           type: string
 *           description: The detail description of the disease
 *       example:
 *         id_diseases: 1
 *         id_name: "1"
 *         name: "TBC"
 *         detail: "Description of TBC"
 */

/**
 * @swagger
 * tags:
 *   name: Diseases
 *   description: The diseases managing API
 */

/**
 * @swagger
 * /diseases:
 *   get:
 *     summary: Returns the list of all the diseases
 *     tags: [Diseases]
 *     responses:
 *       200:
 *         description: The list of the diseases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Disease'
 */

router.get('/', authenticateToken, diseasesController.getAllDiseases);

/**
 * @swagger
 * /diseases/{id}:
 *   get:
 *     summary: Get the disease by id
 *     tags: [Diseases]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The disease id
 *     responses:
 *       200:
 *         description: The disease description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Disease'
 *       404:
 *         description: The disease was not found
 */

router.get('/:id', authenticateToken, diseasesController.getDiseasesById);

/**
 * @swagger
 * /diseases/by-idname/{id_name}:
 *   get:
 *     summary: Get the disease by id_name
 *     tags: [Diseases]
 *     parameters:
 *       - in: path
 *         name: id_name
 *         schema:
 *           type: string
 *         required: true
 *         description: The id_name of the disease
 *     responses:
 *       200:
 *         description: The disease description by id_name
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Disease'
 *       404:
 *         description: The disease was not found
 */

router.get('/by-idname/:id_name', authenticateToken, diseasesController.getDiseasesByIdName);

module.exports = router;
