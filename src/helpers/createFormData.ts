export const createFormData = (files: File[]): FormData | null => {
  if (!files.length) return null;

  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append('files[]', files[i]);
  }

  return formData;
};
