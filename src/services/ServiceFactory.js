


function get(serviceName){
    return require('./'+serviceName);
}


module.exports = {
    get
}