'use strict';

const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];

    for (let i = 0; i < 100; i++) {
      const password = await bcrypt.hash('password', 3);
      users.push({
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        password: password,
        email: faker.internet.email(),
        phone: faker.phone.number('996#########'),
        tin: faker.finance.pin(14),
        address: faker.location.streetAddress(),
        role: i === 0 ? 'admin' : 'user', // Первый пользователь - админ, остальные - пользователи
        
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
