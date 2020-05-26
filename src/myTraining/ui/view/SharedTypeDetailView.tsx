import React from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { Form, Table } from 'semantic-ui-react';
import { SearchFilterType } from 'shared/model';
import { PersonalCubeModel } from 'personalcube/personalcube/model';
//import { MediaType } from '../../media/model';
//import { MediaService } from '../../../media/stores';
//import { OfficeWebService } from '../../../officeweb/stores';


interface Props {
  // mediaService?: MediaService
  // officeWebService?: OfficeWebService
  approvalCube: PersonalCubeModel
  cubeType: string
  filesMap?: Map<string, any>
  goToVideo: (url: string) => void
}

@inject(mobxHelper.injectFrom('personalCube.mediaService', 'personalCube.officeWebService'))
@observer
@reactAutobind
class SharedTypeDetailView extends React.Component<Props> {

  goToUrl(url: string) {
    window.open(url);
  }

  renderVideo() {
    // const { media } = this.props.mediaService!;
    const { filesMap, goToVideo } = this.props;

    return (
      <>
        <Table.Row>
          <Table.HeaderCell>교육자료</Table.HeaderCell>
          <Table.Cell>
            {/* {
              media && media.mediaContents && media.mediaContents.internalMedias && media.mediaContents.internalMedias.length > 0
                && media.mediaContents.internalMedias.map((internalMedia, index) => (
                  <Form.Field key={`shared-cell-${index}`}>
                    <p><a onClick={() => goToVideo(internalMedia.viewUrl)}>{internalMedia.folderName} | {internalMedia.name} </a></p>
                  </Form.Field>
                ))
            }
            {
              media && media.mediaType === MediaType.LinkMedia && (
                <div className="text2">
                  <a href="#" onClick={() => this.goToUrl(media.mediaContents.linkMediaUrl)}>
                    {media && media.mediaContents && media.mediaContents.linkMediaUrl || ''}
                  </a>
                </div>
              )
            } */}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>참고자료</Table.HeaderCell>
          <Table.Cell>
            {
              filesMap && filesMap.get('reference')
                && filesMap.get('reference').map((foundedFile: DepotFileViewModel, index: number) => (
                  <p key={index}><a onClick={() => depot.downloadDepotFile(foundedFile.id)}>{foundedFile.name}</a></p>
                )) || '-'
            }
          </Table.Cell>
        </Table.Row>
      </>
    );
  }

  renderWebPage() {
    // const { officeWeb } = this.props.officeWebService || {} as OfficeWebService;
    const { filesMap } = this.props;
    return (
      <>
        <Table.Row>
          <Table.HeaderCell>교육자료</Table.HeaderCell>
          <Table.Cell>
            <div className="text2">
              {/* <a href="#" onClick={() => this.goToUrl(officeWeb.webPageUrl)}>
                {officeWeb && officeWeb.webPageUrl || ''}
              </a> */}
            </div>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>참고자료</Table.HeaderCell>
          <Table.Cell>
            {
              filesMap && filesMap.get('reference')
              && filesMap.get('reference').map((foundedFile: DepotFileViewModel, index: number) => (
                <p key={index}><a onClick={() => depot.downloadDepotFile(foundedFile.id)}>{foundedFile.name}</a></p>
              )) || '-'
            }
          </Table.Cell>
        </Table.Row>
      </>
    );
  }

  renderDocuments() {
    const { filesMap } = this.props;
    return (
      <>
        <Table.Row>
          <Table.HeaderCell>교육자료</Table.HeaderCell>
          <Table.Cell>
            {
              filesMap && filesMap.get('officeweb')
              && filesMap.get('officeweb').map((foundedFile: DepotFileViewModel, index: number) => (
                <p key={index}><a onClick={() => depot.downloadDepotFile(foundedFile.id)}>{foundedFile.name}</a></p>
              )) || '-'
            }
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>참고자료</Table.HeaderCell>
          <Table.Cell>
            {
              filesMap && filesMap.get('reference')
              && filesMap.get('reference').map((foundedFile: DepotFileViewModel, index: number) => (
                <p key={index}><a onClick={() => depot.downloadDepotFile(foundedFile.id)}>{foundedFile.name}</a></p>
              )) || '-'
            }
          </Table.Cell>
        </Table.Row>
      </>
    );
  }

  render() {
    //
    const { approvalCube, cubeType } = this.props;

    return (
      <>
        <div className="section-tit">
          <span className="text1">부가정보</span>
        </div>
        <Table className="create">
          <Table.Body>
            {
              (cubeType === 'Video' || cubeType === 'Audio') && (
                this.renderVideo()
              )
            }
            {
              cubeType === 'Documents' && (
                this.renderDocuments()
              )
            }
            {
              cubeType === 'WebPage' && (
                this.renderWebPage()
              )
            }
            <Table.Row>
              <Table.HeaderCell>학습카드 공개여부</Table.HeaderCell>
              <Table.Cell>
                {
                  approvalCube && approvalCube.searchFilter === SearchFilterType.SearchOn ?
                    <div>Yes</div>
                    :
                    <div>No</div>
                }
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </>
    );
  }
}

export default SharedTypeDetailView;
