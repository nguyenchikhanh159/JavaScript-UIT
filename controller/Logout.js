
var request = require('request');
var cheerio = require('cheerio');
var request = require('request');


var RequestLogout = async (username, password, cookie) => {
    return new Promise((resolve, reject) => {
        let MoodleSS= 'MoodleSession=';
        let setcookie= MoodleSS+ cookie._jar.cookies[0].value;
        request({
            method:"GET",
            url: "https://courses.uit.edu.vn/login/logout.php?",
            headers: {
                'Cookie':setcookie
              }
        }, (err, res, body) => {
            let $ = cheerio.load(body);
            let data = $('.usertext').text();
            let flag=false;
            if(data===null){
                flag=null;
                resolve(flag);
            }
        });
    });
}
exports.Logout = async (req, res, next) => {
    const { data } = req.body;
    let result = await RequestLogout(data.username, data.password, data.jar)
    res.json(result);
    console.log(result);
}