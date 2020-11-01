const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contact = new Schema({
    contact_name: {
        type: String
    },
    contact_number: {
        type: Number
    } 
    }, {
        collection: 'contact'
});

module.exports = mongoose.model('Contact', Contact);