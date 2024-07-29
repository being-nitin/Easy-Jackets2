import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  //initalp details
  useEffect(() => {
    getProduct();
  }, []);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      console.log(data, "product");
      setProduct(data?.product);
      console.log(data.product.category.code, "data product");
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container product-details py-5">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="product-img-container">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="product-img"
              alt={product.name}
            />
            <div className="product-img-overlay"></div>
          </div>
        </div>
        <div className="col-md-6 product-details-info text-start">
          <h1 className="text-center mb-4 display-4">Product Details</h1>
          <hr className="mb-4" />
          <h5 className="mb-3">
            <strong>Name:</strong> {product.name}
          </h5>
          <p className="mb-3">
            <strong>Description:</strong> {product.description}
          </p>
          <p className="mb-3">
            <strong>Price:</strong>{" "}
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p className="mb-4">
            <strong>Category:</strong> {product?.category?.name}
          </p>
          <button
            className="btn btn-primary btn-lg w-100"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
          <button
            className="btn btn-lg w-100"
            style={{
              background: "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)",
              color: "#ffffff",
              marginTop: "2%",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, #5a63e0 0%, #000bd9 100%)";
              e.target.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.15)";
            }}
            onMouseOut={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)";
              e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            <a
              href={`https://jacket-ecomm.vercel.app/?id=${product?.category?.code}&design=${product?.designId}`}
              target="_blank"
              style={{
                textDecoration: "none",
                color: "white",
                font: "bold",
                fontWeight: 400,
                background: "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)",
                border: "none",
              }}
            >
              ADD PATCHES
            </a>
          </button>
        </div>
      </div>

      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
