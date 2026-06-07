import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Hospital,
  Stethoscope,
  Pill,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import axios from 'axios';
import { useFacilityStore, FacilityMode } from '../../config/facilityMode';

const SetupWizard = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const setFacility = useFacilityStore(state => state.setFacility);

  const [formData, setFormData] = useState({
    facility: {
      name: '',
      address: '',
      phone: '',
      email: '',
      ghs_registration: '',
      nhis_provider_code: '',
      mode: '' as FacilityMode | '',
    },
    admin: {
      full_name: '',
      username: '',
      password: '',
      confirmPassword: '',
    }
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleFacilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      facility: { ...prev.facility, [name]: value }
    }));
  };

  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      admin: { ...prev.admin, [name]: value }
    }));
  };

  const selectMode = (mode: FacilityMode) => {
    setFormData(prev => ({
      ...prev,
      facility: { ...prev.facility, mode }
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8767/api/v1/setup/complete', {
        facility_data: formData.facility,
        admin_data: {
          full_name: formData.admin.full_name,
          username: formData.admin.username,
          password: formData.admin.password
        }
      });

      if (response.data.success) {
        setFacility(formData.facility.mode as FacilityMode, formData.facility.name, true);
        nextStep();
      }
    } catch (error) {
      console.error('Setup failed', error);
      alert('Setup failed. Please check the console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-primary p-6 text-white">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/resources/icons/icon.png" alt="SAD Logo" className="w-8 h-8" />
            <h1 className="text-2xl font-bold tracking-tight">MediCore Setup Wizard</h1>
          </div>
          <div className="flex justify-between items-center px-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-800 -translate-y-1/2 z-0"></div>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 font-bold transition-colors ${
                  step >= i ? 'bg-accent text-white' : 'bg-blue-900 text-blue-300'
                }`}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="flex justify-between px-4 mt-2 text-xs font-medium text-blue-200">
            <span>Facility Info</span>
            <span>Facility Type</span>
            <span>Admin Account</span>
            <span>Done</span>
          </div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Step 1: Facility Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Building2 className="w-4 h-4 mr-2" /> Facility Name
                  </label>
                  <input
                    type="text" name="name" value={formData.facility.name} onChange={handleFacilityChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                    placeholder="e.g. Hope Central Hospital"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> Address
                  </label>
                  <input
                    type="text" name="address" value={formData.facility.address} onChange={handleFacilityChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Phone className="w-4 h-4 mr-2" /> Phone Number
                  </label>
                  <input
                    type="text" name="phone" value={formData.facility.phone} onChange={handleFacilityChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Mail className="w-4 h-4 mr-2" /> Email Address
                  </label>
                  <input
                    type="email" name="email" value={formData.facility.email} onChange={handleFacilityChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-2" /> GHS Registration No.
                  </label>
                  <input
                    type="text" name="ghs_registration" value={formData.facility.ghs_registration} onChange={handleFacilityChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-2" /> NHIS Provider Code
                  </label>
                  <input
                    type="text" name="nhis_provider_code" value={formData.facility.nhis_provider_code} onChange={handleFacilityChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  onClick={nextStep}
                  disabled={!formData.facility.name || !formData.facility.email}
                  className="bg-accent hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium flex items-center disabled:opacity-50"
                >
                  Next Step <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">Step 2: Select Facility Type</h2>
                <p className="text-sm text-red-500 font-medium mt-1">Warning: This cannot be changed after setup without a full reset.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {[
                  { id: 'CLINIC', name: 'General Clinic / OPD', icon: Stethoscope, desc: 'Outpatient care, consultations, and basic labs.' },
                  { id: 'HOSPITAL', name: 'Hospital (In + Outpatient)', icon: Hospital, desc: 'Full facility with wards, surgery, and inpatient care.' },
                  { id: 'DENTAL', name: 'Dental Clinic', icon: Activity, desc: 'Specialized dental care with tooth charting.' },
                  { id: 'PHARMACY', name: 'Pharmacy Only', icon: Pill, desc: 'Drug retail and basic patient records only.' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => selectMode(m.id as FacilityMode)}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${
                      formData.facility.mode === m.id ? 'border-accent bg-blue-50 ring-2 ring-blue-100' : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <div className={`p-2 rounded-lg ${formData.facility.mode === m.id ? 'bg-accent text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <m.icon className="w-6 h-6" />
                      </div>
                      <span className="ml-3 font-bold text-gray-800">{m.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{m.desc}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-6">
                <button onClick={prevStep} className="text-gray-500 font-medium flex items-center hover:text-gray-700">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!formData.facility.mode}
                  className="bg-accent hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium flex items-center disabled:opacity-50"
                >
                  Next Step <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Step 3: Administrator Account</h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <User className="w-4 h-4 mr-2" /> Full Name
                  </label>
                  <input
                    type="text" name="full_name" value={formData.admin.full_name} onChange={handleAdminChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <User className="w-4 h-4 mr-2" /> Username
                  </label>
                  <input
                    type="text" name="username" value={formData.admin.username} onChange={handleAdminChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <Lock className="w-4 h-4 mr-2" /> Password
                    </label>
                    <input
                      type="password" name="password" value={formData.admin.password} onChange={handleAdminChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <Lock className="w-4 h-4 mr-2" /> Confirm Password
                    </label>
                    <input
                      type="password" name="confirmPassword" value={formData.admin.confirmPassword} onChange={handleAdminChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between pt-6">
                <button onClick={prevStep} className="text-gray-500 font-medium flex items-center hover:text-gray-700">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.admin.username || !formData.admin.password || formData.admin.password !== formData.admin.confirmPassword}
                  className="bg-accent hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium flex items-center disabled:opacity-50"
                >
                  Complete Setup <CheckCircle2 className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8 space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Setup Successful!</h2>
                <p className="text-gray-500 mt-2 text-lg">MediCore is ready to serve your {formData.facility.mode.toLowerCase()}.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-left inline-block w-full max-w-md">
                <p className="text-sm font-medium text-gray-600 mb-2 underline">Facility Summary</p>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-gray-500">Name:</span> <span className="font-bold text-gray-800">{formData.facility.name}</span>
                  <span className="text-gray-500">Mode:</span> <span className="font-bold text-gray-800">{formData.facility.mode}</span>
                  <span className="text-gray-500">Admin:</span> <span className="font-bold text-gray-800">{formData.admin.username}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-primary hover:bg-blue-900 text-white py-4 rounded-xl font-bold text-xl shadow-lg transition-transform hover:scale-105"
              >
                Launch MediCore
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
