import React, { useState } from "react";
import { useAppContext } from "../../../libs/AppContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Account = () => {
  const { user } = useAppContext();
  const [fullName, setFullName] = useState(user?.fullName);
  const [username, setUsername] = useState(user?.username);
  const [address, setAddress] = useState(user?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const updateAccountData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(
        import.meta.env.VITE_API_URL + "/api/users/" + user?.id,
        {
          fullName,
          username,
          address,
          phoneNumber,
          currentUsername: user?.username,
          type: "data",
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        toast("Account Data updated successfully");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data) toast(err.response.data);
      });
  };

  const updateAccountPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(
        import.meta.env.VITE_API_URL + "/api/users/" + user?.id,
        {
          currentPassword,
          newPassword,
          passwordConfirmation,
          type: "password",
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        toast("Account Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setPasswordConfirmation("");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data) toast(err.response.data);
      });
  };

  return (
    <div className="flex items-center justify-center">
      <Link to="/" className="absolute top-5 left-5">
        <h1 className="flex gap-3 items-center justify-center p-2">
          <FontAwesomeIcon icon={faArrowLeft} /> <span>Back</span>
        </h1>
      </Link>
      <div className="container mt-20">
        <h1 className="text-2xl">Account Details</h1>
        <div className="bg-[#393E46] w-full p-10 rounded-lg mt-10 flex gap-10">
          <div className="w-1/2">
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
                  className="w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
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
                  className="w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
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
                  className="w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
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
                  className="w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <button className="bg-[#00ADB5] text-[#eee] px-4 py-2 rounded-lg w-3/5 cursor-pointer hover:scale-105 outline-none">
                Save
              </button>
            </form>
          </div>
          <div className="w-1/2">
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
                    className="w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
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
                    className="w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
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
                    className="w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </div>
                <button className="bg-[#00ADB5] text-[#eee] px-4 py-2 rounded-lg w-3/5 cursor-pointer hover:scale-105 outline-none">
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
