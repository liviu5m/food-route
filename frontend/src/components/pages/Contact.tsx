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
      <div className='bg-[url("/imgs/breadcrumb1.jpg")] bg-cover bg-center w-full py-20 text-black text-center text-4xl font-bold'>
        <h1>Contact Us</h1>
      </div>
      <div className="flex items-center justify-center py-20 w-full">
        <div className="container flex flex-col lg:flex-row justify-between gap-10 px-5 items-center">
          <div className="w-full lg:w-1/2 flex flex-col gap-16">
            <div className="flex items-center gap-10">
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
            <div className="flex items-center gap-10">
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
            <div className="flex items-center gap-10">
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
            <form className="w-full lg:w-2/3" onSubmit={(e) => sendEmailFunc(e)}>
              <input
                type="text"
                className="px-5 py-3 rounded-lg border border-[#E1E1E1] outline-none w-full"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <textarea
                placeholder="Comment"
                className="px-5 py-3 mt-5 h-40 rounded-lg border border-[#E1E1E1] outline-none w-full resize-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button className="px-8 py-4 rounded-lg bg-[#FFCC00] font-semibold cursor-pointer hover:bg-[#f1c101] hover:text-white mt-5">
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
