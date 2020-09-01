"use strict";
require('dotenv').config();
const properties = require('./config/properties.json');
const ServiceFactory = require('./services/ServiceFactory');
const Validator = require('./services/validatorService');
const Scrape = require('./scrape/Scrape');


const args = process.argv.slice(2);
Validator.validateArgs(args);

const info = {
    "city" : args[0],
    "year" : args[1],
    "content": args[2],
    "data" : []
};

(async () => {

  // Scrape layer
  const scrape = new Scrape(properties);
  info.data = await scrape.run(info);
  
  // Service layer 
  let serviceName = properties['invoke'][info.content];
  const service = ServiceFactory.build(serviceName);
  service.execute(info);
})();
