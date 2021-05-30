import React, { useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";
import Button from "../components/Button";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const Cart = ({ history }) => {
  const [shipping, setShipping] = useState(0);
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentVal, nextVal) => {
      return currentVal + nextVal.count * nextVal.price;
    }, 0);
  };

  const getWeight = () => {
    return cart.reduce((currentVal, nextVal) => {
      return currentVal + nextVal.count * nextVal.weight;
    }, 0);
  };

  const getShipping = (x) => {
    if (x() <= 500) {
      console.log("69", x());
      return 69;
    } else if (x() > 500 && x() <= 1000) {
      console.log("99", x());
      return 99;
    } else if (x() > 1000 && x() <= 1500) {
      console.log("149", x());
      return 149;
    } else if (x() > 1500 && x() <= 2000) {
      console.log("169", x());
      return 169;
    } else {
      console.log("199", x());
      return 199;
    }
  };

  //

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("Cart post response", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("save data error", err));
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const useStyles = makeStyles({
    table: {
      minWidth: 350,
    },
  });
  const classes = useStyles();

  const showCartItems = () => (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Price;</StyledTableCell>
            <StyledTableCell align="center">Color</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="center">Shipping</StyledTableCell>
            <StyledTableCell align="center">Remove</StyledTableCell>
          </TableRow>
        </TableHead>
        {cart.map((p) => (
          <ProductCardInCheckout key={p._id} p={p} />
        ))}
      </Table>
    </TableContainer>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8 d-inline-block">
          <h4 className="h_4">Cart / {cart.length}</h4>
          {!cart.length ? (
            <p className="h_4">
              No products in cart. <Link to="/shop">Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4 className="h_4">Order Summary</h4>
          <hr />
          <p className="h_4">Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ₹{c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          <p>Order Total : ₹{getTotal()}</p>
          <p>Shipping Charges: ₹{getShipping(getWeight)}</p>
          <hr />
          <h4>Total: ₹{getTotal() + getShipping(getWeight)}</h4>
          <hr />
          {user ? (
            <Button
              variant="primary"
              onClick={saveOrderToDb}
              className="btn"
              text="Proceed to Checkout"
              disabled={!cart.length}
            ></Button>
          ) : (
            <Button className="btn">
              <Link
                className="link"
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
