export function sanitizePhoneNumber(phoneNumber: string): string | boolean {
  const phoneNumberRegex = /^0[2-9]\d{7}$/;
  const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, ""); // Remove all non-digit characters

  if (!phoneNumberRegex.test(sanitizedPhoneNumber)) {
    return false;
  }

  return sanitizedPhoneNumber;
}

// Function to dynamically build the $or query
export function buildSearchQuery(fields: string[], searchQuery: string, isCaseSensitive = false):{} {
  const options = isCaseSensitive ? "" : "i";
  const orQuery = fields.map((field) => ({
    [field]: { $regex: searchQuery, $options: options },
  }));
  return { $or: orQuery };
}
