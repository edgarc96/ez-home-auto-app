import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import { createServer } from 'http';
import { handlePhilipsHue } from './integrations/philips-hue.js';
import { handleGoogleNest } from './integrations/google-nest.js';
import { handleHomeKit } from './integrations/homekit.js';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

const connectedClients = new Set();
const deviceStates = new Map();

// WebSocket connection handler
wss.on('connection', (ws) => {
  connectedClients.add(ws);
  
  // Send current device states to new client
  ws.send(JSON.stringify({
    type: 'INITIAL_STATE',
    devices: Array.from(deviceStates.values())
  }));

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case 'CONNECT_SERVICE':
          const result = await handleServiceConnection(data.service);
          ws.send(JSON.stringify({
            type: 'SERVICE_CONNECTED',
            service: data.service,
            success: result.success,
            devices: result.devices
          }));
          break;

        case 'DEVICE_COMMAND':
          await handleDeviceCommand(data.deviceId, data.command);
          break;
      }
    } catch (error) {
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({
        type: 'ERROR',
        message: error.message
      }));
    }
  });

  ws.on('close', () => {
    connectedClients.delete(ws);
  });
});

// Service connection handler
async function handleServiceConnection(service) {
  switch (service) {
    case 'philips-hue':
      return await handlePhilipsHue();
    case 'google-nest':
      return await handleGoogleNest();
    case 'homekit':
      return await handleHomeKit();
    default:
      throw new Error(`Unsupported service: ${service}`);
  }
}

// Device command handler
async function handleDeviceCommand(deviceId, command) {
  const device = deviceStates.get(deviceId);
  if (!device) {
    throw new Error(`Device not found: ${deviceId}`);
  }

  // Update device state
  const updatedDevice = await executeDeviceCommand(device, command);
  deviceStates.set(deviceId, updatedDevice);

  // Broadcast update to all clients
  const update = JSON.stringify({
    type: 'DEVICE_UPDATE',
    device: updatedDevice
  });
  
  connectedClients.forEach(client => {
    if (client.readyState === 1) { // OPEN
      client.send(update);
    }
  });
}

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});