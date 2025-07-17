import React from 'react';
import { Copy, QrCode, ExternalLink, ArrowUpDown } from 'lucide-react';

const UrlHistory = ({ urlHistory, onCopy, onShowQR, darkMode }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateUrl = (url, maxLength = 40) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  if (urlHistory.length === 0) {
    return (
      <div className={`p-6 rounded-lg shadow-lg ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <h3 className="text-xl font-semibold mb-4">Recent History</h3>
        <p className="text-gray-500">No URLs shortened yet. Create your first short link!</p>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-lg shadow-lg ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      <h3 className="text-xl font-semibold mb-4">Recent History</h3>
      
      <div className="space-y-4">
        {urlHistory.map((item) => (
          <div key={item._id} className={`p-4 rounded-lg border ${
            darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-blue-500 font-medium">{item.shortId}</span>
                  <span className="text-sm text-gray-500">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <ArrowUpDown size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-500 truncate">
                    {truncateUrl(item.originalUrl)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{item.accessCount} clicks</span>
                  <span>•</span>
                  <span>{formatDate(item.updatedAt)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onCopy(item.shortUrl)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                  }`}
                  title="Copy short URL"
                >
                  <Copy size={16} />
                </button>
                
                <button
                  onClick={() => onShowQR(item.shortUrl)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                  }`}
                  title="Show QR Code"
                >
                  <QrCode size={16} />
                </button>
                
                <button
                  onClick={() => window.open(item.shortUrl, '_blank')}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                  }`}
                  title="Open link"
                >
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlHistory;
