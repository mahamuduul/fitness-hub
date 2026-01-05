import { FaHeart, FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="px-[100px]">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <FaHeart className="text-red-500" /> Health & Fitness Hub
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your complete platform for fitness, nutrition, and mental wellness. Join thousands achieving their health goals.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/gym" className="text-gray-400 hover:text-white transition-colors">Find Gyms</a></li>
              <li><a href="/medical" className="text-gray-400 hover:text-white transition-colors">Medical Consultancy</a></li>
              <li><a href="/nutrition" className="text-gray-400 hover:text-white transition-colors">Nutrition Guide</a></li>
              <li><a href="/diet" className="text-gray-400 hover:text-white transition-colors">Diet Calculator</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Connect With Us</h4>
            <div className="flex gap-3 mb-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white hover:text-gray-900 transition-all">
                <FaGithub className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white hover:text-gray-900 transition-all">
                <FaTwitter className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white hover:text-gray-900 transition-all">
                <FaLinkedin className="text-lg" />
              </a>
              <a href="/contact" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white hover:text-gray-900 transition-all">
                <FaEnvelope className="text-lg" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Health & Fitness Hub — Built with <FaHeart className="inline text-red-500 text-xs" /> for learning (demo project).
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
