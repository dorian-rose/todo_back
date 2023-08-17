const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
    uid: {
        type: String,
        required: true,
    },
    todo: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date, default: Date.now()
    },
    taskDate: {
        type: String
    }


})

module.exports = model("Task", TaskSchema);