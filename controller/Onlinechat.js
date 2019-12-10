
var url = 'mongodb://localhost:27017/uit';
const mongoose = require('mongoose');
const StudentsId = require('../model/StudentsId')
var StudentNames = require('../model/StudentNames')
var Subjects = require('../model/Subjects');
var Schedule = require('../model/Schedule')
var Post = require('../model/Post');
var data = require('../data/data');
var XLSX = require('xlsx');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var request = require('request');
var loginJar = request.jar();
var chat = require('./../model/Chat');

module.exports = (io) => {
    io.on("connection", socket => {
        console.log("a user connected :D");
        socket.on("chat message", msg => {
            const newChat = new chat({
                data: msg
            })
           newChat.save(err => {
                if (err) console.log(err);
            })
            io.emit("chat message", msg);
        });
    });
}

// var updateNicknames =()=>{
//     io.sockets.emit('usernames', nicknames);
// }