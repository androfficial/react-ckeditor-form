import { axiosInstance } from 'api/instance';
import { IFormValues } from 'types';

export const postLetter = (body: IFormValues) =>
  axiosInstance.post('/ajax/email_send.php', null, {
    params: body,
  });
