import ChevronRight from "../../admin/_icons/ChevronRightGray";
import HeaderIcon from "../../admin/_icons/HeaderIcon";
import MapPin from "../../admin/_icons/MapPin";
import CartIcon from "../../admin/_icons/ShoppingCart";
import UserIcon from "../../admin/_icons/User";

export default function Header() {
  return (
    <div className="w-full h-[172px] bg-[#18181B] flex flex-row justify-between items-center p-22">
      <div
        className="flex flex-row gap-3 items-center
      "
      >
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
      <div className="flex flex-row items-center">
        <div className="flex gap-3">
          <div className="w-[251px] h-9 bg-white rounded-full flex items-center gap-1 justify-center">
            <div className="w-5 h-5">
              <MapPin />
            </div>
            <span className="text-red-500 text-[12px]">Delivery address:</span>
            <div className="flex items-center text-[12px] text-[#71717A]">
              Add Location <ChevronRight />
            </div>
          </div>
          <div className="w-9 h-9 flex items-center justify-center bg-white rounded-full">
            <CartIcon />
          </div>
          <div className="w-9 h-9 flex items-center justify-center bg-red-500 rounded-full">
            <UserIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
