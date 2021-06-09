import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("sold", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <div className="homee">
        <h1 className="my-2 pl-0 pb-3 jumbotron headerr">Best Sellers </h1>

        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
        <div className="row">
          <nav className="col-md-4 offset-md-4 text-center mt-4 pl-4">
            <Pagination page={page} count={5} onChange={handleChange} />
          </nav>
        </div>
      </div>
    </>
  );
};

export default BestSellers;
