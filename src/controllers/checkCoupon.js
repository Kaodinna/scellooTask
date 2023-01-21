import express, { Request, Response } from "express";
import { Coupon } from "../models/createCouponModel"
import { Item } from "../models/cartModel";



export const CheckCoupon = (req, res) => {
    try{
        const {couponCode} = req.query.code
        CheckCoupon.findOne({where:{code:couponCode,valid:true}}).then(coupon => {
            if (!coupon) {
                res.status(400).json({message: "Invalid coupon code"})
            }else {
                Item.findAll().then(items => {
                    let total = 0 
                    for(let item of items) {
                        total += item.price
                    }
                    if (total < coupon.min_cart_total){
                        res.status(400).json({message:"Cart total is not enough to use this coupon"})
                        return
                    }
                    if (items.length < coupon.min_items) {
                        res.status(400).json({message: "Cart does not have enough items to use this coupon"})
                        return
                    }
                    let discountFixed = coupon.discount_fixed
                    let discountPercent = coupon.discount_fixed
                    let discountAmount = 0

                    if (discountFixed && discountPercent) {
                        discountAmount = Math.max(total * (discountPercent/100),discountFixed)
                    }else if (discountFixed) {
                        discountAmount = discountFixed 
                    }else if(discountPercent) {
                        discountAmount = total * (discountPercent/100)
                    }
                    let adjustedTotal = total - discountAmount
                    res.json({total:total, discount_amount:discountAmount,
                    adjusted_total:adjustedTotal})
                })
            }
        })
    }catch (error){
        console.log(error)
    }
}