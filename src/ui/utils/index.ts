export const copyToClipboard = (textToCopy: string | number) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(textToCopy.toString());
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy.toString();
    textArea.style.position = 'absolute';
    textArea.style.opacity = '0';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise<void>((res, rej) => {
      document.execCommand('copy') ? res() : rej();
      textArea.remove();
    });
  }
};

export function shortAddress(address?: string, len = 5) {
  if (!address) return '';
  if (address.length <= len * 2) return address;
  return address.slice(0, len) + '...' + address.slice(address.length - len);
}

export const setLocalValue = (keyValues: any) => {
  Object.keys(keyValues).forEach((key) => {
    localStorage.setItem(key, JSON.stringify(keyValues[key]));
  });
  return Promise.resolve();
};

export const getLocalValue = (key: string) => {
  const value = JSON.parse(localStorage.getItem(key) as string);
  return Promise.resolve(value)
};

export const setSessionValue = (keyValues: any) => {
  Object.keys(keyValues).forEach((key) => {
    sessionStorage.setItem(key, JSON.stringify(keyValues[key]));
  });
  return Promise.resolve();
};

export const getSessionValue = (key: any) => {
  const value = JSON.parse(sessionStorage.getItem(key) as string);
  return Promise.resolve(value);
};