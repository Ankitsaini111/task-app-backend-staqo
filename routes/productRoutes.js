const { createProduct, updateProduct, deleteProduct, getAllProducts } = require('../controllers/productController')
const { verifyToken } = require('../middlewares/jwt')

module.exports = (app) => {
    app.post('/v1/createProduct', createProduct)
    app.put('/v1/updateProduct', updateProduct)
    // app.delete('/v1/deleteProduct/:id',verifyToken,(req)=>{
    //     console.log(req.user_id);
    // })
    app.delete('/v1/deleteProduct/:id', verifyToken, deleteProduct)
    app.get('/v1/getAllProducts', verifyToken, getAllProducts)
}