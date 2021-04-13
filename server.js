const express = require("express");
const mongoose = require("mongoose");
const menuRouter = require("./routes/menuRoutes");

//sendSMS.JS
const AfricasTalking = require('africastalking');

// TODO: Initialize Africa's Talking
const africastalking = AfricasTalking({
  apiKey: '251e50d776452795fe2930c2089e0e3f6bf222165c0d3f89d058fc88b266d236', 
  username: 'sandbox'
});


const app = express();

async function sendSMS() {
    
  // TODO: Send message
  try {
const result=await africastalking.SMS.send({
  to: '+254704868023', 
  message: 'order me',
  from: 'OAKLY'
});
console.log(result);
} catch(ex) {
console.error(ex);
} 

};

sendSMS()

app.use(express.json());
mongoose.connect(
    "mongodb+srv://dickens:ugPUWKvrnAuiTs8@cluster0.yeyah.mongodb.net/Oaklydb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  );
  
app.use(menuRouter);



const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });