const { DataTypes } = require('sequelize')
const connection = require('../database/connection')
const {hashSync} = require('bcryptjs')
const Permissao = require('./Permissao')
const UsuarioPermissoes = require('./UsuarioPermissoes')

const Usuario = connection.define("usuarios", {
    nome: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password_hash: {
        type: DataTypes.STRING
    }
})

//Ligação com outras tabelas

Permissao.belongsToMany(Usuario, {through: UsuarioPermissoes})

Usuario.belongsToMany(Permissao, {through: UsuarioPermissoes})

Usuario.beforeSave((usuario) => {
    usuario.password_hash = hashSync(usuario.password_hash, 10)
    return usuario
})

module.exports = Usuario;