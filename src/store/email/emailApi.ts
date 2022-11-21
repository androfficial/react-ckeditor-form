import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IFormValuesRequest, ILetterRes } from 'types';

export const emailApi = createApi({
  reducerPath: 'emailApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fs2.mh.net.ua',
  }),
  endpoints: (build) => ({
    createLetter: build.mutation<ILetterRes, IFormValuesRequest>({
      query: ({ queryData, files }: IFormValuesRequest) => ({
        url: '/ajax/email_send.php',
        method: 'POST',
        params: queryData,
        body: files,
      }),
    }),
  }),
});

export const { useCreateLetterMutation } = emailApi;
