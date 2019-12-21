
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Label, Icon, Button } from 'semantic-ui-react';


interface Props {
  fileBoxId: string,
}

@reactAutobind
class FileDownload extends Component<Props> {
  //
  render() {
    //
    const { fileBoxId } = this.props;
    if (!fileBoxId) return null;

    return (
      <div className="download-file">
        <div className="label-wrap">
          <Label className="onlytext size24">
            <Icon className="file2" /><span>Download the learning materials that come with this class.</span>
          </Label>
        </div>
        <div className="btn-wrap">
          <Button icon className="left icon-big-line2"><Icon className="download2" /><span>Download File</span></Button>
        </div>
      </div>
    );
  }
}

export default FileDownload;
