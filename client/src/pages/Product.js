import React, { useState, useEffect } from "react";
import { getProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct"

const Product = ({ match }) => {
  const [product, setProduct] = useState({});

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => setProduct(res.data));
  };

  return <>
  <div className="container-fluid">
  <div className="row">
      <SingleProduct product={product} />
  </div>

  <div className="row">
      <div>Related products</div>
  </div>
  </div>


  </>;
};

export default Product;
