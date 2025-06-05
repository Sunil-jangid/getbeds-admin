"use client";

import Image from "next/image";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white w-full border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600">
        
        {/* App Download Section */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold text-black mb-4">Download the app below</h2>
          <div className="flex gap-4 mb-4">
            <Image src="/apply.png" alt="App Store" width={140} height={40} />
            <Image src="/android.png" alt="Google Play" width={140} height={40} />
          </div>
          <p className="text-gray-500 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
          </p>
          <p className="mt-2 text-gray-400 text-xs">
            El funcionamiento de la plataforma es muy sencillo. Se debe completar...
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-semibold text-black mb-3">Learn More</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Compliance Policy</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-sm font-semibold text-black mb-3">Need any assistance? Talk to us :</h3>
          <div className="text-sm mb-2">
            <p className="font-semibold">Business Manager</p>
            <p>John Doe</p>
            <p>support@gmail.com</p>
            <p>+81-567985479</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">Zonal Manager</p>
            <p>John Doe</p>
            <p>xyz@gmail.com</p>
            <p>+90-567997547</p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t text-gray-500 py-4 px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 text-white font-bold px-2 py-1 rounded">G</div>
          <span className="text-sm">GetBeds</span>
        </div>
        <p className="text-xs">© 2024 getBeds. All Rights Reserved</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <FaFacebookF className="cursor-pointer" />
          <FaLinkedinIn className="cursor-pointer" />
          <FaTwitter className="cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
