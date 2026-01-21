import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 px-6 pt-12 md:px-16 lg:px-32 w-full text-gray-300 mt-auto">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-700 pb-10">
        
        {/* Brand & App Info */}
        <div className="md:max-w-sm">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-indigo-400 transition">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-500">
               <path d="M20 38C29.941 38 38 29.941 38 20C38 10.059 29.941 2 20 2C10.059 2 2 10.059 2 20C2 29.941 10.059 38 20 38Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
               <path d="M11 20L17 26L29 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-2xl font-bold tracking-tight">FitNest</span>
          </Link>
          <p className="mt-6 text-sm leading-relaxed text-gray-400">
            FitNest is your all-in-one companion for tracking workouts, planning meals, and staying motivated on your path to a healthier lifestyle.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {/* Placeholder App Store Buttons */}
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg" alt="Get it on Google Play" className="h-10 w-auto rounded cursor-pointer opacity-90 hover:opacity-100 transition" />
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg" alt="Download on the App Store" className="h-10 w-auto rounded cursor-pointer opacity-90 hover:opacity-100 transition" />
          </div>
        </div>

        {/* Links Section */}
        <div className="flex-1 flex flex-col md:flex-row md:justify-end gap-10 md:gap-24">
          <div>
            <h2 className="font-semibold text-white mb-5 text-lg">Company</h2>
            <ul className="text-sm space-y-3 text-gray-400">
              <li><Link to="/" className="hover:text-indigo-400 transition">Home</Link></li>
              <li><a href="#" className="hover:text-indigo-400 transition">About us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h2 className="font-semibold text-white mb-5 text-lg">Support</h2>
            <ul className="text-sm space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-indigo-400 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Contact Us</a></li>
              <li><Link to="/about" className="hover:text-indigo-400 transition">About us</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-white mb-5 text-lg">Get in touch</h2>
            <div className="text-sm space-y-3 text-gray-400">
              <p className="flex items-center gap-2">
                <span>📞</span> +1-234-567-890
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span> support@fitnest.com
              </p>
              <div className="flex gap-4 mt-4">
                {/* Social Placeholders */}
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition text-white">𝕏</a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition text-white">in</a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition text-white">fb</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 pb-8 text-center text-sm text-gray-500">
        <p>
          Copyright © {new Date().getFullYear()} <span className="text-white font-medium">FitNest</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;