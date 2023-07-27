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

//retrieve one task by id
const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (task) {
            return res.status(200).json({
                ok: true,
                msg: "Task retrieved",
                data: task
            })
        } else {
            return res.status(404).json({
                ok: false,
                msg: "Task with this ID doesn't exist"
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving task"
        })
    }
}

//retrieve one task by uid

const getTaskByUid = async (req, res) => {
    const { uid } = req.params;
    try {
        const tasks = await Task.find({ uid });
        return res.status(200).json({
            ok: true,
            msg: "Tasks retrieved",
            data: tasks
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving this user's tasks"
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


module.exports = { getTasks, getTaskById, getTaskByUid, createTask };