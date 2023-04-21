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
