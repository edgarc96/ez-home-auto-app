import React from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { ServiceProvider } from '../types/integration';

interface ServiceCardProps {
  service: ServiceProvider;
  onConnect: () => void;
  isConnecting: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onConnect,
  isConnecting,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={service.logo}
            alt={`${service.name} logo`}
            className="w-12 h-12 object-contain"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{service.name}</h3>
            <p className="text-sm text-gray-500">{service.description}</p>
          </div>
        </div>
        <button
          onClick={onConnect}
          disabled={isConnecting}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            service.connected
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isConnecting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : service.connected ? (
            <Check className="w-5 h-5" />
          ) : (
            <span>Connect</span>
          )}
        </button>
      </div>
      
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {service.deviceTypes.map((type) => (
            <span
              key={type}
              className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};