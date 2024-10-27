import { v3 as hueApi } from 'node-hue-api';

const appName = 'smart-home-hub';
const deviceName = 'smart-home-hub-device';

export async function handlePhilipsHue() {
  try {
    // Discover bridge
    const discoveryResults = await hueApi.discovery.nupnpSearch();
    
    if (discoveryResults.length === 0) {
      throw new Error('No Philips Hue Bridges found.');
    }

    const host = discoveryResults[0].ipaddress;
    const api = await hueApi.api.createLocal(host).connect();

    // Get bridge configuration
    const bridgeConfig = await api.configuration.get();
    console.log('Connected to Philips Hue Bridge:', bridgeConfig.name);

    // Get all lights
    const lights = await api.lights.getAll();
    
    // Transform lights into our device format
    const devices = lights.map(light => ({
      id: `hue-${light.id}`,
      name: light.name,
      type: 'light',
      manufacturer: 'Philips Hue',
      state: {
        power: light.state.on,
        brightness: Math.round((light.state.bri / 254) * 100),
        reachable: light.state.reachable
      }
    }));

    return {
      success: true,
      devices
    };
  } catch (error) {
    console.error('Philips Hue connection error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}