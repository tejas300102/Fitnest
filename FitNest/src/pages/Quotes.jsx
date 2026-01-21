import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const Quotes = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomQuote = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/quotes/random');
      setQuote(response.data);
    } catch (err) {
      console.error('Error fetching quote:', err);
      setQuote({ text: "The only bad workout is the one that didn't happen.", author: "Unknown" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl shadow-indigo-50 border border-gray-50 p-10 text-center relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
        
        {loading ? (
          <div className="py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        ) : quote ? (
          <div className="relative z-10 animate-in fade-in duration-700">
            <div className="text-6xl text-indigo-200 font-serif leading-none mb-4">“</div>
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 leading-relaxed font-serif italic">
              {quote.text || quote.quote}
            </blockquote>
            <div className="inline-block px-4 py-1 rounded-full bg-gray-50 border border-gray-100">
                <cite className="text-sm font-bold text-gray-500 not-italic uppercase tracking-wide">
                — {quote.author || 'Unknown'}
                </cite>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 py-10">No quote available.</p>
        )}

        <div className="mt-10">
          <button
            onClick={fetchRandomQuote}
            disabled={loading}
            className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition duration-200 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            Inspire Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quotes;