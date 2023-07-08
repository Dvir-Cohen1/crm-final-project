export function setLocalStorageItem(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorageItem<T>(key: string): T | null {
  const value = localStorage.getItem(key);
  if (value !== null) {
    return JSON.parse(value) as T;
  }
  return null;
}

// App state
export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("appState", serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

export const loadState = () => {
  try {
    if (typeof localStorage === 'undefined') {
      return undefined; // Return undefined to use the initial state
    }

    const serializedState = localStorage.getItem("appState");
    if (serializedState === null) {
      return undefined; // Return undefined to use the initial state
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return undefined;
  }
};
