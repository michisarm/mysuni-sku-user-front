import React from 'react';
import ReactQuill from 'react-quill';
import {
  LectureReport,
  StudentReport,
} from 'lecture/detail/viewModel/LectureReport';
import {
  getLectureReport,
  setLectureReport,
} from 'lecture/detail/store/LectureReportStore';

interface EditorProps {
  lectureReport: LectureReport;
}

const Editor: React.FC<EditorProps> = function Editor({ lectureReport }) {
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
    //
    if (lectureReport) {
      if (html && html.length < 1000000000000000) {
        const studentReport = getLectureReport()?.studentReport || {};
        studentReport.homeworkContent = html;
        lectureReport.studentReport = studentReport;
        setLectureReport(lectureReport);
      } else {
        alert('html 작성 오류');
      }
    }
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
  console.log('getLectureReport()', getLectureReport());
  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      // value={lectureReport?.studentReport?.homeworkContent || ''}
      value={getLectureReport()?.studentReport?.homeworkContent || ''}
      onChange={handleChange}
    />
  );
};

export default Editor;
