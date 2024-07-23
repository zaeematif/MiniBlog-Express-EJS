const mongoose = require("mongoose");
const Schema = mongoose.Schema;  // .Schema passes a consructor function

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    }
}, {timestamps: true}) //generates timeStamp property automatically

const Blog = mongoose.model('Blog', blogSchema);

//export the Blog Model
module.exports = Blog; 