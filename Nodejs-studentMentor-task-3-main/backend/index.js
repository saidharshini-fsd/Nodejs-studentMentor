import express from 'express';
const app = express();
import * as dotenv from "dotenv";
import { MongoClient } from 'mongodb';
import studentRouter from './Routes/students.route.js';
import mentorRouter from './Routes/mentors.route.js';
import assignedRouter from './Routes/assigned.route.js';
import cors from 'cors';
dotenv.config();
app.use(cors());

app.use(express.json());
const PORT  = process.env.PORT ;
// const MONGO_URL = 'mongodb://127.0.0.1';
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("mongo is connected !!!");

app.get("/",async function (request, response) {
    response.send("Welcome to project : 🙋‍♂️, 🌏 🎊✨🤩");
});


//students
app.use("/students" , studentRouter)

//mentors
app.use("/mentors" , mentorRouter)

//assigned
app.use("/assigned", assignedRouter)

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client } ;