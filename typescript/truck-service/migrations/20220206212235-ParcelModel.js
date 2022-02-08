'use strict';

import {DataTypes} from "sequelize";

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('ParcelModels', {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
      },
      weight: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: false,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('ParcelModels');
  }
};
