import { useEffect, useRef, useCallback } from 'react';
import { useDeviceStore } from '../store/deviceStore';
import { useIntegrationStore } from '../store/integrationStore';

const WS_URL = 'ws://localhost:3001';

export function useWebSocket() {
  const ws = useRef<WebSocket | null>(null);
  const { addDevice, updateDevice } = useDeviceStore();
  const { setConnecting, toggleConnection } = useIntegrationStore();

  const connectService = useCallback((serviceId: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'CONNECT_SERVICE',
        service: serviceId
      }));
    }
  }, []);

  const sendCommand = useCallback((deviceId: string, command: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'DEVICE_COMMAND',
        deviceId,
        command
      }));
    }
  }, []);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'INITIAL_STATE':
          data.devices.forEach((device: any) => addDevice(device));
          break;

        case 'SERVICE_CONNECTED':
          setConnecting(null);
          if (data.success) {
            toggleConnection(data.service);
            data.devices.forEach((device: any) => addDevice(device));
          }
          break;

        case 'DEVICE_UPDATE':
          updateDevice(data.device.id, data.device);
          break;

        case 'ERROR':
          console.error('WebSocket error:', data.message);
          break;
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.current?.close();
    };
  }, [addDevice, updateDevice, setConnecting, toggleConnection]);

  return { connectService, sendCommand };
}