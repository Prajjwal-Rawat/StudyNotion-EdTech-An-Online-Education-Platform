import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Logo from "../../assets/Logos/Logo.png"; // Adjust path as needed

const Footer = () => {
  return (
    <div className="bg-richblack-700 text-gray-300 py-16">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 pb-8">
        {/* Logo and Company Info */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <Link to="/">
          <img src={Logo} alt="Logo" className="h-12 cursor-pointer mx-auto md:mx-0" />
          </Link>
          <p className="mt-4 text-sm">
            &copy; {new Date().getFullYear()} StudyNotion. All Rights Reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:flex-row gap-6 text-center md:text-left">
          <div>
            <h2 className="text-white font-semibold mb-2">Company</h2>
            <ul className="space-y-1">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link to="/affiliates" className="hover:text-white">Affiliates</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-white font-semibold mb-2">Resources</h2>
            <ul className="space-y-1">
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/videos" className="hover:text-white">Videos</Link></li>
              <li><Link to="/docs" className="hover:text-white">Docs</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-white font-semibold mb-2">Support</h2>
            <ul className="space-y-1">
              <li><Link to="/contact" className="hover:text-white">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-700 pt-4 px-6">
        {/* Social Icons */}
        <div className="flex gap-4 text-2xl animate-bounce">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaFacebook />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaLinkedin />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaYoutube />
          </a>
        </div>

        {/* Legal Links */}
        <div className="text-sm mt-4 md:mt-0">
          <Link to="/privacy-policy" className="hover:text-white mx-2">Privacy Policy</Link> |
          <Link to="/cookie-policy" className="hover:text-white mx-2">Cookie Policy</Link> |
          <Link to="/terms" className="hover:text-white mx-2">Terms</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
