let cheerio = require('cheerio');
let request = require('request');

request.get("https://chemistry.stackexchange.com/?tags=electrochemistry", (err, res, body) => {
    if (err) throw err;
    let $ = cheerio.load(body);
    let resArr = [];
    $('.summary').children('h3').each(function () {
        resArr.push({
            url: $(this).children().attr('href'),
            title: $(this).text()
        })
    })
    console.log(resArr);

});