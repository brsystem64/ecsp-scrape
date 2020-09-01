function formatterCity(city){
    city = city.toUpperCase();
    city = city.replace(/ /g,"")
                .replace(/[ÃÀÁ]/g,"A")
                .replace(/[ÊÉÈ]/g,"E")
                .replace(/[ÍÌ]/g, "I")
                .replace(/[ÔÓÒ]/g,"O")
                .replace(/[ÚÙ]/g, "U");
    return city;
}

function isCitiesEquals(a, b){
    return formatterCity(a) == formatterCity(b);
}

function replaceInvalidValues(data){
    return data.map(row => 
        row.map( collumn =>
            collumn === "..." ? 
            collumn.replace(/.../g, "0") :
            collumn
        )
    );
}

function removeInvalidFields(data){ 
    return data.filter(row => 
        row[0] != undefined &&
        row[0] != "TOTAL DE ESTUPRO (4)" &&
        row[0] != "TOTAL DE ROUBO - OUTROS (1)" &&
        row.length == 14
      );
}

module.exports = {
    isCitiesEquals,
    replaceInvalidValues,
    removeInvalidFields
};