import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { resendVerificationCodeFunc, verifyUserFunc } from "../../api/user";
import { useMutation } from "@tanstack/react-query";

const Verify = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!location.state?.verification) {
      navigate("/", { replace: true });
    } else setEmail(location.state.email);
  }, [location, navigate]);

  const { mutate: verifyUser } = useMutation({
    mutationKey: ["verifyUser"],
    mutationFn: () => verifyUserFunc(code, email),
    onSuccess: (data) => {
      console.log(data);
      navigate("/auth/login");
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

  const { mutate: resend } = useMutation({
    mutationKey: ["resendVerificationCode"],
    mutationFn: () => resendVerificationCodeFunc(email),
    onSuccess: (data) => {
      console.log(data);
      toast("Verification code has been resent. Please check your email.");
    },
    onError: (err: AxiosError) => {
      console.log(err);
      toast("Failed to resend verification code. Please try again later.");
    },
  });

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
            onClick={() => resend()}
          >
            Resend verification code
          </span>
        </p>

        <div className="flex items-center justify-center my-3">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(e: string) => setCode(e)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="w-10 h-10 text-xl" />
              <InputOTPSlot index={1} className="w-10 h-10 text-xl" />
              <InputOTPSlot index={2} className="w-10 h-10 text-xl" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} className="w-10 h-10 text-xl" />
              <InputOTPSlot index={4} className="w-10 h-10 text-xl" />
              <InputOTPSlot index={5} className="w-10 h-10 text-xl" />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <button
          className="px-10 py-3 rounded-lg cursor-pointer bg-[#00ADB5] text-[#393E46] font-semibold"
          onClick={() => verifyUser()}
        >
          Verify
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Verify;
