'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const address = [];

    for (let i = 0; i < 100; i++) {
      address.push({
        userId: i+1,
        country: faker.location.countryCode('numeric'),
        region:faker.location.state(),
        district:faker.location.city(),
        city: faker.location.city(),
        locality: null,
        street: faker.location.streetAddress(),
        house: i,
        room: i,
        postcode: faker.location.zipCode(),
        mailbox_number: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('legal_registereds', address, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('legal_registereds', null, {});
  },
};
