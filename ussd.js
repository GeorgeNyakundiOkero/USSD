const express = require("express");

const router = express.Router();

const Customer = require('./models/Customer');
const Booking = require('./models/Booking');

router.post("/", (req, res) => {
  // Read variables sent via POST from our SDK
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  var length = text.split('*').length;
  var txt = text.split('*');

  console.log( req.body);
  let response = "";

  if (text === "") {
    console.log(text);
    // This is the first request. 
    response = `CON Welcome to Modern Coast Bus Booking
        1. Register
        2. Book Bus
        3. Check Bus Routes`;

        //Register a customer
  } else if (text === "1") {
    // Business logic for first level response
    response = `CON Enter Your ID Number`;

  } else if(length === 2 && txt[0] === '1') {
    response = `CON Enter Your PIN`;
  } else if(length ==3 && txt[0] === '1') {
    response = `END We will contact you shortly`;

    var options = text.split('*');

    const ID_Number = options[1];
    const phone_Number = phoneNumber;
    const customer_Pin = options[2];

    //check for an existing user
    Customer.findOne({ID_Number}, (err, customer) => {
        if(err) throw err;
        if(!customer) {
            const newCustomer = new Customer({
                ID_Number: ID_Number,
                phone_Number: phone_Number,
                customer_Pin: customer_Pin
            });
        
            newCustomer.save()
            .then(customer => {
                console.log(customer);
            })
            .catch(err => {
                console.log(err);
            });
            return response = `END Registration successfull. \n You can now Book a Bus`;
        } else {
            return response= `END You are already registered. \n Go back to Book Bus `;
        }

    });
  } 


  // Book a bus
  else if (text === "2") {
    
    response = `CON Enter Your ID number`;
    
  } else if(length === 2 && txt[0] === '2') {
    response =`CON Enter Your Origin \n ( The Town You Are Travelling From)
        (Enter One From The List)
        Nairobi
        Mombasa
        Kigali
        kisumu
        Entebbe`;
  } else if(length === 3 && txt[0] === '2') {
    response =`CON Enter Your Destination \n ( The Town You Want To Travel To )
    (Enter One From The List)
        Nairobi
        Mombasa
        Kigali
        kisumu
        Entebbe`;
  } else if (length === 4 && txt[0] ==='2') {
    response =`CON Enter The Date You Want To Travel \n FORMAT DD/MM/YY eg (12/MAY/2020 )`;
  } else if(length === 5 && txt[0] === '2'){
    response =`CON Enter The Time you prefer Start The journey \n FORMAT HH/MM A.M:P.M eg (11:00 A.M)`;
  } else if(length === 6 && txt[0] === '2') {
      response =`CON How Many Seats Do You Want To Book?`;
  }else if(length === 7 && txt[0] === '2') {
    response =`CON Enter a secret 4 digit PIN \n Remember The PIN To Board The Bus`;

  } else if(length === 8 && txt[0] === '2') {
    response = `END You successfully Booked A Seat \n Wait For Our Call`;

    var options = text.split('*');

    const customer_ID = options[1];
    const origin = options[2];
    const destination = options[3];
    const travel_Date = options[4];
    const departure_Time = options[5];
    const no_Of_Seats = options[6];
    const customer_Secret = options[7];
    const customer_Phone_Number = phoneNumber;

    const newBooking = new Booking({
        customer_ID: customer_ID,
        origin: origin,
        destination: destination,
        travel_Date: travel_Date,
        departure_Time: departure_Time,
        no_Of_Seats: no_Of_Seats,
        customer_Secret: customer_Secret,
        customer_Phone_Number: customer_Phone_Number
    });

    newBooking.save()
    .then(booking => {
        console.log(booking);
    })
    .catch(err => {
        console.log(err);
    });
  }else if (text === "3") {
    
    response = `END Bus Routes We Operate
        1. Nairobi - Mombasa
        2. Mombasa - Nairobi
        3. Nairobi -Kigali
        4. Kigali -Nairobi
        5. Mombasa - Kigali
        6. Kigali - Mombasa`;
  } 
  // Print the response onto the page so that our SDK can read it
  res.set("Content-Type: text/plain");
  res.send(response);
  // DONE!!!
});

module.exports = router;