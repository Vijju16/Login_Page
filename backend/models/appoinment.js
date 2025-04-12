const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  doctor: { type: String, required: true },
  status: { type: String, default: 'Upcoming' }  // Default status
}, { collection: 'Appointment', timestamps: true } 
);

module.exports = mongoose.model('Appointment', AppointmentSchema);
