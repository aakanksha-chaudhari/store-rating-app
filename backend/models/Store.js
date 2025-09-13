const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Store = sequelize.define("Store", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

Store.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

module.exports = Store;
