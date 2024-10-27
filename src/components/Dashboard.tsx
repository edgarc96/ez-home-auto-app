import React, { useState } from 'react';
import { DeviceCard } from './DeviceCard';
import { useDeviceStore } from '../store/deviceStore';
import { IntegrationModal } from './IntegrationModal';
import { PlusCircle, Home, Settings } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { devices, updateDevice } = useDeviceStore();
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);

  const handleDeviceToggle = (deviceId: string) => {
    const device = devices.find((d) => d.id === deviceId);
    if (device && device.state.power !== undefined) {
      updateDevice(deviceId, {
        state: { ...device.state, power: !device.state.power },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Home className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Smart Home Hub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsIntegrationModalOpen(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add Device</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onToggle={() => handleDeviceToggle(device.id)}
            />
          ))}
        </div>
      </main>

      <IntegrationModal
        isOpen={isIntegrationModalOpen}
        onClose={() => setIsIntegrationModalOpen(false)}
      />
    </div>
  );
};