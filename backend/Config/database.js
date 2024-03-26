const mongoose = require("mongoose");
require("dotenv").config();
const Connection = mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports={
    Connection
}