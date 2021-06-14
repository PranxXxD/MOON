import React, { useState, useEffect } from "react";
import { getUser } from "../../functions/user";
import { useSelector } from "react-redux";
import { Button } from "./ButtonElement";
import {
  InfoContainer,
  InfoWrapper,
  InfoRow,
  Column1,
  Column2,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  BtnWrap,
  ImgWrap,
  Img,
} from "./InfoElements";
import img from "../../images/order.svg";

const OrderConfirm = ({ history }) => {
  const [name, setName] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUser(user.token).then((res) => {
      setName(res.data.fname);
    });
    console.log(name);
  });

  return (
    <>
      <InfoContainer lightBg={true}>
        <InfoWrapper>
          <InfoRow imgStart={false}>
            <Column1>
              <TextWrapper>
                <TopLine>ORDER CONFIRM</TopLine>
                <Heading lightText={false}>
                  Thank you for your Order, {name}.
                </Heading>
                <Subtitle darkText={true}>
                  Please Continue shopping, You can track your order in Orders.
                </Subtitle>
                <BtnWrap>
                  <Button
                    to="/"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                    primary={0}
                    dark={0}
                  >
                    Continue Shopping
                  </Button>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={img} alt="order" />
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default OrderConfirm;
