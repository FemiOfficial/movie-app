import { Request } from "express";

export const extractIdFromUrl = (resourceType: string, url: string) => {
  try {
    const id = url.split(resourceType)[1].replace(/\//gi, "");
    return id.trim();
  } catch (error) {
    return null;
  }
};

export const getIp = (req: Request) => {
  let ip: string =
    req.headers["x-real-ip"] as string ||
    (req.headers["x-forwarded-for"] as string)?.split(",").shift()?.trim() ||
    req.socket?.remoteAddress ||
    req.ip;

  if (ip.substring(0, 7) == "::ffff:") {
    ip = ip.substring(7);
  }

  return ip;
};

export const convertFromCmToFeetAndInches = (valueInCm: number) => {
  const feet = valueInCm / 30.48;
  const inches = (feet - Math.floor(feet)).toFixed(4);
  return { feet, inches: Number(inches) };
};
