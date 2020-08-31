const models = require('./../models');

async function execute(info){
    let data = info.data;

    data = removeInvalidFields(data);
    data = replaceInvalidValue(data);
    info.data = await replaceNameById(data);
    let rows = await formatToSave(info)
    saveAll(rows);
}

function saveAll(rows){
    rows.forEach( row => {
        models.OcorrenciaCidade.create(row)
    })
}

async function formatToSave(info){
    let cidade = (await models.Cidade.findAll({
        where: {
            nome: info.city
        }
    }))[0];

    let rows = []
    for(let i = 0; i < info.data.length; i++){
        for(let j = 1; j < 13; j++){
            rows.push(
                { id_cidade: cidade["id"], 
                        mes: j, 
                        qtd:info.data[i][j], 
                        ano: info.year,
                        id_ocorrencia: info.data[i][0]['id']
                }
            );
        }
    }
    
    return rows;
}


function replaceInvalidValue(data){
    return data.map(row => 
        row.map( collumn =>
            collumn === '...' ? 
            collumn.replace(/.../g, "0") :
            collumn
        )
    )
}

function removeInvalidFields(data){ 
    return data.filter(row => 
        row[0] != undefined &&
        row[0] != 'TOTAL DE ESTUPRO (4)' &&
        row[0] != 'TOTAL DE ROUBO - OUTROS (1)' &&
        row.length == 14
      )    
}

async function replaceNameById(data){
    let all = await models.Ocorrencia.findAll();
    for(let i = 0; i < data.length; i++ ){
        for(let j = 0; j < all.length; j++){
            if(data[i][0] == all[j]["natureza"]){
                data[i][0] = all[j]
            }
        }
    }
    return data;
}


module.exports = {
    execute
};