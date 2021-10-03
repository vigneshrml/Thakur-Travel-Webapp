const mongoose = require("mongoose");

const travelSchema = mongoose.Schema({
    locationImage : String,
    cost : Number,
    days : Number,
    mode : String,
    place : String
})

module.exports = mongoose.model("Travel",travelSchema);