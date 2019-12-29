import * as React from 'react';
import { Form, Icon, Radio } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { FileBox, PatronType } from '@nara.drama/depot';
import { SearchFilter } from 'shared';
import { MediaModel, MediaType } from '../../../personalcube/media';
import { PersonalCubeModel } from '../../../personalcube/personalcube';
import PanoptoListModal from './PanoptoListModal';

interface Props {
  handleChangeSearchFilter:(e: any, data: any) => void
  searchFilter: string
  media: MediaModel
  onChangeMediaProps: (name: string, value: string | Date, nameSub?: string) => void
  getFileBoxIdForReference: (fileBoxId: string) => void
  personalCube: PersonalCubeModel
}

interface States {
  createMovieDetailModalOpen : boolean
}

@observer
@reactAutobind
class CreateVideoTypeView  extends React.Component<Props, States> {

  constructor(props: Props) {
    super(props);
    this.state = {
      createMovieDetailModalOpen: false,
    };
  }

  onChangeCreateMovieDetailModalOpen(createMovieDetailModalOpen: boolean) {
    this.setState({ createMovieDetailModalOpen });
  }

  render() {
    const {  handleChangeSearchFilter, searchFilter, onChangeMediaProps, media, getFileBoxIdForReference, personalCube } = this.props;
    const { createMovieDetailModalOpen } = this.state;
    const uploadURL = process.env.NODE_ENV === 'development' ? '/panoptoindex.html' : '/manager/panoptoindex.html';
    return (
      <>
        <hr className="dividing" />

        <div className="section-tit">
          <span className="text1">부가정보</span>
        </div>
        <Form.Field>
          <label className="necessary">교육자료</label>

          <Radio
            className="base"
            label="영상 가져오기"
            value={MediaType.InternalMedia}
            checked={media && media.mediaType === 'InternalMedia'}
            onChange={(e: any, data: any) => onChangeMediaProps('mediaType', data.value)}
          />
          <Radio
            className="base"
            label="제작영상 가져오기"
            value={MediaType.InternalMediaUpload}
            checked={media && media.mediaType === 'InternalMediaUpload'}
            onChange={(e: any, data: any) => onChangeMediaProps('mediaType', data.value)}
          />
          <Radio
            className="base"
            label="영상링크"
            value={MediaType.LinkMedia}
            checked={media && media.mediaType === 'LinkMedia'}
            onChange={(e: any, data: any) => onChangeMediaProps('mediaType', data.value)}
          />
          <div className="ui form">
            {
              media && media.mediaType === MediaType.InternalMedia && (
                <div className="ui input file">
                  <input
                    type="text"
                    placeholder="영상을 업로드해주세요."
                    readOnly
                  />
                  <Icon className="clear link" />
                  <label htmlFor="hidden-new-file" className="ui button" onClick={() => window.open(uploadURL)}>파일찾기</label>
                  <input type="file" id="hidden-new-file" />
                </div>
              )
            }
            {
              media && media.mediaType === MediaType.InternalMediaUpload && (
                <PanoptoListModal />
              )
            }
            {
              media && media.mediaType === MediaType.LinkMedia  && (
                <div className="ui input h48">
                  <input
                    type="text"
                    name=""
                    placeholder="http://"
                    value={media && media.mediaContents && media.mediaContents.linkMediaUrl || ''}
                    onChange={(e: any) => onChangeMediaProps('mediaContents.linkMediaUrl', e.target.value)}
                  />
                </div>
              )
            }
            <div className="info-text"><Icon className="info16" />
              <span className="blind">infomation</span>
              교육자료로 제공될 파일을 등록하실 수 있습니다. / 최대 000 Byte 용량의 파일을 등록하실 수 있습니다.
            </div>
          </div>
        </Form.Field>

        <Form.Field>
          <label>참고자료</label>
          <FileBox
            patronType={PatronType.Audience}
            patronKeyString="sampleAudience"
            onChange={getFileBoxIdForReference}
            pavilionId="samplePavilion"
            id={personalCube && personalCube.contents && personalCube.contents.fileBoxId}
          />
        </Form.Field>

        <Form.Field>
          <label className="necessary">학습카드 공개여부</label>
          <Radio
            className="base"
            label="공개"
            name="radioGroup"
            value={SearchFilter.SearchOn}
            onChange={handleChangeSearchFilter}
            checked = {searchFilter === SearchFilter.SearchOn}
          />
          <Radio
            className="base"
            label="비공개"
            name="radioGroup"
            value={SearchFilter.SearchOff}
            onChange={handleChangeSearchFilter}
            checked = {searchFilter === SearchFilter.SearchOff}
          />
        </Form.Field>
      </>
    );
  }
}

export default CreateVideoTypeView;

