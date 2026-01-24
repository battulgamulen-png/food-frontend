"use client";

import Image from "next/image";
// 
export default function FoodCard({ image, name, description, price }) {
  return (
    <div
      className="flex flex-col items-start gap-5 p-4 rounded-[20px] border border-[#E4E4E7] bg-[#FFF]"
      style={{
        width: "270.75px",
        height: "241px",
        flex: "1 0 0",
        alignSelf: "stretch",
      }}
    >
      <div className="w-full h-[120px] relative">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-[12px] w-[238.75px] h-[129px]"
        />
      </div>

      <div className="flex flex-col items-start gap-1">
        <div className="flex flex-row gap-2.5 justify-between w-[238.75px] h-5 items-center">
          <h3 className="text-base font-semibold text-[14px] text-red-500 w-[189.75px]">
            {name}
          </h3>
          <span className="text-[12px] font-medium text-[#09090B] ">
            {price}
          </span>
        </div>
        <p className="text-sm text-[#71717A] line-clamp-2 w-[238.75px] h-8 text-[12px]">
          {description}
        </p>
      </div>
    </div>
  );
}
