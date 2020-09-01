const puppeteer = require("puppeteer");
const {isCitiesEquals} = require("./../helpers/regex");

class Scrape{
    constructor(props){
        this.props = props;
    }

    async setup(){
        this.browser = await puppeteer.launch({headless: this.props["crawler"]['headless']});
        this.page = await this.browser.newPage();
        await this.page.goto(this.props["crawler"]["link"], 
            { waitUntil: 'load', 
              timeout: this.props["crawler"]["timeout"]
            }
        );
        await this.page.exposeFunction("isCitiesEquals", isCitiesEquals);

    }

    async run({city, year , content}){
        await this.setup();
        await this.selectCity(city);
        await this.page.waitForNavigation();
        await this.selectContent(content);
        await this.page.waitForNavigation();
        await this.selectYear(year);
        await this.page.waitForNavigation();
        return await this.selectdata();
    }

    async selectCity(city){
        let query = `#${this.props["filtros"]["municipios"]} > option`;
        
        let data = await this.page.evaluate(async (query, city) =>{
            let datas = document.querySelectorAll(query);
            let findCity;

            for(let i = 1; i < datas.length; i++){
                if(await isCitiesEquals(city, datas[i].innerText)){
                    findCity = datas[i].value;
                    break;
                }
            }
            return findCity;
        }, query, city);

        await this.page.select(`#${this.props["filtros"]["municipios"]}`,data);
    }
    
    async selectContent(content){
        let query = `${this.props["conteudos"][`${content}`]}`;
        await this.page.evaluate(async (query) => {
            await document.querySelectorAll(`#${query}`)[0]
                .click();
        }, query);
    }

    async selectYear(year){
        if(year < 2001 || year > new Date().getFullYear()){
            console.log("error");
        }
        await this.page.select(`#${this.props["filtros"]["anos"]}`,year);
    }

    async selectdata(){
        let query = `#${this.props["crawler"]["tabelaRaspagem"]} > tbody > tr`;

        return  this.page.$$eval(query, rows => {
                return Array.from(rows, row => {
                  const columns = row.querySelectorAll("td");
                  return Array.from(columns, column => column.innerText);
                });
            });
    }
}

module.exports = Scrape;
