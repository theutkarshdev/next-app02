"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.reponse.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  });

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      {verified && (
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-lg leading-6 font-bold text-gray-900 mt-4">Successfull</h3>
          <div className="px-7 pb-3">
            <p className="text-sm text-gray-500">Account has been Successful registered.</p>
          </div>
          <div className="items-center px-4 py-3 w-full">
            <Link
              href={"/login"}
              className="px-4 block py-2 bg-blue-500 text-white
                                      text-base font-medium rounded-md w-full
                                      shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              Login
            </Link>
          </div>
        </div>
      )}
      {error && (
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
            <svg
              className="h-12 w-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>

          <h3 className="text-lg leading-6 font-bold text-gray-900 mt-4">Email verification link has expired.</h3>
          <div className="px-7 pb-3">
            <p className="text-sm text-gray-500">Please log in and resend the link.</p>
          </div>
          <div className="items-center px-4 py-3 w-full">
            <Link
              href={"/login"}
              className="px-4 block py-2 bg-blue-500 text-white
                                    text-base font-medium rounded-md w-full
                                    shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
