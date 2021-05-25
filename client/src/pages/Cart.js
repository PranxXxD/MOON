import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";
import Button from "../components/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const Cart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentVal, nextVal) => {
      return currentVal + nextVal.count * nextVal.price;
    }, 0);
  };

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
          <h6>
            Total: <strong>₹{getTotal()}</strong>
          </h6>
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
