


let r = require('mongoose');

let u = new r.Schema({
    email:String,
    Full_name:String,
    Gender:String,
    Age:String,
    Passport_Number : String,
    Adhaar_Number :String,
    Contact_Number : String,
    Password : String,
    month : String,
    day : String,
    year : String



});

module.exports = r.model('user_details',u);