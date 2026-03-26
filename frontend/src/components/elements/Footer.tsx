import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const Footer = () => {
  return (
    <div className="w-full">
      <div className="bg-[#1E1D23] pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20">
        <div className="relative w-full">
          <h1 className="absolute left-1/2 top-1/2 -translate-1/2 bg-[#1E1D23] px-4 sm:px-5 text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFCC00]">
            FoodRoute
          </h1>
          <div className="h-px w-full bg-[#808080]" />
        </div>
        <div className="flex items-center justify-center">
          <div className="mx-auto mt-14 sm:mt-20 w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="flex items-center justify-center flex-col gap-5">
                <h2 className="text-lg font-bold text-white">ADDRESS</h2>
                <p className="text-[#DFDFDF] text-center text-sm">
                  570 8th Ave, <br />
                  New York, NY 10018 <br />
                  United States
                </p>
              </div>
              <div className="flex items-center justify-center flex-col gap-5">
                <h2 className="text-lg font-bold text-white">BOOK A TABLE</h2>
                <p className="text-[#DFDFDF] text-center text-sm">
                  Dine in Style—Book Your Perfect Table
                </p>
                <h3 className="text-[#FFCC00] text-lg font-bold">
                  (850) 435-4155
                </h3>
              </div>
              <div className="flex items-center justify-center flex-col gap-5">
                <h2 className="text-lg font-bold text-white">Opening hours</h2>
                <p className="text-[#DFDFDF] text-center text-sm">
                  Monday – Friday: <span className="text-white">8am – 4pm</span>
                </p>
                <p className="text-[#DFDFDF] text-center text-sm">
                  Saturday: <span className="text-white">9am – 5pm</span>
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#DFDFDF] lg:hover:bg-[#FFCC00]">
                    <FontAwesomeIcon icon={faFacebook as IconDefinition} />
                  </div>
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#DFDFDF] lg:hover:bg-[#FFCC00]">
                    <FontAwesomeIcon icon={faInstagram as IconDefinition} />
                  </div>
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#DFDFDF] lg:hover:bg-[#FFCC00]">
                    <FontAwesomeIcon icon={faTwitter as IconDefinition} />
                  </div>
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#DFDFDF] lg:hover:bg-[#FFCC00]">
                    <FontAwesomeIcon icon={faTelegram as IconDefinition} />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col gap-5">
                <h2 className="text-lg font-bold text-white uppercase">
                  newsletter
                </h2>
                <p className="text-[#DFDFDF] text-center text-sm">
                  Subscribe to the weekly newsletter for all the latest updates
                </p>
                <div className="relative w-full sm:w-4/5 md:w-full">
                  <input
                    type="text"
                    className="px-5 py-3 rounded-lg w-full text-white border border-[#DFDFDF] outline-none"
                    placeholder="Your Email..."
                  />
                  <button className="absolute right-0 top-0 min-h-11 rounded-r-lg border border-[#FFCC00] bg-[#FFCC00] px-2 sm:px-5 py-3 font-semibold text-[#1E1D23] cursor-pointer lg:hover:bg-[#1E1D23] lg:hover:text-[#FFCC00]">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-[#00A850] py-5 text-white">
        <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center md:text-left">Copyright © {new Date().getFullYear()} foodroute. All Rights Reserved.</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
