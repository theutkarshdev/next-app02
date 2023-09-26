"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";

export default function ResetPage() {
  const initialValues = {
    password: "",
    password2: "",
    token: "",
  };

  const [email, setEmail] = React.useState("");
  const [user, setUser] = React.useState(initialValues);

  const [loading, setLoading] = React.useState(false);
  const [verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState(false);

  const emailHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/sendresetemail", { email });
      toast.success("Email sent success");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const passwordHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", { user });
      setVerified(true);
      toast.success("Reset success");
    } catch (error: any) {
      toast.error(error.response.data.error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setUser((prevUser) => ({ ...prevUser, token: urlToken }));
  }, [user]); // Add user to the dependency array
  
  return (
    <section className="h-screen">
      <Toaster />
      {user.token ? (
        <div className="h-full container md:px-20">
          <div className="g-6 flex h-full flex-wrap items-center justify-center">
            {!error ? (
              <div className="mb-12 w-full mx-2 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 bg-white p-5 rounded-xl shadow-lg">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold">Hey👋, Enter password</h1>
                  <p className="text-sm font-semibold opacity-80">Kindly reset to continue</p>
                </div>
                <form>
                  <div className="relative mb-6">
                    <input
                      type="password"
                      value={user.password}
                      onChange={(e) => setUser({ ...user, password: e.target.value })}
                      className="block w-full rounded border px-3 py-2.5 outline-none"
                      placeholder="Password"
                    />
                  </div>
                  <div className="relative mb-6">
                    <input
                      type="password"
                      value={user.password2}
                      onChange={(e) => setUser({ ...user, password2: e.target.value })}
                      className="block w-full rounded border px-3 py-2.5 outline-none"
                      placeholder="Re-enter password"
                    />
                  </div>

                  <div className="text-center lg:text-left">
                    <button
                      type="button"
                      onClick={passwordHandler}
                      className="block w-full rounded bg-blue-600 hover:bg-blue-700 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out"
                    >
                      {loading ? "loading.." : "Change Password"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="mx-auto p-5 border w-full md:w-1/2 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                  <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
                    <svg
                      className="h-12 w-12 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>

                  <h3 className="text-xl leading-6 font-bold text-gray-900 mt-4 mb-1">
                    Whoops, that&apos;s an expired link
                  </h3>
                  <div className="px-7 pb-3">
                    <p className="text-sm text-gray-500">
                      For security reasons, password reset links expire after a little while. If you still need to reset
                      your password, you can request a new reset email.
                    </p>
                  </div>
                  <div className="items-center px-4 py-3 w-full">
                    <Link
                      href={"/login"}
                      className="px-4 block py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full
                      shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    >
                      Request a new rest email
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-full container md:px-20">
          <div className="g-6 flex h-full flex-wrap items-center justify-center">
            <div className="mb-12 w-full mx-2 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 bg-white p-5 rounded-xl shadow-lg">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Hey👋, Enter registered email</h1>
                <p className="text-sm font-semibold opacity-80">we will send you a password reset link.</p>
              </div>
              <form>
                <div className="relative mb-6">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded border px-3 py-2.5 outline-none"
                    placeholder="Registered Email"
                  />
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="button"
                    onClick={emailHandler}
                    className="block w-full rounded bg-blue-600 hover:bg-blue-700 px-7 pb-2.5 pt-3 text-sm font-medium leading-normal text-white transition duration-150 ease-in-out"
                  >
                    {loading ? "loading.." : "Send password reset email"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
