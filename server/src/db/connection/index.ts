import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const createConnection = (): Sequelize => {
    const sequelize = new Sequelize(
        process.env.PG_DATABASE!,
        process.env.PG_USERNAME!,
        process.env.PG_PASSWORD!,
        {
            host: process.env.PG_HOST,
            dialect: "postgres",
        }
    );

    return sequelize;
};

export const sequelize = createConnection();
