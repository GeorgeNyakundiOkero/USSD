const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    customer_ID: {
        type: String,
        required: true
    },
    customer_Secret: {
        type: String,
        required: true
    },
    customer_Phone_Number: {
        type: String,
        required: true
    },
    booking_Date: {
        type: Date,
        default: Date.now
    },
    travel_Date: {
        type: String,
        required: true
    },
    departure_Time: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    }, 
    no_Of_Seats: {
        type: String,
        required: true
    }, 
    is_Verified: {
        type: Boolean,
        default: false
    }, 
    is_Archived: {
        type: Boolean,
        default: false
    },
    is_Valid: {
        type: Boolean,
        default: false
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;