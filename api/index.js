import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).send({
    success: false,
    statusCode,
    message,
  });
});
// username:imedward171
// password:ikC7FNRG05s7pKPV
// mongodb+srv://imedward171:ikC7FNRG05s7pKPV@mernblog.3smz0y1.mongodb.net/
