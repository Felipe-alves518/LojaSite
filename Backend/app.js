require('dotenv').config()
require ('express-async-error')

const express = require('express');
const app = express();
const connectDb = require('./db/connect');
const cors = require('cors');
const path = require('path')

const _dirname = path.resolve()


const errorHandlerMiddleware = require('./Middleware/error-handler')
//const NotFoundMiddleware = require('./Middleware/not-found')

//middleware
app.use(express.json());
app.use(cors());
app.use(errorHandlerMiddleware);
//app.use(NotFoundMiddleware);

//routes
const products = require('./routes/products');
app.use("/api/v1/products", products);


//frontend
/*if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname,"../frontend/dist")))
    app.get("*splat",(req,res) => {
    res.sendFile(path.join(_dirname,"../frontend","dist","index.html"))
})
}
*/

const PORT = process.env.PORT || 5000;


const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(PORT,()=> console.log(`server is listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }

}


start();