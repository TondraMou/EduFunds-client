import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current text-primary"
            >
              <path d="M22.672 15.226l-2.432.811..." />
            </svg>
            <span className="text-2xl font-semibold text-white">Edufunds</span>
          </div>
          <p className="text-sm leading-relaxed">
            Empowering education through reliable technology since 2025.
          </p>
        </div>

        
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white transition">
    About Us
  </Link></li>
            <li><Link to="/all-Scholarship" className="hover:text-white transition">
    All Scholarship
  </Link></li>
            <li><Link to="/contact" className="hover:text-white transition">
    Contact
  </Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition">
    Privacy Policy
  </Link></li>
          </ul>
        </div>

        
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-white transition"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-white transition"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-white transition"><FaYoutube size={20} /></a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Edufunds. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;