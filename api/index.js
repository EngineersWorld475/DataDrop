import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Mogodb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log(`server is listening to port 3000`);
});

// username:imedward171
// password:ikC7FNRG05s7pKPV
// mongodb+srv://imedward171:ikC7FNRG05s7pKPV@mernblog.3smz0y1.mongodb.net/