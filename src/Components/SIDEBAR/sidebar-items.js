import React from 'react';
import {
  Wand2,
  Scissors,
  FileCheck2,
  Palette,
  EyeOff,
  Home as HomeIcon,
  Info,
  LogIn,
  LogOut,
  UserPlus,
  Image as ImageIcon,
} from 'lucide-react';
import { SidebarItem } from './sidebar';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarItems = ({
  activeSection,
  setActiveSection,
  toolConfig,
  handleToolChange,
  isAuthenticated,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🛑 Prompt before ANY navigation away from current tool with unsaved image
  const confirmIfUnsaved = (callback) => {
    const hasUnsaved = window.enhancedImageRef?.current;
    if (hasUnsaved) {
      const confirmLeave = window.confirm(
        'Your enhanced image will be lost, unless you have downloaded it or saved it. Are you sure you want to switch?'
      );
      if (!confirmLeave) return;
      window.enhancedImageRef.current = null; // ✅ Clear ref after confirmation
    }
    callback();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <>
      {/* Home and About */}
      <SidebarItem
        icon={<HomeIcon size={20} />}
        text="Home"
        active={activeSection === 'home' && location.pathname === '/'}
        onClick={() =>
          confirmIfUnsaved(() => {
            setActiveSection('home');
            navigate('');
          })
        }
      />

      <SidebarItem
        icon={<Info size={20} />}
        text="About"
        active={activeSection === 'about' && location.pathname === '/'}
        onClick={() =>
          confirmIfUnsaved(() => {
            setActiveSection('about');
            navigate('');
          })
        }
      />

      {/* Tool Items */}
      <SidebarItem
        icon={<Wand2 size={18} />}
        text="Enhance"
        active={activeSection === 'tools' && toolConfig.name === 'enhance'}
        onClick={() =>
          confirmIfUnsaved(() => {
            setActiveSection('tools');
            handleToolChange({ name: 'enhance', params: {} });
            navigate('');
          })
        }
      />

      <SidebarItem
        icon={<Scissors size={18} />}
        text="Remove Background"
        active={activeSection === 'tools' && toolConfig.name === 'remove_bg'}
        onClick={() =>
          confirmIfUnsaved(() => {
            setActiveSection('tools');
            handleToolChange({ name: 'remove_bg', params: { bg: 'white' } });
            navigate('');
          })
        }
      />

      <SidebarItem
        icon={<FileCheck2 size={18} />}
        text="Compress Image"
        active={activeSection === 'tools' && toolConfig.name === 'compress'}
        onClick={() =>
          confirmIfUnsaved(() => {
            setActiveSection('tools');
            handleToolChange({ name: 'compress', params: { compression_level: 75 } });
            navigate('');
          })
        }
      />

      <SidebarItem
        icon={<Palette size={18} />}
        text="Colorize Image"
        active={activeSection === 'tools' && toolConfig.name === 'colorize'}
        onClick={() =>
          confirmIfUnsaved(() => {
            setActiveSection('tools');
            handleToolChange({ name: 'colorize', params: {} });
            navigate('');
          })
        }
      />

      <SidebarItem
        icon={<EyeOff size={18} />}
        text="Remove Watermark"
        active={activeSection === 'tools' && toolConfig.name === 'remove_watermark'}
        onClick={() =>
          confirmIfUnsaved(() => {
            setActiveSection('tools');
            handleToolChange({ name: 'remove_watermark', params: { auto: true } });
            navigate('');
          })
        }
      />

      {/* Auth Section */}
      <div className="mt-4 border-t pt-4">
        {!isAuthenticated ? (
          <>
            <SidebarItem
              icon={<LogIn size={18} />}
              text="Login"
              active={location.pathname === '/login'}
              onClick={() =>
                confirmIfUnsaved(() => {
                  navigate('/login');
                })
              }
            />
            <SidebarItem
              icon={<UserPlus size={18} />}
              text="Signup"
              active={location.pathname === '/signup'}
              onClick={() =>
                confirmIfUnsaved(() => {
                  navigate('/signup');
                })
              }
            />
          </>
        ) : (
          <>
            <SidebarItem
              icon={<ImageIcon size={18} />}
              text="My Images"
              active={location.pathname === '/myimages'}
              onClick={() =>
                confirmIfUnsaved(() => {
                  navigate('/myimages');
                })
              }
            />
            <SidebarItem
              icon={<LogOut size={18} />}
              text="Logout"
              active={false}
              onClick={handleLogout}
            />
          </>
        )}
      </div>
    </>
  );
};

export default SidebarItems;
