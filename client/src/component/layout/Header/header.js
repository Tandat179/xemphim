import React, { useEffect, useRef } from "react";
import { useContext } from "react";
// import "./header.css";
// import logo from "../../../assets/bag-heart.svg";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/auth/AuthContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import CartLogo from "../../../assets/cart3.svg";
import ProfileLogo from "../../../assets/person-circle.svg";
import DoorOpen from "../../../assets/box-arrow-right.svg";
import ListOrder from "../../../assets/list-ul.svg";
import Manage from "../../../assets/kanban.svg";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
// import logo from '../../assets/tmovie.png'
// import './header.scss'
import logo from "../../../assets/tmovie.png";
import "./header.scss";

export const Header = () => {
  const headerNav = [
    {
      display: "Home",
      path: "/",
    },
    {
      display: "Film",
      path: "/products",
    },
    {
      display: "Trend",
      path: "/product/recommendation/63dfbb5abc884effdcede5df",
    },
    // {
    //   display: "Cart",
    //   path: "/cart",
    // },
  ];

  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);

    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  const {
    authState: { isAuthenticated, user },
    logoutUserNow,
  } = useContext(AuthContext);

  const handleClick = async () => {
    await logoutUserNow();
  };

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">Tyloow</Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
          <li>
            <Nav style={{ marginLeft: "auto", marginRight: "40px" }}>
              {isAuthenticated ? (
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={user.name}
                  menuVariant="dark"
                >
                  {user.role === "admin" && (
                    <NavDropdown.Item to="/admin/dashboard" as={Link}>
                      <img src={Manage} alt="cart" className="filter-green" />{" "}
                      Manage
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Item to="/profile" as={Link}>
                    <img
                      src={ProfileLogo}
                      alt="cart"
                      className="filter-green"
                    />{" "}
                    Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item to="/orders" as={Link}>
                    <img src={ListOrder} alt="cart" className="filter-green" />{" "}
                    Orders
                  </NavDropdown.Item>

                  {/* <NavDropdown.Item to="/favorites" as={Link}>
                    <img src={ListOrder} alt="cart" className="filter-green" />{" "}
                    My Favorites
                  </NavDropdown.Item> */}

                  {user.role === "user" && (
                    <NavDropdown.Item to="/favorites" as={Link}>
                      <img src={Manage} alt="cart" className="filter-green" />{" "}
                      Favorite
                    </NavDropdown.Item>
                  )}

                  {user.role === "user" && (
                    <NavDropdown.Item to="/produser/create" as={Link}>
                      <img src={Manage} alt="cart" className="filter-green" />{" "}
                      Đối tác
                    </NavDropdown.Item>
                  )}

                  {user.role === "user" && (
                    <NavDropdown.Item to="/produsers" as={Link}>
                      <img src={Manage} alt="cart" className="filter-green" />{" "}
                      Film của tôi
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Item to="/cart" as={Link}>
                    <img src={CartLogo} alt="cart" className="filter-green" />{" "}
                    Cart
                  </NavDropdown.Item>
                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={handleClick}>
                    {" "}
                    <img
                      src={DoorOpen}
                      alt="cart"
                      className="filter-green"
                    />{" "}
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login">
                  <Button
                    className="small"
                    data-toggle="modal"
                    data-target="Lo"
                  >
                    Signin
                  </Button>
                </Link>
              )}
            </Nav>
          </li>

          {/* <Link to="/login" className="nav__link">
                Login
              </Link> */}
        </ul>
      </div>
    </div>
  );
};

export default Header;
