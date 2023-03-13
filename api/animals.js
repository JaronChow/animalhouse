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
router.post('/addtocart', requireCustomer, async (req, res, next) => {
    const { id } = req.params;
    console.log(req.params, 'req.params')
    const { categoryId, breed_name, image_url, description, inventory_count, price, gender } = req.body;
    console.log(req.body, 'req.body animal.js')
    const animalById = await getAnimalById(id)

    try {
        if(animalById){
            console.log(animalById, 'animal by id')
            const animalToCart = await attachAnimalsToOrderItems(categoryId, breed_name, image_url, description, inventory_count, price, gender);
            console.log(animalToCart)
            res.send(animalToCart);
        }
            
    } catch(error) {
        next(error)
    } 
});

module.exports = router;
