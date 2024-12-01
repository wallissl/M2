'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   // Aqui adicionamos o conteúdo das querys que serão inseridos na nossa tabela

   await queryInterface.createTable('pets2', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    nome: {
      allowNull: false,
      type: Sequelize.STRING
    },
    idade: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    raca: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    responsavelId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references:{
        model: 'responsaveis',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })
},

async down (queryInterface, Sequelize) {
  // Comando para reverter uma tabela criada
  await queryInterface.dropTable('pets2');
}
};