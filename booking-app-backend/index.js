const cors= require("cors")
const express = require("express")
const dotenv = require("dotenv")
const mongoose= require("mongoose")
const Auth= require('./Routes/auth')
const Hotel= require('./Routes/hotel')
const Room= require('./Routes/room')
const User= require('./Routes/users')
const app= express()
const path = require('path');
const cookieParser = require('cookie-parser')
dotenv.config()

const name = "gaurav";
app.use(express.json())

// if (process.env.NODE_ENV != "production") {
//   require('dotenv').config({ path: 'booking-app-backend/.env' });
// }


const connect = async()=>{
    try {
        await mongoose.connect(process.env.Mongo);
        console.log('connected to database');
        
      } catch (error) {
          console.log('not connected to database');
        // handleError(error);
        console.log(error);
        
      }
}

mongoose.connection.on('error', err => {
    console.log('MongoDb Error');
    
  });
mongoose.connection.on('disconnected', err => {
    console.log('MongoDb disconnected');
    
  });
mongoose.connection.on('connected', err => {
    console.log('MongoDb connected');
    
  });

  // __dirname = path.resolve();
  // if (process.env.NODE_ENV === 'production') {
  //     app.use(express.static(path.join(__dirname, '/frontend/build')))
  
  //     app.get('*', (req, res) => {
  //         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  //     });
  // } else {
      app.get('/', (req, res) => {
          res.send('Server is Running! 🚀');
      });
  // }



// now lets use middle ware
app.use(cors())
app.use(cookieParser())
app.use('/api/auth',Auth);
app.use('/api/users',User)
app.use('/api/hotels',Hotel)
app.use('/api/rooms',Room)


// this is special middle ware to catch error
app.use((err,req,res,next)=>{

  const errorStatus= err.status || 500;
  const errorMessage= err.message || "hello buddy error is detected"
  return res.status(errorStatus).json({
    sucess:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack
  });
})

const PORT= process.env.PORT || 4000;

app.listen(PORT,()=>{
    connect();
    console.log(`Hello ${name} Server is Started`);
    console.log(`server is running on localhost:${PORT}`);
    console.log(`your mongodb URL is ${process.env.Mongo}`);

})