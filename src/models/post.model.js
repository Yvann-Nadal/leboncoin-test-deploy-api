const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    uploadFiles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UploadFile',
        multiple: true,
        required: false
    }],
    formatted_address: {
        type: String
    },
    street_number: {
        type: String
    },
    route: {
        type: String
    },
    city: {
        type: String
    },
    administrative_area_level_1: {
        type: String
    },
    administrative_area_level_2: {
        type: String
    },
    country: {
        type: String
    },
    postal_code: {
        type: Number
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;