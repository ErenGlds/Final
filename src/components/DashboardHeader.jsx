import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';

const DashboardHeader = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDropdownOpen]);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSettingsClick = () => {
    setIsDropdownOpen(false);
    navigate('/profile');
  };

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    if (onLogout) {
      onLogout();
    }
    navigate('/authentication');
  };

  const getUserInitials = (name) => {
    if (!name) return 'U';
    const parts = name?.trim()?.split(' ');
    if (parts?.length >= 2) {
      return `${parts?.[0]?.[0]}${parts?.[parts?.length - 1]?.[0]}`?.toUpperCase();
    }
    return name?.substring(0, 2)?.toUpperCase();
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-container">
        <div className="dashboard-header-logo">
          <div className="dashboard-header-logo-icon">
            <Icon name="CheckSquare" size={24} color="#FFFFFF" />
          </div>
          <span className="dashboard-header-logo-text">TaskFlow</span>
        </div>

        <div className="dashboard-header-actions">
          <div className="relative" ref={dropdownRef}>
            <div 
              className="dashboard-header-user"
              onClick={handleProfileClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e?.key === 'Enter' || e?.key === ' ') {
                  e?.preventDefault();
                  handleProfileClick();
                }
              }}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <div className="dashboard-header-user-avatar">
                {getUserInitials(user?.name || 'User')}
              </div>
              <div className="dashboard-header-user-info">
                <div className="dashboard-header-user-name">
                  {user?.name || 'User'}
                </div>
                <div className="dashboard-header-user-email">
                  {user?.email || 'user@taskflow.com'}
                </div>
              </div>
              <Icon 
                name={isDropdownOpen ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                color="var(--color-muted-foreground)" 
              />
            </div>

            {isDropdownOpen && (
              <div className="dashboard-header-dropdown">
                <div 
                  className="dashboard-header-dropdown-item"
                  onClick={handleSettingsClick}
                  role="menuitem"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e?.key === 'Enter' || e?.key === ' ') {
                      e?.preventDefault();
                      handleSettingsClick();
                    }
                  }}
                >
                  <Icon name="Settings" size={18} color="var(--color-popover-foreground)" />
                  <span>Settings</span>
                </div>
                <div className="dashboard-header-dropdown-divider" />
                <div 
                  className="dashboard-header-dropdown-item"
                  onClick={handleLogoutClick}
                  role="menuitem"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e?.key === 'Enter' || e?.key === ' ') {
                      e?.preventDefault();
                      handleLogoutClick();
                    }
                  }}
                >
                  <Icon name="LogOut" size={18} color="var(--color-error)" />
                  <span className="text-error">Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;