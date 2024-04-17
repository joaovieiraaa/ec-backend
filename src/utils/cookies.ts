export function createCookie(name: string, value: any) {
  const d = new Date();
  d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
  let expires = "; expires=" + d.toUTCString();

  document.cookie = `${name}=${value}${expires}; path=/`;
}

export function getCookie(name: string): string | null {
  if (!name) return null;

  const cookieRegex = new RegExp("(^| )" + name + "=([^;]+)");
  const match = cookieRegex.exec(document.cookie);

  if (!match) return null;

  return match[2];
}
