import * as React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import ReactQuill from 'react-quill';
import { PostModel } from '../../model/PostModel';

interface Props {
  post: PostModel
  onChangeContentsProps: (name: string, value: string) => void
}

interface States {
  editorHtml: string
}

@reactAutobind
class Editor extends React.Component<Props, States> {
  //
  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
  ];

  modules = {
    toolbar: [
      [{ header: [1, 2, 3, false]}],
      ['bold', 'italic', 'underline', 'trike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  render() {
    const { post, onChangeContentsProps } = this.props;
    return (
      <ReactQuill theme="snow"
        modules={this.modules}
        formats={this.formats}
        onChange={html => onChangeContentsProps('contents.contents', html)}
        value={post && post.contents && post.contents.contents || ''}
      />
    );
  }
}

export default Editor;
