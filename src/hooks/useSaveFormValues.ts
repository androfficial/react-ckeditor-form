import { useEffect, useState } from 'react';
import { IFormValues } from 'types';

export const useSaveFormValues = (
  values: IFormValues,
  setInitialValues: (values: IFormValues) => void
) => {
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    const savedData = localStorage.getItem(window.location.pathname);

    if (savedData) {
      const parsedJson: IFormValues = JSON.parse(savedData);
      setInitialValues(parsedJson);
    }

    setInit(true);
  }, [setInitialValues]);

  useEffect(() => {
    if (!init) return;

    localStorage.setItem(
      window.location.pathname,
      JSON.stringify({
        ...values,
        files: [],
      })
    );
  }, [init, values]);
};
