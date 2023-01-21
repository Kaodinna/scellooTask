import express from "express"
import {couponSchema, option} from "../utils/utility.js"
import { CreateCoupon } from "../models/createCouponModel.js"
import { v4 as uuidv4 } from "uuid"


export const NewCoupon = async (req,res) => {
   try {
    const {code, valid, min_cart_total,min_items,discount_fixed,discount_percent} = req.body
    const validateResult = couponSchema.validate(req.body, option)
    if (validateResult.error) {
        return res.status(400).json({
            Error: validateResult.error.details[0].message
        })
    }
    const Coupon = await  CreateCoupon.findOne({where:{code:code}})  
    if (!Coupon) {
       await CreateCoupon.create({
            id: uuidv4(),
            code,
            valid,
            min_cart_total,
            min_items,
            discount_fixed,
            discount_percent
        })
   
        return res.status(201).json({
            msg:"coupon created"
        })
       
    }
    return res.status(400).json({
        Error: "coupon already exists"
    })
}catch(error){
    res.status(500).json({
        Error: "Internal server Error"
    });
}

}
