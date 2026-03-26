import { Link } from "react-router-dom";
import SplitText from "../../../../libs/reactbits/TextAnimations/SplitText/SplitText";

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 z-30"></div>
      <div className="flex w-full items-center justify-center bg-[#1E1D23] py-10 text-white sm:py-14 md:py-16 lg:py-20">
        <div className="pointer-events-none relative z-40 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 py-8 sm:gap-10 sm:py-10 md:gap-12 lg:flex-row lg:py-12">
            <div className="flex w-full flex-col items-center gap-8 sm:gap-10 lg:items-start">
              <h1 className="text-center text-3xl font-bold sm:text-4xl md:text-5xl lg:text-left lg:text-6xl xl:text-7xl">
                <SplitText
                  text="Craving Something"
                  className="text-center"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                />
                <br />
                <SplitText
                  text="Delicious ?"
                  className="text-center text-[#FFCC00]"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                />
              </h1>
              <h3 className="text-center text-sm sm:text-base md:text-lg lg:text-left lg:text-xl">
                Get your favorite meals delivered in under 30 minutes !
              </h3>
              <Link
                to="/products"
                className="pointer-events-auto min-h-11 min-w-[44px] rounded-lg border border-[#FFCC00] bg-[#FFCC00] px-6 py-3 text-center text-sm font-semibold uppercase text-[#1E1D23] transition-colors sm:text-base lg:hover:bg-[#1E1D23] lg:hover:text-[#FFCC00]"
              >
                Order now
              </Link>
            </div>
            <div className="relative flex w-full justify-center lg:w-auto">
              <img
                className="aspect-[4/3] w-full max-w-xs object-contain sm:max-w-sm md:max-w-md lg:max-w-[420px]"
                src="/imgs/heroImg.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
