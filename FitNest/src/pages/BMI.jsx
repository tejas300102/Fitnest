import { useState } from 'react';
import api from '../api/axiosConfig';

const BMI = () => {
  const [formData, setFormData] = useState({ weightKg: '', heightCm: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.get(`/api/bmi?weightKg=${formData.weightKg}&heightCm=${formData.heightCm}`);
      setResult(response.data);
    } catch (err) {
      console.error('Error calculating BMI:', err);
    } finally {
      setLoading(false);
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-50 border-blue-200' };
    if (bmi < 25) return { category: 'Normal Weight', color: 'text-green-500', bg: 'bg-green-50 border-green-200' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-500', bg: 'bg-yellow-50 border-yellow-200' };
    return { category: 'Obese', color: 'text-red-500', bg: 'bg-red-50 border-red-200' };
  };

  const styling = result ? getBMICategory(result.bmi) : {};

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-indigo-50 border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">BMI Calculator</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                placeholder="70"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-center text-lg font-medium"
                value={formData.weightKg}
                onChange={(e) => setFormData({...formData, weightKg: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Height (cm)</label>
              <input
                type="number"
                step="0.1"
                placeholder="175"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-center text-lg font-medium"
                value={formData.heightCm}
                onChange={(e) => setFormData({...formData, heightCm: e.target.value})}
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-70"
          >
            {loading ? 'Calculating...' : 'Calculate BMI'}
          </button>
        </form>

        {result && (
          <div className={`mt-8 p-6 rounded-xl border-2 text-center animate-in zoom-in-95 duration-300 ${styling.bg}`}>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Your Result</p>
            <div className="text-5xl font-extrabold text-gray-800 mb-2">
              {result.bmi?.toFixed(1)}
            </div>
            <div className={`text-lg font-bold ${styling.color}`}>
              {styling.category}
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 text-center">Reference Guide</h4>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Underweight</span><span className="font-mono text-gray-400">&lt; 18.5</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Normal</span><span className="font-mono text-gray-400">18.5 - 24.9</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Overweight</span><span className="font-mono text-gray-400">25 - 29.9</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Obese</span><span className="font-mono text-gray-400">&gt; 30</span></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BMI;