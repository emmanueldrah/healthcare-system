import { create } from 'zustand';

export type FacilityMode = 'CLINIC' | 'HOSPITAL' | 'DENTAL' | 'PHARMACY';

interface FacilityState {
  mode: FacilityMode | null;
  facilityName: string;
  isSetup: boolean;
  setFacility: (mode: FacilityMode, name: string, isSetup: boolean) => void;
}

export const useFacilityStore = create<FacilityState>((set) => ({
  mode: null,
  facilityName: 'MediCore',
  isSetup: false,
  setFacility: (mode, name, isSetup) => set({ mode, facilityName: name, isSetup }),
}));
