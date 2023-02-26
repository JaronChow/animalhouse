const express = require('express');
const router = express.Router();
const {
    getAllAnimals
} = require('../db');

// GET /api/animals
router.get('/', async (req, res) => {
    const allAnimals = await getAllAnimals();
    res.send(allAnimals);
});

module.exports = router;
