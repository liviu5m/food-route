import React, { useState } from "react";
import BodyLayout from "../layouts/BodyLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "../../api/email";
import { useAppContext } from "../../../libs/AppContext";
import { toast } from "react-toastify";

const Contact = () => {
  const { user } = useAppContext();
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");

  const { mutate: sendEmailFeedback } = useMutation({
    mutationFn: () => sendEmail(user?.id || 0, subject, comment),
    onSuccess: () => {
      toast("Email sent successfully !");
      setSubject("");
      setComment("");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const sendEmailFunc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendEmailFeedback();
  };

  return (
    <BodyLayout>
      <div className='bg-[url("/imgs/breadcrumb1.jpg")] bg-cover bg-center w-full py-16 sm:py-20 px-4 text-black text-center text-3xl sm:text-4xl font-bold'>
        <h1>Contact Us</h1>
      </div>
      <div className="flex w-full items-center justify-center py-12 sm:py-16 lg:py-20">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between gap-8 sm:gap-10 px-4 sm:px-6 lg:flex-row lg:px-8">
          <div className="flex w-full flex-col gap-10 sm:gap-12 lg:gap-16 lg:w-1/2">
            <div className="flex items-center gap-6 sm:gap-8 lg:gap-10">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-3xl text-[#FFCC00]"
              />
              <div>
                <h3 className="text-lg font-semibold text-5">Phone: </h3>
                <h6 className="mt-1">+ 44 123 456 78 90</h6>
                <h6 className="mt-1">+ 844 123 444 77 88</h6>
              </div>
            </div>
            <div className="flex items-center gap-6 sm:gap-8 lg:gap-10">
              <FontAwesomeIcon
                icon={faAddressCard}
                className="text-3xl text-[#FFCC00]"
              />
              <div>
                <h3 className="text-lg font-semibold text-5">Address</h3>
                <h6 className="mt-1">Box 565, Pinney's Beach, Charlestown,</h6>
                <h6 className="mt-1">Nevis, West Indies, Caribbean</h6>
              </div>
            </div>
            <div className="flex items-center gap-6 sm:gap-8 lg:gap-10">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-3xl text-[#FFCC00]"
              />
              <div>
                <h3 className="text-lg font-semibold text-5">Email: </h3>
                <h6 className="mt-1">contact@example.com</h6>
                <h6 className="mt-1">info@example.com</h6>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
            <form
              className="w-full lg:w-2/3"
              onSubmit={(e) => sendEmailFunc(e)}
            >
              <input
                type="text"
                className="w-full rounded-lg border border-[#E1E1E1] px-5 py-3 outline-none"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <textarea
                placeholder="Comment"
                className="mt-5 h-36 sm:h-40 w-full resize-none rounded-lg border border-[#E1E1E1] px-5 py-3 outline-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button className="mt-5 min-h-11 rounded-lg bg-[#FFCC00] px-8 py-4 font-semibold cursor-pointer lg:hover:bg-[#f1c101] lg:hover:text-white">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </BodyLayout>
  );
};

export default Contact;
