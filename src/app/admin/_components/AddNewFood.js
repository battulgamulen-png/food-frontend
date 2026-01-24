/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import PlusIcon from "../_icons/plusIcon";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { BACK_END_URL } from "@/app/_constants";

export default function AddNewFoodCard({ categoryId, categoryName }) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const foodSchema = Yup.object().shape({
    foodName: Yup.string().required("Food Name Required!"),
    foodPrice: Yup.number()
      .required("Food Price Required!")
      .typeError("Must be a number"),
    foodIngredients: Yup.string().required("Ingredients is Required!"),
    foodImage: Yup.mixed().required("Food Image is required"),
  });

  const uploadToCloudinary = async (file) => {
    if (!file) throw new Error("No file selected");

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default");

    const CLOUD_NAME = "dkrwhhldd";
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: data }
    );

    const json = await res.json();

    if (!res.ok) {
      console.error("Cloudinary upload error:", json);
      throw new Error(json.error?.message || "Upload failed");
    }

    return json.secure_url;
  };

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const imageUrl = await uploadToCloudinary(values.foodImage);

      await axios.post(`${BACK_END_URL}/food`, {
        foodName: values.foodName,
        foodPrice: values.foodPrice,
        foodIngredients: values.foodIngredients,
        foodImage: imageUrl,
        category: categoryId,
      });
      toast.success("Hool amilttai nemegdlee");
      setOpen(false);
      setPreview(null);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("hool nemehed aldaa garlaa , dahin oroldono uu");
      setIsLoading(false);
    }
  };

  return (
    <div className=" cursor-pointer w-[270px] h-[241px] border rounded-xl border-red-500 flex flex-col justify-center items-center gap-6">
      <div
        onClick={() => setOpen(true)}
        className="w-10 h-10 rounded-full bg-red-500 flex justify-center items-center"
      >
        <PlusIcon />
      </div>
      <div className="text-[14px] max-w-[154px] text-center">
        Add new Dish to <p>{categoryName}</p>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <Formik
            initialValues={{
              foodName: "",
              foodPrice: "",
              foodIngredients: "",
              foodImage: null,
            }}
            validationSchema={foodSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="bg-white p-6 rounded-xl shadow-xl w-[472px] h-[596px] flex flex-col gap-6 relative justify-between">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Add new Dish</h2>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setPreview(null);
                    }}
                    className="text-black text-xl hover:text-black w-9 h-9 rounded-full bg-[#F4F4F5]"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-row gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="text-[14px]">Food name</div>
                    <Field
                      name="foodName"
                      placeholder="Type food name"
                      className="border rounded-md h-[38px] p-2"
                    />
                    <ErrorMessage
                      name="foodName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-[14px]">Food price</div>
                    <Field
                      name="foodPrice"
                      placeholder="Enter price"
                      className="border rounded-md h-[38px] p-2"
                    />
                    <ErrorMessage
                      name="foodPrice"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div>Ingredients</div>
                  <Field
                    name="foodIngredients"
                    placeholder="List ingredients..."
                    className="border rounded-md h-[38px] p-2"
                  />
                  <ErrorMessage
                    name="foodIngredients"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[14px] font">Food image</div>

                  <div className="relative w-full h-[138px] border rounded-md bg-gray-100 overflow-hidden">
                    <input
                      type="file"
                      name="foodImage"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFieldValue("foodImage", file);
                        setPreview(URL.createObjectURL(file));
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />

                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      />
                    ) : (
                      <div className="absolute inset-0 flex justify-center items-center text-gray-500 pointer-events-none">
                        Upload image
                      </div>
                    )}
                  </div>

                  <ErrorMessage
                    name="foodImage"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex justify-end gap-3 w-full h-[64px] items-end">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="px-4 py-2 rounded-md bg-black text-white w-[98px] h-10 flex justify-center items-center"
                  >
                    {isLoading && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {isLoading ? "" : "Add Dish"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
