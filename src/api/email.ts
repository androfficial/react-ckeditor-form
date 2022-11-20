import { axiosInstance } from 'api/instance';
import { IFormValuesRequest } from 'types';

export const postLetter = ({ queryData, files }: IFormValuesRequest) =>
  axiosInstance.post('/ajax/email_send.php', files, {
    params: queryData,
  });
