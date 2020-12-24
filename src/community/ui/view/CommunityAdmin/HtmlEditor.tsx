import React, { LegacyRef, useState } from 'react';
import ReactQuill from 'react-quill';
import * as Quill from 'quill';
import { Button, TextArea } from 'semantic-ui-react';

interface HtmlEditorProps {
  modules?: Quill.StringMap;
  formats?: string[];
  onChange?: (content: string) => void;
  value?: string;
  quillRef?: (el: any) => void;
  placeholder?: string;
  theme?: string;
  readOnly?: boolean;
  onlyHtml?: boolean;
}

const HtmlEditor: React.FC<HtmlEditorProps> = function HtmlEditor({
  modules,
  formats,
  onChange,
  value,
  quillRef,
  placeholder,
  theme = 'snow',
  readOnly = false,
  onlyHtml = false,
}) {
  const [isHtml, setIsHtml] = useState<boolean>(false);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: `${isHtml || onlyHtml ? 'block' : 'none'}` }}>
        <div style={{ height: 48, width: '100%' }} />
        <TextArea
          style={{ height: 548 }}
          value={value}
          onChange={(_, data) => {
            if (onChange !== undefined) {
              onChange(data.value as any);
            }
          }}
        />
      </div>
      {!onlyHtml && (
        <div style={{ display: `${!isHtml ? 'block' : 'none'}` }}>
          <ReactQuill
            ref={quillRef}
            theme={theme}
            modules={modules}
            formats={formats}
            // onChange={onChange}
            // value={value}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        </div>
      )}
      {/* <div style={{ position: 'absolute', top: 7, right: 0 }}>
        {!onlyHtml && (
          <Button onClick={() => setIsHtml(!isHtml)}>
            {`${isHtml ? 'EDIT' : 'HTML'}`}
          </Button>
        )}
        {onlyHtml && <Button disabled>HTML</Button>}
      </div> */}
    </div>
  );
};

export default HtmlEditor;
