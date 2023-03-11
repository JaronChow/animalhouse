const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getAllAnimalsByCategoryId,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../db');
const { requireAdmin } = require('./utils');

// GET /api/categories
router.get('/', async (req, res) => {
    const allCategories = await getAllCategories();
    res.send(allCategories);
});

// GET /api/categories/:id
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const allAnimals = await getAllAnimalsByCategoryId(id);
        res.send(allAnimals);
    } catch(error) {
        next(error)
    } 
});

// POST /api/categories
router.post('/', requireAdmin, async (req, res, next) => {
    const { category_name } = req.body;
  
    try {
        const newCategory = await createCategory({ category_name });
        res.send(newCategory);
    } catch(error) {
        next(error)
    } 
});

// PATCH /api/categories/:id
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

// DELETE /api/categories/:id
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
