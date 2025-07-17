import React from 'react';
import { Copy, Share2, QrCode, ExternalLink, Twitter, MessageCircle } from 'lucide-react';

const ShortenedUrlCard = ({ urlData, onCopy, onShowQR, darkMode }) => {
  const { originalUrl, shortUrl, shortId, accessCount } = urlData;

  const handleShare = (platform) => {
    const text = `Check out this link: ${shortUrl}`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(shortUrl);
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    };
    
    window.open(urls[platform], '_blank');
  };

  const getFavicon = (url) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  const getTitle = (url) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '').split('.')[0];
    } catch {
      return 'Link';
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-blue-500">{shortId}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onShowQR(shortUrl)}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
            title="Show QR Code"
          >
            <QrCode size={20} />
          </button>
          <div className="relative group">
            <button
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              title="Share"
            >
              <Share2 size={20} />
            </button>
            <div className="absolute right-0 top-10 hidden group-hover:block bg-white dark:bg-gray-700 shadow-lg rounded-lg p-2 z-10">
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded w-full"
              >
                <Twitter size={16} className="text-blue-400" />
                <span className="text-sm">Twitter</span>
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded w-full"
              >
                <MessageCircle size={16} className="text-green-500" />
                <span className="text-sm">WhatsApp</span>
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded w-full"
              >
                <ExternalLink size={16} className="text-blue-600" />
                <span className="text-sm">LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <img 
            src={getFavicon(originalUrl)} 
            alt="favicon" 
            className="w-6 h-6"
            onError={(e) => e.target.style.display = 'none'}
          />
          <div>
            <h4 className="font-medium">{getTitle(originalUrl)}</h4>
            <p className="text-sm text-gray-500">
              Learn more &gt; {originalUrl}
            </p>
          </div>
        </div>

        <div className={`flex items-center justify-between p-3 rounded-lg ${
          darkMode ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <span className="font-mono text-sm truncate flex-1 mr-4">
            {shortUrl}
          </span>
          <button
            onClick={() => onCopy(shortUrl)}
            className="flex items-center space-x-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
          >
            <Copy size={16} />
            <span className="text-sm">Copy</span>
          </button>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>Clicks: {accessCount}</span>
          <span>•</span>
          <span>Created: {new Date(urlData.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ShortenedUrlCard;
