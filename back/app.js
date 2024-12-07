//-----------------dependency--------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRoutes')
const postRoutes = require('./routes/postRoutes');
const cors = require('cors'); 



//-----------------dependency--------------------------------
dotenv.config();


mongoose.set('strictQuery', false);

mongoose.connect(
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_DATABASE
    : process.env.DEV_DATABASE,
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to the database');
    }
  },
);

  
  

app.use(bodyParser.json())
app.use(cors());

app.use('/api/v1/users', userRouter )
app.use('/api/v1/', postRoutes);

module.exports = app