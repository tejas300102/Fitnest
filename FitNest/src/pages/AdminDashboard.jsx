import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, workouts: 0, diets: 0 });
  const [showPostForm, setShowPostForm] = useState(false);
  const [postForm, setPostForm] = useState({ type: 'QUOTE', title: '', content: '' });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetching user count excluding admins
        const usersRes = await api.get('/api/users/count');
        const workoutsRes = await api.get('/api/workouts');
        const dietsRes = await api.get('/api/diets');
        
        setStats({
          users: usersRes.data,
          workouts: workoutsRes.data.length,
          diets: dietsRes.data.length
        });
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    
    const fetchPosts = async () => {
      try {
        const postsRes = await api.get('/api/admin/posts');
        setPosts(postsRes.data);
      } catch (err) {
        console.error("Error fetching posts", err);
      }
    };
    
    fetchStats();
    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminId = localStorage.getItem('userId');
      await api.post('/api/admin/posts', { ...postForm, adminId });
      setPostForm({ type: 'QUOTE', title: '', content: '' });
      setShowPostForm(false);
      
      // Refresh posts
      const postsRes = await api.get('/api/admin/posts');
      setPosts(postsRes.data);
    } catch (err) {
      console.error("Error creating post", err);
    }
  };

  const getPostTypeLabel = (type) => {
    const labels = {
      QUOTE: 'Motivational Quote',
      WORKOUT: 'Workout Session',
      DIET_TIP: 'Diet Tip',
      EVENT: 'Event'
    };
    return labels[type] || type;
  };

  const deletePost = async (postId) => {
    try {
      await api.delete(`/api/admin/posts/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      console.error("Error deleting post", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold">Admin Dashboard 🛡️</h1>
        <p className="text-slate-400 mt-2">Manage users and oversee system content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-bold uppercase">Total Users</p>
          <h2 className="text-4xl font-bold text-indigo-600 mt-2">{stats.users}</h2>
          <p className="text-xs text-gray-400 mt-1">Excluding admin accounts</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-bold uppercase">Total Workouts</p>
          <h2 className="text-4xl font-bold text-orange-500 mt-2">{stats.workouts}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-bold uppercase">Diet Plans</p>
          <h2 className="text-4xl font-bold text-green-500 mt-2">{stats.diets}</h2>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link to="/admin/users" className="p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">👥</div>
            <div className="font-semibold text-gray-800">Manage Users</div>
            <p className="text-xs text-gray-500 mt-1">View list & delete accounts</p>
          </Link>
          <Link to="/admin/workouts" className="p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💪</div>
            <div className="font-semibold text-gray-800">Manage Workouts</div>
            <p className="text-xs text-gray-500 mt-1">View & delete user workouts</p>
          </Link>
          <Link to="/admin/diets" className="p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🥗</div>
            <div className="font-semibold text-gray-800">Manage Diets</div>
            <p className="text-xs text-gray-500 mt-1">View & delete user diet plans</p>
          </Link>
          <button onClick={() => setShowPostForm(true)} className="p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📢</div>
            <div className="font-semibold text-gray-800">Create Post</div>
            <p className="text-xs text-gray-500 mt-1">Send notifications to users</p>
          </button>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Posts</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {posts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No posts created yet</p>
          ) : (
            <div className="space-y-4">
              {posts.slice(0, 5).map(post => (
                <div key={post.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-2">
                        {getPostTypeLabel(post.type)}
                      </span>
                      <h3 className="font-semibold text-gray-800">{post.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{post.content}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <button 
                        onClick={() => deletePost(post.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Post Creation Modal */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold mb-4">Create New Post</h3>
            <form onSubmit={handlePostSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select 
                  value={postForm.type} 
                  onChange={(e) => setPostForm({...postForm, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="QUOTE">Motivational Quote</option>
                  <option value="WORKOUT">Workout Session</option>
                  <option value="DIET_TIP">Diet Tip</option>
                  <option value="EVENT">Event</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input 
                  type="text" 
                  value={postForm.title}
                  onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea 
                  value={postForm.content}
                  onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Create Post
                </button>
                <button type="button" onClick={() => setShowPostForm(false)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;