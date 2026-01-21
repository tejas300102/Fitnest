import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const AdminDiets = () => {
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    fetchDiets();
  }, []);

  const fetchDiets = async () => {
    try {
      const response = await api.get('/api/diets');
      setDiets(response.data);
    } catch (err) {
      console.error('Error fetching diets:', err);
    }
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Diet Plans</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Meal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Calories</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {diets.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No diet plans found
                  </td>
                </tr>
              ) : (
                diets.map((diet) => (
                  <tr key={diet.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getMealTypeEmoji(diet.mealType)}</span>
                        <span className="font-medium text-gray-900">{diet.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{diet.userName || 'System'}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                        {diet.mealType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{diet.calories} kcal</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{diet.description}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(diet.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDiets;