var url = 'mongodb://localhost:27017/uit';
var StudentNames = require('../model/StudentNames')
var Subjects = require('../model/Subjects');
var XLSX = require('xlsx');
var fs = require('fs');
var Creategroup = require('../model/Creategroup');



exports.CreategroupChat = async (req, res, next) => {
    const { data } = req.body;
    const newCreategroup = new Creategroup({
        title:data.title,
        mssv:data.mssv,
    })
    await newCreategroup.save(err=>{
        if(err)
        console.log(err);
    })
    // res.json(newCreategroup);
}
exports.getDataGC= async (req, res, next) => {
    Creategroup.find().sort({_id: -1 })
    .exec(function (err, data) {
        if (err) return handleError(err);
        res.json(data);
        console.log(data);
    })
}

