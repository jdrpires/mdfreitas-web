export function validEmail(value = ""): string {
  const email = value.trim();
  return email.length <= 254 &&
    /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/.test(
      email,
    )
    ? email
    : "";
}
export function whatsappUrl(value = ""): string {
  const number = value.trim();
  return /^[1-9]\d{9,14}$/.test(number) ? `https://wa.me/${number}` : "";
}
export function whatsappMessage(url: string, message: string): string {
  if (!/^https:\/\/wa\.me\/[1-9]\d{9,14}$/.test(url)) return "";
  return `${url}?text=${encodeURIComponent(message)}`;
}
export function emailMessage(
  email: string,
  subject: string,
  message: string,
): string {
  const recipient = validEmail(email);
  if (!recipient) return "";
  return `mailto:${recipient}?subject=${encodeURIComponent(subject.replace(/[\r\n]/g, " "))}&body=${encodeURIComponent(message)}`;
}
export const greeting =
  "Olá! Gostaria de conhecer as soluções da M D’Freitas para o meu negócio.";
