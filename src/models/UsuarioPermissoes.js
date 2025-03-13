const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const UsuarioPermissoes = connection.define('UsuarioPermissoes', {
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    permissao_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'permissoes',
            key: 'id'
        }
    }
   
});

module.exports = UsuarioPermissoes;