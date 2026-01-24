"use client";

import { BACK_END_URL } from "@/app/_constants";
import UserIcon from "@/app/admin/_icons/User";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function HeaderAccount() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    setConfirm(false);
    localStorage.clear();
    toast.success("Amjilttai garlaa!");
    router.refresh();
  };

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${BACK_END_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmail(response.data.email);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUserData();
  }, []);

  return (
    <div className="relative z-30">
      <div
        onClick={() => setOpen(!open)}
        className="w-9 h-9 cursor-pointer rounded-full bg-red-500 flex items-center justify-center "
      >
        <UserIcon />
      </div>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-30">
          <div className="bg-white rounded-xl min-w-[188px] min-h-[104px] p-4 flex flex-col justify-center items-center gap-2 shadow-lg">
            <div className="text-[20px]">{email}</div>
            <div
              onClick={() => setConfirm(true)}
              className="py-2 px-3 bg-[#F4F4F5] rounded-full cursor-pointer"
            >
              Sign Out
            </div>
          </div>
        </div>
      )}
      {confirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-lg w-[90%] max-w-sm p-6 flex flex-col gap-4"
          >
            <div className="text-gray-800 text-center text-[16px]">
              Ta garahdaa itgeltei baina uu?? <br />
              Tanii sags bolon hadgalsan hoolnuud ustah bolno!s
            </div>

            <div className="flex justify-center gap-4 mt-2">
              <button
                className="cursor-pointer bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setConfirm(false)}
              >
                No
              </button>
              <button
                className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
