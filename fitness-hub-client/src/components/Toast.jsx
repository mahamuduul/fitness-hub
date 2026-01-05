import { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-500 text-xl" />;
      case 'error':
        return <FaExclamationCircle className="text-red-500 text-xl" />;
      case 'info':
        return <FaInfoCircle className="text-blue-500 text-xl" />;
      default:
        return <FaCheckCircle className="text-green-500 text-xl" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-white border-l-4 border-green-500';
      case 'error':
        return 'bg-white border-l-4 border-red-500';
      case 'info':
        return 'bg-white border-l-4 border-blue-500';
      default:
        return 'bg-white border-l-4 border-green-500';
    }
  };

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] animate-slideDown`}>
      <div className={`${getBgColor()} rounded-lg shadow-2xl px-6 py-4 flex items-center gap-3 min-w-[300px] max-w-[500px]`}>
        {getIcon()}
        <p className="text-gray-800 font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close notification"
        >
          <FaTimes className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
