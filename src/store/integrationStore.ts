import { create } from 'zustand';
import { ServiceProvider, serviceProviders } from '../types/integration';

interface IntegrationStore {
  services: ServiceProvider[];
  connecting: string | null;
  setConnecting: (serviceId: string | null) => void;
  toggleConnection: (serviceId: string) => void;
}

export const useIntegrationStore = create<IntegrationStore>((set) => ({
  services: serviceProviders,
  connecting: null,
  setConnecting: (serviceId) => set({ connecting: serviceId }),
  toggleConnection: (serviceId) =>
    set((state) => ({
      services: state.services.map((service) =>
        service.id === serviceId
          ? { ...service, connected: !service.connected }
          : service
      ),
    })),
}));