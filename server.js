const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan')
const menuRouter = require("./routes/menuRoutes");
require('dotenv').config()

const app = express();

app.use(morgan('tiny'))
app.use(express.json());
mongoose.connect(
  process.env.MONGO_URI,
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