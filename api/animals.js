const express = require('express');
const router = express.Router();
const { requireAdmin, requireCustomer } = require('./utils');
const {
    createAnimal,
    getAllAnimals,
    getAllAnimalsByCategoryId,
    getAnimalById,
    attachAnimalsToOrderItems,
    updateAnimal,
    deleteAnimal
} = require('../db');

// GET /api/animals
router.get('/', async (req, res) => {
    const allAnimals = await getAllAnimals();
    res.send(allAnimals);
});

// router.get('/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const animalById = await getAnimalById(id);
        
//         res.send(animalById);
//     } catch (error) {
//         next(error)
//     }
// });

// POST /api/animals
router.post('/', requireAdmin, async (req, res, next) => {
    const { categoryId, breed_name, image_url, description, male_inventory, female_inventory, price } = req.body;
  
    try {
        const newAnimal = await createAnimal({ categoryId, breed_name, image_url, description, male_inventory, female_inventory, price });
        res.send(newAnimal);
        
    } catch(error) {
        next(error)
    } 
});


// PATCH /api/animals/:id
router.patch("/:id", requireAdmin, async (req, res, next) => {
    const { id } = req.params;
    const { categoryId, breed_name, image_url, description, male_inventory, female_inventory, price } = req.body;

    try {
        const updatedAnimal = await updateAnimal({ id, categoryId, breed_name, image_url, description, male_inventory, female_inventory, price });
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

// POST// add to cart /api/animals/:id/addtocart
router.post('/:id/addtocart', requireCustomer, async (req, res, next) => {
    const { id } = req.params
    const customerId = req.user.id
    // console.log(customerId, 'customerid')

    try {

        const animalToCart = await attachAnimalsToOrderItems(id, customerId, quantity=1 );

        res.send(animalToCart);
    } catch(error) {
        console.log(error);
    } 
});

module.exports = router;
