export type DeviceType = 'light' | 'thermostat' | 'camera' | 'lock' | 'sensor';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  room: string;
  status: 'online' | 'offline';
  state: {
    power?: boolean;
    brightness?: number;
    temperature?: number;
    humidity?: number;
    battery?: number;
    locked?: boolean;
  };
}

export interface Room {
  id: string;
  name: string;
  devices: string[];
}