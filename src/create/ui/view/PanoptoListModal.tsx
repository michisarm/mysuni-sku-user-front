import * as React from 'react';
import { Button, Checkbox, Form, Icon, Input, Modal, Pagination, Table } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { mobxHelper, SharedService } from 'shared';
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

  addPanopto(panopto: InternalMediaConnectionModel) {
    const { selectedPanoptos, setSeletedPanoptos, setSeletedPanoptoIds } = this.props.mediaService || {} as MediaService;
    const panoptoList: InternalMediaConnectionModel[] = [];
    const panoptoIdList: string[] = [];
    if (selectedPanoptos.length) {
      selectedPanoptos.map(panopto => {
        panoptoList.push(panopto);
        panoptoIdList.push(panopto.panoptoSessionId);
      });
    }

    if (panoptoIdList.indexOf(panopto.panoptoSessionId) !== -1) {
      const index = panoptoIdList.indexOf(panopto.panoptoSessionId);
      const newCardList = panoptoList.slice(0, index).concat(panoptoList.slice(index + 1));
      const newCardIdList = panoptoIdList.slice(0, index).concat(panoptoIdList.slice(index + 1));
      setSeletedPanoptos(newCardList);
      setSeletedPanoptoIds(newCardIdList);
    } else {
      const viewerToEmbedViewURL = panopto.viewUrl.replace('Viewer', 'Embed');
      panopto.viewUrl = viewerToEmbedViewURL;
      panoptoList.push(panopto);
      panoptoIdList.push(panopto.panoptoSessionId);
      setSeletedPanoptos(panoptoList);
      setSeletedPanoptoIds(panoptoIdList);
    }
  }

  handleOK() {
    const { mediaService } = this.props;
    const { selectedPanoptos } = this.props.mediaService || {} as MediaService;
    if (mediaService) {
      const newInternalMedias: InternalMediaConnectionModel[] = [ ...mediaService.media.mediaContents.internalMedias ];
      if (mediaService) {
        mediaService.setSeletedPanoptos(selectedPanoptos);
        mediaService.changeMediaProps('mediaContents.internalMedias', selectedPanoptos.concat(newInternalMedias));
      }
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
    const { panoptos, selectedPanoptoIds, media, panoptoCdo, changePanoptoCdoProps } = this.props.mediaService || {} as MediaService;
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
               /*<p key={index}>{internalMedia.name} | {internalMedia.folderName}</p>*/
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
        {/*{
          media.getInternalMedias.length
          && media.getInternalMedias.map((internalMedia: InternalMediaConnectionModel, index: number) => (
            <p key={index}>{internalMedia.name} | {internalMedia.folderName}</p>
          )) || null
        }*/}
        <Modal size="large" open={open} onClose={() => this.show(false)} className="base w700">
          <Modal.Header>
            동영상 선택
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field
                control={Input}
                width={10}
                placeholder="검색어를 입력해주세요."
                value={panoptoCdo && panoptoCdo.searchQuery || ''}
                onChange={(e: any) => changePanoptoCdoProps('searchQuery', e.target.value)}
              />
              <Form.Field className="center" width={6}>
                <Button primary onClick={() => this.findAllPanoptos()}>Search</Button>
              </Form.Field>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell textAlign="center">Select</Table.HeaderCell>
                    <Table.HeaderCell>제목</Table.HeaderCell>
                    <Table.HeaderCell>재생시간</Table.HeaderCell>
                    <Table.HeaderCell>폴더명</Table.HeaderCell>
                    <Table.HeaderCell>재생</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {
                    results && results.length
                    && results.map((panopto, index) => (
                      <Table.Row key={index}>
                        <Table.Cell textAlign="center">
                          <Form.Field
                            control={Checkbox}
                            onChange={() => this.addPanopto(panopto)}
                            checked={selectedPanoptoIds && selectedPanoptoIds.includes(panopto.panoptoSessionId)}
                          />
                        </Table.Cell>
                        <Table.Cell>{panopto.name}</Table.Cell>
                        <Table.Cell>{panopto.duration}</Table.Cell>
                        <Table.Cell>{panopto.folderName}</Table.Cell>
                        <Table.Cell>
                          <Button onClick={() => this.goToVieo(panopto.viewUrl)}>Play</Button>
                        </Table.Cell>
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
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => this.handleCancel()} type="button">Cancel</Button>
            <Button primary onClick={() => this.handleOK()} type="button">OK</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default PanoptoListModal;
