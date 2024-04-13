const { status } = require('init');
const { Category } = require('../models/categoryModel');
const { where } = require('sequelize');

exports.createCategory = async (req, res) => {
    try {
        let { categoryName, type,category_description } = req.body;

        const existinngRecord = await Category.findOne({ where:{categoryName} })
        if (existinngRecord) {
            return res.status(400).send({ message: 'Category already exist' })
        }
        const newData = await Category.create({
            categoryName, type,category_description
        })
        return res.status(200).send({ message: 'category created successfully', data: newData })
    } catch (error) {
        return res.status(500).send({ error: error.message })

    }
};


exports.updateCategory = async (req, res) => {
    try {
        let { categoryName, type } = req.body;

        let existingRecord = await Category.findOne({ where:{categoryName} });

        if (existingRecord) {
            existingRecord.type = type;
            await existingRecord.save();
            return res.status(200).send({ message: 'Category updated successfully', data: existingRecord });
        }
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


exports.getAllCategories = async (req, res) => {
    try {
        const {id}=req.body
        let categories = await Category.findAndCountAll({
            where:{
                id:id
            },attributes:['categoryName','type']
        })
        return res.status(200).send({ message: 'categories find ',categories })
    } catch (error) {
        return res.status(500).send({ message: 'categories not found ' })

    }
}


exports.deleteCategory=async(req,res)=>{
 try {
    let {id}=req.body;
    await Category.update({
        status:'inactive'
    },{
        where:{id:id}
    });
    return res.status(200).send({message:'category deleted sucessfully'})
} catch (error) {
     return res.status(500).send({error:message.error})
    
 }   
}