import React from "react";
import Icon1 from "../../images/p-1.svg";
import Icon2 from "../../images/p-2.svg";
import Icon3 from "../../images/p-3.svg";
import {
  ReviewContainer,
  ReviewH1,
  ReviewWrapper,
  ReviewCard,
  ReviewIcon,
  ReviewH2,
  ReviewP,
} from "./ReviewElements";

const Services = () => {
  return (
    <ReviewContainer id="services">
      <ReviewH1>happy customers!!</ReviewH1>
      <ReviewWrapper>
        <ReviewCard>
          <ReviewIcon src={Icon1} />
          <ReviewH2>Gift Collection!</ReviewH2>
          <ReviewP>
            I've been shoppping from moonlightcraft from a while now, and their
            gift collection is amazing!
          </ReviewP>
        </ReviewCard>
        <ReviewCard>
          <ReviewIcon src={Icon2} />
          <ReviewH2>Low Prices!</ReviewH2>
          <ReviewP>
            I can vouch that these are best prices for all the gifts that they
            sell!
          </ReviewP>
        </ReviewCard>
        <ReviewCard>
          <ReviewIcon src={Icon3} />
          <ReviewH2>Fastest Delivery!</ReviewH2>
          <ReviewP>
            MoonlightCraftStore delivers the gifts all over india at affordable
            shipping charges.
          </ReviewP>
        </ReviewCard>
      </ReviewWrapper>
    </ReviewContainer>
  );
};

export default Services;
