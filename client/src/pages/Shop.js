import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState([]);
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState([]);
  

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch sub categories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount().then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="p-2"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  //5. load products based on star rating
  const handleStarClick = (num) => {
    // console.log(num);
    setStar(num);
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="p-3" style={{ width: 160 }}>
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
    </div>
  );

  return (
    <div className="contact">
      <div className="row">
        <div className="">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          <Menu defaultOpenKeys={[""]} style={{ width: 200 }} mode="vertical">
            <SubMenu
              key="0"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Filter By
                </span>
              }
            >
              {/* price */}
              <SubMenu
                key="1"
                style={{ width: 200 }}
                title={
                  <span className="h6">
                    <DollarOutlined /> Price
                  </span>
                }
              >
                <div>
                  <Slider
                    className="ml-4 mr-4"
                    tipFormatter={(v) => `₹${v}`}
                    range
                    value={price}
                    onChange={handleSlider}
                    max="999"
                    style={{ width: 200 }}
                  />
                </div>
              </SubMenu>

              {/* category */}
              <SubMenu
                key="2"
                style={{ width: 200 }}
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Categories
                  </span>
                }
              >
                <div style={{ marginTop: "5px" }}>{showCategories()}</div>
              </SubMenu>

              {/* stars */}
              <SubMenu
                key="3"
                style={{ width: 200 }}
                title={
                  <span className="h6">
                    <StarOutlined /> Rating
                  </span>
                }
              >
                <div>{showStars()}</div>
              </SubMenu>
            </SubMenu>
          </Menu>
          <hr />

          {products.length < 1 && <p>No products found</p>}
          {products.length}
          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
