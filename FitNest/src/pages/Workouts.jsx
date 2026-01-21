import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    durationMinutes: '', 
    difficulty: '' 
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await api.get(`/api/workouts/user/${userId}`);
      setWorkouts(response.data);
    } catch (err) {
      console.error('Error fetching workouts:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const minutes = Number(formData.durationMinutes);

    // Ensure value is within 1-120 before submitting
    if (minutes < 1 || minutes > 120) {
      alert("Duration must be between 1 and 120 minutes.");
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const dataToSend = { ...formData, userId };
      
      if (editingId) {
        await api.put(`/api/workouts/${editingId}`, dataToSend);
        setEditingId(null);
      } else {
        await api.post('/api/workouts', dataToSend);
      }

      setFormData({ title: '', description: '', durationMinutes: '', difficulty: '' });
      fetchWorkouts();
    } catch (err) {
      console.error('Error saving workout:', err);
    }
  };

  const handleEdit = (workout) => {
    setFormData(workout);
    setEditingId(workout.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this workout?")) return;
    try {
      await api.delete(`/api/workouts/${id}`);
      fetchWorkouts();
    } catch (err) {
      console.error('Error deleting workout:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Left Column: Form */}
        <div className="w-full md:w-1/3 sticky top-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              {editingId ? '✏️ Edit Workout' : '➕ Log Workout'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Morning Run"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Details about your session..."
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minutes</label>
                  <input
                    type="number"
                    placeholder="45"
                    min="1"
                    max="120"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({
                      ...formData,
                      durationMinutes: e.target.value < 1 ? 1 : e.target.value > 120 ? 120 : e.target.value
                    })}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Min 1, Max 120 minutes</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select
                    className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                      formData.difficulty === '' ? 'text-gray-400' : 'text-gray-900'
                    }`}
                    value={formData.difficulty}
                    onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                    required
                  >
                    <option value="" disabled hidden>Select</option>
                    <option value="Easy" className="text-gray-900">Easy</option>
                    <option value="Medium" className="text-gray-900">Medium</option>
                    <option value="Hard" className="text-gray-900">Hard</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
                >
                  {editingId ? 'Update' : 'Save Workout'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({ title: '', description: '', durationMinutes: '', difficulty: '' });
                    }}
                    className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: List */}
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Recent Workouts</h1>
          <div className="grid grid-cols-1 gap-4">
            {workouts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100 border-dashed">
                <p className="text-gray-400">No workouts logged yet. Add your first one!</p>
              </div>
            ) : (
              workouts.map((workout) => (
                <div key={workout.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition flex justify-between items-center group">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-800">{workout.title}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        workout.difficulty === 'Hard' ? 'bg-red-50 text-red-600' :
                        workout.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-600' :
                        'bg-green-50 text-green-600'
                      }`}>
                        {workout.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">{workout.description}</p>
                    <div className="text-xs text-gray-400 flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {workout.durationMinutes} mins
                      </div>
                      {workout.userName && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                          by {workout.userName}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(workout)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                      title="Edit"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button
                      onClick={() => handleDelete(workout.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
