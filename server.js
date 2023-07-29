import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import userRoute from "./user/user.route.js";
import dbConnect from "./utils/dbConnect.js";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", userRoute);

app.listen(port, () => {
  console.log(`Server running at Port: ${port}`);
  dbConnect().then(() => console.log("connected to db successfully"));
});
