import { useEffect, useState } from 'react';
import { GithubIcon, LinkedinIcon, MailIcon, CalendarIcon, ChevronRightIcon } from 'lucide-react';
import BookingModal from '../ui/BookingModal';
const Hero = ({
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return <section id="home" className="min-h-screen w-full pt-24 pb-20 px-6 md:px-12 lg:px-20 bg-black">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Profile image and location */}
          <div className="lg:sticky lg:top-32 flex flex-col items-center lg:items-start">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-800 mb-6">
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 rounded-full bg-[#FF5C00]"></div>
              <span className="text-sm">Asia/Pakistan</span>
            </div>

            <button 
              onClick={() => setIsBookingOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-colors"
            >
              <CalendarIcon size={18} />
              <span>Schedule a call</span>
              <ChevronRightIcon size={18} />
            </button>
          </div>
          
          <BookingModal 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
          />
          {/* Content */}
          <div className="lg:max-w-2xl">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-5xl md:text-7xl font-bold mb-2">
                Hassan Nazir
                <br />
              </h1>
              <p className="text-xl md:text-2xl text-blue-400 mb-6">
                Full Stack Developer
              </p>
              <div className="flex gap-3 mb-8">
                <a href="https://github.com/zimkk" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-gray-900 hover:bg-gray-800 transition-colors">
                  <GithubIcon size={20} />
                </a>
                <a href="https://linkedin.com/in/hassannazirrr" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-gray-900 hover:bg-gray-800 transition-colors">
                  <LinkedinIcon size={20} />
                </a>
                <a href="mailto:hassannazir955@gmail.com" className="p-2 rounded-md bg-gray-900 hover:bg-gray-800 transition-colors">
                  <MailIcon size={20} />
                </a>
              </div>
              <div className={`max-w-2xl transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Experienced Software Developer adept in bringing forth
                  expertise in design, installation, testing and maintenance of
                  software systems. Equipped with a diverse and promising
                  skill-set. Proficient in various platforms, languages, and
                  embedded systems. Experienced with the latest cutting edge
                  development tools and procedures. Able to effectively self-
                  manage during independent projects, as well as collaborate as
                  part of a productive team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;