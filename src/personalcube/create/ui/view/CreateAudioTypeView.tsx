import React from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
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
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';

interface Props {
  onChangePersonalCubeProps: (name: string, value: string | {} | []) => void;
  onChangeMediaProps: (
    name: string,
    value: string | Date | [],
    nameSub?: string
  ) => void;
  media: MediaModel;
  getFileBoxIdForReference: (fileBoxId: string) => void;
  personalCube: PersonalCubeModel;
  mediaService?: MediaService;
  collegeService?: CollegeService;
}

@inject(
  mobxHelper.injectFrom('college.collegeService', 'personalCube.mediaService')
)
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

      this.$drop
        .on('dragenter', (e: any) => {
          //????????? ????????? ???????????????
          $(e.target).addClass('drag-over');
        })
        .on('dragleave', (e: any) => {
          //????????? ????????? ????????????
          $(e.target).removeClass('drag-over');
        })
        .on('dragover', (e: any) => {
          e.stopPropagation();
          e.preventDefault();
        })
        .on('drop', (e: any) => {
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
              alert('???????????? ??????????????????.');
              nextStep = false;
            } else {
              this.sessionNames.push(item.value);
            }
          });
          if (nextStep) {
            this.value = '????????? ????????? ????????????.';

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
         *###### ?????? ??? ?????? ?????? ?????? ???. #####
         */

        /*
        *###############################
        *###############################
        ###############################*/
        alert('???????????? ?????????????????????.');
        // iframe ??? ?????? parent.????????? ??????
        // local broswer ??? ?????? ?????? ????????? ?????? ??????
        $('.thumb').remove();
        this.ing = false;
        $('#btnSubmit').val('?????????');
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
    const $selfProgress = file.target.find('progress'); //File ????????? ???????????? ????????? DOM??? progress ????????? ?????????.

    const clazzThis = this;
    $.ajax({
      url: this.uploadUrl,
      data: formData,
      type: 'post',
      contentType: false,
      processData: false,
      xhr() {
        //XMLHttpRequest ????????? ??????
        // @ts-ignore
        const xhr = $.ajaxSettings.xhr();
        xhr.upload.onprogress = (e: any) => {
          //progress ????????? ????????? ??????
          const percent = (e.loaded * 100) / e.total;
          $selfProgress.val(percent); //?????? ????????? ?????????????????? ??????
        };
        return xhr;
      },
      success(ret: any) {
        // setTimeout(clazzThis.eachUpload, 500); //?????? ?????? ?????????
        clazzThis.setData(ret);
        reactAlert({ title: '??????', message: '???????????? ?????????????????????.' });
        if (ret.boolResult) clazzThis.uploadResult.push(ret.obj.list);
      },
    });
  }

  preview(file: File, idx: number) {
    const reader = new FileReader();
    reader.onload = ((f: any, idx: number) => (e: any) => {
      const $div = $(
        '<div class="thumb">\n' +
          '?????????:<input type="text" name="sessionNames" value="" placeholder="?????????"> <p class="file_name">?????????: ' +
          f.name +
          ' </p>\n' +
          '<a class="close" data-idx="' +
          idx +
          '">x</a>\n' +
          '<progress value="0" max="100" ></progress>\n' +
          '</div>'
      );
      if (this.isSingleUpload) $('#thumbnails').html('');
      $('#thumbnails').append($div);
      f.target = $div;
    })(file, idx);
    reader.readAsDataURL(file);
  }

  makeCollegeOption() {
    const { collegeService } = this.props;
    const { collegesForPanopto } = collegeService || ({} as CollegeService);
    const collegeOption: any[] = [];
    collegesForPanopto.map((college, index) => {
      collegeOption.push({
        key: index,
        text: parsePolyglotString(college.name),
        value: college.panoptoFolderId,
      });
    });

    return collegeOption;
  }

  setProgress(per: any) {
    this.$progressBar.val(per);
  }

  init() {
    const { collegeService } = this.props;
    const { collegeForPanopto, collegesForPanopto } =
      collegeService || ({} as CollegeService);

    const cineroomId = sessionStorage.getItem('cineroomId');

    if (collegeForPanopto.panoptoFolderId) {
      if (cineroomId === 'ne1-m2-c2') {
        window.localStorage.setItem(
          'externalId',
          collegeForPanopto.panoptoFolderId
        );
      } else {
        window.localStorage.setItem(
          'externalId',
          collegesForPanopto[0].panoptoFolderId
        );
      }
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
              internalMedia.thumbUrl = list.viewerUrl.replace(
                'Viewer',
                'Embed'
              );
              internalMedia.name = list.name;
              internalMedia.startTime = list.startTime;
              internalMedia.folderName = list.folderName;
              internalMedia.duration = list.duration;
              internalMediaList.push(internalMedia);
            });
          })
          .then(() => {
            const newInternalMedias: InternalMediaConnectionModel[] = [
              ...mediaService.media.mediaContents.internalMedias,
            ];
            mediaService.setUploadedPanoptos(internalMediaList);
            mediaService.changeMediaProps(
              'mediaContents.internalMedias',
              internalMediaList.concat(newInternalMedias)
            );
          });
      }
    }
  }

  render() {
    const {
      onChangePersonalCubeProps,
      onChangeMediaProps,
      media,
      getFileBoxIdForReference,
      personalCube,
    } = this.props;

    return (
      <>
        <hr className="dividing" />

        <div className="section-tit">
          <span className="text1">????????????</span>
        </div>
        <Form.Field>
          <label className="necessary">????????????</label>
          <Radio
            className="base"
            label="????????? ?????? ?????????"
            value={MediaType.InternalMedia}
            checked={media && media.mediaType === 'InternalMedia'}
            onChange={(e: any, data: any) => {
              onChangeMediaProps('mediaType', data.value);
              onChangeMediaProps('mediaContents.internalMedias', []);
              onChangeMediaProps('mediaContents.linkMediaUrl', '');
            }}
          />
          <Radio
            className="base"
            label="????????? ??????"
            value={MediaType.LinkMedia}
            checked={media && media.mediaType === 'LinkMedia'}
            onChange={(e: any, data: any) => {
              onChangeMediaProps('mediaType', data.value);
              onChangeMediaProps('mediaContents.internalMedias', []);
              onChangeMediaProps('mediaContents.linkMediaUrl', '');
            }}
          />
          <div className="ui form">
            {media && media.mediaType === MediaType.InternalMedia && (
              <>
                {(media &&
                  media.mediaContents &&
                  media.mediaContents.internalMedias &&
                  media.mediaContents.internalMedias.length && (
                    <div className="ui input h48 file">
                      {media.mediaContents.internalMedias.map(
                        (
                          internalMedia: InternalMediaConnectionModel,
                          index: number
                        ) => (
                          /*<p key={index}>{internalMedia.name} | {internalMedia.folderName}</p>*/
                          <input
                            type="text"
                            key={index}
                            value={internalMedia.name}
                            readOnly
                          />
                        )
                      ) || null}
                      <Icon className="clear link" />
                      <input type="file" id="hidden-new-file" />
                    </div>
                  )) || (
                  <div className="round-wrap file-drop-wrap">
                    {(media &&
                      media.mediaContents &&
                      media.mediaContents.internalMedias && (
                        <div className="file-drop" id="drop">
                          <p>
                            <Icon className="upload" />
                            ????????? ????????? ???????????????.
                          </p>
                          <div className="thumbnails" id="thumbnails">
                            <progress
                              id="progressBar"
                              value="0"
                              max="100"
                              style={{ width: '100%' }}
                            />
                          </div>
                          <div className="bottom">
                            <input
                              type="button"
                              className="btn btn-default"
                              id="btnSubmit"
                              value="?????????"
                            />
                          </div>
                        </div>
                      )) ||
                      null}
                  </div>
                )}
              </>
            )}
            {media && media.mediaType === MediaType.LinkMedia && (
              <div className="ui input h48">
                <input
                  type="text"
                  name=""
                  placeholder="http://"
                  value={
                    (media &&
                      media.mediaContents &&
                      media.mediaContents.linkMediaUrl) ||
                    ''
                  }
                  onChange={(e: any) =>
                    onChangeMediaProps(
                      'mediaContents.linkMediaUrl',
                      e.target.value
                    )
                  }
                />
              </div>
            )}
            <div className="info-text">
              <Icon className="info16" />
              <span className="blind">infomation</span>
              ??????????????? ????????? ????????? ???????????? ??? ????????????. / ?????? 1Gbyte
              ????????? ????????? ???????????? ??? ????????????.
            </div>
          </div>
        </Form.Field>

        <Form.Field>
          <label>????????????</label>
          <div className="lg-attach">
            <div className="attach-inner">
              <FileBox
                vaultKey={{
                  keyString: 'sample',
                  patronType: PatronType.Audience,
                }}
                patronKey={{
                  keyString: 'sample',
                  patronType: PatronType.Audience,
                }}
                validations={[
                  {
                    type: ValidationType.Duplication,
                    validator: depotHelper.duplicationValidator,
                  },
                ]}
                onChange={getFileBoxIdForReference}
                id={
                  personalCube &&
                  personalCube.contents &&
                  personalCube.contents.fileBoxId
                }
              />
              <div className="bottom">
                <span className="text1">
                  <Icon className="info16" />
                  <span className="blind">information</span>
                  DOC, PPT, PDF, XLS ????????? ???????????? ??? ????????????. / ?????? 10Mbyte
                  ????????? ????????? ???????????? ??? ????????????. / ??????????????? ????????? ?????????
                  ????????? ??? ????????????.
                </span>
              </div>
            </div>
          </div>
        </Form.Field>

        <Form.Field>
          <label className="necessary">???????????? ????????????</label>
          <Radio
            className="base"
            label="??????"
            name="radioGroup"
            value={SearchFilterType.SearchOn}
            checked={
              personalCube &&
              personalCube.searchFilter === SearchFilterType.SearchOn
            }
            onChange={(e: any, data: any) =>
              onChangePersonalCubeProps('searchFilter', data.value)
            }
          />
          <Radio
            className="base"
            label="?????????"
            name="radioGroup"
            value={SearchFilterType.SearchOff}
            checked={
              personalCube &&
              personalCube.searchFilter === SearchFilterType.SearchOff
            }
            onChange={(e: any, data: any) =>
              onChangePersonalCubeProps('searchFilter', data.value)
            }
          />
        </Form.Field>
      </>
    );
  }
}

export default CreateAudioTypeView;
