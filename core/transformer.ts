export const jsonToFormData = (obj: any) => {
  const formData = new FormData();
  Object.keys(obj).forEach(i => {
    formData.append(i, obj[i]);
  });
  return formData;
};

export const formDataToJSON = (formData: any) => {
  const obj: any = {};
  formData.forEach((value: any, key: any) => {
    obj[key] = value;
  });
  return obj;
};

export const initObjectByStringKeys = <T = string>(keys: T[], value = '') => {
  const obj: any = {};
  keys.forEach(i => {
    obj[i] = value;
  });
  return obj;
};
