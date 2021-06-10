import React from "react";
import CarouselContainer from "../components/Carousel/CarouselContainer";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import Reviews from "../components/Reviews";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <CarouselContainer />
      </div>

      <NewArrivals />

      <BestSellers />
      <br />
      {/* 
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Category
      </h4>
      <CategoryList /> */}

      <Reviews />
    </>
  );
};

export default Home;
