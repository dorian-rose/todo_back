const Task = require("../models/taskModel")

//retrieve all tasks 
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json({
            ok: true,
            msg: "Tasks retrieved",
            data: tasks
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving tasks"
        });
    }
};

//create new task
const createTask = async (req, res) => {

    const newTaskDetails = new Task(req.body)
    console.log(newTaskDetails)
    const taskExists = await Task.findOne({
        todo: newTaskDetails.todo
    });

    try {
        if (taskExists) {
            return res.status(400).json({
                ok: false,
                msg: "Tarea con este nombre ya existe. Por favor elije otro nombre"
            });
        } else {
            console.log("here")
            const newTask = await newTaskDetails.save();
            return res.status(201).json({
                ok: true,
                msg: "New task created",
                data: newTask,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al crear tarea",
        });
    }
};


module.exports = { getTasks, createTask };