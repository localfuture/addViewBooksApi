const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// For CORS,Pgm Line no 12 to 29
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

mongoose.connect("mongodb://localhost:27017/addViewBookDB",{useNewUrlParser: true});

//mongoose.connect("mongodb+srv://anand:unicornb1331@cluster0-0tquo.mongodb.net/addViewBookDB?retryWrites=true&w=majority");

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publisher: String,
    published: String,
    distributor: String,
    price: String,
    description: String,
});

const bookCollection = new mongoose.model("bookDetails",bookSchema);

//////////////////Write to DB////////////////////////////
app.post("/addBooks",(req,res)=>{
    const book = new bookCollection(req.body);
    book.save((error)=>{
        if (error) {
            console.log(error);
        } else {
            res.send("Book Added Successfully");
            console.log("Book Added Successfully");
        }
    });
});

//////////////////////////////////////View Book////////////////////////
app.get("/viewBooks",(req,res)=>{
    bookCollection.find((error,data)=>{
        if(error) {
            console.log(error);
        } else {
            res.send(data);
            console.log("Book send successfully")
        }
    });
});


////////////////////////////////////////////////////////////////////////
app.get("/",(req,res)=>{
    res.send("hello");
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server Is Listening");
});