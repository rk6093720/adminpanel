const {Router} = require("express");
const { Login } = require("../Controller/admin.controller");
const adminRouter = Router();
adminRouter.post("/login",Login);
module.exports={
    adminRouter
}