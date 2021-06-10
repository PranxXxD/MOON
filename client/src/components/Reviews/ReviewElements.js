import styled from "styled-components";

export const ReviewContainer = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #010606;

  @media screen and (max-width: 768px) {
    height: 1100px;
  }

  @media screen and (max-width: 480px) {
    height: 1300px;
  }
`;
export const ReviewWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 25px;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export const ReviewCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  max-height: 340px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.07);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const ReviewIcon = styled.img`
  height: 160px;
  width: 160px;
  margin-bottom: 10px;
`;

export const ReviewH1 = styled.h1`
  text-transform: uppercase;
  color: #fff !important;
  letter-spacing: 0.15em;
  font-size: 60px !important;
  // margin: 50px 0 10px 30px;
  max-height: 5em;
  font-weight: 500;
  font-family: Whitney, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica, Arial, sans-serif;
  margin-top: 5px;

  @media screen and (max-width: 768px) {
    font-size: 26px !important;
  }
`;

export const ReviewH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
`;

export const ReviewP = styled.p`
  font-size: 1rem;
  text-align: center;
`;
