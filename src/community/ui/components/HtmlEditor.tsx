import React from 'react';
import ReactQuill from 'react-quill';

export interface HtmlEditorProps {
  contents: string;
  onChange: (value: string) => void;
}
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];
export function HtmlEditor(props: HtmlEditorProps) {
  const { contents, onChange } = props;
  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={contents}
      onChange={(newValue, delta, source) => {
        if (source === 'user' && onChange !== undefined) {
          onChange(newValue);
        }
      }}
    />
  );
}
