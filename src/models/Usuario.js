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


Usuario.belongsToMany(Permissao, {
    through: UsuarioPermissoes,
    foreignKey: 'usuarioId',
    otherKey: 'permissaoId'
}); // Aqui nós temos primeiro - Qual tabela se relaciona com qual, qual é a tabela pivô, qual é a chave estrangeira da tabela atual, e qual é a chave estrangeira da outra tabela.

/* Permissao.belongsToMany(Usuario, {
    through: UsuarioPermissoes,
    foreignKey: 'permissaoId',
    otherKey: 'usuarioId'
}); */ // Caso fosse necessário a ligação inversa.

/* Permissao.belongsToMany(Usuario, {through: UsuarioPermissoes}) */


Usuario.beforeSave((usuario) => {
    usuario.password_hash = hashSync(usuario.password_hash, 10)
    return usuario
})

module.exports = Usuario;