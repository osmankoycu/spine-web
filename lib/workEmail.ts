// Check the mailbox domain, not the provider hosting the company's email.
// Company domains hosted by Google Workspace or Microsoft 365 remain valid.
const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com",
  "hotmail.com", "hotmail.co.uk", "hotmail.fr", "hotmail.de", "hotmail.com.tr",
  "outlook.com", "outlook.co.uk", "outlook.com.tr",
  "live.com", "live.co.uk", "live.com.tr", "msn.com",
  "yahoo.com", "yahoo.co.uk", "yahoo.fr", "yahoo.de", "yahoo.com.tr",
  "ymail.com", "rocketmail.com",
  "icloud.com", "me.com", "mac.com", "aol.com",
  "proton.me", "protonmail.com", "pm.me",
  "mail.com", "gmx.com", "gmx.net", "gmx.de",
  "yandex.com", "yandex.ru", "zoho.com",
]);

export const WORK_EMAIL_MESSAGE = "Please enter your work email address.";

export function isPersonalEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@").pop() ?? "";
  return PERSONAL_EMAIL_DOMAINS.has(domain);
}
