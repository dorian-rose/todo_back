const Task = require("../models/taskModel")

//retrieve all tasks 
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

//retrieve one task by id
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

//retrieve one task by uid

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

//retrieve task by search term and uid 
const getTaskBySearch = async (req, res) => {
    console.log("here")
    const { searchTerm, uid } = req.body;
    console.log(searchTerm)
    try {
        const tasks = await Task.find(
            {

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


//retrieve one task by taskDate

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


//create new task
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
            console.log("here create")
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


//update a task
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

//delete a task
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