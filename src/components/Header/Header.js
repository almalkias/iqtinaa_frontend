import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import Search from "../Search/Search";
import global from "../../assets/images/global.svg";
import logo from "../../assets/images/logo.png";
import title from "../../assets/images/title.png";
import user from "../../assets/images/user.svg";
import shopping_cart from "../../assets/images/shopping-cart.svg";
import heart from "../../assets/images/heart.svg";
import Hamburger from "../../assets/images/Hamburger_icon.svg";
import settings from "../../assets/images/account-settings.svg";
import "./Header.css";
import { useLoading } from '../contexts/LoadingContext';


function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { cartItems, totalQuantity } = useContext(CartContext);
  const { logout, authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoading } = useLoading();

  const onClick = async () => {
    await logout();
    navigate(location.state?.from || "/");
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    if (isMenuVisible) {
      const originalStyle = window.getComputedStyle(
        document.body,
      ).overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = originalStyle); // Revert on cleanup
    }
  }, [isMenuVisible]);

  return (
    <div className="header">
      <div className="bottom-wraper">
        <div className="bottom-section">
          <div className="center">
            <Link to="/">
              <img src={logo} alt="" />
              <img src={title} alt="" />
            </Link>
            <img
              className="toggle-menu"
              src={Hamburger}
              alt=""
              onClick={toggleMenu}
            />
            {isMenuVisible && (
              <>
                <div className="page-overlay"></div>
                <div
                  className={`full-page-menu ${isMenuVisible ? "open" : ""
                    }`}
                >
                  <span
                    className="close-btn"
                    onClick={toggleMenu}
                  >
                    &times;
                  </span>
                  <Link to="/" className="logo-hover">
                    <img src={logo} alt="" />
                    <img src={title} alt="" />
                  </Link>
                  <ul className="nav-hover">
                    <li>
                      <Link to="/" onClick={toggleMenu}>
                        الرئيسية
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        onClick={toggleMenu}
                      >
                        من نحن
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/shopping"
                        onClick={toggleMenu}
                      >
                        المعرض
                      </Link>
                    </li>
                    <li>
                      <ScrollLink
                        to="social"
                        smooth={true}
                        duration={500}
                        onClick={toggleMenu}
                      >
                        تواصل معنا
                      </ScrollLink>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
          <div className="right">
            {authToken ? (
              <>
                <div className="dropdown circle-bg">
                  <img src={settings} alt="" onClick={onClick} />
                </div>
                <Link to="/account/account-settings" className="circle-bg">
                  <img src={user} alt="" />
                </Link>
                <Link to="/cart" className="circle-bg">
                  {cartItems && cartItems.length > 0 && (
                    <div className="quantity-circle">
                      {" "}
                      {totalQuantity()}{" "}
                    </div>
                  )}
                  <img src={shopping_cart} alt="" />
                </Link>
                <Link to="/account/my-favourite" className="circle-bg">
                  <img src={heart} alt="" />
                </Link>
              </>
            ) : (
              <div className="auth-actions">
                <Link to="/login" className="auth-btn auth-btn-secondary">
                  تسجيل الدخول
                </Link>
                <Link to="/register" className="auth-btn auth-btn-primary">
                  إنشاء حساب
                </Link>
              </div>
            )}
            <a href="!#" className="circle-bg global-two">
              <img src={global} alt="" />
            </a>
          </div>
          <div className="left">
            <a href="!#" className="circle-bg global-one">
              <img src={global} alt="" />
            </a>
            <Search />
          </div>
          <ul className="nav">
            <li>
              <ScrollLink
                to="social"
                smooth={true}
                duration={500}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                تواصل معنا
              </ScrollLink>
            </li>
            <li>
              <NavLink to="/shopping" activeclassname="active">المعرض</NavLink>
            </li>
            <li>
              <NavLink to="/about" activeclassname="active">
                من نحن
              </NavLink>
            </li>
            <li>
              <NavLink to="/" activeclassname="active">
                الرئيسية
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
