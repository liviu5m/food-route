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
    <div className="h-screen w-screen flex items-center justify-center bg-[#222831]">
      <Link to="/" className="absolute top-5 left-5">
        <h1 className="flex gap-3 items-center justify-center p-2">
          <FontAwesomeIcon icon={faArrowLeft} /> <span>Back</span>
        </h1>
      </Link>
      <div className="w-[400px]">
        <h1 className="font-bold text-2xl text-center mb-10">Sign Up</h1>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            signupUser();
          }}
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="px-6 py-3 rounded-lg bg-[#00ADB5] outline-none text-[#eee] placeholder:text-gray-300"
            value={data.fullName}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="px-6 py-3 rounded-lg bg-[#00ADB5] outline-none text-[#eee] placeholder:text-gray-300"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-6 py-3 rounded-lg bg-[#00ADB5] outline-none text-[#eee] placeholder:text-gray-300"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="px-6 py-3 rounded-lg bg-[#00ADB5] outline-none text-[#eee] placeholder:text-gray-300"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            className="px-6 py-3 rounded-lg bg-[#00ADB5] outline-none text-[#eee] placeholder:text-gray-300"
            value={data.passwordConfirmation}
            onChange={(e) =>
              setData({ ...data, passwordConfirmation: e.target.value })
            }
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="px-6 py-3 rounded-lg bg-[#00ADB5] outline-none text-[#eee] placeholder:text-gray-300"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className="px-6 py-3 rounded-lg bg-[#00ADB5] outline-none text-[#eee] placeholder:text-gray-300"
            value={data.phoneNumber}
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          />
          <button className="px-8 py-3 bg-[#eee] text-[#00ADB5] cursor-pointer rounded-lg font-semibold hover:text-[#eee] hover:bg-[#00ADB5]">
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
