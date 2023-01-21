import { DataTypes, Model } from "sequelize"
import {db} from "../config/index.js"


export class CreateCoupon extends Model{}

CreateCoupon.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    code:{
        type:DataTypes.STRING,
    },
    valid:{
        type:DataTypes.BOOLEAN,
    },
    min_cart_total:{
        type:DataTypes.INTEGER
    },
    min_items:{
        type:DataTypes.INTEGER
    },
    discount_fixed:{
        type:DataTypes.INTEGER
    },
    discount_percent: {
        type:DataTypes.INTEGER
    }
}, {
    sequelize: db,
    tableName: 'coupon'
  })