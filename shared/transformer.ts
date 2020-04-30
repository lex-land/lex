export const jsonToFormData = (obj: any) => {
  const formData = new FormData();
  Object.keys(obj).forEach((i) => {
    formData.append(i, obj[i]);
  });
  return formData;
};

// safari 11 上不支持，请谨慎使用
export const formDataToJSON = (formData: FormData) => {
  const obj: any = {};
  formData.forEach((value: any, key: any) => {
    obj[key] = value;
  });
  return obj;
};
