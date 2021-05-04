import React from "react";
import UserNav from "../../components/nav/UserNav"

const Wishlist = () => (
  <div className="container-fluid">
    <div className="row" style={{height:"403px"}}>
        <div className="col-md-2"><UserNav /></div>
      <div className="col" style={{fontSize:"25px"}}>user wishlist page page</div>
    </div>
  </div>
);

export default Wishlist;