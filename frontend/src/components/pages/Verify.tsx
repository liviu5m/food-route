import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Verify = () => {
  const [code, setCode] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const verify = () => {
    axios
      .post("http://localhost:8080/auth/verify", {
        verificationCode: code,
        email: searchParams.get("email"),
      })
      .then((res) => {
        console.log(res.data);
        navigate("/auth/login");
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data);
      });
  };

  const resendVerificationCode = () => {
    axios
      .post(
        "http://localhost:8080/auth/resend?email=" + searchParams.get("email")
      )
      .then((res) => {
        console.log(res.data);
        toast("Code has been resented");
      })
      .catch((err) => {
        console.log(err);
        toast("Something went wrong.");
      });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl">Verify Your Account</h1>
        <p>
          On your email you received a code, please enter it here to enable your
          account
        </p>
        <p>
          Code will expire in 5 minutes{" "}
          <span
            className="text-[#00ADB5] cursor-pointer"
            onClick={() => resendVerificationCode()}
          >
            Resend verification code
          </span>
        </p>

        <input
          type="number"
          placeholder="eg. 123456"
          className="mt-5 px-5 py-3 rounded-lg text-[#00ADB5] bg-[#393E46] outline-none"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          className="px-10 py-3 rounded-lg cursor-pointer bg-[#00ADB5] text-[#393E46] font-semibold"
          onClick={() => verify()}
        >
          Verify
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Verify;
