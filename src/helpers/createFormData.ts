export const createFormData = (files: File[]): FormData | undefined => {
  if (!files.length) return undefined;

  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append('files[]', files[i]);
  }

  return formData;
};
