import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, IconButton, TextField } from '@mui/material';
import cn from 'classnames';
import { useFormik } from 'formik';
import { createFormData } from 'helpers/createFormData';
import { useSaveFormValues } from 'hooks/useSaveFormValues';
import { ChangeEvent, useMemo, useState } from 'react';
import { useCreateLetterMutation } from 'store/email/emailApi';
import { IFormValues } from 'types';
import * as Yup from 'yup';

import s from './Home.module.scss';

export const Home = () => {
  const [createLetter, { isLoading }] = useCreateLetterMutation();

  const [initialValues, setInitialValues] = useState<IFormValues>({
    fromname: '',
    fromaddr: '',
    to: '',
    subject: '',
    template: '',
    files: [],
  });

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        fromname: Yup.string().required('Sender name is a required field'),
        fromaddr: Yup.string()
          .required('Sender email is a required field')
          .email('Enter a valid email'),
        to: Yup.string()
          .required('Recipient email is a required field')
          .email('Enter a valid email'),
        subject: Yup.string().required('Subject is a required field'),
        template: Yup.string().required('Please enter the text of the letter'),
      }),
    []
  );

  const {
    values,
    errors,
    touched,
    isValid,
    resetForm,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await createLetter({
          queryData: {
            fromname: values.fromname,
            fromaddr: values.fromaddr,
            to: values.to,
            subject: values.subject,
            template: values.template,
          },
          files: createFormData(values.files),
        }).unwrap();

        if (response.ok) {
          localStorage.removeItem(window.location.pathname);
          resetForm();
          // eslint-disable-next-line no-alert
          alert(`The letter was successfully sent to the email: ${values.to}`);
        }
      } catch (error) {
        console.error('rejected', error);
      }
    },
    validateOnBlur: true,
    validateOnMount: true,
    validateOnChange: true,
    enableReinitialize: true,
  });

  useSaveFormValues(values, setInitialValues);

  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setFieldValue('files', [...values.files, ...Array.from(e.target.files)]);
    }
  };

  const onClickDeleteButton = (fileIndex: number): void => {
    setFieldValue(
      'files',
      values.files.filter((_, i) => i !== fileIndex)
    );
  };

  return (
    <section className={s.root}>
      <div className={cn('container', s.container)}>
        <div className={s.content}>
          <form className={s.form} onSubmit={handleSubmit}>
            <div className={s.inputWrapper}>
              <TextField
                classes={{ root: s.input }}
                name='fromname'
                label='Sender name'
                placeholder='Sender name'
                variant='outlined'
                disabled={isLoading}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fromname}
                error={Boolean(touched.fromname && errors.fromname)}
                helperText={
                  touched.fromname && errors.fromname && errors.fromname
                }
                fullWidth
              />
            </div>
            <div className={s.inputWrapper}>
              <TextField
                inputProps={{ inputMode: 'email' }}
                classes={{ root: s.input }}
                name='fromaddr'
                label='Sender email'
                placeholder='Sender email'
                variant='outlined'
                disabled={isLoading}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fromaddr}
                error={Boolean(touched.fromaddr && errors.fromaddr)}
                helperText={
                  touched.fromaddr && errors.fromaddr && errors.fromaddr
                }
                fullWidth
              />
            </div>
            <div className={s.inputWrapper}>
              <TextField
                inputProps={{ inputMode: 'email' }}
                classes={{ root: s.input }}
                name='to'
                label='Recipient email'
                placeholder='Recipient email'
                variant='outlined'
                disabled={isLoading}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.to}
                error={Boolean(touched.to && errors.to)}
                helperText={touched.to && errors.to && errors.to}
                fullWidth
              />
            </div>
            <div className={s.inputWrapper}>
              <TextField
                classes={{ root: s.input }}
                name='subject'
                label='Letter subject'
                placeholder='Letter subject'
                variant='outlined'
                disabled={isLoading}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.subject}
                error={Boolean(touched.subject && errors.subject)}
                helperText={touched.subject && errors.subject && errors.subject}
                fullWidth
              />
            </div>
            <div className={s.ckeditorWrapper}>
              <CKEditor
                name='template'
                disabled={isLoading}
                editor={DecoupledEditor}
                data={values.template}
                onReady={(editor) => {
                  editor.ui
                    .getEditableElement()
                    .parentElement.insertBefore(
                      editor.ui.view.toolbar.element,
                      editor.ui.getEditableElement()
                    );
                  editor.editing.view.change((writer: any) => {
                    writer.setStyle(
                      'min-height',
                      '200px',
                      editor.editing.view.document.getRoot()
                    );
                  });
                }}
                onChange={(event, editor) =>
                  setFieldValue('template', editor.getData(), true)
                }
                onBlur={(event, editor) =>
                  setFieldTouched('template', true, true)
                }
              />
              <p className={s.ckeditorError}>
                {touched.template && errors.template && errors.template}
              </p>
            </div>
            <div className={s.filesButtonWrapper}>
              <Button
                endIcon={<AttachmentIcon />}
                variant='contained'
                component='label'
                fullWidth
              >
                Upload File
                <input
                  onChange={handleInputFileChange}
                  type='file'
                  multiple
                  hidden
                />
              </Button>
            </div>
            {values.files.length !== 0 && (
              <div className={s.uploadedFilesWrapper}>
                {values.files.map((file, i) => (
                  <div key={`${file.name}: ${i}`} className={s.fileWrapper}>
                    <p className={s.fileName}>{file.name}</p>
                    <IconButton
                      classes={{ root: s.closeIconButton }}
                      onClick={() => onClickDeleteButton(i)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            )}
            <div className={s.buttonWrapper}>
              <LoadingButton
                classes={{ root: s.sendButton }}
                disabled={!isValid}
                loading={isLoading}
                onClick={() => handleSubmit()}
                endIcon={<SendIcon />}
                variant='contained'
                type='submit'
                fullWidth
              >
                Send
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
