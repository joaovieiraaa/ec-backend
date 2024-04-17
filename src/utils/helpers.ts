export const objLangs = {
  pt: null,
  en: null,
  fr: null,
  es: null,
  de: null,
  it: null,
  pl: null,
};

export function floatify(value: string) {
  const formatter = value
    .toString()
    .replace(/,/g, ".")
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*?)\..*/g, "$1");

  return formatter;
}

export function randomString(length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomString += chars[randomIndex];
  }

  return randomString;
}

export function localizeObj(obj: any, locale: string) {
  const localizedProps = ["name", "description", "slug"];

  function localizeProperty(prop: string | number | symbol) {
    if (localizedProps.includes(prop as string)) {
      if (typeof obj[prop] === "object") {
        obj[prop] = obj[prop][locale];
      }
    }
  }

  function processObject(obj: any) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (Array.isArray(obj[prop])) {
          obj[prop].forEach((item: any) => {
            if (typeof item === "object") {
              localizeObj(item, locale);
            }
          });
        } else if (typeof obj[prop] === "object") {
          localizeObj(obj[prop], locale);
        }
        localizeProperty(prop);
      }
    }
  }

  processObject(obj);

  return obj;
}

export function cloneObject(value: any) {
  return JSON.parse(JSON.stringify(value));
}
