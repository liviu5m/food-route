import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faGithub,
  faInstagram,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const Footer = () => {
  return (
    <div className="w-full">
      <div className="bg-[#1E1D23] pt-40 pb-20">
        <div className="relative w-full">
          <h1 className="text-[#FFCC00] absolute left-1/2 top-1/2 -translate-1/2 text-4xl font-bold bg-[#1E1D23] px-5">
            FoodRoute
          </h1>
          <div className="h-px w-full bg-[#808080]" />
        </div>
        <div className="flex items-center justify-center">
          <div className="container mt-20">
            <div className="grid grid-cols-4">
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
                  <div className="w-8 h-8 rounded-full bg-[#DFDFDF] flex items-center justify-center hover:bg-[#FFCC00] cursor-pointer">
                    <FontAwesomeIcon icon={faFacebook as IconDefinition} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#DFDFDF] flex items-center justify-center hover:bg-[#FFCC00] cursor-pointer">
                    <FontAwesomeIcon icon={faInstagram as IconDefinition} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#DFDFDF] flex items-center justify-center hover:bg-[#FFCC00] cursor-pointer">
                    <FontAwesomeIcon icon={faTwitter as IconDefinition} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#DFDFDF] flex items-center justify-center hover:bg-[#FFCC00] cursor-pointer">
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
                <div className="relative w-full">
                  <input
                    type="text"
                    className="px-5 py-3 rounded-lg w-full text-white border border-[#DFDFDF] outline-none"
                    placeholder="Your Email..."
                  />
                  <button className="absolute right-0 top-0 px-5 py-3 rounded-r-lg bg-[#FFCC00] text-[#1E1D23] font-semibold hover:bg-[#1E1D23] hover:text-[#FFCC00] border border-[#FFCC00] cursor-pointer">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white bg-[#00A850] flex items-center justify-center py-5">
        <div className="container">
          <h1>Copyright © {new Date().getFullYear()} foodroute. All Rights Reserved.</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
