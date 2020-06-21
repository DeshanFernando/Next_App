let mongoose = require('mongoose');
let ItemSchema = new mongoose.Schema({
    name:String,
    topic : String,
    image: String,
    favourite:Boolean,
    timestamp : Date,
    deleted : Boolean
});
mongoose.model('Item', ItemSchema);

module.exports = mongoose.model('Item');