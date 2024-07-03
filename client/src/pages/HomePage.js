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
// import Review1 from "../../src/pages/images/review2.png";
// import Review2 from "../../src/pages/images/review3.png";
// import Review3 from "../../src/pages/images/review4.png";
import Re1 from "../../src/pages/images/re1.png";
import Re2 from "../../src/pages/images/re2.png";
import Re3 from "../../src/pages/images/re3.png";
import SideImage from "../../src/pages/images/side-image.png";
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

  const HandleClick = async (code) => {
    try {
      const { data } = await axios.post("/api/v1/auth/encrypt");

      console.log(data, "encrypt data");
      setToken(data.token);
    } catch (error) {
      console.log(error);
    }
  };

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
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      console.log(data, "djbjdbfjbdjfbjdbj");
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
      console.log(data, "get all produts");
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
    <Layout title={"ALl Products - Best offers "}>
      <img
        src={UpperImage}
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      <div className="container-fluid d-flex justify-content-center align-items-center vh-60 home-page">
        <div className="row w-100 mx-0">
          <div className="col-md-3 filters"></div>
          <div className="col-md-9 ms-3">
            <h1 className="text-center">Top Products</h1>
            <div className="row justify-content-center">
              {products?.map((p) => (
                <div className="col-md-3 d-flex" key={p._id}>
                  <div className="card m-2 w-100">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <div className="card-name-price d-flex justify-content-between">
                        <h5 className="card-title">{p.name}</h5>
                        <h5 className="card-title card-price">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </h5>
                      </div>
                      <p className="card-text">
                        {p.description.substring(0, 60)}...
                      </p>
                      <div className="card-name-price d-flex justify-content-between">
                        <button
                          className="btn btn-info ms-1"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-dark ms-1"
                          onClick={() => HandleClick(p.category.code)}
                        >
                          <a
                            href={`https://jacket-ecomm.vercel.app/?id=${p.category.code}&token=${token}`}
                            className="text-light"
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
                  className="btn loadmore"
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

          <div className="parent-container">
            <div className="banner-container d-flex justify-content-center align-items-center">
              <div className="banner-content d-flex justify-content-center align-items-center">
                <img
                  src={ImageEasy}
                  className="banner-img"
                  alt="banner image"
                />
              </div>
            </div>

            <div className="banner-container d-flex justify-content-center align-items-center">
              <img src={Logo1} alt="Logo 1" />
              <img src={Logo2} alt="Logo 2" />
              <img src={Logo3} alt="Logo 3" />
              <img src={Logo4} alt="Logo 4" />
              <img src={Logo5} alt="Logo 5" />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginBottom: "20%",
            }}
          >
            <img
              src={SocialBanner}
              style={{
                width: "50%",
                height: "80%",
              }}
            />
            <div className="carousel-container">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="3000" // Interval in milliseconds (3000ms = 3 seconds)
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
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-bs-slide="prev"
                >
                  <span
                    // className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-bs-slide="next"
                >
                  <span
                    // className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>

          <div className="parent-container">
            <div className="banner-container d-flex justify-content-center align-items-center">
              <div>
                <h2
                  style={{
                    fontFamily: "serif",
                  }}
                >
                  Customize your design
                </h2>
                <br />
                <p
                  style={{
                    fontFamily: "serif",
                  }}
                >
                  Great design is born of two elements "Simplicity and clarity{" "}
                </p>
              </div>
              <div className="banner-content d-flex justify-content-center align-items-center">
                <img
                  src={SideImage}
                  style={{
                    height: "200%",
                  }}
                  className="banner-img"
                  alt="banner image"
                />
              </div>
            </div>

            {/* <div className="banner-container d-flex justify-content-center align-items-center">
              <img src={Logo1} alt="Logo 1" />
              <img src={Logo2} alt="Logo 2" />
              <img src={Logo3} alt="Logo 3" />
              <img src={Logo4} alt="Logo 4" />
              <img src={Logo5} alt="Logo 5" />
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
