const express = require('express');
const { login, resetPassword, register, getUser, sendOtp, verifyOtp, getAllpatient, getDepartments, getDoctorsByDepartment } = require('../controllers/authController');
const router = express.Router();
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const { getAppointments, createAppointment, cancelAppointment, updateAppointmentStatus} = require('../controllers/appointmentController');
const authenticate = require('../middlewares/authenticate');

// Auth routes
router.post('/login', login);
router.post('/register/:userType', register); // dynamic path
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.get('/user', authenticate, getUser);
router.get('/getAllpatient', getAllpatient);

router.get('/getDoctors', getDoctors); // Get all doctors (with optional filters)
router.post('/addDoctor', createDoctor); // Add a new doctor
router.put('/updateDoctor/', updateDoctor); // Update doctor
router.delete('/deleteDoctor', deleteDoctor); // Delete doctor
router.get('/departments', getDepartments);
router.get('/getDoctors', getDoctorsByDepartment);

router.get('/getAppointment', getAppointments);
router.post('/makeAppointment', createAppointment);
router.delete('/cancelAppointment:id', cancelAppointment);
router.put('/:id/statusAppointment', updateAppointmentStatus); // To update appointment status

module.exports = router;
