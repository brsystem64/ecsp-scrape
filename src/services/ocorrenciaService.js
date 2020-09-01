const {removeInvalidFields, replaceInvalidValues} = require("./../helpers/regex");
const models = require("./../models");

async function execute(info){
    info.data = removeInvalidFields(info.data);
    info.data = replaceInvalidValues(info.data);
    info.data = await replaceNameById(info.data);

    data = await formatToSave(info);
    saveAll(data);
}

function saveAll(data){
    data.forEach( row => {
        models.OcorrenciaCidade.findOne({
            where: {
                id_cidade: row.id_cidade, 
                mes: row.mes, 
                ano: row.ano,
                id_ocorrencia: row.id_ocorrencia
            }
        }).then(
            obj => {
                if(obj) { 
                    return obj.update(row);
                }
                return models.OcorrenciaCidade.create(row);
            }

        )
    });
}

function findCityByName(value){
    return models.Cidade.findOne({
        where: {
            nome: value
        }});
}


async function formatToSave(info){
    let cidade = await findCityByName(info.city);
    console.log(cidade)
    let rows = [];

    info.data.forEach(row =>{
        for(let j = 1; j < 13; j++){
            rows.push(
                { 
                    id_cidade: cidade["id"], 
                    mes: j, 
                    qtd: row[j], 
                    ano: info.year,
                    id_ocorrencia: row[0]["id"]
                }
            );
        }
    });
    return rows;
}

async function replaceNameById(data){
    let all = await models.Ocorrencia.findAll();

    for(let i = 0; i < data.length; i++ ){
        for(let j = 0; j < all.length; j++){
            if(data[i][0] == all[j]["natureza"]){
                data[i][0] = all[j];
                break;
            }
        }
    }
    return data;
}


module.exports = {
    execute
};