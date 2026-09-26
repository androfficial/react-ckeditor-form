# Email Composer

Single-page email form: fill in the sender and the recipient, write the letter in a rich text editor, attach files and send it through an external mail endpoint. Built in November 2022.

**Live demo:** [react-ckeditor-form.vercel.app](https://react-ckeditor-form.vercel.app)

## Features

- Sender name, sender email, recipient email and subject fields, all required. Both email fields must hold a valid address, and each error shows once its field has been touched.
- Letter body in the CKEditor 5 document editor, with its toolbar above the text. The body is required too.
- Attach several files, see their names and remove any of them before sending.
- The Send button stays disabled until the form is valid and shows a spinner while the request runs. The fields and the editor are disabled meanwhile.
- Saves the draft (every field except the attachments) to localStorage on each change and restores it after a reload.
- After a successful send, the form resets and an alert confirms the recipient address.

## Tech stack

- **Framework:** React 18, TypeScript 4
- **State:** Redux Toolkit 1, React Redux 8
- **Data:** RTK Query (`createApi` with `fetchBaseQuery`)
- **Routing:** React Router 6
- **UI:** Material UI 5 (components, icons, `LoadingButton` from Material UI Lab), Emotion 11, CKEditor 5 (decoupled document build 35, `@ckeditor/ckeditor5-react` 5)
- **Styling:** CSS Modules with SCSS (Dart Sass 1), classnames, Montserrat from Google Fonts
- **Forms:** Formik 2, Yup 0.32
- **Tooling:** Create React App 5, ESLint 8 (Airbnb config), Stylelint 14, Prettier 2
- **Hosting:** Vercel

## Getting started

Requires Node.js 16 or 18 and Yarn 1; the app needs no API keys or environment variables.

```bash
git clone https://github.com/androfficial/react-email-composer.git
cd react-email-composer
yarn install
yarn start
```

## Scripts

| Command | Description |
| --- | --- |
| `yarn start` | Starts the development server |
| `yarn build` | Builds the production bundle into `build/` |
| `yarn eslint` | Lints the `.ts` and `.tsx` files |
| `yarn eslint:fix` | Lints the `.ts` and `.tsx` files and fixes what it can |
| `yarn stylelint` | Lints the SCSS files in `src/` |
| `yarn stylelint:fix` | Lints the SCSS files and fixes what it can |
| `yarn format` | Checks formatting with Prettier |
| `yarn format:fix` | Formats the files with Prettier |

## Project structure

```text
src/
  components/  Header, Footer
  helpers/     FormData builder for the attachments
  hooks/       draft autosave to localStorage, typed Redux hooks
  layouts/     RootLayout with the header and footer
  pages/       Home with the form
  store/       Redux store and the RTK Query email API
  styles/      global SCSS: reset, variables, fonts
  types/       form types and type declarations for the CKEditor packages
```

## Notes

- The mail endpoint is an external PHP service whose base URL is hard-coded in `src/store/email/emailApi.ts`. It is not part of this repository and may no longer answer.
- The text fields, including the HTML from the editor, go to the endpoint as query parameters, and the attachments as a `multipart/form-data` body under `files[]`.
