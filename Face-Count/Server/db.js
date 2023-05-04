const mongoose = require('mongoose');
const class_attandence = new mongoose.Schema({
    className: {
        type: String,
        require: true,
    },
    count: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    },
})

module.exports = mongoose.model('class_attandences', class_attandence);
