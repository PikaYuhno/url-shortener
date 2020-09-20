import { Sequelize } from "sequelize";

export const createConnection = (): Sequelize => {
    const sequelize = new Sequelize("postgres", "postgres", "postgres", {
        host: "localhost",
        dialect: "postgres",
    });

    return sequelize;
};

export const sequelize = createConnection();
