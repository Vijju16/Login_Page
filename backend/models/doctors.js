const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: [String], required: true },
    experience: { type: Number, required: true },
    availability: [
        {
            day: { type: String, required: true },
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
        },
    ],
});

const Doctor = mongoose.model('Doctor', DoctorSchema);
module.exports = Doctor;
