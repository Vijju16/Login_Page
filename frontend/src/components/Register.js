import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/notifications';
import { useNavigate } from 'react-router-dom';
import './register.css';

function Register() {
  const [userType, setUserType] = useState('patient');
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [registerInfo, setRegisterInfo] = useState({
    fullname: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    primaryContact: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    nationalId: '',
    insuranceProvider: '',
    insurancePolicy: '',
    preferredLanguage: '',
    communicationPreference: '',
    specialization: [],
    experience: '',
    licenseNumber: '',
    clinicAddress: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    const newErrors = {};
  
    if (step === 1) {
      if (!registerInfo.fullname.trim()) newErrors.fullname = 'Full Name is required';
  
      if (!registerInfo.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerInfo.email)) {
        newErrors.email = 'Enter a valid email';
      }
  
      if (!registerInfo.password) {
        newErrors.password = 'Password is required';
      } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@])[A-Za-z\d@]{6,}/.test(registerInfo.password)) {
        newErrors.password = 'Password must include uppercase, lowercase, number, @ and be 8+ characters';
      }
    }
  
    if (step === 2 && userType === 'patient') {
      if (!registerInfo.dob.trim()) newErrors.dob = 'Date of Birth is required';
      if (!registerInfo.gender.trim()) newErrors.gender = 'Gender is required';
  
      if (!registerInfo.primaryContact.trim()) {
        newErrors.primaryContact = 'Primary Contact is required';
      } else if (!/^[0-9]{10}$/.test(registerInfo.primaryContact)) {
        newErrors.primaryContact = 'Must be a valid 10-digit phone number';
      }
  
      if (!registerInfo.street.trim()) newErrors.street = 'Street is required';
      if (!registerInfo.city.trim()) newErrors.city = 'City is required';
      if (!registerInfo.state.trim()) newErrors.state = 'State is required';
  
      if (!registerInfo.zipCode.trim()) {
        newErrors.zipCode = 'Zip Code is required';
      } else if (!/^\d{6}$/.test(registerInfo.zipCode)) {
        newErrors.zipCode = 'Must be a valid 6-digit ZIP code';
      }
  
      if (!registerInfo.nationalId.trim()) newErrors.nationalId = 'National ID is required';
    }
  
    if (step === 2 && userType === 'doctor') {
      if (!registerInfo.specialization || registerInfo.specialization === '') {
        newErrors.specialization = 'Specialization is required';
      }
  
      if (!registerInfo.experience || registerInfo.experience === '') {
        newErrors.experience = 'Experience is required';
      }
  
      if (!registerInfo.licenseNumber.trim()) {
        newErrors.licenseNumber = 'Medical License Number is required';
      }
  
      if (!registerInfo.clinicAddress.trim()) {
        newErrors.clinicAddress = 'Clinic Address is required';
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const bodyData = { ...registerInfo, userType }; 

    try {
      const response = await fetch(`http://localhost:5000/api/auth/register/${userType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) throw new Error(await response.text());

      const { message } = await response.json();
      handleSuccess(message);
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="vic">
      <div className="rcontainer">
        <h1>Register as {userType === 'patient' ? 'Patient' : 'Doctor'}</h1>

        <div className="role-toggle">
          <label>
            <input type="radio" name="userType" value="patient" checked={userType === 'patient'} onChange={() => { setUserType('patient'); setStep(1); }} /> Patient
          </label>
          <label>
            <input type="radio" name="userType" value="doctor" checked={userType === 'doctor'} onChange={() => { setUserType('doctor'); setStep(1); }} /> Doctor
          </label>
        </div>

        <form onSubmit={handleRegister}>
          {step === 1 && (
            <>
              <div><label>Full Name</label><input className="sez" type="text" name="fullname" value={registerInfo.fullname} onChange={handleChange} required /></div>
              <div><label>Email Address</label><input className="sez" type="email" name="email" value={registerInfo.email} onChange={handleChange} required /></div>
              <div>
                <label>Password</label>
                <input className={`sez ${errors.password ? 'input-error' : ''}`} type="password" name="password" value={registerInfo.password} onChange={handleChange} required minLength="8" />
                {errors.password && <small className="error-text">{errors.password}</small>}
              </div>
            </>
          )}

          {step === 2 && userType === 'patient' && (
            <>
              <div><label>Date of Birth</label><input className="sez" type="date" name="dob" value={registerInfo.dob} onChange={handleChange} required /></div>
              <div><label>Gender</label>
                <select className="sez" name="gender" value={registerInfo.gender} onChange={handleChange} required>
                  <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div><label>Primary Contact</label>
                <input className={`sez ${errors.primaryContact ? 'input-error' : ''}`} type="tel" name="primaryContact" value={registerInfo.primaryContact} onChange={handleChange} required />
                {errors.primaryContact && <small className="error-text">{errors.primaryContact}</small>}
              </div>
              <div><label>Street</label><input className="sez" type="text" name="street" value={registerInfo.street} onChange={handleChange} required /></div>
              <div><label>City</label><input className="sez" type="text" name="city" value={registerInfo.city} onChange={handleChange} required /></div>
              <div><label>State</label><input className="sez" type="text" name="state" value={registerInfo.state} onChange={handleChange} required /></div>
              <div><label>Zip Code</label>
                <input className={`sez ${errors.zipCode ? 'input-error' : ''}`} type="text" name="zipCode" value={registerInfo.zipCode} onChange={handleChange} required />
                {errors.zipCode && <small className="error-text">{errors.zipCode}</small>}
              </div>
              <div><label>National ID (Aadhar/Passport)</label><input className="sez" type="text" name="nationalId" value={registerInfo.nationalId} onChange={handleChange} required /></div>
              <div><label>Insurance Provider (Optional)</label><input className="sez" type="text" name="insuranceProvider" value={registerInfo.insuranceProvider} onChange={handleChange} /></div>
              <div><label>Insurance Policy ID (Optional)</label><input className="sez" type="text" name="insurancePolicy" value={registerInfo.insurancePolicy} onChange={handleChange} /></div>
              <div><label>Preferred Language (Optional)</label><input className="sez" type="text" name="preferredLanguage" value={registerInfo.preferredLanguage} onChange={handleChange} /></div>
              <div><label>Communication Preference</label>
                <select className="sez" name="communicationPreference" value={registerInfo.communicationPreference} onChange={handleChange}>
                  <option value="">Select</option><option>Email</option><option>Phone</option><option>Text</option>
                </select>
              </div>
            </>
          )}

          {step === 2 && userType === 'doctor' && (
            <>
              <div>
                <label>Specialization</label>
                <select
                  className="sez"
                  name="specialization"
                  value={registerInfo.specialization}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Specialization</option>
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

             
              <div><label>Experience (Years)</label><input className="sez" type="number" name="experience" value={registerInfo.experience} onChange={handleChange} required /></div>
              <div><label>Medical License Number</label><input className="sez" type="text" name="licenseNumber" value={registerInfo.licenseNumber} onChange={handleChange} required /></div>
              <div><label>Clinic Address</label><input className="sez" type="text" name="clinicAddress" value={registerInfo.clinicAddress} onChange={handleChange} required /></div>
            </>
          )}

          <div className="step-buttons">
            {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
            {step < 2 && <button type="button" onClick={nextStep}>Next</button>}
            {step === 2 && <button className="btn-register" type="submit">Register</button>}
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
