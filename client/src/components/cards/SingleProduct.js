import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from "../../images/laptop.jpg";
// import ProductListItems from "./ProductListItems";
import { Row, Col } from "reactstrap";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Button";
import { BagIcon } from "../Icon";
import Input from "../Input";
import { Carousel } from "react-bootstrap";

const { TabPane } = Tabs;

//this is children component of product page
const SingleProduct = ({ product, onStarClick, star }) => {
  const {
    title,
    images,
    description,
    _id,
    quantity,
    price,
    category,
  } = product;
  const [tooltip, setTooltip] = useState("Click to add");

  //redux
  const { user, cart } = useSelector((state) => ({ ...state }));
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

  return (
    <div className="product-shop">
      {/* {isLoading ? (
          <LoadingIndicator />
        ) : Object.keys(product).length > 0 ? ( */}
      <>
        <Row className="flex-row">
          <Col xs="12" md="5" lg="5" className="mb-3 px-3 px-md-2">
            <div className="position-relative">
              {images && images.length ? (
                <Carousel fade={true} pause={false}>
                  {images &&
                    images.map((i) => (
                      <Carousel.Item interval={2000}>
                        <img
                          className="item-image"
                          src={i.url}
                          key={i.public_id}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              ) : (
                <Card
                  cover={<img src={laptop} className="item-image" />}
                ></Card>
              )}
              {quantity == 0 ? (
                <p className="stock out-of-stock">Out of stock</p>
              ) : (
                <p className="stock in-stock">In stock</p>
              )}
            </div>
          </Col>
          <Col xs="12" md="7" lg="7" className="mb-3 px-3 px-md-2">
            <div className="product-container">
              <div className="item-box">
                <div className="">
                  {product && product.ratings && product.ratings.length > 0 ? (
                    showAverage(product)
                  ) : (
                    <div className="text-center pt-1 pb-3"> No Ratings yet</div>
                  )}
                </div>
                <div className="item-details">
                  <h1 className="item-name one-line-ellipsis">{title}</h1>
                  <p className="sku">{product.sku}</p>
                  <hr />
                  {category && (
                    <p className="by">
                      see more from{" "}
                      <Link
                        to={`/category/${category.slug}`}
                        className="default-link"
                      >
                        {category.name}
                      </Link>
                    </p>
                  )}
                  <p className="item-desc">{description}</p>
                  <p className="price">₹{price}</p>
                </div>
                <div className="item-customize">
                  <Input
                    type={"number"}
                    // error={shopFormErrors["quantity"]}
                    label={"Quantity"}
                    name={"quantity"}
                    decimals={false}
                    min={1}
                    // max={product.inventory}
                    placeholder={"Product Quantity"}
                    // disabled={
                    //   product.inventory <= 0 && !shopFormErrors["quantity"]
                    // }
                    // value={productShopData.quantity}
                    // onInputChange={(name, value) => {
                    //   productShopChange(name, value);
                    // }}
                  />
                </div>
                <div className="item-actions">
                  {/* {itemsInCart.includes(product._id) ? ( */}
                  <Button
                    variant="primary"
                    //   disabled={
                    //     product.inventory <= 0 &&
                    //     !shopFormErrors["quantity"]
                    //   }
                    text="Remove From Bag"
                    className="bag-btn"
                    icon={<BagIcon />}
                    //   onClick={() => handleRemoveFromCart(product)}
                  />
                  {/* ) : ( */}
                  <Button
                    variant="primary"
                    //   disabled={
                    //     product.quantity <= 0 && !shopFormErrors["quantity"]
                    //   }
                    text="Add To Bag"
                    className="bag-btn"
                    icon={<BagIcon />}
                    //   onClick={() => handleAddToCart(product)}
                  />
                  {/* )} */}
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {/* <ProductReviews
              reviewFormData={reviewFormData}
              reviewFormErrors={reviewFormErrors}
              reviews={reviews}
              reviewsSummary={reviewsSummary}
              reviewChange={reviewChange}
              addReview={addProductReview}
            /> */}
      </>
      {/* ) : (
          <NotFound message="no product found." />
        )} */}
    </div>
  );
};

export default SingleProduct;
