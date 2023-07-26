const express = require("express")
const router = express.Router();
const { check } = require("express-validator");
const { validateInputs } = require("../middleware/validateInputs");
const { getTasks, getTaskById, createTask } = require("../controllers/taskControllers")

router.post("/", [
    check("uid", "The user ID is obligatory").not().isEmpty(),
    check("todo", "The task name is obligatory").not().isEmpty(),
    check("description", "The task description is obligatory").not().isEmpty(),
    validateInputs,
], createTask)


router.get("/", getTasks)

router.get("/:id", getTaskById)

module.exports = router;