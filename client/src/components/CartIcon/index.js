/**
 *
 * CartIcon
 *
 */

import React from "react";
import { useSelector } from "react-redux";

import { BagIcon } from "../Icon";
import Button from "../Button";

const CartIcon = (props) => {
  const { className, onClick } = props;
  let { cart } = useSelector((state) => ({ ...state }));

  const Icon = (
    <span className="cart-icon">
      <BagIcon />
      {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
    </span>
  );

  const items = cart.length;

  return (
    <Button
      className={className}
      ariaLabel={
        items > 0 ? `your cart have ${items} items` : "your cart is empty"
      }
      icon={Icon}
      onClick={onClick}
    />
  );
};

export default CartIcon;
