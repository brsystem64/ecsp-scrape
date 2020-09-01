
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Ocorrencia extends Model {
      static associate() {
      }
    }

    Ocorrencia.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        natureza: DataTypes.STRING
    },{
      sequelize,
      tableName: "tb_ocorrencia",
      modelName: "Ocorrencia",
      createdAt: false,
      updatedAt: false
    });
    return Ocorrencia;
};



