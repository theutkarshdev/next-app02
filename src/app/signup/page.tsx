"use client";

import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const initialValues = {
    username:"",
    email: "",
    password: "",
  };
  const router = useRouter();
  const [user, setUser] = React.useState(initialValues);
  const [loading, setLoading] = React.useState(false);

  const formHandler = async() => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");

  } catch (error:any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
  }finally {
      setLoading(false);
  }
  };

  return (
    <section className="h-screen">
      <div className="h-full container md:px-20">
        <div className="g-6 flex h-full flex-wrap items-center justify-center">
          <div className="mb-12 w-full mx-2 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 bg-white p-5 rounded-xl shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">Hey👋, Kindly Signup</h1>
              <p className="text-sm font-semibold opacity-80">Kindly signup to continue</p>
            </div>
            <form>
            <div className="relative mb-6">
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  className="block w-full rounded border px-3 py-2.5 outline-none"
                  placeholder="Username"
                />
              </div>
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

              <div className="text-center lg:text-left">
                <button
                  type="button"
                  onClick={formHandler}
                  className="block w-full rounded bg-blue-600 hover:bg-blue-700 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out"
                >
                  {loading ? "Loading..." : "Signup"}
                </button>
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold text-center">
                  Don&apos;t have an account ?
                  <Link
                    href="/login"
                    className="ml-2 transition duration-150 ease-in-out text-blue-600 hover:text-blue-700 "
                  >
                    Login
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
