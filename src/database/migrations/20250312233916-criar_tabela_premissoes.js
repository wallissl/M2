'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('permissoes', {
      id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('permissoes');
  }
};
