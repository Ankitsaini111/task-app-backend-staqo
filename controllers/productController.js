const { where } = require('sequelize');
const { Product } = require('../models/product')
const { contants, _status } = require('../utils/contants')



exports.createProduct = async (req, res) => {
    try {
        const { user_id } = req
        let { productName, category, description, product_price, product_color, product_MRP } = req.body;
        // if (!product_color === product_color) {
        //     return res.send({ message: "same color product is not create some times" })
        // }
        const existinRecord = await Product.findOne({ where: { productName, category, product_color } })
        if (existinRecord) {
            return res.status(400).send({ message: "product already exist" })
        }
        let newProduct = new Product(
            {
                productName: productName,
                category: category,
                description: description,
                product_price: product_price,
                product_color: product_color,
                product_MRP: product_MRP,
                created_by: user_id,
                updated_by: user_id
            }
        )
        await newProduct.save()
        return res.send({ message: 'Product created successfully', newProduct })

    } catch (error) {
        return res.send({ message: error.message })
    }
},

    exports.updateProduct = async (req, res) => {
        try {
            const { user_id } = req
            let { id, productName, category, description, product_price, product_color, product_MRP, created_by, updated_by } = req.body;
            let updateRecord = {
                productName: productName,
                category: category,
                description: description,
                product_price: product_price,
                product_color: product_color,
                product_MRP: product_MRP,
                updated_by: user_id
            }
            await Product.update(updateRecord, {
                where: {
                    id
                }
            })

            res.send({ message: 'Product updated successfully', updateRecord })

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    exports.deleteProduct = async (req, res) => {
        try {
            let { id } = req.params
            const { user_id } = req
            const existinRecord = await Product.findOne({
                where: { id }
            })
            if (!existinRecord) {
                return res.status(404).send({ message: "product not found" })
            }
            existinRecord.status = _status.INACTIVE
            existinRecord.updated_by = user_id
            let record = await existinRecord.save()
            // const product = await Product.update({
            //     status: contants._status.INACTIVE,
            //     updated_by: user_id
            // }, {
            //     where: {
            //         id
            //     }
            // }
            // )
            // return res.send({
            //     message: "product deleted successfully", record
            // })
            return res.status(200).send({ message: "product deleted successfully", record })
        } catch (error) {
            return res.status(500).send({ message: error.message })
        }
    }

exports.getAllProducts = async (req, res) => {
    try {
        let product = await Product.findAndCountAll({
            where: {
                user_id: req.user_id
            }
        })
        return res.status(200).send({ message: "find all product", product })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}