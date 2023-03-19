const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getAllAnimalsByCategoryId,
    getAllAnimalsByCategoryName,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../db');
const { requireAdmin } = require('./utils');

// GET /api/animal_categories
router.get('/', async (req, res) => {
    const allCategories = await getAllCategories();
    res.send(allCategories);
});

// GET /api/animal_categories/:category_name
router.get('/:category_name', async (req, res, next) => {
    const { category_name } = req.params;

    try {
        const allAnimals = await getAllAnimalsByCategoryName(category_name);
        res.send(allAnimals);
    } catch(error) {
        next(error)
    } 
});

// GET /api/animal_categories/:category_name/:id
router.get('/:category_name/:id', async (req, res, next) => {
    const { category_name, id } = req.params;

    try {
        const allAnimals = await getAnimalById(category_name, id);
        res.send(allAnimals);
    } catch(error) {
        next(error)
    } 
});

// POST /api/animal_categories
router.post('/', requireAdmin, async (req, res, next) => {
    const { category_name } = req.body;
  
    try {
        const newCategory = await createCategory({ category_name });
        res.send(newCategory);
    } catch(error) {
        next(error)
    } 
});

// PATCH /api/animal_categories/:id
router.patch("/:id", requireAdmin, async (req, res, next) => {
    const { id } = req.params;
    const { category_name } = req.body;

    try {
        const updatedCategory = await updateCategory({ id, category_name });
        res.send(updatedCategory)

    } catch (error) {
        console.log(error);
        next(error);
    }
})

// DELETE /api/animal_categories/:id
router.delete("/:id", requireAdmin, async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedCategory = await deleteCategory(id);
        res.send(deletedCategory)

    } catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = router;
