import React, { useState } from "react";
import { useAppContext } from "../../../libs/AppContext";
import axios, { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { updateUserAccountData } from "../../api/user";

const Account = () => {
  const { user } = useAppContext();
  const [fullName, setFullName] = useState(user?.fullName);
  const [username, setUsername] = useState(user?.username);
  const [address, setAddress] = useState(user?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { mutate: updateAccount } = useMutation({
    mutationKey: ["update-account-data"],
    mutationFn: (data: any) => updateUserAccountData(user?.id || -1, data),
    onSuccess: (data) => {
      console.log(data);
      toast("Account updated successfully");
    },
    onError: (err: AxiosError) => {
      console.log(err);
      if (err?.response?.data) toast(err?.response?.data as string);
    },
  });

  const updateAccountData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateAccount({
      fullName,
      username,
      address,
      phoneNumber,
      currentUsername: user?.username,
      type: "data",
    });
  };

  const updateAccountPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateAccount({
      currentPassword,
      newPassword,
      passwordConfirmation,
      type: "password",
    });
  };

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Link to="/" className="absolute top-4 left-4 sm:top-5 sm:left-5">
        <h1 className="flex items-center justify-center gap-2 sm:gap-3 p-2">
          <FontAwesomeIcon icon={faArrowLeft} /> <span>Back</span>
        </h1>
      </Link>
      <div className="mx-auto mt-20 w-full max-w-screen-xl">
        <h1 className="text-2xl sm:text-3xl">Account Details</h1>
        <div className="mt-8 sm:mt-10 flex flex-col lg:flex-row gap-8 lg:gap-10 rounded-lg bg-[#393E46] p-4 sm:p-6 lg:p-10 w-full">
          <div className="w-full lg:w-1/2">
            <h1 className="text-lg mb-7">Account Data</h1>
            <form
              className="flex gap-5 flex-col"
              onSubmit={(e) => updateAccountData(e)}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="w-full sm:w-4/5 lg:w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="w-full sm:w-4/5 lg:w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="w-full sm:w-4/5 lg:w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="w-full sm:w-4/5 lg:w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <button className="min-h-11 w-full sm:w-4/5 lg:w-3/5 rounded-lg bg-[#00ADB5] px-4 py-2 text-[#eee] cursor-pointer lg:hover:scale-105 outline-none">
                Save
              </button>
            </form>
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-lg">Password Management</h1>
            {user?.provider == "google" ? (
              <p className="text-[#00ADB5] mt-5">
                You're using Google Provider as a way of authenticating
              </p>
            ) : (
              <form
                className="flex gap-5 flex-col mt-5"
                onSubmit={(e) => updateAccountPassword(e)}
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    className="w-full sm:w-4/5 lg:w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="w-full sm:w-4/5 lg:w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="passwordConfirmation">Confirm Password</label>
                  <input
                    type="password"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    className="w-full sm:w-4/5 lg:w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </div>
                <button className="min-h-11 w-full sm:w-4/5 lg:w-3/5 rounded-lg bg-[#00ADB5] px-4 py-2 text-[#eee] cursor-pointer lg:hover:scale-105 outline-none">
                  Save
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Account;
