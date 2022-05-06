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
      Type.hasOne(Record, { as: "record", foreignKey: "typeId" });
      Records.belongsTo(Type, { as: "type", foreignKey: "typeId" })
    }
  }
  Records.init(
    {
      concept: DataTypes.STRING,
      typeId: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      date: DataTypes.DATE,
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Records",
    }
  );
     
  return Records;
};
