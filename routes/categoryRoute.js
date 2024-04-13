const{ createCategory, updateCategory, getAllCategories, deleteCategory }=require('../controllers/categoryController')
const { verifyToken } = require('../middlewares/jwt')
// const { getAllTask } = require('../controllers/taksController')

module.exports=(app)=>{
    app.post('/v1/createCategory',createCategory)
    app.put('/v1/updateCategory',updateCategory)
    app.get('/v1/getAllCategory',getAllCategories)
    app.delete('/v1/deleteCategory',deleteCategory)

}