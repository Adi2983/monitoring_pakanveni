
import React, { useState, useEffect, useMemo } from 'react';
import { FeedData, FilterState } from './types';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { fetchFeedData } from './services/api';

const App: React.FC = () => {
  const [data, setData] = useState<FeedData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    lokasi: '',
    merek: '',
    hasil: '',
    jamur: '',
    sortField: 'tanggal',
    sortOrder: 'desc',
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchFeedData();
        setData(result);
        setError(null);
      } catch (err) {
        setError('Gagal memuat data. Menggunakan data cache jika tersedia.');
        // Fallback is handled in api.ts
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen flex flex-col">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 flex items-center shadow-sm rounded-r-md">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            {error}
          </div>
        )}
        <Dashboard 
          data={data} 
          filters={filters} 
          setFilters={setFilters} 
          loading={loading} 
        />
      </main>
      <footer className="bg-white dark:bg-gray-800 py-6 border-t dark:border-gray-700 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} FeedCheck Pro. Built for Agriculture Transparency.
        </div>
      </footer>
    </div>
  );
};

export default App;
