import { Link } from "react-router-dom";
import Galaxy from "../../../../libs/reactbits/Backgrounds/Galaxy/Galaxy";
import SplitText from "../../../../libs/reactbits/TextAnimations/SplitText/SplitText";

const Hero = () => {
  return (
    <div className="w-full relative h-[800px]">
      <div className="absolute top-0 left-0 w-full h-full z-30 ">
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={240}
        />
      </div>
      <div className="bg-[#1E1D23] h-full w-full flex items-center justify-center text-white">
        <div className="container relative pointer-events-none z-40">
          <div className="flex items-center justify-between py-10">
            <div className="flex items-start flex-col gap-10">
              <h1 className="text-[70px] font-bold">
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
              <h3 className="text-xl">
                Get your favorite meals delivered in under 30 minutes !
              </h3>
              <Link
                to="/products"
                className="uppercase px-8 py-3 rounded-lg bg-[#FFCC00] text-[#1E1D23] font-semibold hover:bg-[#1E1D23] hover:text-[#FFCC00]  border border-[#FFCC00] pointer-events-auto"
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
    </div>
  );
};

export default Hero;
