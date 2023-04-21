export function isMobile(): boolean {
  const ua: string = navigator.userAgent;
  return (
    /Android|iPhone|iPod|iPad|IEMobile|Opera Mini/i.test(ua) &&
    !/Tablet/i.test(ua)
  );
}

export function isTouchDevice(): boolean {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export function isIE(): boolean {
  const ua = window.navigator.userAgent;
  return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
}

export function isSafari(): boolean {
  const ua = window.navigator.userAgent;
  return ua.indexOf("Safari/") > -1 && ua.indexOf("Chrome/") === -1;
}
