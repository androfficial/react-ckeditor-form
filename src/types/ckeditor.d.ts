declare module '@ckeditor/ckeditor5-build-decoupled-document' {
  const DecoupledEditorBuild: any;

  export = DecoupledEditorBuild;
}

declare module '@ckeditor/ckeditor5-react' {
  import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
  import Event from '@ckeditor/ckeditor5-utils/src/eventinfo';
  import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';
  import * as React from 'react';

  const CKEditor: React.FunctionComponent<{
    name?: string;
    disabled?: boolean;
    editor: typeof DecoupledEditor;
    data?: string;
    id?: string;
    config?: EditorConfig;
    onReady?: (editor: DecoupledEditor) => void;
    onChange?: (event: Event, editor: DecoupledEditor) => void;
    onBlur?: (event: Event, editor: DecoupledEditor) => void;
    onFocus?: (event: Event, editor: DecoupledEditor) => void;
    onError?: (event: Event, editor: DecoupledEditor) => void;
  }>;
  export { CKEditor };
}
