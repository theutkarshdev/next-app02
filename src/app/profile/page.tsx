"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [data, setData] = useState();
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.user.username);
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="h-screen flex justify-center items-center text-center">
      <div>
        <h1 className="text-2xl font-bold mb-5">{data ? `Hello👋 ${data}` : "Loading..."}</h1>
        <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
