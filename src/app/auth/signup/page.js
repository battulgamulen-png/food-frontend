"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { BACK_END_URL } from "@/app/_constants";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Имэйл хаяг зөв байх ёстой")
      .required("Имэйл шаардлагатай"),
    password: Yup.string()
      .min(8, "Нууц үг дор хаяж 8 тэмдэгттэй байх ёстой")
      .when("$step", {
        is: 2,
        then: (schema) => schema.required("Нууц үг шаардлагатай"),
      }),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Нууц үг таарахгүй байна")
      .when("$step", {
        is: 2,
        then: (schema) => schema.required("Нууц үгээ баталгаажуулна уу"),
      }),
  });

  const handleSubmit = async (values, { setErrors }) => {
    if (step === 1) {
      setStep(2);
      return;
    }

    try {
      await Yup.object({
        password: Yup.string()
          .min(8, "Нууц үг дор хаяж 8 тэмдэгттэй байх ёстой")
          .required("Нууц үг шаардлагатай"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Нууц үг таарахгүй байна")
          .required("Нууц үгээ баталгаажуулна уу"),
      }).validate(values, { abortEarly: false });
    } catch (err) {
      const formErrors = {};
      err.inner.forEach((e) => {
        formErrors[e.path] = e.message;
      });
      setErrors(formErrors);
      return;
    }

    try {
      await axios.post(`${BACK_END_URL}/authentication/sign-up`, values);
      toast.success("Амжилттай бүртгэгдлээ!");
      router.push("/auth/login");
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data);
      } else {
        toast.error("Бүртгэл амжилтгүй боллоо, дахин оролдоно уу");
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-12 bg-white p-6">
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}
        context={{ step }}
      >
        {({ errors, values, setFieldValue }) => (
          <Form className="flex flex-col gap-6 w-[416px]">
            <div
              className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
              onClick={() => router.back()}
            >
              <ChevronLeft />
            </div>

            {step === 1 && (
              <>
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold text-black">
                    Create your account
                  </h1>
                  <p className="text-sm text-gray-500">
                    Sign up to explore your favorite dishes.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600">Email address</label>
                  <input
                    type="email"
                    value={values.email}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full h-10 bg-black text-white rounded-md mt-2 cursor-pointer"
                >
                  Next
                </button>

                <div className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    className="text-blue-600 font-medium hover:underline cursor-pointer"
                    onClick={() => router.push("/auth/login")}
                  >
                    Log in
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold text-black">
                    Create a strong password
                  </h1>
                  <p className="text-sm text-gray-500">
                    Create a strong password with letters, numbers.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">Password</label>
                    <input
                      type="password"
                      value={values.password}
                      onChange={(e) =>
                        setFieldValue("password", e.target.value)
                      }
                      placeholder="Enter your password"
                      className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={values.confirmPassword}
                      onChange={(e) =>
                        setFieldValue("confirmPassword", e.target.value)
                      }
                      placeholder="Re-enter your password"
                      className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  {(errors.password || errors.confirmPassword) && (
                    <p className="text-red-500 text-sm">
                      {errors.password || errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full h-10 border border-gray-300 text-black rounded-md cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="w-full h-10 bg-black text-white rounded-md cursor-pointer"
                  >
                    Finish
                  </button>
                </div>

                <div className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    className="text-blue-600 font-medium hover:underline cursor-pointer"
                    onClick={() => router.push("/auth/login")}
                  >
                    Log in
                  </button>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>

      <div className="hidden md:block">
        <Image
          src="/SignUpPoster.png"
          alt="Sign Up Poster"
          width={856}
          height={904}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
