import jwt, { JwtPayload, Secret } from "jsonwebtoken";
// import "dotenv/config";
// require('dotenv').config();
const jwtConfig = {
  ac_secret: `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
  rf_secret: `${process.env.JWT_REFRESH_TOKEN_SECRET}`,
  ac_expired_millisecond: process.env.JWT_ACCESS_TOKEN_EXPIRED_MILLISECONDS, // 1 hour
};

export const createAccessToken = (userId: string) => {
  try {
    const token = jwt.sign({ userId }, jwtConfig.ac_secret);
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// console.log(process.env.JWT_REFRESH_TOKEN_SECRET)

export const createRefreshToken = (userId: string) => {
  try {
    const token = jwt.sign({ userId }, jwtConfig.rf_secret);
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyAccessToken = (token: string): string | JwtPayload => {
  try {
    const decoded = jwt.verify(token, jwtConfig.ac_secret);
    return decoded;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
