import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const AdminWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await api.get('/api/workouts');
      setWorkouts(response.data);
    } catch (err) {
      console.error('Error fetching workouts:', err);
    }
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Workouts</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Difficulty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No workouts found
                  </td>
                </tr>
              ) : (
                workouts.map((workout) => (
                  <tr key={workout.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{workout.title}</td>
                    <td className="px-6 py-4 text-gray-600">{workout.userName || 'System'}</td>
                    <td className="px-6 py-4 text-gray-600">{workout.durationMinutes} mins</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        workout.difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
                        workout.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {workout.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{workout.description}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(workout.id)}
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

export default AdminWorkouts;