const express = require('express');
const router = express.Router();
const { requireAdmin } = require('./utils');
const {
    getAllAnimals
} = require('../db');

// GET /api/animals
router.get('/', async (req, res) => {
    const allAnimals = await getAllAnimals();
    res.send(allAnimals);
});

// POST /api/animals
router.post('/', requireAdmin, async (req, res, next) => {
    const { categoryId, breed_name, image_url, description, inventory_count, price, gender } = req.body;
  
    try {
        if (!req.admin) {
            res.send({
                error: "Error",
                name: "UnauthorizedUser",
                message: "You must be logged in to perform this action"
            })
        } else {
            const newRoutine = await createRoutine({ creatorId:req.user.id, isPublic, name, goal });
            res.send(newRoutine);
        }
    } catch(error) {
        next(error)
    } 
});

module.exports = router;
