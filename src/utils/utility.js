import Joi from "joi"



export const couponSchema = Joi.object().keys({
    code: Joi.string(),
    valid: Joi.boolean(),
    min_cart_total: Joi.number(),
    min_items: Joi.number(),
    discount_fixed: Joi.number(),
    discount_percent: Joi.number()
})


export const option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
}