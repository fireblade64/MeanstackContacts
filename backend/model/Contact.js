const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//monggose

// Define collection and schema
let Contact = new Schema({
  contact_name: {
    type: String
  },
  contact_surname: {
    type: String
  },
  contact_phonenumber: {
    type: Number
  },
  contact_plz: {
    type: Number
  },
  contact_city: {
    type: String
  },
  contact_street: {
    type: String
  },
  contact_number: {
    type: Number
  },
  dob: {
    type: Date
  }
}, {
  collection: 'contacts'
})

module.exports = mongoose.model('Contact', Contact)
