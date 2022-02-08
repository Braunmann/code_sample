'use strict';

import {DataTypes} from "sequelize";

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('TruckModels', {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('TruckModels');
  }
};
