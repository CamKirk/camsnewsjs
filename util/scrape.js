let cheerio = require('cheerio');
let request = require('request');
let tl = require('terminal-link');

/**
 * Scrapes Stackexchange websites
 * @param {string} topic stackexchange subsite to scrape
 * @param {string} tag tag queries to modify subsite
 * @param {function} cb callback function
 */
function stackexchange(topic, tag, cb) {
    let url = `https://${topic}.stackexchange.com/?tags=${tag}`
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
            if (err) reject(err);
            let $ = cheerio.load(body);
            let resArr = [];
            $('.summary').children('h3').each(function () {
                resArr.push({
                    url: url + $(this).children().attr('href'),
                    title: $(this).text()
                })
            })

            
            resolve(resArr)

        });
    })  
}

module.exports = stackexchange;