import express from "express";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import appointmentRouter from "./routes/appointment.route.js";
import path from 'path'

mongoose
  .connect(
    "mongodb+srv://sahand:sahand@appointment-with-doctor.ickqivj.mongodb.net/appointment-with-doctor?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected MongoDB");
  })
  .catch((error) => console.log(error));

   const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser())

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/appointment", appointmentRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
