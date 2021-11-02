export function format_number(value: string, digits = 0): string {
  return parseFloat(value)
    .toFixed(digits)
    .replace(",", ".")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const numberWithCommas = (x = 0, commas = " "): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, commas);
};

export const copyToClipboard = (textToCopy: string): void => {
  const textField = document.createElement("textarea");
  textField.innerText = textToCopy;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
};

export const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name: string, value: unknown, options: any = {}): void => {
  const new_options = {
    path: "/",
    ...options
  };

  if (new_options.expires instanceof Date) {
    new_options.expires = new_options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(false);

  for (const optionKey in new_options) {
    updatedCookie += "; " + optionKey;
    const optionValue = new_options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export const deleteCookie = (name: string): void => {
  setCookie(name, "", {
    "max-age": -1
  });
};

export function loadState(): void | Record<string, any> {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export function saveState(state: any): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
}
