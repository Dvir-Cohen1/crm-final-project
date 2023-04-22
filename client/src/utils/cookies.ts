import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: object) => {
  return cookies.set(
    name,
    value,
    options || { path: "/", sameSite: "none", secure: true }
  );
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string, options?: object) => {
  return cookies.remove(name, options);
};
