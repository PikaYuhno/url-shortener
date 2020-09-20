import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connection";

class Url extends Model {
    public id!: number;
    public name!: string;
    public expireDate!: Date;
    public redirectUrl!: string;
}

Url.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expireDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        redirectUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { sequelize, tableName: "url" }
);

Url.sync({ force: true });
export default Url;
