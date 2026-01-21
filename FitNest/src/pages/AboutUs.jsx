import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import images from local assets
import tejasImg from '../img/Tejas.png';
import vasundharaImg from '../img/vasundhara.jpg';
import prathmeshImg from '../img/prathmesh.jpg';

const ProfileCard = ({ member }) => {
    const [visible, setVisible] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const divRef = React.useRef(null);

    const handleMouseMove = (e) => {
        const bounds = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    };

    return (
        <div 
            ref={divRef} 
            onMouseMove={handleMouseMove} 
            onMouseEnter={() => setVisible(true)} 
            onMouseLeave={() => setVisible(false)}
            className="relative w-80 h-96 rounded-xl p-0.5 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105 duration-300 border border-gray-100 group"
        >
            {visible && (
                <div 
                    className="pointer-events-none blur-xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 size-60 absolute z-0 transition-opacity duration-300 opacity-20"
                    style={{ top: position.y - 120, left: position.x - 120 }}
                />
            )}

            <div className="relative z-10 bg-white/90 backdrop-blur-sm p-6 h-full w-full rounded-[10px] flex flex-col items-center justify-center text-center">
                {/* Image Container with Gradient Border */}
                <div className="w-32 h-32 rounded-full shadow-lg my-4 p-1 bg-gradient-to-tr from-indigo-500 to-purple-500 group-hover:scale-105 transition-transform duration-300">
                    <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full rounded-full object-cover border-2 border-white bg-white"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=User"; }} 
                    />
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h2>
                <p className="text-sm text-indigo-600 font-medium mb-4">Software Developer</p>
                
                <p className="text-sm text-gray-500 mb-6 px-4 leading-relaxed line-clamp-3">
                    Passionate about building scalable applications and solving complex problems with code.
                </p>
                
                <div className="flex space-x-6 text-indigo-600 mt-auto pb-2">
                    {/* GitHub Link */}
                    <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className='hover:-translate-y-1 transition-transform duration-200 text-gray-600 hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-50'
                        title="GitHub Profile"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                    </a>

                    {/* LinkedIn Link */}
                    <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className='hover:-translate-y-1 transition-transform duration-200 text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50'
                        title="LinkedIn Profile"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

const AboutUs = () => {
    const teamMembers = [
        {
            name: "Tejas Jadhao",
            image: tejasImg,
            github: "https://github.com/tejas300102",
            linkedin: "https://www.linkedin.com/in/tejas-jadhao-993656291"
        },
        {
            name: "Vasundhara Nanaware",
            image: vasundharaImg,
            github: "https://github.com/Vasun07",
            linkedin: "https://www.linkedin.com/in/vasundhara-nanaware-3103b531a/"
        },
        {
            name: "Prathmesh Maharnur",
            image: prathmeshImg,
            github: "https://github.com/Prathamesh-Maharnur-CDAC",
            linkedin: "http://www.linkedin.com/in/prathamesh-maharnur-7a3734231"
        }
    ];

    return (
        <>
            <Navbar /> {/* Assuming Navbar is handled in Layout or added here if standalone */}
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <main className="flex-grow container mx-auto px-4 py-16">
                    
                    {/* Header Section */}
                    <div className="text-center mb-16 space-y-4 animate-in slide-in-from-bottom-5 duration-700">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                            Meet Our Team
                        </h1>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            We are a passionate group of developers dedicated to building intuitive and impactful solutions.
                        </p>
                    </div>

                    {/* Team Grid */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
                        {teamMembers.map((member, index) => (
                            <ProfileCard key={index} member={member} />
                        ))}
                    </div>
                </main>
                <Footer /> {/* Footer at bottom */}
            </div>
        </>
    );
};

export default AboutUs;