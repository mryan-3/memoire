import jwt from "jsonwebtoken";

export const generateJwtToken = (res, user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie(process.env.AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};
