import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-[#1E1D23] w-full flex items-center justify-center text-white">
      <div className="container">
        <div className="flex items-center justify-between py-10">
          <div className="flex items-start flex-col gap-10">
            <h1 className="text-[70px] font-bold">
              Craving Something{" "}
              <span className="text-[#FFCC00]">Delicious</span> ?
            </h1>
            <h3 className="text-xl">
              Get your favorite meals delivered in under 30 minutes !
            </h3>
            <Link
              to="/"
              className="uppercase px-8 py-3 rounded-lg bg-[#FFCC00] text-[#1E1D23] font-semibold hover:bg-[#1E1D23] hover:text-[#FFCC00]  border border-[#FFCC00]"
            >
              Order now
            </Link>
          </div>
          <div>
            <img src="/imgs/heroImg.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
