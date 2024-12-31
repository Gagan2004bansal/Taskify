import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import dbConnection from "./utils/index.js";
import routes from "./routes/index.js";

dotenv.config();
dbConnection();

const PORT = process.env.PORT || 4002;

const app = express();

app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());  
app.use('/api', routes);


app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});