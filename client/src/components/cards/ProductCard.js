import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import {
  EyeOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch } from "react-redux";
import "./productcard.css";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  //redux
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    //create array
    let cart = [];
    if (typeof window !== "undefined") {
      //if cart is already in local storage
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //push new product to Cart
      cart.push({
        ...product,
        count: 1,
      });
      //remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      //save to local storage
      console.log("unique", unique);
      localStorage.setItem("cart", JSON.stringify(unique));

      //show tooltip
      setTooltip("Added");

      //add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };
  // destructure
  const { images, title, description, slug, price } = product;
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3"> No Ratings yet</div>
      )}
      <Card
        style={{ cursor: "pointer" }}
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={``}>
            <HeartOutlined className="text-danger" /> <br /> Add to Wishlist
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-warning" /> <br /> Add to
              Cart
            </a>
          </Tooltip>,
        ]}
      >
        <Link to={`product/${slug}`}>
          <div>
            <p className="price">₹{price}</p>
          </div>
          <Meta
            title={
              <span
                className="ant-card-meta-title"
                style={{ color: "#2962FF" }}
              >
                {title}
              </span>
            }
            description={`${description && description.substring(0, 40)}...`}
          />
        </Link>
      </Card>
    </>
  );
};

export default ProductCard;