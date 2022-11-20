export interface IFormValues {
  fromname: string;
  fromaddr: string;
  to: string;
  subject: string;
  template: string;
  files: File[];
}

export interface IFormValuesRequest {
  queryData: {
    fromname: string;
    fromaddr: string;
    to: string;
    subject: string;
    template: string;
  };
  files: FormData | null;
}
