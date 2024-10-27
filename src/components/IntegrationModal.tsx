import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { useIntegrationStore } from '../store/integrationStore';
import { useWebSocket } from '../hooks/useWebSocket';

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntegrationModal: React.FC<IntegrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { services, connecting, setConnecting } = useIntegrationStore();
  const { connectService } = useWebSocket();

  const handleConnect = async (serviceId: string) => {
    setConnecting(serviceId);
    connectService(serviceId);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Connect Services
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="grid gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onConnect={() => handleConnect(service.id)}
                isConnecting={connecting === service.id}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};