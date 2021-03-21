import React, { useEffect, useState } from "react";
import { getProductsByCount } from "../functions/product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProductsByCount(3)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {JSON.stringify(products)}
      <p>Home</p>
    </div>
  );
};

export default Home;
