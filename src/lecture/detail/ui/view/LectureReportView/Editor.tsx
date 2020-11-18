import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import {
  getLectureReport,
  setLectureReport,
} from 'lecture/detail/store/LectureReportStore';
import { useLectureReport } from '../../../service/useLectureReport/useLectureReport';

interface EditorProps {
  reportId: string;
}

const Editor: React.FC<EditorProps> = function Editor({ reportId }) {
  const editorRef = useRef<ReactQuill>(null);
  // const [value, setValue] = useState<string>();
  useEffect(() => {
    const lectureReport = getLectureReport();
    if (editorRef.current !== null) {
      const innerEditor = editorRef.current.getEditor();
      innerEditor.setText('');
      if (
        lectureReport?.studentReport?.homeworkContent !== undefined &&
        lectureReport?.studentReport?.homeworkContent !== null
      ) {
        innerEditor.clipboard.dangerouslyPasteHTML(
          lectureReport?.studentReport?.homeworkContent
        );
      }
    }
    // setValue(lectureReport?.studentReport?.homeworkContent || '');
  }, [reportId]);

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

  //AS-IS 활용함, 변경 해야하는지 확인
  function handleChange(html: any) {
    const lectureReport = getLectureReport();
    if (lectureReport) {
      if (html && html.length < 1000000000000000) {
        let next = getLectureReport();
        if (next === undefined) {
          return;
        }
        if (next.studentReport?.homeworkContent === html) {
          return;
        }
        const nextReport =
          next.studentReport === undefined
            ? { homeworkContent: html }
            : next.studentReport;
        next = {
          ...next,
          studentReport: { ...nextReport, homeworkContent: html },
        };
        setLectureReport(next);
        // setValue(html);
      } else {
        alert('html 작성 오류');
      }
    }
    // setValue(html);
  }

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
  return (
    <ReactQuill
      ref={editorRef}
      theme="snow"
      modules={modules}
      formats={formats}
      onChange={handleChange}
    />
  );
};

export default Editor;
