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

module.exports = {
    isCitiesEquals
};