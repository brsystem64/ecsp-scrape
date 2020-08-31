"use strict";

require('dotenv').config();
const properties = require('./config/properties.json');
const Scrape = require('./crawler/Scrape');
const ServiceFactory = require('./services/ServiceFactory');



const info = {
    "city" : "PIQUETE",
    "year" : "2016",
    "content":"ocorrenciasMensal",
    "data" : []
};




(async () => {

  const scrape = new Scrape(properties);
  info.data = await scrape.run(info);
  let serviceName = properties['invoke'][info.content];
  const service = ServiceFactory.get(serviceName);
  service.execute(info);
})();
