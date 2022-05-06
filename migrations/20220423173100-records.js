"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Records", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      concept: {
        type: Sequelize.STRING,
      },
      typeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Types",
          key: "id"
      },
      onUpdate:'CASCADE'
    },
      amount: {
        type: Sequelize.FLOAT,
      },
      date: {
        type: Sequelize.DATE,
      },
      categoriesId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id"
      },
      onUpdate:'CASCADE'
    },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
      },
      onUpdate:'CASCADE'
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Records");
  },
};
