import { NAMESPACE } from "../config";

const KEY = NAMESPACE as string;
const STORE = window.localStorage;

const getData = (key: string | null = null): any => {
  const _data = STORE.getItem(KEY);
  const data = _data ? JSON.parse(_data) : {};
  return key ? data[key] : data;
};

const setData = (key: string, value: any): void => {
  STORE.setItem(
    KEY,
    JSON.stringify({
      ...getData(),
      [key]: value,
    })
  );
};

export default {
  get: getData,
  set: setData,
  remove: (key: string) => {
    if (!key) {
      return;
    }
    const data = getData();
    delete data[key];
    STORE.setItem(KEY, JSON.stringify(data));
  },
};
