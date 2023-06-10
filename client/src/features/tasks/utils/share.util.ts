import { message } from 'antd';

/**
 * @param  {string} pageUrl
 * share page url via Email
 */
export function shareByEmail(pageUrl: string) {
  const subject = "Check out this page!";
  const body = `I found this page and thought you might be interested:\n${pageUrl}`;
  const mailToUrl = `mailto:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailToUrl;
}
/**
 * @param  {string} pageUrl
 * share page url via WhatsApp
 */
export function shareViaWhatsApp(pageUrl: string) {
  const text = `Check out this page: ${pageUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;

  window.open(whatsappUrl, "_blank");
}

/**
 * @param  {string} pageUrl
 * copy the page url to clipboard
 */
export function copyPageUrlToClipboard(pageUrl: string) {
  navigator.clipboard
    .writeText(pageUrl)
    .then(() => {
     const info = () => {
         return message.info('Copied to clipboard');
        };
        info()
      // You can show a success message or perform any other desired actions here
    })
    .catch((error) => {
      console.error("Failed to copy page URL to clipboard:", error);
      // You can show an error message or handle the error in any way you prefer
    });
}
