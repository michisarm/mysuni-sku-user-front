
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import depot from '@nara.drama/depot';
import { Label, Icon, Button, Modal, Table, Checkbox } from 'semantic-ui-react';


interface Props {
  fileBoxIds: string[],
}

interface State {
  open: boolean
  files: any[]
  checkedFileIds: string[]
}

@reactAutobind
class FileDownload extends Component<Props, State> {
  //
  state = {
    open: false,
    files: [],
    checkedFileIds: [],
  };


  init() {
    const { fileBoxIds } = this.props;
    const files: any[] = [];

    const boxIds = fileBoxIds.filter(id => id);
    if (boxIds.length) {
      Promise.all(
        boxIds.map(fileBoxId => depot.getDepotFiles(fileBoxId))
      ).then(filesArr => {
        if (filesArr.length) {
          filesArr.forEach(fileList => {
            if (Array.isArray(fileList)) files.concat(fileList);
            else files.push(fileList);
          });
        }
      });

      this.setState({ files });
    }
  }

  show() {
    this.setState({ open: true }, this.init);
  }

  close() {
    this.setState({ open: false, checkedFileIds: [], files: []});
  }

  onDownload() {
    //
    const { checkedFileIds } = this.state;
    if (checkedFileIds && checkedFileIds.length) depot.downloadDepotFiles(checkedFileIds);
    this.close();
  }

  onSelectFile(fileId: string) {
    //
    let { checkedFileIds }: State = this.state;

    if (checkedFileIds.includes(fileId)) {
      const index = checkedFileIds.findIndex(checkedId => checkedId === fileId);
      checkedFileIds =  checkedFileIds.slice(0, index).concat(checkedFileIds.slice(index + 1));
    }
    else {
      checkedFileIds.push(fileId);
    }

    this.setState({ checkedFileIds });
  }

  onCheckAll(checked: boolean) {
    //
    const { files }: State = this.state;
    if (checked) this.setState({ checkedFileIds: files.map(file => file.id) });
    else this.setState({ checkedFileIds: []});
  }

  render() {
    //
    const { fileBoxIds } = this.props;
    const boxIds = fileBoxIds.filter(id => id);
    if (!boxIds || !boxIds.length) return null;

    const { open, files, checkedFileIds }: State = this.state;

    return (
      <div className="download-file">
        <div className="label-wrap">
          <Label className="onlytext size24">
            <Icon className="file2" /><span>Download the learning materials that come with this class.</span>
          </Label>
        </div>
        <div className="btn-wrap">
          <Modal
            open={open}
            onOpen={this.show}
            onClose={this.close}
            className="base w700"
            trigger={<Button icon className="left icon-big-line2"><Icon className="download2" /><span>Download File</span></Button>}
          >
            <Modal.Header className="res">
              Download
              <span className="sub f12">다운로드 받으실 항목을 선택해 주세요.</span>
            </Modal.Header>
            <Modal.Content>
              <div className="scrolling-60vh">
                <Table className="head-fix ml-05-p03">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell scope="col">
                        <Checkbox
                          className="black"
                          checked={checkedFileIds.length === files.length}
                          onChange={(e, data: any) => this.onCheckAll(data.checked)}
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell scope="col">File Name</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {
                      files && files.length
                      && files.map((file: any) => (
                        <Table.Row>
                          <Table.Cell>
                            <Checkbox
                              checked={checkedFileIds.includes(file.id)}
                              onChange={() => this.onSelectFile(file.id) }
                            />
                          </Table.Cell>
                          <Table.Cell><span>{file.name}</span></Table.Cell>
                        </Table.Row>
                      )) || null
                    }
                  </Table.Body>
                </Table>
              </div>
            </Modal.Content>
            <Modal.Actions className="actions2">
              <Button className="pop2 d" onClick={this.close}>Cancel</Button>
              <Button className="pop2 p" onClick={this.onDownload}>Select Download</Button>
            </Modal.Actions>
          </Modal>
        </div>
      </div>
    );
  }
}

export default FileDownload;
