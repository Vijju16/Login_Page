const Doctor = require('../models/doctors');

// Get all doctors (with optional specialization filter)
exports.getDoctors = async (req, res) => {
  try {
    const { specialization } = req.query;
    let filter = {};

    if (specialization) {
      filter.specialization = specialization;
    }

    const doctors = await Doctor.find(filter);
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching doctors', error: error.message });
  }
};

// Get a single doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Invalid doctor ID or error fetching doctor', error: error.message });
  }
};

// Create a new doctor
exports.createDoctor = async (req, res) => {
  try {
    const { name, specialization, experience, availability } = req.body;

    // Validate required fields
    if (!name || !specialization || experience === undefined || !availability) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Validate availability array
    if (!Array.isArray(availability) || availability.length === 0) {
      return res.status(400).json({ success: false, message: 'Availability must be an array with at least one entry' });
    }

    // Check each availability entry
    for (const slot of availability) {
      if (!slot.day || !slot.startTime || !slot.endTime) {
        return res.status(400).json({ success: false, message: 'Each availability slot must include day, startTime, and endTime' });
      }
    }

    // Create and save doctor
    const newDoctor = new Doctor({ name, specialization, experience, availability });
    await newDoctor.save();

    res.status(201).json({ success: true, message: 'Doctor added successfully', data: newDoctor });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding doctor', error: error.message });
  }
};

// Update doctor details
exports.updateDoctor = async (req, res) => {
  try {
    const { name, specialization, experience, availability } = req.body;

    // Validate availability if provided
    if (availability) {
      if (!Array.isArray(availability)) {
        return res.status(400).json({ success: false, message: 'Availability must be an array' });
      }

      for (const slot of availability) {
        if (!slot.day || !slot.startTime || !slot.endTime) {
          return res.status(400).json({ success: false, message: 'Each availability slot must include day, startTime, and endTime' });
        }
      }
    }

    // Update doctor
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, { name, specialization, experience, availability }, { new: true });

    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.status(200).json({ success: true, message: 'Doctor updated successfully', data: updatedDoctor });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating doctor', error: error.message });
  }
};

// Delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!deletedDoctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.status(200).json({ success: true, message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting doctor', error: error.message });
  }
};
