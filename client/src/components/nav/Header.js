import React, { useState } from "react";
import Button from "../Button";
import { Link, NavLink as ActiveLink } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CartIcon from "../CartIcon";
import { BarsIcon } from "../Icon";
import Search from "../forms/Search";
import Logo from "./Logo";

const Header = () => {
  const [current, setCurrent] = useState("home");

  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  const handleAddToCart = () => {
    // show cart items in side drawer
    dispatch({
      type: "SET_VISIBLE",
      payload: true,
    });
  };

  return (
    <header className="header fixed-mobile-header">
      <div className="header-info">
        <Container onClick={handleClick} selectedKeys={[current]}>
          <Row>
            <Col md="4" className="text-center d-none d-md-block">
              <i className="fa fa-truck" />
              <span>Free Shipping</span>
            </Col>
            <Col md="4" className="text-center d-none d-md-block">
              <i className="fa fa-credit-card" />
              <span>Payment Methods</span>
            </Col>
            <Col md="4" className="text-center d-none d-md-block">
              <i className="fa fa-phone" />
              <span>Call Us: 79777-89547</span>
            </Col>
            <Col xs="12" className="text-center d-block d-md-none">
              <i className="fa fa-phone" />
              <span> Need advice? Call us 951-999-9999</span>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="top-header">
          <Col
            xs={{ size: 12, order: 1 }}
            sm={{ size: 12, order: 1 }}
            md={{ size: 3, order: 1 }}
            lg={{ size: 3, order: 1 }}
          >
            <div className="brand">
              <Button
                className="d-none d-md-block"
                ariaLabel="open the menu"
                icon={<BarsIcon />}
              />
              <Link to="/">
                <Logo/>
                <h1 className="logoname">MN</h1>
              </Link>
          
            </div>
          </Col>
          <Col
            xs={{ size: 12, order: 2 }}
            sm={{ size: 12, order: 2 }}
            md={{ size: 4, order: 1 }}
            lg={{ size: 5, order: 3 }}
            className="desktop-hidden"
          >
            <div className="header-links">
              <Button ariaLabel="open the menu" icon={<BarsIcon />} />
              <CartIcon cartItems={cart.length} onClick={handleAddToCart} />
            </div>
          </Col>
          <Col
            xs={{ size: 12, order: 2 }}
            sm={{ size: 12, order: 2 }}
            md={{ size: 9, order: 1 }}
            lg={{ size: 9, order: 3 }}
          >
            <Navbar color="light" light expand="md" className="mt-1 mt-md-0">
              <CartIcon
                className="d-none d-md-block"
                cartItems={cart.length}
                onClick={handleAddToCart}
              />
              <span className="float-right p-1 ml-1 mr-1">
                <Search />
              </span>
              <Nav navbar>
                <NavItem>
                  <NavLink tag={ActiveLink} to="/shop" activeClassName="active">
                    Shop
                  </NavLink>
                </NavItem>
                {user ? (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>
                      {user ? user.email.split("@")[0] : "Welcome"}
                      <span className="fa fa-chevron-down dropdown-caret"></span>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem
                        onClick={() => history.push("/user/history")}
                      >
                        Dashboard
                      </DropdownItem>
                      <DropdownItem onClick={logout}>Sign Out</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>
                      Welcome!
                      <span className="fa fa-chevron-down dropdown-caret"></span>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={() => history.push("/login")}>
                        Login
                      </DropdownItem>
                      <DropdownItem onClick={() => history.push("/register")}>
                        Sign Up
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
              </Nav>
            </Navbar>
          </Col>
        </Row>
      </Container>

      {/* hidden cart drawer */}
      {/* <div
        className={isCartOpen ? "mini-cart-open" : "hidden-mini-cart"}
        aria-hidden={`${isCartOpen ? false : true}`}
      >
        <div className="mini-cart">
          <SideDrawer />
          Cart
        </div>
        <div
          className={
            isCartOpen ? "drawer-backdrop dark-overflow" : "drawer-backdrop"
          }
          onClick={toggleCart}
        />
      </div> */}

      {/* //hidden menu drawer
        <div
          className={isMenuOpen ? 'mini-menu-open' : 'hidden-mini-menu'}
          aria-hidden={`${isMenuOpen ? false : true}`}
  
            Menu
          </div>
          <div
            className={
              isMenuOpen ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'
            }
            onClick={toggleMenu}
          />
        </div>  */}
    </header>
  );
};

export default Header;
