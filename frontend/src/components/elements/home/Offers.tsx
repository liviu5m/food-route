import { Link } from "react-router-dom";

const Offers = () => {
  return (
    <div className="bg-[#F7F2E2] w-full flex items-center justify-center py-20">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="w-4/5 md:w-1/3 flex flex-col xl:flex-row items-center justify-between gap-5 bg-white p-10 rounded-2xl">
          <div className="flex flex-col justify-between">
            <h1 className="text-2xl font-bold">Any Day Offers</h1>
            <p className="uppercase text-sm">new phenomenon burger taste</p>
            <h4 className="text-[#00A850] font-bold text-xl">$12.90</h4>
          </div>
          <div>
            <img src="/imgs/h1_banner1-1.png" alt="" />
          </div>
        </div>
        <div className="w-4/5 md:w-1/3 flex flex-col xl:flex-row items-center justify-between gap-5 bg-[#00A850] text-white p-10 rounded-2xl">
          <div className="flex flex-col justify-between">
            <h1 className="text-2xl font-bold">Other flavors</h1>
            <p className="uppercase text-sm">Save room. we made salats</p>
            <h4 className="text-[#FFCC00] font-bold text-xl">$12.90</h4>
          </div>
          <div>
            <img src="/imgs/h1_banner2-2.png" alt="" />
          </div>
        </div>
        <div className="w-4/5 md:w-1/3 flex flex-col xl:flex-row items-center justify-between gap-5 bg-white p-10 rounded-2xl">
          <div className="flex flex-col justify-between">
            <h1 className="text-2xl font-bold">Find a Poco store near you</h1>
            <Link to="/contact" className="text-[#FFCC00] font-bold text-xl">
              Contact us
            </Link>
          </div>
          <div>
            <img src="/imgs/h1_banner3.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
