"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Types",[
        {
          name: 'entry',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Types",[
        {
          name: 'egress',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Types", null, {});
  },
};
