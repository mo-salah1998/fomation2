
const app = require('./app');


//this is the Port the servver will use  
const PORT = process.env.PORT || 3001 ;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err)
  }else {
  console.log(`listening on port ${PORT}`)  
  }
});
