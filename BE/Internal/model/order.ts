import {
    Model, DataTypes,
    type BelongsToManySetAssociationsMixin,
    type BelongsToManyAddAssociationMixin,
    type BelongsToManyGetAssociationsMixin,
    type BelongsToManyRemoveAssociationMixin,
    type BelongsToCreateAssociationMixin,
    type BelongsToGetAssociationMixin,
    type BelongsToSetAssociationMixin
} from 'sequelize';
import Loader from '../loader';
import Customer from './customer';
import Table from './table';

class Order extends Model {
    declare setTables: BelongsToManySetAssociationsMixin<Table, Table>;
    declare getTables: BelongsToManyGetAssociationsMixin<Table>;
    declare addTables: BelongsToManyAddAssociationMixin<Table, Table>;
    declare removeTables: BelongsToManyRemoveAssociationMixin<Table, Table>;
    declare setCustomer: BelongsToSetAssociationMixin<Customer, Customer>;
    declare getCustomer: BelongsToGetAssociationMixin<Customer>;
    declare createCustomer: BelongsToCreateAssociationMixin<Customer>;

    public static association() {
        Order.assocCustomer();
        Order.assocTable();
    }

    public static assocCustomer() {
        Order.belongsTo(Customer)
    }

    public static assocTable() {
        Order.belongsToMany(Table, { through: "Table_order" });
    }
}

Order.init({
    status: DataTypes.STRING,
    descriptions: DataTypes.STRING,
    pre_discount_ammount: DataTypes.DOUBLE,
    shipping_address: DataTypes.STRING,
    payment_time: DataTypes.DATE,
    payment_method: DataTypes.INTEGER,
    amount: DataTypes.DOUBLE,
    num_items: DataTypes.INTEGER,
    num_completed: DataTypes.INTEGER,

}, { sequelize: Loader.sequenlize })

export default Order;