import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
})