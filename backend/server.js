const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
 
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const blogRoutes = require('./routes/blogRoutes');

 
const corsOptions = {
  origin: [
"http://localhost:3000",
"http://localhost:5173",
"http://localhost:5174",
"http://localhost:4173",

  ],
  methods: ["GET", "POST", "PUT", "DELETE",""],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
 
const connectToDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) {
      console.error("MongoDB URI is missing in the .env file");
      return;
    }
    await mongoose.connect(dbUri);
    console.log("Successfully connected to the database!");
  } catch (error) {
    console.log("Connecting to DB failed:", error);
  }
};
 
connectToDB();
 

 
app.use('/',blogRoutes)
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});