import { DeviceType } from './device';

export interface ServiceProvider {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: 'lighting' | 'climate' | 'security' | 'voice' | 'entertainment' | 'energy';
  website: string;
  connected: boolean;
  deviceTypes: DeviceType[];
}

export const serviceProviders: ServiceProvider[] = [
  {
    id: 'google-nest',
    name: 'Google Nest',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Google_Nest_logo.svg',
    description: 'Smart home devices including thermostats, cameras, and doorbells',
    category: 'climate',
    website: 'https://store.google.com/category/connected_home',
    connected: false,
    deviceTypes: ['thermostat', 'camera']
  },
  {
    id: 'philips-hue',
    name: 'Philips Hue',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Philips_Hue_logo.svg',
    description: 'Smart lighting systems and accessories',
    category: 'lighting',
    website: 'https://www.philips-hue.com',
    connected: false,
    deviceTypes: ['light']
  },
  {
    id: 'homekit',
    name: 'Apple HomeKit',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Apple_HomeKit_logo.svg',
    description: 'Apple\'s smart home platform',
    category: 'voice',
    website: 'https://www.apple.com/ios/home',
    connected: false,
    deviceTypes: ['light', 'thermostat', 'camera', 'lock', 'sensor']
  }
] as const;