"use client";

import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import axios from "axios";
import { toast } from "react-toastify";
import { BACK_END_URL } from "@/app/_constants";

export default function LoginPage() {
  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("email hayg buruu baina")
      .required("email oruulna uu!!"),
    password: Yup.string().required("nuuts ug oruulna uu"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${BACK_END_URL}/authentication/login`,
        values
      );
      console.log(response);

      localStorage.setItem("token", response.data.token);
      toast.success("Amjilttai newterlee!");
      if (response.data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.log(err.response?.data);
      if (err.response?.data) {
        toast.error(err.response.data);
      } else {
        toast.error("Newtrelt Amjiltgui!");
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-12 bg-white p-6">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}
      >
        {({ errors, values, setFieldValue }) => (
          <Form className="flex flex-col gap-6 w-[416px]">
            <div
              className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
              onClick={() => router.back()}
            >
              <ChevronLeft />
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-black">Login</h1>
              <p className="text-sm text-gray-500">
                Log in to enjoy your favorite dishes.
              </p>
            </div>

            <Field>
              <Input
                id="email"
                placeholder="Email"
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
              />
            </Field>

            <Field>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                value={values.password}
                onChange={(e) => setFieldValue("password", e.target.value)}
              />
            </Field>

            {(errors.email || errors.password) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email || errors.password}
              </p>
            )}

            <div className="flex justify-between items-center text-sm mt-1">
              <button
                className="text-blue-600 hover:underline"
                type="button"
                onClick={() => router.push("/login/forgot-password")}
              >
                Forgot password?
              </button>
            </div>

            <Button
              className="w-full h-10 bg-black text-white rounded-md font-medium hover:bg-gray-900 transition-colors mt-2 cursor-pointer"
              type="submit"
            >
              Login
            </Button>

            <div className="text-sm text-gray-600 mt-4 text-center">
              Don’t have an account?{" "}
              <button
                className="text-blue-600 font-medium hover:underline cursor-pointer"
                type="button"
                onClick={() => router.push("/auth/signup")}
              >
                Sign up
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="hidden md:block">
        <Image
          src="/SignUpPoster.png"
          alt="Login Poster"
          width={856}
          height={904}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
