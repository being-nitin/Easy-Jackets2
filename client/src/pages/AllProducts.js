import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
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

  useEffect(() => {
    // getAllCategory();
    getTotal();
    HandleClick();
  }, []);
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
              All Products
            </h1>
            <div className="row justify-content-center">
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
                            href={`https://jacket-ecomm.vercel.app/?id=${p.category.code}&token=${token}`}
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
      </div>
    </Layout>
  );
};

export default AllProducts;
