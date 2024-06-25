'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const loans = [];

    for (let i = 0; i < 100; i++) {
      loans.push({
        userId: i + 1,
        tool: faker.commerce.product(),
        serialNumber: faker.vehicle.vin(),
        loanDate: faker.date.soon({days: 1}),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('loans', loans, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('loans', null, {});
  },
};
