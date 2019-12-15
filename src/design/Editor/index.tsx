import React, { Component } from 'react';
import { Segment, Container, Form, Select, Input, TextArea, Checkbox, Divider } from 'semantic-ui-react';
// import ButtonGroup from '../ButtonGroup'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

class Editor extends React.Component {

  modules = {
    toolbar: [
      [{ header: [1, 2, 3, false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
  ];

  constructor(props : any) {
    super(props);
    this.state = {
      // text: '',
    };
  }

  render() {
    return (
      <ReactQuill theme="snow"
        modules={this.modules}
        formats={this.formats}
      />
    );
  }
}

export default Editor;
