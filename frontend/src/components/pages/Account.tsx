import React from "react";
import BodyLayout from "../layouts/bodyLayout";
import { useAppContext } from "../../../libs/AppContext";

const Account = () => {

  const {user} = useAppContext();

  return (
    <div className="flex items-center justify-center">
      <div className="container mt-20">
        <h1 className="text-2xl">Account Details</h1>
        <div className="bg-[#393E46] w-full p-10 rounded-lg mt-10 flex gap-10">
          <div className="w-1/2">
            <h1 className="text-lg mb-7">Account Data</h1>
            <form className="flex gap-5 flex-col">
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
                />
              </div>
            </form>
          </div>
          <div className="w-1/2">
            <h1 className="text-lg">Password Management</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
