/**
 *
 * MiniBrand
 *
 */

import React from "react";


import { Link } from "react-router-dom";

const MiniBrand = (props) => {
  const { categories, toggleBrand } = props;

  const handleMenuItemClick = () => {
    toggleBrand();
  };

  return (
    <div className="mini-brand-list">
      <div className="d-flex align-items-center justify-content-between min-brand-title">
        <h4 className="mb-0">Shop By Brand</h4>
        <Link
          to={"/categories"}
          className="redirect-link"
          role="menuitem"
          onClick={handleMenuItemClick}
        >
          See all
        </Link>
      </div>
      <div className="mini-brand-block">
        {categories.map((c) => (
          <div key={c._id} className="brand-item">
            <Link
              to={`/category/${c.slug}`}
              className="brand-link"
              role="menuitem"
              onClick={handleMenuItemClick}
            >
              {c.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniBrand;
