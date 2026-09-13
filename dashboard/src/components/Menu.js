import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import api, { SIGNUP_URL } from "../api";
import GeneralContext from "./GeneralContext";

const MENU_ITEMS = [
  { label: "Dashboard", path: "/" },
  { label: "Orders", path: "/orders" },
  { label: "Holdings", path: "/holdings" },
  { label: "Positions", path: "/positions" },
  { label: "Funds", path: "/funds" },
  { label: "Apps", path: "/apps" },
];

const Menu = () => {
  const { user } = useContext(GeneralContext);
  const { pathname } = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    if (!isProfileDropdownOpen) return;

    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileDropdownOpen]);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } finally {
      window.location.href = SIGNUP_URL;
    }
  };

  const username = user ? user.username : "";
  const initials = username.slice(-2) || "ZU";

  return (
    <div className="menu-container">
      <img src="/logo.png" alt="Zerodha" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          {MENU_ITEMS.map((item) => (
            <li key={item.path}>
              <Link style={{ textDecoration: "none" }} to={item.path}>
                <p className={pathname === item.path ? "menu selected" : "menu"}>
                  {item.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <div className="profile-wrapper" ref={profileRef}>
          <div
            className="profile"
            onClick={() => setIsProfileDropdownOpen((open) => !open)}
          >
            <div className="avatar">{initials}</div>
            <p className="username">{username}</p>
          </div>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <p className="dropdown-user">{username}</p>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
