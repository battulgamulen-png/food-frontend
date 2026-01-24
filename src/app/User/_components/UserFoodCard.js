"use client";

import { useState } from "react";
import PlusIcon from "../_icons/plusIcon";
import XIcon from "../_icons/XIcon";
import QuantityMinusIcon from "../_icons/quantityMinusIcon";
import QuantityPlusIcon from "../_icons/quantityPlusIcon";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CheckIcon } from "lucide-react";

export default function UserFoodCard({
  foodName,
  foodPrice,
  foodIngredients,
  foodImage,
  _id,
  getData,
}) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loginRequired, setLoginRequired] = useState(false);
  const router = useRouter();

  const [inCart, setInCart] = useState(
    !!(JSON.parse(localStorage.getItem("cart")) || []).find(
      (item) => item._id === _id
    )
  );

  const removeFromCart = (_id) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter((item) => item._id !== _id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("Хоол cart-аас хасагдлаа");
    setInCart(false);
    getData();
  };

  const token = localStorage.getItem("token");

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const totalPrice = foodPrice * quantity;

  const addToCart = () => {
    if (!token) {
      toast.error("Ta newterj orno uu!");
      setLoginRequired(true);
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = cart.find((item) => item._id === _id);

    if (exist) {
      exist.quantity += quantity;
    } else {
      cart.push({ _id, quantity });
      toast.success("hool amjilttai sagsand nemegdlee");
      setQuantity(1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setOpen(false);
    setInCart(true);
    getData();
  };

  return (
    <div className="w-[397px] bg-white rounded-[20px] p-4 gap-5 flex flex-col">
      <div
        style={{ backgroundImage: `url(${foodImage})` }}
        className="h-[210px] bg-cover rounded-xl bg-center p-5 flex justify-end items-end"
      >
        <div className="cursor-pointer">
          {!inCart ? (
            <div
              onClick={() => setOpen(true)}
              className="w-11 h-11 rounded-full bg-white flex justify-center items-center"
            >
              <PlusIcon />
            </div>
          ) : (
            <div
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart(_id);
              }}
              className="w-11 h-11 rounded-full bg-black flex justify-center items-center"
            >
              <CheckIcon className="text-white" />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div className="text-[24px] text-red-500">{foodName}</div>
          <div className="text-[18px] font-bold">{foodPrice}₮</div>
        </div>
        <div className="text-[14px] w-full">{foodIngredients}</div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[826px] h-[412px] bg-white p-6 flex flex-row gap-6"
          >
            <div
              style={{ backgroundImage: `url(${foodImage})` }}
              className="w-[377px] h-[364px] bg-cover rounded-xl"
            ></div>

            <div className="w-[377px] h-[364px] flex flex-col p-3">
              <div
                onClick={() => setOpen(false)}
                className="cursor-pointer w-9 h-9 border rounded-full border-[#E4E4E7] flex justify-center items-center self-end"
              >
                <XIcon />
              </div>

              <div className="flex flex-col justify-between h-[328px]">
                <div className="flex flex-col gap-3">
                  <div className="text-[30px] text-red-500">{foodName}</div>
                  <div className="text-[16px]">{foodIngredients}</div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-row justify-between">
                    <div>
                      <div className="text-[16px]">Total price</div>
                      <div className="text-[24px]">{totalPrice}₮</div>
                    </div>

                    <div className="flex flex-row gap-3 items-center">
                      <div
                        onClick={decrease}
                        className="cursor-pointer border rounded-full border-black w-11 h-11 flex justify-center items-center"
                      >
                        <QuantityMinusIcon />
                      </div>
                      <div>{quantity}</div>
                      <div
                        onClick={increase}
                        className="cursor-pointer border rounded-full border-black w-11 h-11 flex justify-center items-center"
                      >
                        <QuantityPlusIcon />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={addToCart}
                    className="cursor-pointer text-white bg-black w-full h-[44px] rounded-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {loginRequired && (
        <div>
          {loginRequired && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white flex flex-col p-6 gap-6 justify-center items-center">
                <div className="text-[24px]">You need to log in first </div>
                <div className="flex flex-row gap-4">
                  <div
                    onClick={() => router.push("/auth/login")}
                    className="cursor-pointer py-2 text-white bg-black flex justify-center items-center rounded-md w-[182.5px]"
                  >
                    Login
                  </div>

                  <div
                    onClick={() => router.push("/auth/signup")}
                    className="cursor-pointer py-2 flex justify-center items-center border border-[#E4E4E7] rounded-md w-[182.5px]"
                  >
                    Sign up
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
