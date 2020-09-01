const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class OcorrenciaCidade extends Model {
      static associate(models) {
        OcorrenciaCidade.belongsTo(models.Cidade, {
            foreignKey: "id_cidade"   
        });

        OcorrenciaCidade.belongsTo(models.Ocorrencia, {
          foreignKey: "id_ocorrencia"
        });
      }
    }
    OcorrenciaCidade.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        mes: DataTypes.TINYINT,
        ano: DataTypes.SMALLINT,
        qtd: DataTypes.SMALLINT
    },{
      sequelize,
      tableName: "tb_ocorrencia_cidade",
      modelName: "OcorrenciaCidade",
      updatedAt: false,
      createdAt: false
    });
    return OcorrenciaCidade;
};
