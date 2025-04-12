import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import SendOtp from './components/sendOtp';
import VerifyOtp from './components/verifyOtp';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import Patient from './components/Patient';
import Header from './components/header';
import Footer from './components/footer';
import Appointments from './components/Appointments';
import Doctors from './components/Doctors';
import MedicalRecords from './components/MedicalRecords';
import Notifications from './components/Notifications';
import Billing from './components/Billing';
import Settings from './components/Settings';
import AboutUs from './components/AboutUs';
import AnnualCheckup from './components/AnnualCheckup';
import Blog from './components/Blog';
import Careers from './components/Careers';
import ContactUs from './components/ContactUs';
import FAQ from './components/FAQ';
import GetADiagnosis from './components/GetADiagnosis';
import HowItWorks from './components/HowItWorks';
import PrivacyPolicy from './components/PrivacyPolicy';
import BlogDetail from './components/Blog';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import DoctorProfile from './components/DoctorProfile';
import Logout from './components/Logout';
import PatientProfile from './components/PatientProfile';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/send-otp" element={<SendOtp />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/getAllpatient" element={<Patient />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patients" element={<Patient />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/annual-checkup" element={<AnnualCheckup />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/diagnosis" element={<GetADiagnosis />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/blog" element={<BlogDetail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/doctorprofile" element={<DoctorProfile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/patientprofile" element={<PatientProfile />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
