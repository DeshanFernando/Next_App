const express = require('express');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;
const cors = require('cors');

app.use(cors());

const db = require("./db");

const app = express();


// parses json data sent to us by the user
app.use(bodyParser.json());


// Controllers

let itemController = require('./itemController');

app.use('/item', itemController);


// serve static html file to user
app.get('/',(req,res)=>{

    // admin.auth().createUser({
    //     email: 'lahiruperera@gmail.com',
    //     emailVerified: false,
    //     phoneNumber: '+11234567890',
    //     password: 'password',
    //     displayName: '',
    //     disabled: false
    // })
    // .then(function(userRecord) {
    //   // See the UserRecord reference doc for the contents of userRecord.
    //   console.log('Successfully created new user:', userRecord.uid);
    // })
    // .catch(function(error) {
    //   console.log('Error creating new user:', error);
    // });

    // return res.status(200).send({status : "Ok"});
});

db.connect((err)=>{
    // If err unable to connect to database
    // End application
    if(err){
        console.log('unable to connect to database');
        process.exit(1);
    }
    // Successfully connected to database
    // Start up our Express Application
    // And listen for Request
    else{
        app.listen(PORT, () => console.log(`connected to database, Listening on ${ PORT }`));
    }
});

