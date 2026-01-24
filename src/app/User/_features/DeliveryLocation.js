"use client";

import ChevronRight from "@/app/admin/_icons/ChevronRightGray";
import MapPin from "@/app/admin/_icons/MapPin";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function DeliverLocation() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");

  const deliverySchema = Yup.object().shape({
    DeliveryLocation: Yup.string().required("Delivery Location is Required!!!"),
  });

  const handleSubmit = (values) => {
    console.log("Submitted:", values.DeliveryLocation);
    setLocation(values.DeliveryLocation);

    localStorage.setItem("deliveryLocation", values.DeliveryLocation);
    toast.success("successfully saved loaction");

    setOpen(false);
  };

  useEffect(() => {
    const savedLocation = localStorage.getItem("deliveryLocation");
    if (savedLocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocation(savedLocation);
    }
  }, []);

  return (
    <>
      <div className="cursor-pointer py-2 px-3 min-w-[200px] h-9 bg-white rounded-full flex items-center gap-2 justify-center">
        <div className="flex gap-px">
          <div className="w-5 h-5">
            <MapPin />
          </div>

          <span className="text-red-500 text-[12px]">Delivery address: </span>
        </div>

        <div onClick={() => setOpen(true)} className="flex gap-px">
          <div className="flex items-center text-[12px] text-[#71717A]">
            {location ? location : "Add Location"}
          </div>
          <ChevronRight />
        </div>
      </div>

      {open && (
        <div
          className="
            fixed inset-0 
            bg-black/40 
            flex items-center justify-center 
            z-50
          "
          onClick={() => setOpen(false)}
        >
          <Formik
            initialValues={{
              DeliveryLocation:
                typeof window !== "undefined"
                  ? localStorage.getItem("deliveryLocation") || ""
                  : "",
            }}
            validationSchema={deliverySchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <Form
                className="w-[502px] min-h-[280px] p-6 bg-white rounded-xl shadow-xl flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-lg font-semibold mb-4">
                  Please write your delivery address!
                </h2>
                <Field
                  name="DeliveryLocation"
                  placeholder="Please share your complete address"
                  className="w-full border rounded-md h-[80px] p-2 "
                />

                <ErrorMessage
                  name="DeliveryLocation"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <div className="flex flex-row gap-4 w-[454px] h-[64px] justify-end items-end mt-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="cursor-pointer text-[14px] bg-white border border-[#E4E4E7] text-black w-[79px] h-[40px] rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer text-[14px] bg-black text-white w-[115px] h-[40px] rounded-md"
                  >
                    Deliver Here
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
}
