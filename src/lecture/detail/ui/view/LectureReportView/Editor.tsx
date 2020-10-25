import React from 'react';
import ReactQuill from 'react-quill';
import { LectureReport, StudentReport } from 'lecture/detail/viewModel/LectureReport';

interface EditorProps {lectureReport:LectureReport;setLectureReport:(reportValue:LectureReport) => void;
}

const Editor: React.FC<EditorProps> = function Editor({lectureReport,setLectureReport}) {
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
    if (html && html.length < 1000000000000000) {
      //TODO : 코드 리뷰 후 개선 필요
      const studentReport: StudentReport = lectureReport.studentReport||{};
      studentReport.homeworkContent= html;
      lectureReport.studentReport = studentReport;
      setLectureReport(lectureReport);
    } else {
      alert('html 작성 오류');
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

  return <ReactQuill theme="snow" modules={modules} formats={formats} value={lectureReport?.studentReport?.homeworkContent||''} onChange={handleChange} />;
};

export default Editor;
