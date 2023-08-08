import { BadRequestError } from "../errors/Errors.js";

export function sanitizePhoneNumber(phoneNumber: string): string | boolean {
  const phoneNumberRegex = /^0[2-9]\d{7}$/;
  const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, ""); // Remove all non-digit characters

  if (!phoneNumberRegex.test(sanitizedPhoneNumber)) {
    return false;
  }

  return sanitizedPhoneNumber;
}
