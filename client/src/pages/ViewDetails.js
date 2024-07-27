import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
const ViewDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();

  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    try {
      // const { data } = await axios
      // .get
      // `/api/v1/product/get-product/${params.slug}` api for getting designs
      // ();
      // console.log(data, "design");
      // setProduct(data?.product);
      // console.log(data.product.category.code, "data product");
      // getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container product-details py-5">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="product-img-container">
            <img src={""} className="product-img" alt={""} />
            <div className="product-img-overlay"></div>
          </div>
        </div>
        <div className="col-md-6 product-details-info text-start">
          <h1 className="text-center mb-4 display-4">Design Details</h1>
          <hr className="mb-4" />
          <h5 className="mb-3">
            <strong>Name:</strong> {product.name}
          </h5>
          <p className="mb-3">
            <strong>Description:</strong>
            {""}
          </p>
          <p className="mb-3">
            <strong>Price:</strong>{" "}
            {/* {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })} */}
          </p>
          <p className="mb-4">
            <strong>Category:</strong>
            {""}
          </p>
          <button
            className="btn btn-primary btn-lg w-100"
            // onClick={() => {
            //   setCart([...cart, product]);
            //   localStorage.setItem("cart", JSON.stringify([...cart, product]));
            //   toast.success("Item Added to cart");
            // }}
          >
            ""
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ViewDetails;
