import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { signupUserFunc } from "../../api/user";
import { useMutation } from "@tanstack/react-query";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    address: "",
    phoneNumber: "",
  });

  const { mutate: signupUser } = useMutation({
    mutationKey: ["signupUser"],
    mutationFn: () => signupUserFunc(data),
    onSuccess: (data) => {
      console.log(data);
      navigate("/auth/verify", {
        state: { verification: true, email: data.email },
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
      if (Array.isArray(err?.response?.data)) {
        toast(
          <div>
            {err.response.data.map((msg: string, i: number) => (
              <div key={i}>{msg}</div>
            ))}
          </div>,
        );
      } else toast(err?.response?.data as string);
    },
  });

  return (
    <div className="min-h-screen w-full px-4 py-6 sm:px-6 sm:py-8 flex items-center justify-center bg-[#222831]">
      <Link to="/" className="absolute top-4 left-4 sm:top-5 sm:left-5">
        <h1 className="flex items-center justify-center gap-2 sm:gap-3 p-2">
          <FontAwesomeIcon icon={faArrowLeft} /> <span>Back</span>
        </h1>
      </Link>
      <div className="w-full max-w-md">
        <h1 className="mb-8 sm:mb-10 text-center text-2xl sm:text-3xl font-bold">Sign Up</h1>
        <form
          className="flex flex-col gap-4 sm:gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            signupUser();
          }}
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full rounded-lg bg-[#00ADB5] px-5 sm:px-6 py-3 outline-none text-[#eee] placeholder:text-gray-300"
            value={data.fullName}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full rounded-lg bg-[#00ADB5] px-5 sm:px-6 py-3 outline-none text-[#eee] placeholder:text-gray-300"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-lg bg-[#00ADB5] px-5 sm:px-6 py-3 outline-none text-[#eee] placeholder:text-gray-300"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-lg bg-[#00ADB5] px-5 sm:px-6 py-3 outline-none text-[#eee] placeholder:text-gray-300"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            className="w-full rounded-lg bg-[#00ADB5] px-5 sm:px-6 py-3 outline-none text-[#eee] placeholder:text-gray-300"
            value={data.passwordConfirmation}
            onChange={(e) =>
              setData({ ...data, passwordConfirmation: e.target.value })
            }
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full rounded-lg bg-[#00ADB5] px-5 sm:px-6 py-3 outline-none text-[#eee] placeholder:text-gray-300"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className="w-full rounded-lg bg-[#00ADB5] px-5 sm:px-6 py-3 outline-none text-[#eee] placeholder:text-gray-300"
            value={data.phoneNumber}
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          />
          <button className="min-h-11 w-full rounded-lg bg-[#eee] px-8 py-3 text-[#00ADB5] font-semibold cursor-pointer lg:hover:text-[#eee] lg:hover:bg-[#00ADB5]">
            Sign Up
          </button>
        </form>
        <div className="relative my-7">
          <hr />
          <h2 className="px-3 bg-[#222831] absolute left-1/2 -translate-1/2 top-1/2 ">
            Or
          </h2>
        </div>
        <p className="text-center mt-5">
          Already have an account ?{" "}
          <Link to="/auth/login" className="text-[#00ADB5]">
            Log In
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
