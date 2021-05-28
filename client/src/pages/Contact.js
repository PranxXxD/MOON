import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Row, Col } from "reactstrap";
import Button from "../components/Button";
import { createContact } from "../functions/contact";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table(name, email, phone, message);
    createContact({ name, email, phone, message })
      .then((res) => {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        toast.success(
          `${res.data.name} your message is received. we will contact you shortly.`
        );
      })
      .catch((err) => console.log("contact req error", err));
  };

  return (
    <div className="contact">
      <h2>Contact Information</h2>
      <hr />
      <form>
        <Row>
          <Col xs="6" md="3">
            <label>Name</label>
            <input
              type={"text"}
              name={"name"}
              placeholder={"Your Full Name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col xs="6" md="3">
            <label>Phone</label>
            <input
              type={"text"}
              name={"phone"}
              placeholder={"Your Phone Number"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Col>
          <Col xs="12" md="6">
            <label>Email</label>
            <input
              type={"text"}
              name={"email"}
              placeholder={"Your Email Address"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col xs="12" md="12" className="mt-5">
            <label>Message</label>
            <textarea
              type={"textarea"}
              name={"message"}
              rows="3"
              placeholder={"Please Describe Your Message"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Col>
        </Row>
        <hr />
        <div className="contact-actions">
          <Button
            variant="primary"
            type="submit"
            text="Submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default Contact;
