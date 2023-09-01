const Task = require("../models/taskModel")

/**
 * retrieves all tasks from all dates and users 
 * @param {*} req 
 * @param {*} res 
 * @returns Object - status, and either results or error
 */
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        if (tasks.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "No existen tareas"
            });
        } else {
            return res.status(200).json({
                ok: true,
                msg: "Tareas encontradas",
                data: tasks
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al buscar tareas"
        });
    }
};



/**
 * retrieves one task by its task id (_id)
 * @param {*} req 
 * @param {*} res 
 * @returns Object - status, and either results or error
 */
const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (task) {
            return res.status(200).json({
                ok: true,
                msg: "Tarea encontrada",
                data: task
            })
        } else {
            return res.status(404).json({
                ok: false,
                msg: "Tarea con este id no existe"
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al buscar tarea"
        })
    }
}


/**
 * retrieves all tasks from one user, by user id (uid)
 * @param {*} req 
 * @param {*} res 
 * @returns Object - status, and either results or error
 */
const getTaskByUid = async (req, res) => {
    const { uid } = req.params;
    try {
        const tasks = await Task.find({ uid });
        if (tasks.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "Este usuario no tiene tareas"
            });
        } else {
            return res.status(200).json({
                ok: true,
                msg: "Tareas encontradas",
                data: tasks
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al buscar tareas de este usuario"
        });
    }
};



/**
 * retrieves all tasks that include a search term provided by user, either in task title or description
 * @param {*} req 
 * @param {*} res 
 * @returns Object - status, and either results or error
 */
const getTaskBySearch = async (req, res) => {

    const { searchTerm, uid } = req.body;
    console.log(uid, searchTerm)
    try {
        const tasks = await Task.find(
            {
                uid,
                "$or": [
                    { todo: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } }
                ]
            }
        );

        if (tasks.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "La busqueda no ha encontrado ninguna tarea"
            });
        } else {

            return res.status(200).json({
                ok: true,
                msg: "Tareas encontradas",
                data: tasks
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al buscar"
        });
    }
}



/**
 * retrieves all tasks that coincide with user id (uid) AND date (taskDate)
 * @param {*} req 
 * @param {*} res 
 * @returns Object - status, and either results or error
 */
const getTaskByDate = async (req, res) => {

    const { taskDate, uid } = req.body;
    try {
        const tasks = await Task.find({ taskDate, uid });

        if (tasks.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "No hay tareas en esta fecha"
            });
        } else {
            console.log("date", taskDate)
            return res.status(200).json({
                ok: true,
                msg: "Tareas encontradas",
                data: tasks
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al buscar tareas en esta fecha"
        });
    }
};


/**
 * retrieves task by name; then, if no such task exists, creates new task
 * @param {*} req 
 * @param {*} res 
 * @returns Object - status, and either results or error
 */
const createTask = async (req, res) => {

    const newTaskDetails = new Task(req.body)

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

            const newTask = await newTaskDetails.save();
            return res.status(201).json({
                ok: true,
                msg: "Nueva tarea creada",
                data: newTask,
            });
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error al crear tarea",
        });
    }
};


/**
 * retrieves task by id, then updates this task
 * @param {*} req 
 * @param {*} res 
 * @returns Object - status, and either results or error
 */
const updateTask = async (req, res) => {
    const updatedDetails = new Task(req.body)
    const id = req.body._id;
    //check if task exists
    const taskExists = await Task.findOne({
        _id: id
    });
    try {
        if (!taskExists) {
            return res.status(404).json({
                ok: false,
                msg: "Tarea con este ID no existe"
            });
        } else {

            const updatedTask = await Task.findOneAndUpdate(
                { _id: id },
                { $set: updatedDetails },
                { new: true }
            );
            return res.status(201).json({
                ok: true,
                msg: "Tarea actualizado",
                data: updatedTask,
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al actualizar tarea"
        })
    }
}



/**
 * retrieves task by task id, then deletes task
 * @param {*} req 
 * @param {*} res 
 * @returns Object - status, and either results or error
 */
const deleteTask = async (req, res) => {
    const { _id } = req.body
    console.log("id", _id)
    //check if task exists
    const taskExists = await Task.findOne({
        _id
    });

    try {
        if (taskExists) {
            await Task.findOneAndDelete({ _id })
            return res.status(200).json({
                ok: true,
                msg: "Tarea eliminado"
            })
        } else {
            return res.status(404).json({
                ok: false,
                msg: "Tarea con este id no existe"
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al eliminar tarea"
        })
    }

}

module.exports = { getTasks, getTaskById, getTaskByUid, getTaskBySearch, getTaskByDate, createTask, updateTask, deleteTask };