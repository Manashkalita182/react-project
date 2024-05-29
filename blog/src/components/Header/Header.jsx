import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaUserPlus, FaList, FaPlus } from 'react-icons/fa';
import { Logo, LogoutBtn } from '../index'; // Adjust the path according to your project structure

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: "/", icon: <FaHome />, active: true },
    { name: "Login", slug: "/login", icon: <FaSignInAlt />, active: !authStatus },
    { name: "Signup", slug: "/signup", icon: <FaUserPlus />, active: !authStatus },
    { name: "All Posts", slug: "/all-posts", icon: <FaList />, active: authStatus },
    { name: "Add Post", slug: "/add-post", icon: <FaPlus />, active: authStatus },
  ];

  return (
    <header className="py-1 shadow-lg bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {navItems.map((item) =>
                  item.active ? (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.slug)}
                      className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </button>
                  ) : null
                )}
                {authStatus && (
                  <LogoutBtn />
                )}
              </div>
            </div>
          </div>
          <div className="sm:hidden">
            <button type="button" className="text-gray-300 hover:text-white focus:outline-none focus:text-gray">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
