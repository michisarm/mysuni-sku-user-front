import React from 'react';
import ReactQuill from 'react-quill';
import { getLectureTaskCreateItem, setLectureTaskCreateItem } from 'lecture/detail/store/LectureTaskCreateStore';

interface EditorProps {
  contents: string;
}

const LectureTaskCreateEditor: React.FC<EditorProps> = function LectureTaskCreateEditor({ contents }) {
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
      const taskCreateItem = getLectureTaskCreateItem();
      if (taskCreateItem === undefined) {
        return;
      }
      const nextTaskCreateItem = { ...taskCreateItem, contents:html };
      setLectureTaskCreateItem(nextTaskCreateItem);
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
  
  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={contents}
      onChange={handleChange}
    />
  );
};

export default LectureTaskCreateEditor;
