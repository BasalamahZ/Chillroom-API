import { Sequelize } from "sequelize";

const db = new Sequelize("backup", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

export default db