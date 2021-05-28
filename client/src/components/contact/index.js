/*
 *
 * Contact
 *
 */

import React from "react";

import { Row, Col } from "reactstrap";

import Input from "../Input";
import Button from "../Button";

const contact = () => {
  return (
    <div className="contact">
      <h2>Contact Information</h2>
      <hr />
      <form >
        <Row>
          <Col xs="12" md="6">
            <Input
              type={"text"}
            //   error={formErrors["name"]}
              label={"Name"}
              name={"name"}
              placeholder={"You Full Name"}
            //   value={contactFormData.name}
            //   onInputChange={(name, value) => {
            //     contactFormChange(name, value);
            //   }}
            />
          </Col>
          <Col xs="12" md="6">
            <Input
              type={"text"}
            //   error={formErrors["email"]}
              label={"Email"}
              name={"email"}
              placeholder={"Your Email Address"}
            //   value={contactFormData.email}
            //   onInputChange={(name, value) => {
            //     contactFormChange(name, value);
            //   }}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              type={"textarea"}
            //   error={formErrors["message"]}
              label={"Message"}
              name={"message"}
              placeholder={"Please Describe Your Message"}
            //   value={contactFormData.message}
            //   onInputChange={(name, value) => {
            //     contactFormChange(name, value);
            //   }}
            />
          </Col>
        </Row>
        <hr />
        <div className="contact-actions">
          <Button type="submit" text="Submit" />
        </div>
      </form>
    </div>
  );
};

export default contact;
