export function createCookie(name: string, value: any) {
  const d = new Date();
  d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
  let expires = "; expires=" + d.toUTCString();

  document.cookie = `${name}=${value} ${expires}; path=/`;
}

export function getCookie(name: string): string {
  let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : "";
}
