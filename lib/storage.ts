export const setCookie = (
  name: string,
  val: string,
  expireDate: Date,
): void => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${val};expires=${expireDate.toUTCString()}`;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length !== 2) return null;
  return parts.pop()?.split(";").shift() ?? null;
};

export const removeCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=;expires=${new Date(Date.now() - 1).toUTCString()};path=/;`;
};
