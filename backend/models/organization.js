const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Employee = new Schema({
   name: {
      type: String
   },
   description: {
      type: String
   }
}, {
   collection: 'organization'
})

module.exports = mongoose.model('Organizations', Organization)