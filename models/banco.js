// importar sequelize
// importar mysql2

const Sequelize = require("sequelize")
const sequelize = new Sequelize("projetoweb", "root", "", {
        host: "localhost",
        dialect: "mysql"
    }
)

module.exports = {
    Sequelize,
    sequelize
}