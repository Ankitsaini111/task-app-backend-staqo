const { Task } = require('../models/task')
const { sendMail } = require('../utils/node_mailer')
exports.createTask = async (req, res) => {
    try {
        const { title, description, start_from, end_to } = req.body
        if (!(title)) {
            return res.send({message:'please enter title'})
        }
        const record = new Task({
            title,
            description,
            user_id: req.user_id,
            start_from,
            end_to
        })
        await record.save()
        return res.status(201).send({ message: 'task created', data: record })
    } catch (error) {
        return res.status(500).send('unable to create')

    }
}


exports.getAllTask = async (req, res) => {
    try {
        let task = await Task.findAndCountAll({
            where: {
                user_id: req.user_id
            },
            attributes: ['id', 'title','user_id']

        })
        return res.status(200).send({ message: 'find all users', data: task })
    } catch (error) {
        return res.status(200).send({ message: error.message })

    }
}

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        let { title, description, end_to } = req.body
        let recordToUpadate = {
            title,
            description,
            end_to
        }


        let record = await Task.update(recordToUpadate, {
            where: {
                user_id: req.user_id,
                id
            }
        })
        return res.status(201).send({ message: 'task updaded', data: record })

    } catch (error) {
        return res.status().send({ message: error.message })

    }
}
exports.taskGetById = async (req, res) => {
    try {
        let { id } = req.params

        let record = await Task.findOne({
            where: {
                user_id: req.user_id,
                id
            }
        })

        if (!record) {
            return res.status(404).send({message:"task is not found"})
        }
        return res.status(201).send({ message: 'task fatched successfully', data: record })

    } catch (error) {
        return res.status().send({ message: error.message })

    }
}
