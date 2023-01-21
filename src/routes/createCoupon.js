import express from "express"
import { NewCoupon } from "../controllers/createCoupon.js"


const router = express.Router()

router.post('/addcoupon', NewCoupon)




export default router