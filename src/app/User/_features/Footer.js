"use client";

import HeaderIcon from "@/app/admin/_icons/HeaderIcon";
import FooterBanner from "./FooterBanner";
import FacebookIcon from "../_icons/Facebook";
import InstagramIcon from "../_icons/InstagramIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACK_END_URL } from "@/app/_constants";

export default function Footer() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BACK_END_URL}/category`);
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // console.log("categories", categories);

  return (
    <div className="h-[755px] w-full bg-[#18181B] py-[60px] flex flex-col items-center">
      <FooterBanner />
      <div className="w-[1264px] flex flex-row gap-[220px] mt-[76px]">
        <div className="flex flex-col gap-3 items-center">
          <div>
            <HeaderIcon />
          </div>
          <div>
            <div className="text-[20px] text-white font-bold">
              Nom<span className="text-[#EF4444]">Nom</span>
            </div>
            <div className="text-[12px] text-white">Swift delivery</div>
          </div>
        </div>
        <div className="flex flex-row gap-[112px]">
          <div className="flex flex-col gap-4 text-white">
            <div className="text-[#71717A]">NOMNOM</div>
            <div>Home</div>
            <div>Contact us</div>
            <div>Delivery zone</div>
          </div>
          <div className="flex flex-col gap-[56px]">
            <div className="text-white gap-4 flex flex-col flex-wrap">
              <div className="text-[#71717A]">MENU</div>
              <div className="flex flex-col gap-4 flex-wrap max-h-[186px]">
                {categories.map((item) => (
                  <div key={item._id}>{item.categoryName}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-[#71717A]">FOLLOW US</div>
            <div className="flex flex-row gap-4 py-[5px]">
              <FacebookIcon />
              <InstagramIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1264px] mx-auto mt-[104px]">
        <hr className="border-t border-[#F4F4F566]" />
        <div className="flex flex-row gap-12 text-[#71717A] py-8">
          <div className="flex flex-row gap-1">
            <div>Copy right 2024</div>
            <div>©</div>
            <div>Nomnom LLC</div>
          </div>
          <div>Privacy policy</div>
          <div>Terms and condition</div>
          <div>Cookie policy</div>
        </div>
      </div>

      {/* <div className="w-full h-[92px] bg-red-500 text-[30px] text-white px-[98px] flex flex-row gap-[34px] items-center"></div> */}
    </div>
  );
}
