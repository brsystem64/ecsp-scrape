
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Cidade extends Model {
      static associate() {
      }
    }

    Cidade.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nome: DataTypes.STRING
    },{
      sequelize,
      tableName: "tb_cidade",
      modelName: "Cidade",
      createdAt: false,
      updatedAt: false
    });
    return Cidade;
};



