import React, { useState, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import Sidebar from './Components/SIDEBAR/sidebar';
import SidebarItems from './Components/SIDEBAR/sidebar-items';
import ToolTitle from './Components/SECTIONS/ToolTitle';
import HomeButtons from './Components/SECTIONS/HomeButtons';
import AboutSection from './Components/SECTIONS/AboutSection';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import MyImages from './Components/MyImages';
import RequireAuth from './Components/RequireAuth';

const Layout = ({ isAuthenticated, setIsAuthenticated }) => {
  const [toolConfig, setToolConfig] = useState({
    name: 'enhance',
    params: {},
  });

  const enhancedImageRef = useRef(null);
  window.enhancedImageRef = enhancedImageRef; // 🌍 Global ref for navigation alert

  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  const handleEnhancedImageChange = (image) => {
    enhancedImageRef.current = image;
  };

  const handleToolChange = (newTool) => {
    setActiveSection('tools');
    setToolConfig(newTool);
    enhancedImageRef.current = null;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR - always visible */}
      <Sidebar>
        <SidebarItems
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          toolConfig={toolConfig}
          handleToolChange={handleToolChange}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </Sidebar>

      {/* MAIN CONTENT */}
      <div className="flex flex-col flex-1 py-8 px-6 items-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="animate-fade-in w-full max-w-4xl text-center transition-opacity duration-700">
          {/* TOOL TITLE */}
          <ToolTitle activeSection={activeSection} toolConfig={toolConfig} />

          {/* CONDITIONAL RENDERING */}
          {location.pathname === '/' && activeSection === 'home' && (
            <div className="space-y-6 text-gray-700 max-w-3xl mx-auto">
              <p className="text-lg leading-relaxed">
                Unlock the true potential of your images with cutting-edge AI-powered tools. Whether you want to enhance details, remove backgrounds, compress files, colorize black & white photos, or remove watermarks — we have you covered.
              </p>
              <HomeButtons
                setActiveSection={setActiveSection}
                setToolConfig={setToolConfig}
              />
              <div className="text-sm italic text-gray-500">
                Fast, reliable, and easy to use — no downloads or installations required.
              </div>
            </div>
          )}

          {location.pathname === '/' && activeSection === 'about' && (
            <AboutSection />
          )}

          {location.pathname === '/' && activeSection === 'tools' && (
            <div className="mt-4 w-full">
              <Home
                tool={toolConfig}
                onEnhancedImageChange={handleEnhancedImageChange}
              />
            </div>
          )}

          <Routes>
              <Route path="/" element={null} />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/signup"
              element={<Signup setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/myimages"
              element={
                <RequireAuth>
                  <MyImages />
                </RequireAuth>
              }
            />
          </Routes>

          {/* FOOTER */}
          <div className="text-md mt-8 text-gray-500">
            Powered by @PixxySynchronous
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  return (
    <Router>
      <Layout
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </Router>
  );
};

export default App;
