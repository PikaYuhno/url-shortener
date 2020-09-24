"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../connection");
class Url extends sequelize_1.Model {
}
Url.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    expireDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    redirectUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, { sequelize: connection_1.sequelize, tableName: "url" });
Url.sync({ force: true });
exports.default = Url;
