"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';

export default function LoginPage() {
  const initialValues = {
    email: "",
    password: "",
  };
  const router = useRouter();
  const [user, setUser] = React.useState(initialValues);
  const [loading, setLoading] = React.useState(false);

  const formHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen">
      <Toaster />
      <div className="h-full container md:px-20">
        <div className="g-6 flex h-full flex-wrap items-center justify-center">
          <div className="mb-12 w-full mx-2 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 bg-white p-5 rounded-xl shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">Hey👋, Welcome back</h1>
              <p className="text-sm font-semibold opacity-80">Kindly login to continue</p>
            </div>
            <form>
              <div className="relative mb-6">
                <input
                  type="text"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="block w-full rounded border px-3 py-2.5 outline-none"
                  placeholder="Email address"
                />
              </div>
              <div className="relative mb-6">
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className="block w-full rounded border px-3 py-2.5 outline-none"
                  placeholder="Password"
                />
              </div>
              <div className="mb-6 flex items-center justify-between">
                <div className="mb-[0.125rem] flex items-center min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-blue-600 checked:bg-blue-600 checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-blue-600 dark:checked:bg-blue-600 dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    id="exampleCheck2"
                  />
                  <label className="inline-block pl-[0.15rem] hover:cursor-pointer text-sm" htmlFor="exampleCheck2">
                    Remember me
                  </label>
                </div>
                <Link href="/resetpassword" className="text-sm">
                  Forgot password?
                </Link>
              </div>
              <div className="text-center lg:text-left">
                <button
                  type="button"
                  onClick={formHandler}
                  className="block w-full rounded bg-blue-600 hover:bg-blue-700 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out"
                >
                  {loading ? "loading.." : "Login"}
                </button>
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold text-center">
                  Don't have an account ?
                  <Link
                    href="/signup"
                    className="ml-2 transition duration-150 ease-in-out text-blue-600 hover:text-blue-700 "
                  >
                    Signup
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
