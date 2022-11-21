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
  files: FormData | undefined;
}

export interface ILetterData {
  fromname: string;
  fromaddr: string;
  to: string;
  subject: string;
  template: string;
}

export interface ILetterRes {
  files: any[];
  ok: boolean;
  error: string;
  files2: any;
  files3: any;
  r: ILetterData;
}
