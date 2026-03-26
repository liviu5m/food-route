import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios, { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type { LoginData } from "../../../libs/Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUserFunc, resendVerificationCodeFunc } from "../../api/user";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: resend } = useMutation({
    mutationKey: ["resendVerificationCode"],
    mutationFn: (email: string) => resendVerificationCodeFunc(email),
    onSuccess: (data2) => {
      console.log(data2);
      navigate("/auth/verify", {
        state: { verification: true, email: data.email },
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  const { mutate: loginUser } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: () => loginUserFunc(data),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries();
      navigate("/");
    },
    onError: (err: AxiosError) => {
      console.log(err);
      if (
        err?.response?.data ==
        "Account not verified, please verify your account"
      )
        resend(data.email);
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

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_API_URL + "/oauth2/authorization/google";
  };

  useEffect(() => {
    const errorType = searchParams.get("error");

    if (errorType) {
      const messages: Record<string, string> = {
        provider_mismatch:
          "This account uses a different login method (e.g., Credentials).",
        invalid_credentials: "Invalid email or password.",
        default: "An error occurred during authentication.",
      };

      setErrorMessage(messages[errorType] || messages.default);
      searchParams.delete("error");
      setSearchParams(searchParams, { replace: true });
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen w-full px-4 py-6 sm:px-6 sm:py-8 flex items-center justify-center bg-[#222831]">
      <Link to="/" className="absolute top-4 left-4 sm:top-5 sm:left-5">
        <h1 className="flex items-center justify-center gap-2 sm:gap-3 p-2">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back</span>
        </h1>
      </Link>
      <div className="w-full max-w-md">
        <h1 className="mb-8 sm:mb-10 text-center text-2xl sm:text-3xl font-bold">Log In</h1>
        {errorMessage && (
          <div className="text-red-700 p-3 rounded">
            {errorMessage}
          </div>
        )}
        <form
          className="flex flex-col gap-4 sm:gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            loginUser();
          }}
        >
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
          <button className="min-h-11 w-full rounded-lg bg-[#eee] px-8 py-3 text-[#00ADB5] font-semibold cursor-pointer lg:hover:text-[#eee] lg:hover:bg-[#00ADB5]">
            Log In
          </button>
        </form>
        <div className="relative my-7">
          <hr />
          <h2 className="px-3 bg-[#222831] absolute left-1/2 -translate-1/2 top-1/2 ">
            Or
          </h2>
        </div>
        <button
          onClick={() => handleGoogleLogin()}
          className="mt-5 flex min-h-11 w-full items-center justify-center gap-4 sm:gap-7 rounded-lg bg-[#00ADB5] px-8 py-3 text-[#eee] font-semibold cursor-pointer lg:hover:text-[#00ADB5] lg:hover:bg-[#eee]"
        >
          <img src="/imgs/google.png" className="w-6" alt="" />
          <h3>Google</h3>
        </button>
        <p className="text-center mt-5">
          Don't have an account ?{" "}
          <Link to="/auth/signup" className="text-[#00ADB5]">
            Sign Up
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
