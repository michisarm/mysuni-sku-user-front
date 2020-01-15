import React from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';

import { FileBox, PatronType } from '@nara.drama/depot';
import { Form, Icon, Radio } from 'semantic-ui-react';
import { SearchFilter } from 'shared';
import { MediaModel, MediaService, MediaType } from 'personalcube/media';
import { PersonalCubeModel } from 'personalcube/personalcube';
import { InternalMediaConnectionModel } from '../../../media/model/InternalMediaConnectionModel';
import { CollegeService } from '../../../../college';

interface Props {
  onChangePersonalCubeProps: (name: string, value: string | {} | []) => void
  onChangeMediaProps: (name: string, value: string | Date, nameSub?: string) => void
  media: MediaModel
  getFileBoxIdForReference: (fileBoxId: string) => void
  personalCube: PersonalCubeModel
  mediaService?: MediaService
  collegeService?: CollegeService
}

@inject(mobxHelper.injectFrom('college.collegeService', 'personalCube.mediaService'))
@observer
@reactAutobind
class CreateAudioTypeView extends React.Component<Props> {
  //

  isSingleUpload = true;
  // folderId: string = getCookie('folderId');
  folderId: string = '1b950b59-1f4f-409a-80ef-ab19008a4231';
  // folderId = window.opener.localStorage.getItem('folderId');
  externalId: string = '';
  uploadUrl: string = 'https://panopto.mysuni.sk.com/pt/s3_upload_once';
  cookie: string = '';
  uploadResult: any[] = [];

  uploadFiles: any[] = [];
  sessionNames: any[] = [];
  ing: boolean = false;
  value: string = '';

  $drop: any = null;

  $progressBar: any = null;

  uploadStatus: any = {
    total: 0,
    count: 0,
  };

  componentDidMount(): void {
    this.init();
    window.onmessage = this.setData;
  }

  init() {
    const { collegeService } = this.props;
    const { collegeForPanopto, collegesForPanopto } = collegeService || {} as CollegeService;

    const cineroomId = sessionStorage.getItem('cineroomId');

    if (collegeForPanopto.panoptoFolderId) {
      if (cineroomId === 'ne1-m2-c2') window.localStorage.setItem('externalId', collegeForPanopto.panoptoFolderId);
      else window.localStorage.setItem('externalId', collegesForPanopto[0].panoptoFolderId);
    }
  }

  setData(e: any) {
    const { mediaService } = this.props;

    if (mediaService && e.data && e.data.boolResult && e.data.obj && e.data.obj.list) {
      const internalMediaList: InternalMediaConnectionModel[] = [ ...mediaService.uploadedPaonoptos ];
      if (Array.isArray(e.data.obj.list)) {
        Promise.resolve()
          .then(() => {
            e.data.obj.list.map((list: any) => {
              const internalMedia = new InternalMediaConnectionModel();
              internalMedia.panoptoSessionId = list.id;
              internalMedia.viewUrl = list.viewerUrl.replace('Viewer', 'Embed');
              internalMedia.thumbUrl = list.viewerUrl.replace('Viewer', 'Embed');
              internalMedia.name = list.name;
              internalMedia.startTime = list.startTime;
              internalMedia.folderName = list.folderName;
              internalMedia.duration = list.duration;
              internalMediaList.push(internalMedia);
            });
          })
          .then(() => {
            const newInternalMedias: InternalMediaConnectionModel[] = [ ...mediaService.media.mediaContents.internalMedias ];
            mediaService.setUploadedPanoptos(internalMediaList);
            mediaService.changeMediaProps('mediaContents.internalMedias', internalMediaList.concat(newInternalMedias));
          });

      }
    }
  }

  render() {

    const { onChangePersonalCubeProps, onChangeMediaProps, media, getFileBoxIdForReference, personalCube } = this.props;
    const { uploadedPaonoptos } = this.props.mediaService || {} as MediaService;
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
            label="오디오 파일 업로드"
            value={MediaType.InternalMedia}
            checked={media && media.mediaType === 'InternalMedia'}
            onChange={(e: any, data: any) => onChangeMediaProps('mediaType', data.value)}
          />
          <Radio
            className="base"
            label="오디오 링크"
            value={MediaType.LinkMedia}
            checked={media && media.mediaType === 'LinkMedia'}
            onChange={(e: any, data: any) => onChangeMediaProps('mediaType', data.value)}
          />
          <div className="ui form">
            {
              media && media.mediaType === MediaType.InternalMedia ? (
                <div className="ui input file">
                  {
                    uploadedPaonoptos && uploadedPaonoptos.length
                    && uploadedPaonoptos.map((internalMedia: InternalMediaConnectionModel, index: number) => (
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
                        placeholder="오디오 파일을 업로드해주세요."
                        readOnly
                      />
                    )
                  }
                  <Icon className="clear link" />
                  <label htmlFor="hidden-new-file" className="ui button" onClick={() => window.open(uploadURL)}>파일찾기</label>
                  <input type="file" id="hidden-new-file" />
                </div>
              ) :
                (
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
              교육자료로 제공될 파일을 등록하실 수 있습니다. / 최대 1Gbyte 용량의 파일을 등록하실 수 있습니다.
            </div>
          </div>
        </Form.Field>

        <Form.Field>
          <label>참고자료</label>
          <div className="lg-attach">
            <div className="attach-inner">
              <FileBox
                vaultKey={{ keyString: 'sample', patronType: PatronType.Audience }}
                patronKey={{ keyString: 'sample', patronType: PatronType.Audience }}
                onChange={getFileBoxIdForReference}
                id={personalCube && personalCube.contents && personalCube.contents.fileBoxId}
              />
              <div className="bottom">
                <span className="text1"><Icon className="info16" />
                  <span className="blind">information</span>
                  DOC, PPT, PDF, XLS 파일을 등록하실 수 있습니다. / 최대 10Mbyte 용량의 파일을 등록하실 수 있습니다. / 참고자료는 다수의 파일을 등록할 수 있습니다.
                </span>
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
            checked={personalCube && personalCube.searchFilter === SearchFilter.SearchOn}
            onChange={(e: any, data: any) => onChangePersonalCubeProps('searchFilter', data.value)}
          />
          <Radio
            className="base"
            label="비공개"
            name="radioGroup"
            value={SearchFilter.SearchOff}
            checked={personalCube && personalCube.searchFilter === SearchFilter.SearchOff}
            onChange={(e: any, data: any) => onChangePersonalCubeProps('searchFilter', data.value)}
          />
        </Form.Field>
      </>
    );
  }
}

export default CreateAudioTypeView;

