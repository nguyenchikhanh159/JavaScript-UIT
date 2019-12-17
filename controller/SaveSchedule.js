var Schedule = require('../model/Schedule')
var data = require('../data/data');


exports.SaveSchedule = async (req, res, next) => {
    let result = data.filter(async (data) => {
        const NewSchedule = new Schedule({
            day: data.day,
            time:data.time,
            subject_code: data.subject_code,
            subject_name: data.subject_name,
            teacher_name: data.teacher_name,
            room: data.room,
            start_day: data.start_day,
            end_day: data.end_day,
            student_id: data.student_id
        })
        await NewSchedule.save(err => {
            if (err)
                throw (err);
            else
                console.log("success");
        })
    })
    console.log(data);


}
exports.GetSchedule = async (req, res, next) => {
    const { data } = req.body
    let result = Schedule.find({ student_id: data.student_id })
        .exec(function (err, data) {
            if (err) return handleError(err);
            console.log(data)
            res.json(data)
        })
}