import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import path from 'path';
const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Mogodb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

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
