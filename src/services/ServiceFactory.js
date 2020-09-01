


function build(serviceName){
    return require("./"+serviceName);
}


module.exports = {
    build
};