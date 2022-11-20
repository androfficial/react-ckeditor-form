import { axiosInstance } from 'api/instance';
import { AxiosResponse } from 'axios';
import { IFormValuesRequest, ILetterRes } from 'types';

export const postLetter = ({
  queryData,
  files,
}: IFormValuesRequest): Promise<AxiosResponse<ILetterRes>> =>
  axiosInstance.post<ILetterRes>('/ajax/email_send.php', files, {
    params: queryData,
  });
