let scraper = require('./util/scrape');
let websiteJSON = require('./util/sites.json');
let tl = require('terminal-link');

let siteArr = [];
stackexchangeSites = websiteJSON[0]["sites"];
for (let topic in stackexchangeSites) {
    Promise
        .all(stackexchangeSites[topic].map(subtopic => {
            return scraper(topic, subtopic)
        }))
        .then((values) => {
           return values.reduce((arr,curr)=>arr.concat(curr),[])
        })
        .then((values) => values.forEach((article)=>{
            console.log(tl(article.title, article.url))
        }))
        .catch((err)=>console.log(err));
};

