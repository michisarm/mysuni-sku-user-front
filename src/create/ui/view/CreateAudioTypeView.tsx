import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import * as React from 'react';
import { Form, Icon, Radio } from 'semantic-ui-react';
import { SearchFilter } from 'shared-model';
import { MediaModel, MediaType } from '../../../personalcube/media';

interface Props {
  handleChangeSearchFilter:(e: any, data: any) => void
  searchFilter: string
  onChangeMediaProps: (name: string, value: string | Date, nameSub?: string) => void
  media: MediaModel
}

@observer
@reactAutobind
class CreateAudioTypeView extends React.Component<Props> {
  render() {

    const { handleChangeSearchFilter, searchFilter, onChangeMediaProps, media } = this.props;

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
            label="오디오 파일 업로드"
            value={MediaType.InternalMedia}
            checked={media && media.mediaType === 'InternalMedia'}
            onChange={(e: any, data: any) => onChangeMediaProps('mediaType', data.value)}
          />
          <Radio
            className="base"
            label="오디오 파일 링크"
            value={MediaType.LinkMedia}
            checked={media && media.mediaType === 'LinkMedia'}
            onChange={(e: any, data: any) => onChangeMediaProps('mediaType', data.value)}
          />
          <div className="ui form">
            <div className="ui input file">
              {
                media && media.mediaType === MediaType.InternalMedia ? (
                  <input type="text" readOnly placeholder="오디오 파일을 업로드해주세요." />
                ) :
                  (
                    <input type="text" readOnly placeholder="http://" />
                  )
              }
              <Icon className="clear link" />
              <label htmlFor="hidden-new-file" className="ui button">파일찾기</label>
              <input type="file" id="hidden-new-file" />
            </div>
            <div className="info-text"><Icon className="info16" />
              <span className="blind">infomation</span>
              교육자료로 제공될 파일을 등록하실 수 있습니다. / 최대 000 Byte 용량의 파일을 등록하실 수 있습니다.
            </div>
          </div>
        </Form.Field>

        <Form.Field>
          <label>참고자료</label>
          <div className="round-wrap2">
            <div className="top text">
              <ul>
                <li><span className="empty">파일을 업로드해주세요.</span></li>
              </ul>
            </div>
            <div className="bottom">
              <span className="text1"><Icon className="info16" />
                <span className="blind">infomation</span>
DOC, PPT, PDF, XLS 파일을 등록하실 수 있습니다. / 최대 000 Byte 용량의 파일을 등록하실 수 있습니다. / 참고자료는 다수의 파일을 등록할 수 있습니다.
              </span>
              <div className="right-btn">
                <div className="ui input file2">
                  <label htmlFor="hidden-new-file" className="ui button">파일찾기</label>
                  <input type="file" id="hidden-new-file2" />
                </div>
              </div>
            </div>
          </div>
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

export default CreateAudioTypeView;

