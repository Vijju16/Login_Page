import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Appointments.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [user, setUser] = useState(null); 
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    doctor: '',
  });

  useEffect(() => {
    const fetchUserAndAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const userRes = await axios.get('http://localhost:5000/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        if (userRes.data.userType === 'doctor') {
          const res = await axios.get(`http://localhost:5000/api/auth/getAppointment`);
          setAppointments(res.data.data.filter(a => a.doctor === userRes.data.fullname));
        } else {
          const res = await axios.get(`http://localhost:5000/api/auth/getAppointment`);
          setAppointments(res.data.data.filter(a => a.patient === userRes.data.fullname));
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchUserAndAppointments();
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/departments');
      if (res.data.success) setDepartments(res.data.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchDoctorsByDepartment = async (department) => {
    if (!department) {
      console.warn('Department not selected');
      return;
    }
  
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/getDoctors`, {
        params: { department } // cleaner way to pass query params
      });
  
      if (res.data.success) {
        setDoctors(res.data.data);
      } else {
        console.warn('No doctors found for department:', department);
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  };
  

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department);
    fetchDoctorsByDepartment(department);
  };

  const handleInputChange = (e) => {
    setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
  };

  const scheduleAppointment = async () => {
    if (!newAppointment.date || !newAppointment.time || !newAppointment.doctor) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/makeAppointment', {
        ...newAppointment,
        status: 'Upcoming',
      });
      if (response.data.success) {
        setAppointments(prev => [...prev, response.data.data]);
        setNewAppointment({ date: '', time: '', doctor: '' });
      }
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/auth/${id}/statusAppointment`, { status });
      if (res.data.success) {
        setAppointments((prev) =>
          prev.map((a) => (a._id === id ? { ...a, status } : a))
        );
      }
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  return (
    <div className="appointments-container">
      <h1>Appointments</h1>
      <p>Manage and schedule your appointments here.</p>

      {user?.userType === 'patient' && (
        <div className="appointment-form">
          <h2>Schedule an Appointment</h2>
          <input type="date" name="date" value={newAppointment.date} onChange={handleInputChange} />
          <input type="time" name="time" value={newAppointment.time} onChange={handleInputChange} />

          <div className="departments">
            <h3>Select Department</h3>
            <select value={selectedDepartment} onChange={(e) => handleDepartmentChange(e.target.value)}>
              <option value="">Select a Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="doctors">
            <h3>Select Doctor</h3>
            <select name="doctor" value={newAppointment.doctor} onChange={handleInputChange}>
              <option value="">Select a Doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc.name}>{doc.name} ({doc.department})</option>
              ))}
            </select>
          </div>

          <button onClick={scheduleAppointment}>Schedule</button>
        </div>
      )}

      <div className="appointment-list">
        <h2>{user?.userType === 'doctor' ? 'Appointments Made To You' : 'My Appointments'}</h2>
        {appointments.length > 0 ? (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment._id} className={appointment.status.toLowerCase()}>
                <strong>{appointment.date} at {appointment.time}</strong> with {appointment.doctor}
                ({appointment.status})
                {user?.userType === 'doctor' && (
                  <>
                    <button onClick={() => updateAppointmentStatus(appointment._id, 'Completed')}>Complete</button>
                    <button onClick={() => updateAppointmentStatus(appointment._id, 'Cancelled')}>Cancel</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments {user?.userType === 'doctor' ? 'assigned to you' : 'scheduled yet'}.</p>
        )}
      </div>
    </div>
  );
};

export default Appointments;
