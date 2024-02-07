const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('./routes/auth.routes.js');
const post = require('./routes/post.routes.js');
const db = require('./db/conn.js');
const cookieParser = require('cookie-parser');
const port = "8080";

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth/', auth);
app.use('/api/post/', post);

const start = async () => {
    try {
        await db();
        app.listen(port,()=>{
            console.log("Server Listening on port",port); 
         })
    } catch (error){
        console.log(error);
    }
}

start();

