



let x = require('express');
let p = require('path');
let cors = require('cors');
let mong = require('mongoose');
let bdp = require('body-parser');
let u = require('./modules/user_details');
let t = require('./modules/travel_flights');
var nodemailer = require('nodemailer');
let app = x();
app.use(
    cors({
        origin: '*',
    })
  );
app.use(x.json());
const port = 8000;

app.use(bdp.urlencoded({extended:true}));

app.get('/', function(req, res){
    console.log("hi");
    res.sendFile(p.join(__dirname,'/add_flight.html')); // Use path module to construct file path
});
  
  

    


app.post('/get_user_details',async function(req,res){
    try{
        await mong.connect('mongodb+srv://Cluster15452:QkJGS25gWXBc@cluster15452.gkfkzll.mongodb.net/TRAVEL_HUB?retryWrites=true&w=majority');
        await u.findOne(
            {
                email:req.body.email
            }
        ).then(async function(data){
            console.log("hello");
            if(data == null){
                let y = new u();
                y.email = req.body.email;
                y.Full_name = req.body.full_name;
                y.Gender = req.body.gender;
                y.Age = req.body.age;
                y.Passport_Number= req.body.pno;
                y.Adhaar_Number = req.body.adhaar;
                y.Contact_Number = req.body.contact;
                y.Password = req.body.password;
                y.month = req.body.month;
                y.day = req.body.day;
                y.year = req.body.year;
                await y.save();
                console.log("saved");
                res.status(300).json({success:'successful'});
                
                

            }
            else{
                res.status(200).json({success:'email exists'});
            }
        });

    }
    catch(e){
        res.status(100).json({success:'unsuccessful'});

    }
});
app.post('/add_flight',async function(req,res){

    try{

        await mong.connect('mongodb+srv://Cluster15452:QkJGS25gWXBc@cluster15452.gkfkzll.mongodb.net/TRAVEL_HUB?retryWrites=true&w=majority');
        let new_flight = t();
        let id = req.body.id;
        let company = req.body.company;
        let type = req.body.type;
        let rows = req.body.rows;
        let cols = req.body.cols;
        let gap_one = req.body.gap_one;
        let gap_two = req.body.gap_two;
        let seats_avl = req.body.seats_avl;
        let from = req.body.from;
        let to = req.body.to;
        let day = req.body.day;
        let month = req.body.month;
        let year = req.body.year;
        let time = req.body.time;
        let p = req.body.price;
        
        


        new_flight.id = id.toString();
        new_flight.company = company.toString();
        new_flight.type = type.toString();
        new_flight.rows = Number(rows);
        new_flight.cols = Number(cols);
        new_flight.gap_one = Number(gap_one);
        new_flight.gap_two = Number(gap_two);
        new_flight.seats_avl = Number(seats_avl);
        new_flight.start = from.toString();
        new_flight.end = to.toString();
        new_flight.day = day.toString();
        new_flight.month = month.toString();
        new_flight.year = year.toString();
        new_flight.time = time.toString();
        new_flight.price = p.toString();
        let ab = req.body.seats;
        for(let g = 0;g<ab.length;g++){
            let r = {seat:ab[g]};
            new_flight.seats.push(r);
        }

        await new_flight.save();
        console.log("done");
        res.status(300).json({success:'successful'});


    }
    catch(e){
        console.log(e);

    }

});
app.post('/log_in_check',async function(req,res){

    try{
        await mong.connect('mongodb+srv://Cluster15452:QkJGS25gWXBc@cluster15452.gkfkzll.mongodb.net/TRAVEL_HUB?retryWrites=true&w=majority');
        await u.findOne(
            {
                email:req.body.username,

            }
        ).then(async function(data){
            console.log("hello");
            if(data == null){
                
                res.status(100).json({success:'unsuccessful'});
                
                

            }
            else{
                if(data.Password == req.body.password){
                    res.status(200).json({success:data});

                }
            }
        });

    }
    catch(e){
        res.status(100).json({success:'unsuccessful'});

    }

})

app.post('/get_flight_travels_current',async function(req,res){

    try{
        await mong.connect('mongodb+srv://Cluster15452:QkJGS25gWXBc@cluster15452.gkfkzll.mongodb.net/TRAVEL_HUB?retryWrites=true&w=majority');

        console.log(req.body.day);
        console.log(req.body.month);
        console.log(req.body.year);
        console.log(req.body.start);
        await t.find(
            {start:req.body.start,end:req.body.end,day:req.body.day,month:req.body.month,year:req.body.year}
        ).then(function(data){
            if(data != null){
                res.status(200).json({success:data});
                console.log(data);
            }
            else{
                res.status(100).json({success:'unsuccessful'});

            }

        })


    }
    catch(e){
        res.status(100).json({success:'unsuccessful'});

    }

});
app.post('/update_flight',async function(req,res){

    try{
        await mong.connect('mongodb+srv://Cluster15452:QkJGS25gWXBc@cluster15452.gkfkzll.mongodb.net/TRAVEL_HUB?retryWrites=true&w=majority');
        let id = req.body.flight_number;
        let company = req.body.company;
        let time = req.body.time;
        let seats_avl = req.body.avl_seats;
        let start = req.body.start;
        let end = req.body.end;
        let month = req.body.flight_month;
        let day = req.body.flight_day;
        let year = req.body.flight_year;
        let h = [];

        let r = req.body.seats;

        for(let rrew = 0;rrew<r.length;rrew++){
            let k = r[rrew];
            let gh = k.toString();
            let yyh = {seat:gh};
            h.push(yyh);
        }

        if(seats_avl != 0){
            await t.updateOne({
                id:id,
                company:company,
                start:start,
                end:end,
                day:day,
                month:month,
                year:year,
                time:time,
    
            },{
                $set : {
                    seats_avl:seats_avl,
                    seats : h,
    
                }
            });
            console.log("updated");
            res.status(200).json({success:'successful'});
        }
        else{
            await t.deleteOne({
                id:id,
                company:company,
                start:start,
                end:end,
                day:day,
                month:month,
                year:year,
                time:time,


            });
            console.log("deleted");
            res.status(200).json({success:'successful'});

        }




    }
    catch(e){
        res.status(100).json({success:'unsuccessful'});
        
    }

});

app.post('/send_mail',async function(req,res){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'muditrajsade89@gmail.com',
          pass: 'uicf nsul ilok lojc'
        }
    });
    let flight_number = req.body.flight_number;
    let flight_month = req.body.flight_month;
    let flight_day = req.body.flight_day;
    let flight_year = req.body.flight_year;
    let time = req.body.time;
    let passengers = req.body.passengers;
    var mailOptions = {
        from: 'muditrajsade89@gmail.com',
        to: req.body.email,
        subject: 'Sending Email using Node.js',
        text: 'Ticket booked ! \n ' +  flight_number + '\n' +  flight_day + '/' + flight_month + '/' + flight_year + '\n' + time + '\n' +  passengers + '\n',
      };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(100).json({success:'unsuccessful'});
          
        } else {
            
          console.log('Email sent: ' + info.response);
          res.status(200).json({success:'successful'});

        }
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


