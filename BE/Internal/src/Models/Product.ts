import {
	Model,
	DataTypes,
	type HasManyAddAssociationMixin,
	type HasManySetAssociationsMixin,
	type HasManyGetAssociationsMixin,
	type HasManyRemoveAssociationsMixin,
	type HasOneGetAssociationMixin,
	type HasOneSetAssociationMixin,
	type HasOneCreateAssociationMixin,
} from "sequelize";
import Loader from "../Loaders";
import { Cart, Order, OrderItem, CartItem, } from ".";
import Category from "./Category";
import ClientHistory from "./ClientHistory";
class Product extends Model {
	public static associate() {
		Product.belongsToMany(Cart, {
			through: CartItem,
			foreignKey: "productId",
			otherKey: "cartId",
		});
		Product.belongsToMany(Order, {
			through: OrderItem,
			foreignKey: "productId",
			otherKey: "orderId",
		});
		Product.belongsTo(Category, {
            foreignKey: {
                name: "categoryId",
                allowNull: false,
            },
        });

		Product.hasMany(ClientHistory, {
			foreignKey: {
				name: "productId",
				allowNull: true,
			},
			sourceKey: "id",
		});
	}
}
Product.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		thumbnails: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize: Loader.sequelize,
	}
);

export default Product;
