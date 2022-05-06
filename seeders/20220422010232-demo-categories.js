"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",[
        {
          name: 'food',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Categories",[
        {
          name: 'services',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

    
    await queryInterface.bulkInsert(
      "Categories",[
        {
          name: 'tools',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Categories",[
        {
          name: 'drinks',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
