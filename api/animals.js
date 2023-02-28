const express = require('express');
const router = express.Router();
const { requireAdmin } = require('./utils');
const {
    getAllAnimals,
    createAnimal,
    updateAnimal
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
        const newAnimal = await createAnimal({ categoryId, breed_name, image_url, description, inventory_count, price, gender });
        res.send(newAnimal);
    } catch(error) {
        next(error)
    } 
});

// PATCH /api/animals/:id
router.patch("/:id", requireAdmin, async (req, res, next) => {
    const { id } = req.params;
    const { categoryId, breed_name, image_url, description, inventory_count, price, gender } = req.body;

    try {
        const updatedAnimal = await updateAnimal({ id, categoryId, breed_name, image_url, description, inventory_count, price, gender });
        res.send(updatedAnimal)

    } catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = router;
