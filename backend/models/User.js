const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // require the sequelize instance

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("user", "admin", "systemAdmin", "storeOwner"),
    defaultValue: "user",
  },
});

module.exports = User;
