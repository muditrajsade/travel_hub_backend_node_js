
let r = require('mongoose');
let cvx = new r.Schema({
    seat:String
})
let t = new r.Schema({
    id:String,
    company:String,
    type:String,
    rows:Number,
    cols:Number,
    gap_one:Number,
    gap_two:Number,
    seats_avl:Number,
    start:String,
    end:String,
    day:String,
    month:String,
    year:String,
    time:String,
    seats:[cvx],
    price:String,



});

module.exports = r.model('flight_travels',t);