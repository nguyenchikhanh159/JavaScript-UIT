var request = require('request');
var cheerio = require('cheerio');
var request = require('request');
var loginJar = request.jar();



var RequestLogin = async (username, password) => {
    return new Promise((resolve, reject) => {
        loginJar = request.jar();
        request.get({
            url: "https://courses.uit.edu.vn/login/index.php",
            jar: loginJar
        }, (err, res, body) => {
            let $ = cheerio.load(body);
            let logintoken = $('[name=logintoken]').val();
            form = {
                "username": username,
                "password": password,
                "logintoken": logintoken
            }
            request.post({
                url: "https://courses.uit.edu.vn/login/index.php",
                form: form,
                jar: loginJar,
                followAllRedirects: true,
            }, (err, res, body) => {
                
                let $ = cheerio.load(body);
                let data = $('.usertext').text();
                const image = $("body").find("img")[0].attribs.src;
                if (data) {
                    form.flag = true;
                    form.name = data;
                    form.image = image;
                    form.jar=loginJar;
                    resolve(form);
                }
                else {
                    let form = {
                        flag: true
                    }
                    form.flag = false;
                    resolve(form);
                }
            })
        })
    })
}
exports.checkLogin = async (req, res, next) => {
    let { data } = req.body
    let result = await RequestLogin(data.username, data.password)
    res.json(result);
}