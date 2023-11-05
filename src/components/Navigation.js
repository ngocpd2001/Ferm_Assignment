import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Icon } from "react-materialize";
import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase.configs";
import { useNavigate } from "react-router-dom";
function Navigation({ loading, setLoading }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth);
    setUser(null);
    navigate("/dashboard");
    localStorage.removeItem("userLogin");
    setLoading(!loading);
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userLogin")));

    // eslint-disable-next-line
  }, [loading]);
  return (
    <Navbar
      className="menu"
      alignLinks="right"
      brand={<span className="brand-logo">Một mình em Cinema</span>}
      id="mobile-nav"
      menuIcon={<Icon>Menu</Icon>}
    >
      <ul>
        <li>
          <Link to="/">
            <Icon left>home</Icon>Home
          </Link>
        </li>

        <li>
          <Link to="/news">
            <Icon left>newspaper</Icon>News
          </Link>
        </li>

        <li>
          <Link to="/contact">
            <Icon left>contacts</Icon>Contact
          </Link>
        </li>
        {user && (
          <li>
            <Link to="/addFilm">
              <Icon left>playlist_add</Icon>Add Film
            </Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/dashboard">
              <Icon left>dashboard</Icon>Dashboard
            </Link>
          </li>
        )}
        {user ? (
          <>
            <li>
              <Link to="/">
                <Icon left>account_circle</Icon>
                {user.email}
              </Link>
            </li>
            <li>
              <button
                className="btn btn-outline-dark w-100"
                onClick={() => handleSignOut()}
                style={{ width: "10%", background: "#333" }}
              >
                Log out
              </button>
            </li>
          </>
        ) : (
          <li>
            <li>
              <Link to="/signIn">
                <Icon left>contacts</Icon>Log In
              </Link>
            </li>
          </li>
        )}
      </ul>
      {/* <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/features">Features</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pricing">Pricing</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/news">News</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
        </ul>
      </div> */}
    </Navbar>
  );
}

export default Navigation;
