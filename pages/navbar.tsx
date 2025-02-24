import { useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (path:any) => {
    router.push(path);
    setIsOpen(false); // Menü kapalı hale gelir
  };
  return (
    <div>
      {/* Hamburger Menü Butonu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 bg-gray-800 text-white rounded-md focus:outline-none transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45' : ''}`}
      >
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>

      {/* Menü */}
      {isOpen && (
        <div className="absolute  left-0 mt-2 bg-white shadow-xl rounded-md w-48 p-4 z-10 transform transition-all duration-500 ease-in-out">
          <button
            onClick={() => handleNavigation("/Tour")}
            className="block w-full text-left p-3 hover:bg-gray-200 rounded-md transition-all duration-300"
          >
            Tour
          </button>
          <button
            onClick={() => handleNavigation("/Tickets")}
            className="block w-full text-left p-3 hover:bg-gray-200 rounded-md transition-all duration-300"
          >
            Tickets
          </button>
          <button
            onClick={() => handleNavigation("/Rent")}
            className="block w-full text-left p-3 hover:bg-gray-200 rounded-md transition-all duration-300"
          >
            Rent
          </button>
          <button
            onClick={() => handleNavigation("/Transfer")}
            className="block w-full text-left p-3 hover:bg-gray-200 rounded-md transition-all duration-300"
          >
            Transfer
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
