"use client";

import Image from "next/image";
import UserFoodCard from "./_components/UserFoodCard";
import Header from "./_features/Header";
import CategoryWithItemsUser from "./CategoryWithItems";

export default function UserHomePage() {
  return (
    // bg-[#404040]
    <div className="flex flex-col w-100% items-center bg-[#404040]">
      <Header />
      <div className="relative w-full aspect-1440/570">
        <Image
          src="/UserMainPoster.png"
          alt="UserMainPoster"
          fill
          className="object-cover"
          priority
        />
      </div>
      <CategoryWithItemsUser />
      {/* <UserFoodCard /> */}
    </div>
  );
}
