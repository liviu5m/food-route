import BodyLayout from "../layouts/BodyLayout";
import Hero from "../elements/home/Hero";
import Categories from "../elements/home/Categories";
import PopularDishes from "../elements/home/PopularDishes";
import Offers from "../elements/home/Offers";

const Home = () => {
  return (
    <BodyLayout>
      <Hero />
      <Categories />
      <Offers />
      <PopularDishes />
    </BodyLayout>
  );
};

export default Home;
