const express = require('express');
const app = express();

const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(cors());

//to parse JSON and URLENCODED req.bodies
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//set ejs folders virtually in public
app.use(express.static(__dirname + "/public"));


//configure routers
//app.use("/user", require("./routers/userRouters"))
//app.use("/tasks", require("./routers/taskRouters"))



//let app to listen to port 
app.listen(port, () => {
    console.log(`App listening to ${port}`)
})