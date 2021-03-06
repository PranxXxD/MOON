/**
 *
 * Footer
 *
 */

import React from "react";

import { Link } from "react-router-dom";
import { Container } from "reactstrap";

const Footer = () => {
  const infoLinks = [
    { id: 0, name: "Contact Us", to: "/contact" },
    { id: 1, name: "Sell With Us", to: "/contact" },
  ];

  const footerLinks = infoLinks.map((item) => (
    <li key={item.id} className="footer-link">
      <Link key={item.id} to={item.to}>
        {item.name}
      </Link>
    </li>
  ));

  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <div className="footer-block">
            <div className="block-title">
              <h2>Customer Service</h2>
            </div>
            <div className="block-content">
              <ul>{footerLinks}</ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <span>© {new Date().getFullYear()} MOONLIGHT Store</span>
        </div>
        <ul className="footer-social-item">
          <li>
            <a href="www.facebook.com" rel="noreferrer noopener" target="_blank">
              <span className="facebook-icon" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/moonlightcraftstore/"
              rel="noreferrer noopener"
              target="_blank"
            >
              <span className="instagram-icon" />
            </a>
          </li>
          <li>
            <a href="www.pinterest.com" rel="noreferrer noopener" target="_blank">
              <span className="pinterest-icon" />
            </a>
          </li>
          <li>
            <a href="www.twitter.com" rel="noreferrer noopener" target="_blank">
              <span className="twitter-icon" />
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
};

export default Footer;
