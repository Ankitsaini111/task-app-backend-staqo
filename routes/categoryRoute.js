const { createCategory, updateCategory, getAllCategories, deleteCategory } = require('../controllers/categoryController')
const { verifyToken } = require('../middlewares/jwt')

module.exports = (app) => {
    app.post('/v1/createCategory', verifyToken, createCategory)
    app.put('/v1/updateCategory', verifyToken, updateCategory)
    app.get('/v1/getAllCategory', verifyToken, getAllCategories)
    app.delete('/v1/deleteCategory', verifyToken, deleteCategory)

}