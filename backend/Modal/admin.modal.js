const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    username:{type:String},
    password:{type:String,required:true},
    verifyToken:{type:String},
    currentPassword:{type:String},
    confirmPassword:{type:String} 
},{
    timestamps:true
})
const AdminModal = mongoose.model("admin",adminSchema);
module.exports={
    AdminModal
}