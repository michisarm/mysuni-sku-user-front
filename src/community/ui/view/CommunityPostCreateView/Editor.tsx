import React from 'react';
import ReactQuill from 'react-quill';
import { getCommunityPostCreateItem, setCommunityPostCreateItem } from 'community/store/CommunityPostCreateStore';

interface EditorProps {
  contents: string;
}

const Editor: React.FC<EditorProps> = function Editor({ contents }) {
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
    if (contents) {
      if (html && html.length < 1000000000000000) {
        const postCreateItem = getCommunityPostCreateItem();
        if (postCreateItem === undefined) {
          return;
        }
        const nextPostCreateItem = { ...postCreateItem, contents:html };
        setCommunityPostCreateItem(nextPostCreateItem);
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

export default Editor;
