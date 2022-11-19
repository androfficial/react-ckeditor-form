import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, IconButton, TextField } from '@mui/material';
import cn from 'classnames';
import { useFormik } from 'formik';
import { useSaveFormValues } from 'hooks/useSaveFormValues';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { sendLetter, setEmailStatus } from 'store/slices/emailSlice';
import { IFormValues } from 'types';
import * as Yup from 'yup';

import s from './Home.module.scss';

export const Home = () => {
  const dispatch = useAppDispatch();

  const emailStatus = useAppSelector(({ email }) => email.status);
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
    onSubmit: (values) => {
      dispatch(sendLetter(values));
    },
    validateOnBlur: true,
    validateOnMount: true,
    validateOnChange: true,
    enableReinitialize: true,
  });

  useSaveFormValues(values, setInitialValues);

  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];

      if (!values.files.some((file) => file.name === selectedFile.name)) {
        setFieldValue('files', [...values.files, selectedFile]);
      }
    }
  };

  const onClickDeleteButton = (fileName: string): void => {
    setFieldValue(
      'files',
      values.files.filter((file) => file.name !== fileName)
    );
  };

  useEffect(() => {
    if (emailStatus === 'success') {
      localStorage.removeItem(window.location.pathname);
      resetForm();
      // eslint-disable-next-line no-alert
      alert('Email sent successfully!');
      dispatch(setEmailStatus('idle'));
    }
  }, [dispatch, resetForm, emailStatus]);

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
                disabled={emailStatus === 'loading'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fromname}
                error={Boolean(errors.fromname && touched.fromname)}
                helperText={
                  errors.fromname && touched.fromname && errors.fromname
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
                disabled={emailStatus === 'loading'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fromaddr}
                error={Boolean(errors.fromaddr && touched.fromaddr)}
                helperText={
                  errors.fromaddr && touched.fromaddr && errors.fromaddr
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
                disabled={emailStatus === 'loading'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.to}
                error={Boolean(errors.to && touched.to)}
                helperText={errors.to && touched.to && errors.to}
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
                disabled={emailStatus === 'loading'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.subject}
                error={Boolean(errors.subject && touched.subject)}
                helperText={errors.subject && touched.subject && errors.subject}
                fullWidth
              />
            </div>
            <div className={s.ckeditorWrapper}>
              <CKEditor
                name='template'
                disabled={emailStatus === 'loading'}
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
                  setFieldValue('template', editor.getData())
                }
                onBlur={(event, editor) => setFieldTouched('template', true)}
              />
              <p className={s.ckeditorError}>
                {errors.template && touched.template && errors.template}
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
                <input onChange={handleInputFileChange} type='file' hidden />
              </Button>
            </div>
            {values.files.length !== 0 && (
              <div className={s.uploadedFilesWrapper}>
                {values.files.map((file) => (
                  <div key={file.name} className={s.fileWrapper}>
                    <p className={s.fileName}>{file.name}</p>
                    <IconButton
                      classes={{ root: s.closeIconButton }}
                      onClick={() => onClickDeleteButton(file.name)}
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
                loading={emailStatus === 'loading'}
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
