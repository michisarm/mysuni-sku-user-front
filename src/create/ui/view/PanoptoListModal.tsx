import React from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';

import { Button, Form, Icon, Modal, Pagination, Radio, Table } from 'semantic-ui-react';
import { SharedService } from 'shared';
import { MediaService } from 'personalcube/media';
import { InternalMediaConnectionModel } from '../../../personalcube/media/model/InternalMediaConnectionModel';


interface Props {
  mediaService?: MediaService
  sharedService?: SharedService
}

interface States {
  open: boolean
}

@inject(mobxHelper.injectFrom(
  'personalCube.mediaService',
  'shared.sharedService',
))
@observer
@reactAutobind
class PanoptoListModal extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    this.findAllPanoptos(1);
  }

  findAllPanoptos(page?: number) {
    const { sharedService, mediaService } = this.props;
    const { panoptoCdo } = this.props.mediaService || {} as MediaService;
    if (sharedService && mediaService) {
      if (page) {
        sharedService.setPage('panopto', page);
        mediaService.changePanoptoCdoProps('currentPage', page);
      } else sharedService.setPageMap('panopto', 0, Number(panoptoCdo.page_size));
      mediaService.findPanoptoList()
        .then(() => {
          sharedService.setCount('panopto', mediaService.panoptos.totalCount);
        });
    }
  }

  show(open: boolean) {
    //
    this.setState({ open });
  }

  selectPanopto(panopto: InternalMediaConnectionModel) {
    const { mediaService } = this.props;
    if (mediaService) mediaService.setPanoptoProps(panopto);
  }

  handleOK() {
    const { mediaService } = this.props;
    const { panopto } = this.props.mediaService || {} as MediaService;
    if (mediaService) {
      mediaService.changeMediaProps('mediaContents.internalMedias', [panopto]);
      this.show(false);
    }
  }

  handleCancel() {
    //
    this.show(false);
  }

  goToVieo(url: string) {
    //
    window.open(url);
  }

  render() {
    const { panoptos, media, panopto: selectedPanopto } = this.props.mediaService || {} as MediaService;
    const { pageMap } = this.props.sharedService || {} as SharedService;
    const { open } = this.state;
    const results = panoptos && panoptos.results;
    const totalCount = panoptos && panoptos.totalCount;
    return (
      <>
        <div className="ui input file">
          {
            media.getInternalMedias.length
             && media.getInternalMedias.map((internalMedia: InternalMediaConnectionModel, index: number) => (
               <input
                 type="text"
                 key={index}
                 value ={internalMedia.name}
                 readOnly
               />
             ))
          || (
          <input
            type="text"
            placeholder="영상을 업로드해주세요."
            readOnly
          />
          )
          }
          <Icon className="clear link" />
          <label htmlFor="hidden-new-file" className="ui button" onClick={() => this.show(true)}>파일찾기</label>
        </div>
        <Modal className="base w700" open={open} onClose={() => this.show(false)}>
          <Modal.Header className="res">
            File Upload
            <span className="sub f12">업로드 하실 항목을 선택해 주세요.</span>
          </Modal.Header>
          <Modal.Content>
            <div className="scrolling-60vh">
              <Table className="head-fix cr-03-p01">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell scope="col" />
                    <Table.HeaderCell scope="col">File Name</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {
                    results && results.length
                    && results.map((panopto, index) => (
                      <Table.Row key={index}>
                        <Table.Cell textAlign="center">
                          <Form.Field
                            control={Radio}
                            onChange={() => this.selectPanopto(panopto)}
                            checked={selectedPanopto && selectedPanopto.panoptoSessionId === panopto.panoptoSessionId}
                          />
                        </Table.Cell>
                        <Table.Cell>{panopto.name}</Table.Cell>
                        {/* <Table.Cell>{panopto.duration}</Table.Cell>
                        <Table.Cell>{panopto.folderName}</Table.Cell>
                        <Table.Cell>
                          <Button onClick={() => this.goToVieo(panopto.viewUrl)}>Play</Button>
                        </Table.Cell>*/}
                      </Table.Row>
                    )) || null
                  }
                </Table.Body>
              </Table>
              {
                totalCount === 0 ?
                  null :
                  <div className="center">
                    <Pagination
                      activePage={pageMap.get('panopto') ? pageMap.get('panopto').page : 1}
                      totalPages={pageMap.get('panopto') ? pageMap.get('panopto').totalPages : 1}
                      onPageChange={(e, data) => this.findAllPanoptos(data.activePage as number)}
                    />
                  </div>
              }
            </div>
            {/* <div className="right-filter">
              <select className="ui small-border dropdown">
                <option value="All">내 폴더</option>
                <option value="a">내 컬리지 폴더</option>
                <option value="b">내 회사 컬리지 폴더</option>
              </select>
            </div>*/}
          </Modal.Content>
          <Modal.Actions className="actions2">
            <Button className="pop2 d" onClick={() => this.handleCancel()} type="button">Cancel</Button>
            <Button className="pop2 p" primary onClick={() => this.handleOK()} type="button">OK</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default PanoptoListModal;
