import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { patronInfo } from '@nara.platform/dock';

import { FileBox, PatronType, ValidationType } from '@nara.drama/depot';
import $ from 'jquery';
import { Form, Icon, Radio } from 'semantic-ui-react';
import { SearchFilterType } from 'shared/model';
import { depotHelper } from 'shared';
import { CollegeService } from 'college/stores';
import { MediaModel, MediaType } from 'personalcube/media/model';
import { MediaService } from 'personalcube/media/stores';
import { PersonalCubeModel } from 'personalcube/personalcube/model';
import { InternalMediaConnectionModel } from '../../../media/model/InternalMediaConnectionModel';


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
  externalId: string = patronInfo.getPatronEmail() || '';
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

  componentDidUpdate(): void {
    //
    const collegeService = this.props.collegeService!;
    const { collegesForPanopto } = collegeService;

    if (collegesForPanopto && collegesForPanopto.length === 1) {
      collegeService.setCollegeForPanopto(collegesForPanopto[0]);
    }

    const { media } = this.props.mediaService!;

    if (media && media.mediaType === MediaType.InternalMedia) {
      this.$drop = $('#drop');
      this.$progressBar = $('#progressBar');

      this.$drop.on('dragenter', (e: any) => { //드래그 요소가 들어왔을떄
        $(e.target).addClass('drag-over');
      }).on('dragleave', (e: any) => { //드래그 요소가 나갔을때
        $(e.target).removeClass('drag-over');
      }).on('dragover', (e: any) => {
        e.stopPropagation();
        e.preventDefault();
      }).on('drop', (e: any) => {

        e.preventDefault();
        $(e.target).removeClass('drag-over');
        const files = e.originalEvent.dataTransfer.files;
        let len = files.length;
        if (this.isSingleUpload) len = 1;
        for (let i = 0; i < len; i++) {
          const file = files[i];
          if (this.isSingleUpload) this.uploadFiles = [];
          const size = this.uploadFiles.push(file);
          this.preview(file, size - 1);
        }
      });

      const uploadStatus = {
        total: 0,
        count: 0,
      };
      $('#btnSubmit').on('click', (e: any) => {
        if (!this.ing) {
          let nextStep = true;
          $('input[name=sessionNames]').each((i: number, item: any) => {
            if (item.value === '') {
              alert('세션명을 입력해주세요.');
              nextStep = false;
            } else {
              this.sessionNames.push(item.value);
            }
          });
          if (nextStep) {
            this.value = '파일을 올리고 있습니다.';

            $.each(this.uploadFiles, (i: any, file: any) => {
              if (file.upload !== 'disable') uploadStatus.total++;
            });
            this.eachUpload();
          }
        }
      });
      this.$progressBar = $('#progressBar');

      $('#thumbnails').on('click', '.close', (e: any) => {
        const $target = $(e.target);
        const idx: number = Number($target.attr('data-idx'));
        this.uploadFiles[idx].upload = 'disable';
        $target.parent().remove();
      });
    }
  }

  eachUpload() {
    const file = this.uploadFiles.shift();

    const sessionName = this.sessionNames.shift();
    if (file === undefined) {
      setTimeout(() => {
        /* #############################
        *###############################
        *###############################
        *###### 완료 후 콜백 함수 넣는 곳. #####
        */

        /*
        *###############################
        *###############################
        ###############################*/
        alert('업로드가 완료되었습니다.');
        // iframe 인 경우 parent.함수명 호출
        // local broswer 인 경우 내장 함수명 바로 호출
        $('.thumb').remove();
        this.ing = false;
        $('#btnSubmit').val('업로드');
        this.setProgress(0);
        this.uploadResult = [];
      }, 300);
      return;
    }
    if (file.upload === 'disable') {
      this.eachUpload();
      return;
    }
    const formData = new FormData();
    formData.append('uploadfile', file, file.name);
    formData.append('sessionNames', sessionName);
    //    formData.append('folderId', this.state.folderId);
    formData.append('externalId', this.externalId);
    formData.append('cookie', this.cookie);
    const $selfProgress = file.target.find('progress'); //File 객체에 저장해둔 프리뷰 DOM의 progress 요소를 찾는다.

    const clazzThis = this;
    $.ajax({
      url: this.uploadUrl,
      data: formData,
      type: 'post',
      contentType: false,
      processData: false,
      xhr() { //XMLHttpRequest 재정의 가능
        // @ts-ignore
        const xhr = $.ajaxSettings.xhr();
        xhr.upload.onprogress = (e: any) => { //progress 이벤트 리스너 추가
          const percent = e.loaded * 100 / e.total;
          $selfProgress.val(percent); //개별 파일의 프로그레스바 진행
        };
        return xhr;
      },
      success(ret: any) {
        // setTimeout(clazzThis.eachUpload, 500); //다음 파일 업로드
        clazzThis.setData(ret);
        // console.log(ret);
        if (ret.boolResult) clazzThis.uploadResult.push(ret.obj.list);

      },
    });
  }

  preview(file: File, idx: number) {
    const reader = new FileReader();
    reader.onload = ((f: any, idx: number) => (e: any) => {
      const $div = $('<div class="thumb">\n'
        + '세션명:<input type="text" name="sessionNames" value="" placeholder="세션명"> <p class="file_name">파일명: ' + f.name + ' </p>\n'
        + '<a class="close" data-idx="' + idx + '">x</a>\n'
        + '<progress value="0" max="100" ></progress>\n'
        + '</div>');
      if (this.isSingleUpload) $('#thumbnails').html('');
      $('#thumbnails').append($div);
      f.target = $div;
    })(file, idx);
    reader.readAsDataURL(file);
  }

  makeCollegeOption() {
    const { collegeService } = this.props;
    const { collegesForPanopto } = collegeService || {} as CollegeService;
    const collegeOption: any[] = [];
    collegesForPanopto.map((college, index) => {
      collegeOption.push({ key: index, text: college.name, value: college.panoptoFolderId });
    });

    return collegeOption;
  }


  setProgress(per: any) {
    this.$progressBar.val(per);
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

  setData(ret: any) {
    //
    const mediaService = this.props.mediaService!;

    if (ret.boolResult && ret.obj && ret.obj.list) {
      const internalMediaList: InternalMediaConnectionModel[] = [];
      if (Array.isArray(ret.obj.list)) {
        Promise.resolve()
          .then(() => {
            ret.obj.list.map((list: any) => {
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
            disabled={
              media.internalMedias && media.internalMedias.length > 0 && media.mediaType !== 'InternalMedia'
              || media.linkMediaUrl.length > 0
            }
          />
          <Radio
            className="base"
            label="오디오 링크"
            value={MediaType.LinkMedia}
            checked={media && media.mediaType === 'LinkMedia'}
            onChange={(e: any, data: any) => onChangeMediaProps('mediaType', data.value)}
            disabled={media.internalMedias && media.internalMedias.length > 0 && media.mediaType !== 'LinkMedia' }
          />
          <div className="ui form">
            {
              media && media.mediaType === MediaType.InternalMedia && (
                <>
                  {
                    media && media.mediaContents && media.mediaContents.internalMedias && media.mediaContents.internalMedias.length
                    && (
                      <div className="ui input h48 file">
                        {
                          media.mediaContents.internalMedias.map((internalMedia: InternalMediaConnectionModel, index: number) => (
                            /*<p key={index}>{internalMedia.name} | {internalMedia.folderName}</p>*/
                            <input
                              type="text"
                              key={index}
                              value={internalMedia.name}
                              readOnly
                            />
                          )) || null
                        }
                        <Icon className="clear link" />
                        <input type="file" id="hidden-new-file" />
                      </div>
                    )
                    || (
                      <div className="round-wrap file-drop-wrap">
                        {
                          media && media.mediaContents && media.mediaContents.internalMedias && (
                            <div className="file-drop" id="drop">
                              <p>
                                <Icon className="upload" />
                                여기로 파일을 올려주세요.
                              </p>
                              <div className="thumbnails" id="thumbnails">
                                <progress id="progressBar" value="0" max="100" style={{ width: '100%' }} />
                              </div>
                              <div className="bottom">
                                <input type="button" className="btn btn-default" id="btnSubmit" value="업로드" />
                              </div>
                            </div>
                          ) || null
                        }
                      </div>
                    )
                  }
                </>
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
                validations={[{ type: ValidationType.Duplication, validator: depotHelper.duplicationValidator }]}
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
            value={SearchFilterType.SearchOn}
            checked={personalCube && personalCube.searchFilter === SearchFilterType.SearchOn}
            onChange={(e: any, data: any) => onChangePersonalCubeProps('searchFilter', data.value)}
          />
          <Radio
            className="base"
            label="비공개"
            name="radioGroup"
            value={SearchFilterType.SearchOff}
            checked={personalCube && personalCube.searchFilter === SearchFilterType.SearchOff}
            onChange={(e: any, data: any) => onChangePersonalCubeProps('searchFilter', data.value)}
          />
        </Form.Field>
      </>
    );
  }
}

export default CreateAudioTypeView;

