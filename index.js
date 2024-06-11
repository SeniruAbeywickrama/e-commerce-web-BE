const express= require('express');
const mongoose = require('mongoose');

//To unblock the data which come from other servers
const cors= require('cors');
//For read the user data from sign-up and seller page
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoString = process.env.DATABASE_URL


//seller portal route
const ProductRouter= require('./routes/product-router');


const app = express();
app.use(cors());
app.use(bodyParser.json());



// mongodb database
// mongoose.default.connect(mongoString)
//     .then(() => console.log('DB Connected!'));

mongoose.default.connect(mongoString)
    .then(()=>{
        console.log('DB connected !');
    }).catch((error)=>{
        console.log(error);
    });

app.listen(3001, ()=>{
    console.log('sdgp service Stared on port 3001');
})


app.use('/api/v1/productRoute', ProductRouter);
