const express = require("express");
const mongoose = require("mongoose");
const mealRouter = require("./routes/mealRoutes")

const app = express();

app.use(express.json());
mongoose.connect(
    "mongodb+srv://dickens:ugPUWKvrnAuiTs8@cluster0.yeyah.mongodb.net/Oaklydb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  );
  
app.use(mealRouter);

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });