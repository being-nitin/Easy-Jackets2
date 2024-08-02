import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
import "../styles/Homepage.css";
import { AiOutlineReload } from "react-icons/ai";
import bannerImage from "../pages/images/banner.png";
import UpperImage from "../../src/pages/images/upper-image.jpg";
import ImageEasy from "../../src/pages/images/image-easy.png";
import Logo1 from "../../src/pages/images/logo11.png";
import Logo2 from "../../src/pages/images/logo-12.png";
import Logo3 from "../../src/pages/images/logo13.png";
import Logo4 from "../../src/pages/images/logo14.png";
import Logo5 from "../../src/pages/images/logo15.png";
import SocialBanner from "../../src/pages/images/social_banner.png";
import PhotoGal1 from "../../src/pages/images/PhotoGal1.png";
import PhotoGal2 from "../../src/pages/images/PhotoGal2.png";
import Quality from "../../src/pages/images/quality.png";
import Cor1 from "../../src/pages/images/cor1.png";
import Cor2 from "../../src/pages/images/cor2.png";
import Cor3 from "../../src/pages/images/cor3.png";
import varsity from "../../src/pages/images/varsity-jacket .png";

// import Review1 from "../../src/pages/images/review2.png";
// import Review2 from "../../src/pages/images/review3.png";
// import Review3 from "../../src/pages/images/review4.png";
import Re1 from "../../src/pages/images/re1.png";
import Re2 from "../../src/pages/images/re2.png";
import Re3 from "../../src/pages/images/re3.png";
import SideImage from "../../src/pages/images/side-image.png";
import CartImage from "../../src/pages/images/cart-fill.svg";
import BombJack from "../../src/pages/images/bombjack.png";
import VarsJack from "../../src/pages/images/varsjack.png";
import NorthHood from "../../src/pages/images/northhood.png";
import ReadyToShip from "../../src/pages/images/readytoship.png";
const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const HandleClick = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/encrypt");
      console.log(data, "encrypt data");
      setToken(data.token);
    } catch (error) {
      console.log(error);
      // The encrypt Data...
    }
  };

  console.log(token);
  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    HandleClick();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      console.log(data, "product");
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      console.log(data, "get all products");
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Products - Best offers "}>
      <img
        src={UpperImage}
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
        style={{ maxWidth: "100%", objectFit: "cover" }}
      />
      <div
        className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 home-page"
        style={{ overflowX: "hidden" }}
      >
        <div className="row w-100 mx-0">
          <div className="col-md-3 filters d-none d-md-block">
            {/* <!-- Filters section can be added here --> */}
          </div>
          <div className="col-md-9 ms-3">
            <h1
              className="text-center mb-4"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                color: "#333",
              }}
            >
              Top Products
            </h1>
            <div style={{ display: "flex", gap: "90px", width: "100%" }}>
              {products?.map((p) => (
                <div key={p._id} className="col-md-4 col-lg-3 mb-4">
                  <div
                    className="card h-100 shadow-sm"
                    style={{ transition: "transform 0.3s ease" }}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="product-img card-img-top"
                      alt={p.name}
                      style={{ transition: "transform 0.3s ease" }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{p.name}</h5>
                      <h6 className="card-title card-price text-muted">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h6>
                      <p className="card-text">
                        {p.description.substring(0, 60)}...
                      </p>
                      <div className="mt-auto d-flex justify-content-between">
                        <button
                          className="btn btn-info me-2"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          Add To Cart
                        </button>
                        <button
                          className="btn btn-dark"
                          onClick={() => HandleClick(p.category.code)}
                        >
                          <a
                            href={`https://jacket-ecomm.vercel.app/?id=${p.category.code}&design=${p.designId}`}
                            className="text-light"
                            style={{ textDecoration: "none" }}
                          >
                            Customize
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3 text-center">
              {products && products.length < total && (
                <button
                  className="btn loadmore btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    "Loading ..."
                  ) : (
                    <>
                      Load more <AiOutlineReload />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mb-5">
          <img
            src={SocialBanner}
            className="img-fluid mb-3 mb-md-0"
            style={{ maxWidth: "50%" }}
          />
          <div className="carousel-container ms-md-4">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={Re1} className="d-block w-100" alt="Review 1" />
                </div>
                <div className="carousel-item">
                  <img src={Re2} className="d-block w-100" alt="Review 2" />
                </div>
                <div className="carousel-item">
                  <img src={Re3} className="d-block w-100" alt="Review 3" />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        <div className="parent-container">
          <div className="banner-container d-flex justify-content-center align-items-center">
            <div>
              <h1
                className="display-4 fw-bold"
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  color: "#333",
                }}
              >
                Customize your design
              </h1>
              <p className="lead">
                Great design is born of two elements: Simplicity and clarity
              </p>
            </div>
            <div className="banner-content d-flex justify-content-center align-items-center">
              <img
                src={SideImage}
                className="banner-img img-fluid"
                alt="banner image"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "cIenter",
          }}
        >
          <div className="image-container">
            <img src={varsity} alt="banner image" className="main-image" />
            <img
              src={CartImage}
              alt="small image"
              className="small-image"
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
            />
            {showInfo && (
              <div className="info-box">
                <p
                  style={{
                    fontWeight: "700",
                  }}
                >
                  BLACK VARSITY JACKET
                </p>
                <ul>
                  <p>Varsity Jackets |</p>
                  <p>Wool & Leather Varsity Jackets</p>
                  <p
                    style={{
                      marginBottom: 0,
                      fontWeight: "700",
                      fontSize: "larger",
                    }}
                  >
                    From $80.00
                  </p>
                </ul>
              </div>
            )}
          </div>

          <div
            style={{
              width: "60%",
            }}
          >
            <p>CLASSIC STYLE MEETS DURABILITY</p>
            <h1>
              THE WOOL AND
              <br />
              LEATHER VARSITY JACKET
            </h1>
            <p
              style={{
                width: "50%",
              }}
            >
              Embrace timeless elegance and rugged quality with our Wool and
              Leather varsity jacket. Crafted from premium materials, this
              jacket combines the warmth of wool with the durability of leather.
              Stay stylish in any season, whether you're heading to the game or
              out for a night on the town. A perfect blend of comfort, style,
              and versatility, this jacket is a must-have for fashion-forward
              individuals.
            </p>
          </div>
        </div>
        <div
          className="parent-container"
          style={{
            width: "100%",
          }}
        >
          <div
            className="banner-container d-flex justify-content-center align-items-center"
            style={{
              width: "100%",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                width: "150%",
                textAlign: "center",
              }}
            >
              <p>CUSTOMIZED VARSITY JACKETS</p>
              <h1>WEAR YOUR STYLE WITH PRIDE!</h1>
              <p
                style={{
                  width: "100%",
                }}
              >
                Design your own unique varsity jacket and stand out from the
                crowd. Our customization options allow you to showcase your
                personal style and make a statement. From choosing the colors
                and materials to adding patches, embroidery, and personalized
                lettering, we'll bring your vision to life. Whether you're
                representing your school, team, or personal brand, our custom
                varsity jackets are the perfect canvas for self-expression. Wear
                your style with pride and create a jacket that's truly
                one-of-a-kind. Start designing your custom varsity jacket today!
              </p>
              <span
                style={{
                  border: "0.5px solid black",
                  padding: "10px",
                  backgroundColor: "white",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.currentTarget.style.border = "none")}
                onMouseOut={(e) =>
                  (e.currentTarget.style.border = "0.5px solid black")
                }
                onClick={() => navigate(`/AllProducts`)}
              >
                Customize Your Jacket
              </span>
            </div>

            <img
              style={{
                cursor: "pointer",
                transition: "transform 0.3s ease",
                margin: "10px",
                border: "1px solid #ddd",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              src={ReadyToShip}
              className="banner-img img-fluid"
              alt="banner image"
              // onMouseOver={(e) =>
              //   (e.currentTarget.style.transform = "scale(1.05)")
              // }
              // onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        </div>
        <div
          className="parent-container"
          style={{
            width: "100%",
          }}
        >
          <div
            className="banner-container d-flex justify-content-center align-items-center"
            style={{
              width: "45%",
            }}
          >
            <img
              style={{
                cursor: "pointer",
                transition: "transform 0.3s ease",
                margin: "10px",
                border: "1px solid #ddd",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              src={PhotoGal1}
              className="banner-img img-fluid"
              alt="banner image"
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onClick={() => navigate(`/our-work`)}
            />
            <img
              style={{
                cursor: "pointer",
                transition: "transform 0.3s ease",
                margin: "10px",
                border: "1px solid #ddd",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              src={PhotoGal2}
              className="banner-img img-fluid"
              alt="banner image"
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        </div>
        <div
          className="parent-container"
          style={{
            width: "100%",
          }}
        >
          <div
            className="banner-container d-flex justify-content-center align-items-center"
            style={{
              width: "100%",
            }}
          >
            <img
              style={{
                cursor: "pointer",
                transition: "transform 0.3s ease",
                margin: "10px",
                border: "1px solid #ddd",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              src={Quality}
              className="banner-img img-fluid"
              alt="banner image"
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onClick={() => navigate(`/our-work`)}
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mb-5">
          <div className="carousel-container ms-md-4">
            <div
              id="carouselExampleIndicators"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="overlay-container">
                    <img
                      src={Cor1}
                      className="d-block w-100 fixed-size"
                      alt="Review 1"
                    />
                    <div className="overlay">
                      <h3>Review 1</h3>
                      <p>Some description for review 1</p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="overlay-container">
                    <img
                      src={Cor2}
                      className="d-block w-100 fixed-size"
                      alt="Review 2"
                    />
                    <div className="overlay">
                      <h3>Review 2</h3>
                      <p>Some description for review 2</p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="overlay-container">
                    <img
                      src={Cor3}
                      className="d-block w-100 fixed-size"
                      alt="Review 3"
                    />
                    <div className="overlay">
                      <h3>Review 3</h3>
                      <p>Some description for review 3</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className=""
          style={{
            width: "100%",
          }}
        >
          <div
            className="banner-container d-flex justify-content-center align-items-center"
            style={{
              width: "100%",
              marginTop: "10%",
            }}
          >
            <div className="">
              <p
                style={{
                  textAlign: "center",
                }}
              >
                RUNNING WORLD
              </p>
              <h1>EXPLORE THE RANGE</h1>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              height: "100%",
              Width: "100%",
            }}
          >
            <div className="image-container">
              <img src={BombJack} alt="Review 3" className="hover-image" />
              <div
                style={{
                  background: "white",
                  color: "black",
                }}
                className="hover-box"
                onClick={() => navigate(`/category/bomber-jackets`)}
              >
                EXPLORE COLLECTION
              </div>
            </div>
            <div className="image-container">
              <img src={VarsJack} alt="Review 3" className="hover-image" />
              <div
                style={{
                  background: "white",
                  color: "black",
                }}
                className="hover-box"
                onClick={() => navigate(`/category/varsity-jackets`)}
              >
                EXPLORE COLLECTION
              </div>
            </div>
            <div className="image-container">
              <img src={NorthHood} alt="Review 3" className="hover-image" />
              <div
                style={{
                  background: "white",
                  color: "black",
                }}
                className="hover-box"
                onClick={() => navigate(`/category/hoodies`)}
              >
                EXPLORE COLLECTION
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
