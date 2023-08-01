const express = require("express")
const router = express.Router();
const { check } = require("express-validator");
const { validateInputs } = require("../middleware/validateInputs");
const { getTasks, getTaskById, getTaskByUid, createTask, updateTask, deleteTask } = require("../controllers/taskControllers")

router.post("/", [
    check("uid", "The user ID is obligatory").not().isEmpty(),
    check("todo", "The task name is obligatory").not().isEmpty(),
    check("description", "The task description is obligatory").not().isEmpty(),
    check("done", "The task status is obligatory").not().isEmpty(),
    validateInputs,
], createTask)


router.get("/", getTasks)

router.get("/id/:id", getTaskById)

router.get("/user/:uid", getTaskByUid)

router.put("/", [
    check("uid", "The user ID is obligatory").not().isEmpty(),
    check("todo", "The task name is obligatory").not().isEmpty(),
    check("description", "The task description is obligatory").not().isEmpty(),
    check("done", "The task status is obligatory").not().isEmpty(),
    validateInputs,
], updateTask)

router.delete("/", deleteTask)

module.exports = router;