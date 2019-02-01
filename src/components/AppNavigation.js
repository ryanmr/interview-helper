/* eslint-disable */
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function AppNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          🚀
        </Link>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-drawer"
          href="#"
          onClick={toggleMenu}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div
        id="navbar-drawer"
        className={`navbar-menu ${menuOpen ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <Link to="/static/about" className="navbar-item">
                About
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons" />
          </div>
        </div>
      </div>
    </nav>
  );
}
