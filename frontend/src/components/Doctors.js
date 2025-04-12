import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Doctors.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [newDoctor, setNewDoctor] = useState({ name: '', specialization: '', experience: '', availability: [] });

  const [newAvailability, setNewAvailability] = useState({ day: '', startTime: '', endTime: '' });

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Fetch all doctors from MongoDB
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/auth/getDoctors'); // ✅ Correct endpoint
      setDoctors(response.data.data);
      setError(null); // Clear previous errors
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError(err.response?.data?.message || 'Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  // Add a new doctor
  const addDoctor = async () => {
    console.log("Doctor being sent:", newDoctor); // Debugging
    if (newDoctor.availability.length === 0) {
      setError("Please add at least one availability slot.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/addDoctor', newDoctor);
      console.log("Response:", response.data); // Debugging
      setDoctors([...doctors, response.data.data]); // ✅ Auto-update UI without reload
      setNewDoctor({ name: '', specialization: '', experience: '', availability: [] });
      setError(null);
    } catch (err) {
      console.error("Error adding doctor:", err);
      setError(err.response?.data?.message || 'Error adding doctor');
    }
  };

  // Delete a doctor
  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/deleteDoctor/${id}`);
      setDoctors(doctors.filter((doctor) => doctor._id !== id)); // ✅ Remove from UI instantly
      setError(null);
    } catch (err) {
      console.error("Error deleting doctor:", err);
      setError(err.response?.data?.message || 'Error deleting doctor');
    }
  };

  // Handle adding availability slot
  const addAvailabilitySlot = () => {
    if (!newAvailability.day || !newAvailability.startTime || !newAvailability.endTime) {
      setError("Each availability slot must include a day, start time, and end time.");
      return;
    }

    setNewDoctor((prevDoctor) => ({
      ...prevDoctor,
      availability: [...prevDoctor.availability, { ...newAvailability }]
    }));

    setNewAvailability({ day: '', startTime: '', endTime: '' });
    setError(null); // Clear any previous errors
  };


  // Filter doctors
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase()) &&
    (specializationFilter ? doctor.specialization === specializationFilter : true)
  );

  return (
    <div className="doctors-container">
      <h1>Doctors</h1>
      <p>View and manage doctor details.</p>

      {/* Search & Filter */}
      <div className="filter-section">
        <input type="text" placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select onChange={(e) => setSpecializationFilter(e.target.value)}>
          <option value="">All Specializations</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dentist">Dentist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Oncologist">Oncologist</option>
          <option value="Endocrinologist">Endocrinologist</option>
          <option value="Gastroenterologist">Gastroenterologist</option>
          <option value="Nephrologist">Nephrologist</option>
          <option value="Pulmonologist">Pulmonologist</option>
          <option value="Urologist">Urologist</option>
          <option value="Ophthalmologist">Ophthalmologist</option>
          <option value="ENT Specialist">ENT Specialist</option>
          <option value="Psychiatrist">Psychiatrist</option>
          <option value="Radiologist">Radiologist</option>
          <option value="Anesthesiologist">Anesthesiologist</option>
          <option value="Rheumatologist">Rheumatologist</option>
          <option value="Hematologist">Hematologist</option>
          <option value="Infectious Disease Specialist">Infectious Disease Specialist</option>
          <option value="Geriatrician">Geriatrician</option>
          <option value="Plastic Surgeon">Plastic Surgeon</option>
          <option value="General Surgeon">General Surgeon</option>
          <option value="Emergency Medicine Specialist">Emergency Medicine Specialist</option>
          <option value="Sports Medicine Specialist">Sports Medicine Specialist</option>
          <option value="Allergist/Immunologist">Allergist/Immunologist</option>
          <option value="Pathologist">Pathologist</option>
          <option value="Reproductive Endocrinologist">Reproductive Endocrinologist</option>
          <option value="Neonatologist">Neonatologist</option>
          <option value="Pain Management Specialist">Pain Management Specialist</option>
        </select>
      </div>


      {/* Add Doctor */}
      <div className="add-doctor-section">
        <input type="text" placeholder="Name" value={newDoctor.name} onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })} />
        <input type="text" placeholder="Specialization" value={newDoctor.specialization} onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })} />
        <input type="number" placeholder="Experience" value={newDoctor.experience} onChange={(e) => setNewDoctor({ ...newDoctor, experience: e.target.value })} />

        {/* Availability Input */}
        <div className="availability-section">
          <select value={newAvailability.day} onChange={(e) => setNewAvailability({ ...newAvailability, day: e.target.value })}>
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <input type="time" value={newAvailability.startTime} onChange={(e) => setNewAvailability({ ...newAvailability, startTime: e.target.value })} />
          <input type="time" value={newAvailability.endTime} onChange={(e) => setNewAvailability({ ...newAvailability, endTime: e.target.value })} />
          <button onClick={addAvailabilitySlot}>Add Availability</button>
        </div>

        {/* Show added availability */}
        <div className="availability-list">
          {newDoctor.availability.map((slot, index) => (
            <p key={index}>{slot.day}: {slot.startTime} - {slot.endTime}</p>
          ))}
        </div>

        <button onClick={addDoctor}>Add Doctor</button>
      </div>

      {/* Loading & Error Messages */}
      {loading && <p>Loading doctors...</p>}
      {error && <p className="error">{error}</p>}

      {/* Doctors List */}
      <div className="doctor-list">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor._id} className="doctor-card">
              <h3>{doctor.name}</h3>
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
              <p><strong>Experience:</strong> {doctor.experience} years</p>

              {/* Show Availability */}
              <p><strong>Availability:</strong></p>
              {doctor.availability.length > 0 ? (
                <ul>
                  {doctor.availability.map((slot, index) => (
                    <li key={index}>{slot.day}: {slot.startTime} - {slot.endTime}</li>
                  ))}
                </ul>
              ) : (
                <p>No availability added</p>
              )}

              <button onClick={() => deleteDoctor(doctor._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default Doctors;

