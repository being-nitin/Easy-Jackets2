import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";
import logoMain from "../../pages/images/Header-logo.png";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <img
                src={logoMain}
                alt="Logo"
                style={{
                  width: "60px",
                  background: "white",
                }}
              />
            </Link>
            <div className="mx-auto">
              <ul className="navbar-nav mb-2 mb-lg-0">
                {/* <SearchInput /> */}
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className="nav-link text-dark"
                    style={{ fontWeight: "1500" }}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-dark"
                    to="/categories"
                    data-bs-toggle="dropdown"
                    style={{ fontWeight: "bold" }}
                  >
                    Categories
                  </Link>
                  <ul className="dropdown-menu bg-white">
                    <li>
                      <Link
                        className="dropdown-item text-dark"
                        to="/categories"
                        style={{ fontWeight: "bold" }}
                      >
                        All Categories
                      </Link>
                    </li>
                    {categories?.map((c) => (
                      <li key={c.slug}>
                        <Link
                          className="dropdown-item text-dark"
                          to={`/category/${c.slug}`}
                          style={{ fontWeight: "bold" }}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {!auth?.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        to="/register"
                        className="nav-link text-dark"
                        style={{ fontWeight: "bold" }}
                      >
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/login"
                        className="nav-link text-dark"
                        style={{ fontWeight: "bold" }}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/contact"
                        className="nav-link text-dark"
                        style={{ fontWeight: "bold" }}
                      >
                        Contact us
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/about"
                        className="nav-link text-dark"
                        style={{ fontWeight: "bold" }}
                      >
                        About us
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link dropdown-toggle text-dark"
                        to="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        style={{ border: "none", fontWeight: "bold" }}
                      >
                        {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu bg-white">
                        <li>
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                            className="dropdown-item text-dark"
                            style={{ fontWeight: "bold" }}
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="dropdown-item text-dark"
                            style={{ fontWeight: "bold" }}
                          >
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <Badge count={cart?.length} showZero>
                    <NavLink
                      to="/cart"
                      className="nav-link text-dark"
                      style={{ fontWeight: "bold" }}
                    >
                      Cart
                    </NavLink>
                  </Badge>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
