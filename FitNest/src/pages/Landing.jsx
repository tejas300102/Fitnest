import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          * {
            font-family: 'Poppins', sans-serif;
          }
        `}</style>

        {/* Hero / Intro Section */}
        <div className="pt-16 pb-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-center mx-auto text-gray-900 leading-tight">
            Your Journey to a <span className="text-indigo-600">Healthier You</span>
          </h1>
          <p className="text-sm md:text-base text-slate-500 text-center mt-4 max-w-2xl mx-auto px-4">
            FitNest is your all-in-one companion for tracking workouts, planning meals, 
            and staying motivated on your path to fitness.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-8 py-10 mb-20">
          
          {/* Background Blur Effect */}
          <div className="size-[520px] rounded-full absolute blur-[300px] -z-10 bg-indigo-50/60 pointer-events-none"></div>
          
          {/* Feature Image */}
          <div className="flex-1 w-full max-w-md md:max-w-none">
             {/* Fitness related image */}
            <img 
              className="w-full rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] object-cover h-[500px]"
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop"
              alt="Person working out in a gym" 
            />
          </div>

          {/* Features Text */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-900">Why Choose FitNest?</h1>
            <p className="text-sm text-slate-500 mt-2">
              We provide the tools you need to build healthy habits, track your progress, 
              and achieve your personal fitness goals.
            </p>
      
            <div className="flex flex-col gap-8 mt-8">
              
              {/* Feature 1: Workouts */}
              <div className="flex items-start gap-4">
                <div className="size-10 p-2 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-xl">💪</span>
                </div>
                <div>
                  <h3 className="text-base font-medium text-slate-700">Smart Workout Tracking</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Log your exercises, sets, and reps with ease. Track duration and difficulty to measure your intensity.
                  </p>
                </div>
              </div>

              {/* Feature 2: Nutrition */}
              <div className="flex items-start gap-4">
                <div className="size-10 p-2 bg-green-50 border border-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-xl">🥗</span>
                </div>
                <div>
                  <h3 className="text-base font-medium text-slate-700">Nutrition & Diet Plans</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Manage your meals effectively. Track calories and macros to ensure you're fueling your body right.
                  </p>
                </div>
              </div>

              {/* Feature 3: Progress */}
              <div className="flex items-start gap-4">
                <div className="size-10 p-2 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-xl">📈</span>
                </div>
                <div>
                  <h3 className="text-base font-medium text-slate-700">Visual Progress Analytics</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Watch your transformation with interactive charts for weight, BMI, and body fat percentage.
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-4">
                <Link to="/register">
                  <button className="bg-indigo-600 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-200 active:scale-95">
                    Start Your Free Journey
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Landing;