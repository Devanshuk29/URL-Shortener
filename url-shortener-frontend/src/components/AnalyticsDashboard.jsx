import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AnalyticsDashboard = ({ urlHistory, darkMode }) => {
  const analytics = useMemo(() => {
    const totalClicks = urlHistory.reduce((sum, url) => sum + url.accessCount, 0);
    
    // Group clicks by date
    const clicksByDate = urlHistory.reduce((acc, url) => {
      const date = new Date(url.createdAt).toLocaleDateString('en-US', {
        weekday: 'short'
      });
      acc[date] = (acc[date] || 0) + url.accessCount;
      return acc;
    }, {});
    
    // Create chart data for the last 7 days
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const chartData = days.map(day => ({
      day,
      clicks: clicksByDate[day] || Math.floor(Math.random() * 50) + 10 // Mock data for demo
    }));
    
    return {
      totalClicks,
      chartData
    };
  }, [urlHistory]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg ${
          darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
        }`}>
          <p className="font-medium">{`${label}: ${payload[0].value} clicks`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      <h3 className="text-xl font-semibold mb-6">Analytics</h3>
      
      <div className="space-y-6">
        {/* Total Clicks */}
        <div>
          <h4 className="text-lg font-medium mb-4">Total Clicks</h4>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-blue-500">
              {analytics.totalClicks}
            </span>
            <div className="flex-1 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.chartData}>
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Clicks per Day */}
        <div>
          <h4 className="text-lg font-medium mb-4">Clicks per Day</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                <XAxis 
                  dataKey="day" 
                  tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }}
                  axisLine={{ stroke: darkMode ? '#4b5563' : '#d1d5db' }}
                />
                <YAxis 
                  tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }}
                  axisLine={{ stroke: darkMode ? '#4b5563' : '#d1d5db' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="clicks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="text-sm text-gray-500 mb-1">Total Links</div>
            <div className="text-2xl font-bold text-blue-500">{urlHistory.length}</div>
          </div>
          
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="text-sm text-gray-500 mb-1">Avg. Clicks</div>
            <div className="text-2xl font-bold text-green-500">
              {urlHistory.length > 0 ? Math.round(analytics.totalClicks / urlHistory.length) : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;