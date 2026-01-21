import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [latestWeight, setLatestWeight] = useState(null);
  const [quote, setQuote] = useState(null);
  const [adminPosts, setAdminPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stopScroll, setStopScroll] = useState(false);

  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  const DASHBOARD_IMAGES = [
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&auto=format&fit=crop&q=60", // Gym/Workout
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&auto=format&fit=crop&q=60", // Healthy Food
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&auto=format&fit=crop&q=60", // Community/Gym
    "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1200&auto=format&fit=crop&q=60", // New Yoga Image
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1200&auto=format&fit=crop&q=60", // Weights
    "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=1200&auto=format&fit=crop&q=60"  // Running
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Fetch User (Should exist)
        const userRes = await api.get(`/api/users/${userId}`);
        setUser(userRes.data);

        // 2. Fetch Profile (Might not exist yet - Handle 404 gracefully)
        try {
          const profileRes = await api.get(`/api/profile/${userId}`);
          setProfile(profileRes.data);
        } catch (err) {
          console.log("User has no profile yet (404 is expected for new users).");
          setProfile(null); 
        }

        // 3. Fetch Progress
        try {
          const progressRes = await api.get(`/api/progress/user/${userId}`);
          if (progressRes.data.length > 0) {
            const sorted = progressRes.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setLatestWeight(sorted[0].weight);
          }
        } catch (err) {
          console.error("Error fetching progress", err);
        }

        // 4. Fetch Quote
        try {
          const quoteRes = await api.get('/api/quotes/random');
          setQuote(quoteRes.data);
        } catch (err) {
          console.error("Error fetching quote", err);
        }

        // 5. Fetch Announcements (Posts)
        try {
          const postsRes = await api.get('/api/posts');
          setAdminPosts(postsRes.data); 
        } catch (err) {
          console.error("Error fetching posts", err);
        }

      } catch (err) {
        console.error("Critical error loading dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchDashboardData();
  }, [userId]);

  const deletePost = async (postId) => {
    try {
      await api.delete(`/api/admin/posts/${postId}`);
      setAdminPosts(adminPosts.filter(post => post.id !== postId));
    } catch (err) {
      console.error("Error deleting post", err);
    }
  };

  const calculateBMI = () => {
    if (!profile?.height || !profile?.weight) return "N/A";
    const heightM = profile.height / 100;
    const bmi = (profile.weight / (heightM * heightM)).toFixed(1);
    return bmi;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getPostImage = (index) => {
    return DASHBOARD_IMAGES[index % DASHBOARD_IMAGES.length];
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl shadow-lg p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">
            {getGreeting()}, {user?.name || "User"}! 👋
          </h1>
          <p className="mt-2 text-indigo-100 text-lg italic opacity-90">
            "{quote?.text || "Keep pushing forward!"}" 
          </p>
          <p className="text-sm text-indigo-200 mt-1">— {quote?.author}</p>
        </div>
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* 2. Admin Announcements (Marquee) */}
      {adminPosts.length > 0 && (
        <>
          <style>{`
            .marquee-inner {
              animation: marqueeScroll linear infinite;
            }
            @keyframes marqueeScroll {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
          `}</style>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Announcements</h2>
            
            <div 
              className="overflow-hidden w-full relative max-w-full mx-auto" 
              onMouseEnter={() => setStopScroll(true)} 
              onMouseLeave={() => setStopScroll(false)}
            >
              <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent" />
              <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent" />

              <div 
                className="marquee-inner flex w-fit" 
                style={{ 
                  animationPlayState: stopScroll ? "paused" : "running", 
                  animationDuration: (adminPosts.length * 6000) + "ms" 
                }}
              >
                <div className="flex">
                  {[...adminPosts, ...adminPosts].map((post, index) => (
                    <div 
                      key={`${post.id}-${index}`} 
                      className="w-80 mx-4 h-[22rem] relative group hover:scale-95 transition-all duration-300 rounded-xl overflow-hidden shadow-md bg-white border border-gray-100"
                    >
                      <img 
                        src={getPostImage(index)} 
                        alt="card" 
                        className="w-full h-full object-cover" 
                      />
                      
                      {userRole === 'ADMIN' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); deletePost(post.id); }}
                          className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 hover:text-red-700 hover:bg-white transition z-20 shadow-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}

                      <div className="flex flex-col items-center justify-center px-6 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/50 p-6">
                        <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full mb-3 shadow-sm uppercase tracking-wide">
                          {post.type === 'QUOTE' ? 'Quote' : 
                           post.type === 'WORKOUT' ? 'Workout' :
                           post.type === 'DIET_TIP' ? 'Diet Tip' : 'Event'}
                        </span>
                        
                        <p className="text-white text-2xl font-bold text-center mb-3 drop-shadow-md leading-tight">
                          {post.title}
                        </p>
                        <p className="text-gray-100 text-lg text-center line-clamp-4 leading-snug drop-shadow-sm font-medium">
                          {post.content}
                        </p>
                        
                        <p className="text-gray-300 text-xs mt-4 border-t border-gray-500/50 pt-2 w-full text-center">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 3. Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Your BMI</p>
              <h3 className="text-4xl font-bold text-gray-800 mt-2">{calculateBMI()}</h3>
            </div>
            <div className="p-3 bg-indigo-50 rounded-full text-2xl">⚖️</div>
          </div>
          <p className="mt-4 text-gray-400 text-xs">
            Based on {profile?.height || 0}cm height
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Current Weight</p>
              <h3 className="text-4xl font-bold text-gray-800 mt-2">
                {latestWeight || profile?.weight || "--"} <span className="text-xl text-gray-400 font-normal">kg</span>
              </h3>
            </div>
            <div className="p-3 bg-green-50 rounded-full text-2xl">📉</div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Goal: {profile?.goals || "Not set"}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition flex flex-col justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Nutrition</p>
            <h3 className="text-xl font-bold text-gray-800 mt-2">Track Calories</h3>
          </div>
          <Link 
            to="/nutrition" 
            className="mt-4 w-full bg-indigo-50 text-indigo-600 py-2.5 rounded-lg text-center font-semibold hover:bg-indigo-100 transition flex items-center justify-center gap-2"
          >
            Search Food <span>🔍</span>
          </Link>
        </div>
      </div>

      {/* 4. Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { to: "/workouts", icon: "💪", label: "Log Workout", color: "bg-orange-50 text-orange-600" },
            { to: "/diets", icon: "🥗", label: "Diet Plans", color: "bg-green-50 text-green-600" },
            { to: "/progress", icon: "📈", label: "Track Weight", color: "bg-blue-50 text-blue-600" },
            { to: "/profile", icon: "👤", label: "Update Profile", color: "bg-purple-50 text-purple-600" },
          ].map((action, idx) => (
            <Link key={idx} to={action.to} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition text-center group">
              <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center text-2xl mb-3 transition-transform group-hover:scale-110 ${action.color}`}>
                {action.icon}
              </div>
              <div className="font-semibold text-gray-700">{action.label}</div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;