import api from '../../config/api';
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
import { Button } from '../../components/ui/Button';
import { Input, Label } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

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
      const response = await api.post('/setup/complete', {
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
      <Card className="max-w-3xl w-full shadow-2xl overflow-hidden border-none">
        {/* Progress Bar */}
        <div className="bg-primary p-10 text-white">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-md">
              <img src="/resources/icons/icon.png" alt="SAD Logo" className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">MediCore Setup</h1>
          </div>
          <div className="flex justify-between items-center px-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-800/50 -translate-y-1/2 z-0"></div>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center z-10 font-black transition-all ${
                  step >= i ? 'bg-accent text-white scale-110 shadow-lg' : 'bg-blue-900 text-blue-300'
                }`}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="flex justify-between px-6 mt-4 text-[10px] font-black uppercase tracking-widest text-blue-300/70">
            <span>Facility</span>
            <span>Type</span>
            <span>Admin</span>
            <span>Ready</span>
          </div>
        </div>

        <div className="p-10 bg-white">
          {step === 1 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black text-gray-900 border-b-4 border-accent w-fit pb-2">Facility Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label>Facility Name</Label>
                  <Input name="name" value={formData.facility.name} onChange={handleFacilityChange} placeholder="e.g. Hope Central Hospital" />
                </div>
                <div className="space-y-1">
                  <Label>Address</Label>
                  <Input name="address" value={formData.facility.address} onChange={handleFacilityChange} placeholder="123 Health St, Accra" />
                </div>
                <div className="space-y-1">
                  <Label>Phone Number</Label>
                  <Input name="phone" value={formData.facility.phone} onChange={handleFacilityChange} placeholder="+233..." />
                </div>
                <div className="space-y-1">
                  <Label>Email Address</Label>
                  <Input type="email" name="email" value={formData.facility.email} onChange={handleFacilityChange} placeholder="contact@facility.com" />
                </div>
                <div className="space-y-1">
                  <Label>GHS Reg No.</Label>
                  <Input name="ghs_registration" value={formData.facility.ghs_registration} onChange={handleFacilityChange} placeholder="Optional" />
                </div>
                <div className="space-y-1">
                  <Label>NHIS Provider Code</Label>
                  <Input name="nhis_provider_code" value={formData.facility.nhis_provider_code} onChange={handleFacilityChange} placeholder="Optional" />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button
                  onClick={nextStep}
                  disabled={!formData.facility.name || !formData.facility.email}
                  className="h-12 px-8 rounded-2xl"
                  variant="accent"
                >
                  Next Step <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-black text-gray-900 uppercase">Select Facility Type</h2>
                <p className="text-sm text-red-500 font-bold mt-2 uppercase tracking-tight italic">⚠️ This selection is permanent after setup.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {[
                  { id: 'CLINIC', name: 'General Clinic / OPD', icon: Stethoscope, desc: 'Outpatient care, consultations, and basic labs.' },
                  { id: 'HOSPITAL', name: 'Hospital (In + Out)', icon: Hospital, desc: 'Full facility with wards, surgery, and inpatient care.' },
                  { id: 'DENTAL', name: 'Dental Clinic', icon: Activity, desc: 'Specialized dental care with tooth charting.' },
                  { id: 'PHARMACY', name: 'Pharmacy Only', icon: Pill, desc: 'Drug retail and basic patient records only.' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => selectMode(m.id as FacilityMode)}
                    className={`p-6 border-2 rounded-3xl text-left transition-all group ${
                      formData.facility.mode === m.id ? 'border-accent bg-blue-50 shadow-xl ring-4 ring-blue-100' : 'border-gray-100 hover:border-blue-200'
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-4 rounded-2xl transition-colors ${formData.facility.mode === m.id ? 'bg-accent text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-500'}`}>
                        <m.icon className="w-8 h-8" />
                      </div>
                      <span className="ml-4 font-black text-xl text-gray-800">{m.name}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">{m.desc}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-8">
                <Button onClick={prevStep} variant="ghost" className="h-12">
                  <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!formData.facility.mode}
                  className="h-12 px-8 rounded-2xl"
                  variant="accent"
                >
                  Next Step <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black text-gray-900 border-b-4 border-accent w-fit pb-2">Administrator Account</h2>
              <div className="space-y-6">
                <div className="space-y-1">
                  <Label>Full Name</Label>
                  <Input name="full_name" value={formData.admin.full_name} onChange={handleAdminChange} placeholder="e.g. Dr. Kwame Mensah" />
                </div>
                <div className="space-y-1">
                  <Label>Username</Label>
                  <Input name="username" value={formData.admin.username} onChange={handleAdminChange} placeholder="admin" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label>Password</Label>
                    <Input type="password" name="password" value={formData.admin.password} onChange={handleAdminChange} placeholder="••••••••" />
                  </div>
                  <div className="space-y-1">
                    <Label>Confirm Password</Label>
                    <Input type="password" name="confirmPassword" value={formData.admin.confirmPassword} onChange={handleAdminChange} placeholder="••••••••" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between pt-8">
                <Button onClick={prevStep} variant="ghost" className="h-12">
                  <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.admin.username || !formData.admin.password || formData.admin.password !== formData.admin.confirmPassword}
                  className="h-12 px-10 rounded-2xl"
                  variant="accent"
                >
                  Complete Setup <CheckCircle2 className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-10 space-y-10">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-[2rem] flex items-center justify-center shadow-xl shadow-green-100/50">
                  <CheckCircle2 className="w-16 h-16" />
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Setup Complete!</h2>
                <p className="text-gray-400 mt-3 text-lg font-medium italic">MediCore is ready to revolutionize your facility.</p>
              </div>
              <Card className="bg-gray-50/50 p-8 text-left border-dashed border-2 border-gray-200 inline-block w-full max-w-lg">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 text-center">Deployment Identity</p>
                <div className="grid grid-cols-2 gap-y-4 text-sm px-4">
                  <span className="text-gray-400 font-bold">Facility:</span> <span className="font-black text-gray-900 text-right">{formData.facility.name}</span>
                  <span className="text-gray-400 font-bold">Category:</span> <span className="font-black text-accent text-right">{formData.facility.mode}</span>
                  <span className="text-gray-400 font-bold">Identity:</span> <span className="font-black text-gray-900 text-right">@{formData.admin.username}</span>
                </div>
              </Card>
              <Button
                onClick={() => navigate('/')}
                size="lg"
                className="w-full h-16 rounded-[1.5rem] text-xl uppercase font-black tracking-widest shadow-2xl shadow-blue-200"
              >
                Launch MediCore HMS
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SetupWizard;
