import { Phone } from "lucide-react";
import logo from "../../assets/affricanoImg/logo_afr-removebg-preview.png";
import logoLight from "../../assets/logo/logo.li.png";
import { useSelector } from 'react-redux';

export default function Footer() {
  const { mode } = useSelector((state) => state.mode);
  const { translation } = useSelector(state => state.lang);

  return (
    <footer className={`bg-[#F5F5F7] dark:bg-black text-gray-900 dark:text-gray-300`}>
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center  md:space-y-1">
          <div>
          <img 
              src={mode === "dark" ? logo : logoLight} 
              className="w-20 lg:w-60 block m-auto" 
              alt="Restaurant Logo" 
            />
          </div>
          {/* Restaurant Name */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{translation.heroAfricano}</h2>
           
            <p className="mt-2 text-gray-600 dark:text-gray-400">{translation.footerDesc}</p>
          </div>
          {/* Contact Info */}
          <div className="text-center flex flex-row lg:flex-col items-center justify-center gap-x-2">
            <h3 className="text-xl font-semibold">{translation.footerPhone}</h3>
            
            <p className="mt-flex items-center justify-center" dir="ltr">
              <a href="tel:+201020142743" className="text-blue-600 dark:text-blue-400"><Phone className="w-4 me-2 inline" />+201020142743</a>
            </p>
          </div>
          {/* Social Media */}
          <div className="text-center">
            <h3 className="text-xl font-semibold">{translation.FollowUs}</h3>
            <div className="mt-2 flex justify-center space-x-4" dir="ltr">
              <a 
                href="https://www.facebook.com/profile.php?id=100090617247433" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              <a 
                href="https://www.instagram.com/africanopizzapasta?igsh=MTB5MnFwcXJ1Z2Y0eA==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400"
              >
                <i className="fab fa-instagram text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="mt-4 border-t border-gray-300 dark:border-gray-700 pt-2 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">{translation.copyright}</p>
        </div>
      </div>
    </footer>
  );
}