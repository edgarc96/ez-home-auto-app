import { create } from 'zustand';
import { Device, Room } from '../types/device';

interface DeviceStore {
  devices: Device[];
  rooms: Room[];
  activeRoom: string | null;
  addDevice: (device: Device) => void;
  updateDevice: (id: string, updates: Partial<Device>) => void;
  setActiveRoom: (roomId: string | null) => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  devices: [
    {
      id: '1',
      name: 'Living Room Light',
      type: 'light',
      room: 'living-room',
      status: 'online',
      state: { power: true, brightness: 80 },
    },
    {
      id: '2',
      name: 'Thermostat',
      type: 'thermostat',
      room: 'living-room',
      status: 'online',
      state: { temperature: 22, humidity: 45 },
    },
  ],
  rooms: [
    {
      id: 'living-room',
      name: 'Living Room',
      devices: ['1', '2'],
    },
  ],
  activeRoom: null,
  addDevice: (device) =>
    set((state) => ({ devices: [...state.devices, device] })),
  updateDevice: (id, updates) =>
    set((state) => ({
      devices: state.devices.map((device) =>
        device.id === id ? { ...device, ...updates } : device
      ),
    })),
  setActiveRoom: (roomId) => set({ activeRoom: roomId }),
}));