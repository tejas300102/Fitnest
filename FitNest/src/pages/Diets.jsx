import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const Diets = () => {
  const [diets, setDiets] = useState([]);
  const [formData, setFormData] = useState({ 
    name: '', 
    description: '', 
    calories: '', 
    mealType: ''        
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDiets();
  }, []);

  const fetchDiets = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await api.get(`/api/diets/user/${userId}`);
      setDiets(response.data);
    } catch (err) {
      console.error('Error fetching diets:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const calories = Number(formData.calories);
    if (calories < 0 || calories > 2000) {
      alert("Calories must be between 0 and 2000 cal.");
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const dataToSend = { ...formData, userId };
      
      if (editingId) {
        await api.put(`/api/diets/${editingId}`, dataToSend);
        setEditingId(null);
      } else {
        await api.post('/api/diets', dataToSend);
      }
      setFormData({ name: '', description: '', calories: '', mealType: '' });
      fetchDiets();
    } catch (err) {
      console.error('Error saving diet:', err);
    }
  };

  const handleEdit = (diet) => {
    setFormData(diet);
    setEditingId(diet.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this diet plan?")) return;
    try {
      await api.delete(`/api/diets/${id}`);
      fetchDiets();
    } catch (err) {
      console.error('Error deleting diet:', err);
    }
  };

  const getMealTypeEmoji = (type) => {
    switch(type) {
        case 'Breakfast': return '🍳';
        case 'Lunch': return '🥪';
        case 'Dinner': return '🍽️';
        case 'Snack': return '🍎';
        default: return '🥘';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Left Column: Form */}
        <div className="w-full md:w-1/3 sticky top-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              {editingId ? '✏️ Edit Meal' : '➕ Add Meal Plan'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Oatmeal & Berries"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
                <select
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  value={formData.mealType}
                  onChange={(e) => setFormData({...formData, mealType: e.target.value})}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
                <input
                  type="number"
                  placeholder="350"
                  min="0"
                  max="2000"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  value={formData.calories}
                  onChange={(e) => setFormData({
                    ...formData,
                    calories: e.target.value < 0 ? 0 : e.target.value > 2000 ? 2000 : e.target.value
                  })}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Min 0 cal, Max 2000 cal</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Ingredients or prep notes..."
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition shadow-md"
                >
                  {editingId ? 'Update Meal' : 'Save Meal'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({ name: '', description: '', calories: '', mealType: '' });
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Meal Plans</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {diets.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-100 border-dashed">
                <p className="text-gray-400">No meal plans yet. Start creating!</p>
              </div>
            ) : (
              diets.map((diet) => (
                <div key={diet.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-2xl bg-gray-50 p-2 rounded-lg">{getMealTypeEmoji(diet.mealType)}</span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(diet)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                            <button onClick={() => handleDelete(diet.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{diet.name}</h3>
                    <p className="text-gray-500 text-sm mt-1 mb-3 line-clamp-2">{diet.description}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs font-medium border-t border-gray-50 pt-3 mt-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded">{diet.mealType}</span>
                      {diet.userName && (
                        <span className="text-gray-400">by {diet.userName}</span>
                      )}
                    </div>
                    <span className="text-gray-500">{diet.calories} cal</span>
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

export default Diets;
