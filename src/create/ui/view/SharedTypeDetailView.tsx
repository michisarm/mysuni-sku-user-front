import { Table } from 'semantic-ui-react';
import * as React from 'react';
import { mobxHelper, SearchFilter } from 'shared';
import { PersonalCubeModel } from 'personalcube/personalcube';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { MediaService, MediaType } from '../../../personalcube/media';

interface Props {
  personalCube: PersonalCubeModel
  cubeType: string
  mediaService?: MediaService
}

@inject(mobxHelper.injectFrom('personalCube.mediaService'))
@observer
@reactAutobind
class SharedTypeDetailView extends React.Component<Props> {
  render() {
    const { personalCube } = this.props;
    const { media } = this.props.mediaService || {} as MediaService;

    return (
      <>
        <div className="section-tit">
          <span className="text1">부가정보</span>
        </div>


        <Table className="create">
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell>교육자료</Table.HeaderCell>
              <Table.Cell>
                {
                  media && media.mediaType === MediaType.InternalMedia ? (
                    <Table.Cell>
                      <Table celled>
                        <colgroup>
                          <col width="100%" />
                        </colgroup>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell textAlign="center">파일명</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>SK_university_ADMIN_MMI.ppt  +++</Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Table.Cell>
                  ) : ''
                }
                {
                  media && media.mediaType === MediaType.LinkMedia ? (
                    <div className="text2">
                      <a href="#">
                        {media && media.mediaContents && media.mediaContents.linkMediaUrl || ''}
                      </a>
                    </div>
                  ) : ''
                }
                {
                  media && media.mediaType === MediaType.InternalMediaUpload ? (
                    <>
                      <div className="text2">
                        <a href="#">
                          {
                          media && media.mediaContents && media.mediaContents.contentsProvider
                          && media.mediaContents.contentsProvider && media.mediaContents.contentsProvider.contentsProviderType
                          && media.mediaContents.contentsProvider.contentsProviderType.name || ''
                        }
                        </a>
                      </div>
                      <div className="text2">
                        <a href="#">
                          {media && media.mediaContents && media.mediaContents.contentsProvider && media.mediaContents.contentsProvider.url || ''}
                        </a>
                      </div>
                    </>
                  ) : ''
                }
                {/*<div className="text2"><a href="#">Education UX/UI class_1.avi</a></div>*/}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>참고자료</Table.HeaderCell>
              <Table.Cell>
                <div className="text2"><a href="#">Education UX/UI class_1.avi</a></div>
                <div className="text2"><a href="#">Education UX/UI class_1.avi</a></div>
                <div className="text2"><a href="#">Education UX/UI class_1.avi</a></div>
                <div className="text2"><a href="#">Education UX/UI class_1.avi</a></div>
                <div className="text2"><a href="#">Education UX/UI class_1.avi</a></div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>학습카드 공개여부</Table.HeaderCell>
              <Table.Cell>
                {
                  personalCube && personalCube.searchFilter === SearchFilter.SearchOn ?
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
