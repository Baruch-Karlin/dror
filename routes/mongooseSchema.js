const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    year: String,
    movie_title: String,
    opening_gross: String,
    total_gross: String,
    theaters: String,
    url: String,
    distributor: String,
    genres: [String],
    length: String,
    summary: String,

})
module.exports = mongoose.model('Movie', movieSchema);