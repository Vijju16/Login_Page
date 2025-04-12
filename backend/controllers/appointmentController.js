const Appointment = require('../models/appoinment');
const mongoose = require('mongoose');

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ success: false, message: 'No appointments found', data: [] });
    }

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal Server Error', 
      error: error.message 
    });
  }
};



// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { date, time, doctor } = req.body;

    if (!date || !time || !doctor) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newAppointment = new Appointment({ date, time, doctor, status: 'Upcoming' });
    await newAppointment.save();

    res.status(201).json({ success: true, message: 'Appointment scheduled successfully', data: newAppointment });
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    res.status(500).json({ success: false, message: 'Error scheduling appointment' });
  }
};

// Cancel (Delete) an appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ success: false, message: 'Error cancelling appointment' });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Upcoming', 'Completed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.status(200).json({ success: true, message: 'Appointment status updated', data: appointment });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ success: false, message: 'Error updating appointment' });
  }
};
