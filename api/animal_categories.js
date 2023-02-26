const express = require('express');
const router = express.Router();
const {
    getAllCategories
} = require('../db');

// GET /api/categories
router.get('/', async (req, res) => {
    const allCategories = await getAllCategories();
    res.send(allCategories);
});

module.exports = router;
