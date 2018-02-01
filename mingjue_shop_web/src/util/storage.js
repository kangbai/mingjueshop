const DEVICEKEY = 'DEVICEKEY';

export const getDeviceInfo = () => {
  console.log(JSON.parse(window.localStorage.getItem(DEVICEKEY)));
  return JSON.parse(window.localStorage.getItem(DEVICEKEY)) || {};
}

export const saveDeviceInfo = (deviceInfo) => {
  window.localStorage.setItem(DEVICEKEY, JSON.stringify(deviceInfo));
}