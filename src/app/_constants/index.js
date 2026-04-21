const DEFAULT_BACK_END_URL =
  process.env.NODE_ENV === "production"
    ? "https://food-backend-7ozf.onrender.com"
    : "http://localhost:1000";

export const BACK_END_URL = (
  process.env.NEXT_PUBLIC_BACK_END_URL || DEFAULT_BACK_END_URL
).replace(/\/$/, "");
