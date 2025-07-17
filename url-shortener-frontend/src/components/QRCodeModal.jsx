import React, { useEffect, useRef } from 'react';
import { X, Download } from 'lucide-react';

const QRCodeModal = ({ url, onClose, darkMode }) => {
  const canvasRef = useRef(null);
  const qrCodeRef = useRef(null);

  useEffect(() => {
    // Generate QR code using QR Server API
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
    
    if (qrCodeRef.current) {
      qrCodeRef.current.src = qrCodeUrl;
    }
  }, [url]);

  const handleDownload = () => {
    if (qrCodeRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = 300;
      canvas.height = 300;
      
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 300, 300);
      
      ctx.drawImage(qrCodeRef.current, 0, 0, 300, 300);
      
      const link = document.createElement('a');
      link.download = `qr-code-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className={`relative p-6 rounded-lg shadow-xl max-w-md w-full mx-4 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">QR Code</h3>
          
          <div className="mb-4">
            <img
              ref={qrCodeRef}
              alt="QR Code"
              className="mx-auto rounded-lg shadow-md"
              style={{ maxWidth: '300px', maxHeight: '300px' }}
            />
          </div>
          
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          
          <div className="space-y-4">
            <p className="text-sm text-gray-500 break-all">
              {url}
            </p>
            
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Download size={18} />
              <span>Download QR Code</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;