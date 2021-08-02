const mongoose = require("mongoose");
const schema = mongoose.Schema;

const counterSchema = new schema ({
    countSolve:{
        type: Number,
        required: true
    }
},{timestamps: true});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;