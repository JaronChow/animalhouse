const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    createCategory
} = require('../db');

// GET /api/categories
router.get('/', async (req, res) => {
    const allCategories = await getAllCategories();
    res.send(allCategories);
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
        const categoty = await getCategoryById(id);
        
        if (categoty.creatorId === req.admin.id) {
            const updateCategory = await updateCategory({ id, category_name });
            res.send(updateCategory)
        } else {
            res.status(403).send({
                error: "Error",
                name: "UnauthorizedAdminError",
                message: `Admin ${req.admin.username} is not allowed to update ${category.category_name}`
            })
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = router;
