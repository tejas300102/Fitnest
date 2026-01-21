import { useState } from 'react';
import api from '../api/axiosConfig';

const Nutrition = () => {
  const [foodName, setFoodName] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foodName.trim()) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/api/diets/nutrition/${encodeURIComponent(foodName)}`);
      setNutritionData(response.data);
    } catch (err) {
      setError('Failed to fetch nutrition data. Please try again.');
      setNutritionData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Nutrition Search</h1>
        <p className="text-gray-500">Instant nutrition facts for any food item</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg shadow-indigo-100 border border-gray-100 p-8 mb-8">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            placeholder="e.g. 1 cup rice, 100g chicken breast"
            className="w-full pl-6 pr-32 py-4 border border-gray-200 rounded-full text-lg focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition shadow-sm"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {loading ? 'Searching...' : 'Analyze'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-xl mb-6 text-center">
          {error}
        </div>
      )}

      {nutritionData && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-in slide-in-from-bottom-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 capitalize flex items-center gap-3">
            <span className="text-3xl">🍽️</span> {foodName}
          </h2>
          
          {typeof nutritionData === 'object' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(nutritionData).map(([key, value]) => (
                <div key={key} className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    {typeof value === 'number' ? value.toFixed(2) : value}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 bg-gray-50 rounded-xl font-mono text-sm text-gray-700">
              {JSON.stringify(nutritionData, null, 2)}
            </div>
          )}
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center opacity-60">
        <div className="p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold mb-1">Instant Analysis</h3>
            <p className="text-xs">Get macros in seconds</p>
        </div>
        <div className="p-4">
            <div className="text-2xl mb-2">🧪</div>
            <h3 className="font-semibold mb-1">Accurate Data</h3>
            <p className="text-xs"> Sourced from reliable APIs</p>
        </div>
        <div className="p-4">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold mb-1">Portion Control</h3>
            <p className="text-xs">Enter specific quantities</p>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;