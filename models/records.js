"use strict";
const { Model } = require("sequelize");
const { Type } = require("./type");
module.exports = (sequelize, DataTypes) => {
  class Records extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Records.belongsTo(models.Categories, { as: "categories", foreignKey: "categoriesId" })
      Records.belongsTo(models.User, { as: "user", foreignKey: "userId" })
      Records.belongsTo(models.Type, { as: "type", foreignKey: "typeId" })
    }
  }
  Records.init(
    {
      concept: DataTypes.STRING,
      typeId: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      date: DataTypes.DATE,
      categoriesId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Records",
    }
  );
     
  return Records;
};
