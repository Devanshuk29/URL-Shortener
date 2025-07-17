import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import UrlForm from './components/UrlForm';
import ShortenedUrlCard from './components/ShortenedUrlCard';
import UrlHistory from './components/UrlHistory';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import QRCodeModal from './components/QRCodeModal';
import LoginModal from './components/LoginModal';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [urlHistory, setUrlHistory] = useState([]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentQRUrl, setCurrentQRUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Fetch URL history on component mount
  useEffect(() => {
    fetchUrlHistory();
  }, []);

  const fetchUrlHistory = async () => {
    try {
      const response = await fetch('http://localhost:9000/history');
      if (response.ok) {
        const data = await response.json();
        setUrlHistory(data);
      }
    } catch (error) {
      console.error('Error fetching URL history:', error);
    }
  };

  const handleUrlShorten = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:9000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortenedUrl(data);
        fetchUrlHistory(); // Refresh history after shortening
      } else {
        console.error('Error shortening URL');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage('Copied to clipboard!');
      setTimeout(() => setCopyMessage(''), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShowQR = (url) => {
    setCurrentQRUrl(url);
    setShowQRModal(true);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          onLoginClick={() => setShowLoginModal(true)}
        />
        
        <div className="mt-8 mb-12">
          <UrlForm 
            onSubmit={handleUrlShorten}
            isLoading={isLoading}
          />
        </div>

        {copyMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            {copyMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {shortenedUrl && (
              <div className="mb-8">
                <ShortenedUrlCard 
                  urlData={shortenedUrl}
                  onCopy={handleCopyToClipboard}
                  onShowQR={handleShowQR}
                  darkMode={darkMode}
                />
              </div>
            )}
            
            <UrlHistory 
              urlHistory={urlHistory}
              onCopy={handleCopyToClipboard}
              onShowQR={handleShowQR}
              darkMode={darkMode}
            />
          </div>

          <div className="lg:col-span-1">
            <AnalyticsDashboard 
              urlHistory={urlHistory}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>

      {showQRModal && (
        <QRCodeModal 
          url={currentQRUrl}
          onClose={() => setShowQRModal(false)}
          darkMode={darkMode}
        />
      )}

      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default App;