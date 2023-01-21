import express from "express";
import logger from "morgan"
import cookieParser from "cookie-parser";
import { db } from "./src/config/index.js";
import dotenv from "dotenv"
import CreateCouponRouter from "./src/routes/createCoupon.js" 
dotenv.config()
const app = express()


app.use(express.json());
app.use(logger('dev'))
app.use(cookieParser())



app.use("/coupon", CreateCouponRouter)



const port = 4100

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

db.sync().then(() => {

    console.log('Db connected successfully')
}).catch(err => {
    console.log(err)
})

export default app