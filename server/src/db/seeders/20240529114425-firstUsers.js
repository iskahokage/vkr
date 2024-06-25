'use strict';
const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        surname: 'Adminov',
        password: await bcrypt.hash('password', 3),
        email: 'admin@mail.ru',
        phone: '996500500774',
        role: 'admin',
        tin: faker.finance.pin(14),
        address: faker.location.streetAddress(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Test',
        surname: 'Testov',
        password: await bcrypt.hash('password', 3),
        email: 'test@mail.ru',
        phone: '996500500774',
        role: 'user',
        tin: faker.finance.pin(14),
        address: faker.location.streetAddress(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'John',
        surname: 'Doe',
        password: await bcrypt.hash('password', 3),
        email: 'john@mail.ru',
        phone: '996500500774',
        role: 'user',
        tin: faker.finance.pin(14),
        address: faker.location.streetAddress(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Anvar',
        surname: 'Doe',
        password: await bcrypt.hash('password', 3),
        email: 'anvar@mail.ru',
        phone: '996500500774',
        role: 'user',
        tin: faker.finance.pin(14),
        address: faker.location.streetAddress(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
