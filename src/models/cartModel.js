import {DataTypes} from 'sequelize';
import {db} from '../config'

export class Cart extends Model {} 
Cart.init({
    name:{
        type:DataTypes.STRING,
    },
    price:{
        type:DataTypes.INTEGER,
    },
    totalPrice:{
        type:DataTypes.INTEGER
    }

},
{
    sequelize: db,
    tableName: 'cart'
})