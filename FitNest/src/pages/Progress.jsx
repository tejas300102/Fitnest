import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../api/axiosConfig';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Progress = () => {
  const [progress, setProgress] = useState([]);
  const [formData, setFormData] = useState({ weight: '', date: '', bodyFatPercent: '', notes: '' });
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcData, setCalcData] = useState({ gender: 'male', height: '', waist: '', neck: '', hip: '' });
  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchProgress();
    }
  }, [userId]);

  const fetchProgress = async () => {
    try {
      const response = await api.get(`/api/progress/user/${userId}`);
      const sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setProgress(sortedData);
    } catch (err) {
      console.error('Error fetching progress:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    const inputDate = new Date(formData.date);
    const weight = parseFloat(formData.weight);
    const fat = parseFloat(formData.bodyFatPercent);

    // Validation
    if (!formData.date || inputDate > today) {
      alert("Please select a valid date (cannot be in the future).");
      return;
    }
    if (!weight || weight < 20 || weight > 300) {
      alert("Weight must be between 20 kg and 300 kg.");
      return;
    }
    if (formData.bodyFatPercent !== '' && (fat < 2 || fat > 70)) {
      alert("Body Fat % must be between 2% and 70%.");
      return;
    }

    try {
      await api.post('/api/progress', { ...formData, userId: Number(userId) });
      setFormData({ weight: '', date: '', bodyFatPercent: '', notes: '' });
      fetchProgress();
    } catch (err) {
      console.error('Error adding progress:', err);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this entry?")) return;
    try {
        await api.delete(`/api/progress/${id}`);
        fetchProgress();
    } catch (err) { console.error("Error deleting:", err); }
  };

  // US Navy Method Logic (same as before)
  const calculateBodyFat = () => {
    const { gender, height, waist, neck, hip } = calcData;
    if (!height || !waist || !neck || (gender === 'female' && !hip)) {
      alert("Please fill in all calculator fields."); return;
    }
    const h = parseFloat(height), w = parseFloat(waist), n = parseFloat(neck), hi = parseFloat(hip);
    let bodyFat = 0;
    if (gender === 'male') {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(w + hi - n) + 0.22100 * Math.log10(h)) - 450;
    }
    if (bodyFat > 0 && bodyFat < 70) {
      setFormData({ ...formData, bodyFatPercent: bodyFat.toFixed(1) });
      setShowCalculator(false);
    } else { alert("Invalid result. Check measurements."); }
  };

  const chartData = {
    labels: progress.map(p => new Date(p.date).toLocaleDateString(undefined, {month:'short', day:'numeric'})),
    datasets: [
      {
        label: 'Weight (kg)',
        data: progress.map(p => p.weight),
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.3,
        yAxisID: 'y',
        fill: true,
      },
      {
        label: 'Body Fat %',
        data: progress.map(p => p.bodyFatPercent),
        borderColor: 'rgb(234, 88, 12)', 
        backgroundColor: 'rgba(234, 88, 12, 0.0)',
        tension: 0.3,
        yAxisID: 'y1',
        borderDash: [5, 5],
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    scales: {
      y: { type: 'linear', display: true, position: 'left', title: { display: true, text: 'Weight' } },
      y1: { type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false } },
    },
    plugins: { legend: { position: 'top' } },
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Your Progress</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Input Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Log Today's Stats</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input type="number" step="0.1" min="20" max="300" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} required />
                <p className="text-xs text-gray-400 mt-1">Min 20 kg, Max 300 kg</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">Body Fat %</label>
                    <button type="button" onClick={() => setShowCalculator(!showCalculator)} className="text-xs text-indigo-600 font-medium hover:underline">
                        {showCalculator ? 'Hide Calculator' : 'Estimate?'}
                    </button>
                </div>
                <input type="number" step="0.1" min="2" max="70" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.bodyFatPercent} onChange={(e) => setFormData({...formData, bodyFatPercent: e.target.value})} />
                <p className="text-xs text-gray-400 mt-1">Min 2%, Max 70%</p>
              </div>

              {showCalculator && (
                <div className="bg-indigo-50 rounded-lg p-3 text-sm space-y-2 border border-indigo-100">
                    <select className="w-full p-1 border rounded" value={calcData.gender} onChange={(e)=>setCalcData({...calcData, gender: e.target.value})}>
                        <option value="male">Male</option><option value="female">Female</option>
                    </select>
                    <input className="w-full p-1 border rounded" placeholder="Height (cm)" value={calcData.height} onChange={(e)=>setCalcData({...calcData, height: e.target.value})}/>
                    <input className="w-full p-1 border rounded" placeholder="Waist (cm)" value={calcData.waist} onChange={(e)=>setCalcData({...calcData, waist: e.target.value})}/>
                    <input className="w-full p-1 border rounded" placeholder="Neck (cm)" value={calcData.neck} onChange={(e)=>setCalcData({...calcData, neck: e.target.value})}/>
                    {calcData.gender === 'female' && <input className="w-full p-1 border rounded" placeholder="Hip (cm)" value={calcData.hip} onChange={(e)=>setCalcData({...calcData, hip: e.target.value})}/>}
                    <button type="button" onClick={calculateBodyFat} className="w-full bg-indigo-600 text-white py-1 rounded">Apply Estimate</button>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
              </div>

              <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition">Save Log</button>
            </form>
          </div>
        </div>

        {/* Right: Chart & Table */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-80">
            {progress.length > 0 ? <Line data={chartData} options={chartOptions} /> : 
                <div className="h-full flex items-center justify-center text-gray-400">Add data to visualize progress</div>}
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
                        <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Weight</th>
                            <th className="px-6 py-3">Fat %</th>
                            <th className="px-6 py-3">Notes</th>
                            <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {progress.map((entry) => (
                            <tr key={entry.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 text-gray-900 font-medium">{new Date(entry.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-indigo-600">{entry.weight} kg</td>
                                <td className="px-6 py-4 text-gray-500">{entry.bodyFatPercent || '-'}</td>
                                <td className="px-6 py-4 text-gray-500 truncate max-w-xs">{entry.notes || '-'}</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleDelete(entry.id)} className="text-red-500 hover:text-red-700 font-medium text-xs bg-red-50 px-2 py-1 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {progress.length === 0 && <tr><td colSpan="5" className="text-center py-6 text-gray-400">No logs yet.</td></tr>}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
