import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Thermometer, Camera, Lock, Activity } from 'lucide-react';
import { Device } from '../types/device';

interface DeviceCardProps {
  device: Device;
  onToggle: () => void;
}

const iconMap = {
  light: Lightbulb,
  thermostat: Thermometer,
  camera: Camera,
  lock: Lock,
  sensor: Activity,
};

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onToggle }) => {
  const Icon = iconMap[device.type];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${device.status === 'online' ? 'bg-green-100' : 'bg-gray-100'}`}>
            <Icon className={`w-6 h-6 ${device.status === 'online' ? 'text-green-600' : 'text-gray-400'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{device.name}</h3>
            <p className="text-sm text-gray-500">{device.room}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`} />
        </div>
      </div>
      
      <div className="space-y-3">
        {device.state.power !== undefined && (
          <button
            onClick={onToggle}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              device.state.power
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {device.state.power ? 'Turn Off' : 'Turn On'}
          </button>
        )}
        
        {device.state.temperature !== undefined && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Temperature</span>
            <span className="font-medium">{device.state.temperature}°C</span>
          </div>
        )}
        
        {device.state.humidity !== undefined && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Humidity</span>
            <span className="font-medium">{device.state.humidity}%</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};