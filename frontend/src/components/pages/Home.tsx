import React, { useEffect } from "react";
import BodyLayout from "../layouts/bodyLayout";
import axios from "axios";
import Hero from "../elements/home/Hero";
import Categories from "../elements/home/Categories";

const Home = () => {
  return (
    <BodyLayout>
      <Hero />
      <Categories />
    </BodyLayout>
  );
};

export default Home;
