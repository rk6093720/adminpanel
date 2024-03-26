const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { Connection } = require("./Config/database");
const { adminRouter } = require("./Routes/admin.routes");
const app = express();
dotenv.config();
const Port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
   res.json("Welcome to bhardwaj&Company");
})
app.use("/admin/auth",adminRouter)
app.listen(Port, async() => {
    try {
        await Connection;
        console.log("Database is Connnected");
    } catch (error) {
        console.log("Database is not connected");
    }
    console.log(`App listening on ${Port}`);
});