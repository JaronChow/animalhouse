const express = require('express');
const router = express.Router();
const { requireAdmin, requireCustomer } = require('./utils');
const {
    createAnimal,
    getAllAnimals,
    getAllAnimalsByCategoryId,
    getAnimalById,
    getAnimalByGender,
    attachAnimalsToOrderItems,
    updateAnimal,
    deleteAnimal
} = require('../db');

// GET /api/animals
router.get('/', async (req, res) => {
    const allAnimals = await getAllAnimals();
    res.send(allAnimals);
});

router.post('/:id', requireCustomer, async (req, res) => {
    try {
        const { id } = req.params
        const animalById = await getAnimalById(id);
        
        res.send(animalById);
    } catch (error) {
        next(error)
    }
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

// DELETE /api/animals/:id
router.delete("/:id", requireAdmin, async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedAnimal = await deleteAnimal(id);
        res.send(deletedAnimal)

    } catch (error) {
        console.log(error);
        next(error);
    }
})

// POST// add to cart /api/animals/addtocart
router.post('/:id/addtocart', requireCustomer, async (req, res, next) => {
    const { id } = req.params
    const { categoryId, breed_name, image_url, description, inventory_count, price, gender, quantity } = req.body;
    const bodyResponse = req.body;
    console.log(bodyResponse, 'req.body')


    try {
        const animalToCart = await attachAnimalsToOrderItems(id);
        console.log(animalToCart);

        res.send(animalToCart);
    } catch(error) {
        next(error)
    } 
});

module.exports = router;
