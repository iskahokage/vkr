"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("legal_registereds", "resident_area", {
            type: Sequelize.STRING,
        });
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
    },

    async down(queryInterface, Sequelize) {
        queryInterface.removeColumn("legal_registered", "resident_area");
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
