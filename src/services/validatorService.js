const services = require('../config/properties.json')['invoke'];
const message = require('../exception/message');

isArgsValid = args =>{
    if(args.length != 3){
        throw Error(message["argslength"]);
    }
}

isYearValid = year => {
    if(!parseInt(year)){
        throw Error(message["yearisnotanumber"]);
    }

    if(year < 2001 || year > new Date().getFullYear()){
        throw Error(message["invalidyear"]);
    }
}

isServiceValid = service => {
    if (services[service] == undefined){
        throw Error(message["invalidservice"]);
    }
}

function validateArgs(args){
    try{
        isArgsValid(args);
        isYearValid(args[1]);
        isServiceValid(args[2]);
    }
    catch(e){
        console.error(e);
        process.exit();
        
    }
}


module.exports = {
    validateArgs
}
