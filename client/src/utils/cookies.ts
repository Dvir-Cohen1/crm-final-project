import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: object) => {
  return cookies.set(
    name,
    value,
    options || { path: "/", sameSite: "none", secure: true }
  );
};

export const getCookie = async (name: string) => {
  return await cookies.get(name);
};

export const removeCookie = (name: string, options?: object) => {
  return cookies.remove(name, options);
};


//  App state
export const saveState = (state:any) => {
  try {
    const serializedState = JSON.stringify(state);
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Set the expiration time for the cookie if needed

    
    cookies.set('appState', serializedState, { expires: expirationDate  }); // Set the expiration time for the cookie if needed
  } catch (error) {
    console.error('Error saving state to cookie:', error);
  }
};

export const loadState = () => {
  try {
    const serializedState = cookies.get('appState');
    if (serializedState === undefined) {
      return undefined; // Return undefined to use the initial state
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from cookie:', error);
    return undefined;
  }
};