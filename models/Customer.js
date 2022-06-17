const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    ID_Number: {
        type: String,
        required: true
    },
    phone_Number: {
        type: String,
        required: true
    },
    customer_Pin: {
        type: String,
        required: true
    },
    is_Regular: {
        type: Boolean,
        default: false
    }
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;