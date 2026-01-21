import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 animate-in fade-in duration-500">
        <form onSubmit={handleSubmit} className="flex flex-col items-center text-sm text-slate-800 bg-white p-8 rounded-2xl shadow-xl shadow-indigo-50 border border-gray-100 w-full max-w-lg">
            <p className="text-xs bg-indigo-50 text-indigo-600 font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4 border border-indigo-100">
                Contact Us
            </p> 
            <h1 className="text-3xl md:text-4xl font-bold py-2 text-center text-gray-900">Let’s Get In Touch.</h1>
            <p className="text-gray-500 pb-8 text-center max-w-sm">
                Have questions or feedback? Reach out to us directly at <a href="mailto:support@fitnest.com" className="text-indigo-600 hover:underline font-medium">support@fitnest.com</a>
            </p>
            
            {submitted ? (
                <div className="w-full bg-green-50 text-green-700 p-4 rounded-xl text-center border border-green-200 mb-6">
                    <p className="font-semibold">Message Sent! 🎉</p>
                    <p className="text-xs mt-1">We'll get back to you shortly.</p>
                    <button 
                        onClick={() => setSubmitted(false)}
                        className="mt-3 text-xs font-bold underline hover:text-green-800"
                    >
                        Send another message
                    </button>
                </div>
            ) : (
                <div className="w-full px-2">
                    <label htmlFor="name" className="font-medium text-gray-700 ml-1">Full Name</label>
                    <div className="flex items-center mt-2 mb-5 h-12 pl-4 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all overflow-hidden bg-gray-50/50">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                            <path d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0" fill="currentColor"/>
                        </svg>
                        <input 
                            id="name"
                            type="text" 
                            className="h-full px-3 w-full outline-none bg-transparent placeholder-gray-400" 
                            placeholder="Enter your full name" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required 
                        />
                    </div>
            
                    <label htmlFor="email-address" className="font-medium text-gray-700 ml-1">Email Address</label>
                    <div className="flex items-center mt-2 mb-5 h-12 pl-4 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all overflow-hidden bg-gray-50/50">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                            <path d="M17.5 3.438h-15a.937.937 0 0 0-.937.937V15a1.563 1.563 0 0 0 1.562 1.563h13.75A1.563 1.563 0 0 0 18.438 15V4.375a.94.94 0 0 0-.938-.937m-2.41 1.874L10 9.979 4.91 5.313zM3.438 14.688v-8.18l5.928 5.434a.937.937 0 0 0 1.268 0l5.929-5.435v8.182z" fill="currentColor"/>
                        </svg>
                        <input 
                            id="email-address"
                            type="email" 
                            className="h-full px-3 w-full outline-none bg-transparent placeholder-gray-400" 
                            placeholder="Enter your email address" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required 
                        />
                    </div>
            
                    <label htmlFor="message" className="font-medium text-gray-700 ml-1">Message</label>
                    <textarea 
                        id="message"
                        rows="4" 
                        className="w-full mt-2 p-4 bg-gray-50/50 border border-gray-200 rounded-xl resize-none outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-gray-400" 
                        placeholder="How can we help you?" 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                    ></textarea>
                    
                    <button type="submit" className="flex items-center justify-center gap-2 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 w-full rounded-xl transition shadow-lg shadow-indigo-200 active:scale-95">
                        Send Message
                        <svg className="mt-0.5" width="20" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="m18.038 10.663-5.625 5.625a.94.94 0 0 1-1.328-1.328l4.024-4.023H3.625a.938.938 0 0 1 0-1.875h11.484l-4.022-4.025a.94.94 0 0 1 1.328-1.328l5.625 5.625a.935.935 0 0 1-.002 1.33" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            )}
        </form>
    </div>
  );
};

export default Contact;