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
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/custom/getDesign/${params.id}`);
      setProduct(data.data);
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

  useEffect(() => {
    getProduct();
  }, []);
  console.log(product, "product is here ");
  return (
    <Layout>
      <div className="row container product-details py-5">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="product-img-container">
            <img src={product?.custom_image} className="product-img" alt={""} />
            <div className="product-img-overlay"></div>
          </div>
        </div>
        <div className="col-md-6 product-details-info text-start">
          <h1 className="text-center mb-4 display-4">Design Details</h1>
          <hr className="mb-4" />
          <h5 className="mb-3">
            <strong>Name:</strong> {product.globals?.catName}
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
            className="btn btn-primary btn-lg w-10"
            onClick={handleShowModal}
          >
            Share
          </button>
          <button
            style={{
              marginTop: "5px",
              backgroundColor: "grey",
              color: "white",
            }}
            className="btn btn-lg w-10"
          >
            Edit
          </button>
          {showModal && (
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Share Custom Design</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleCloseModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter your email"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
      </div>
    </Layout>
  );
};

export default ViewDetails;
