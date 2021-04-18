import { CollegeService } from 'college/stores';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { MediaType } from '../../../media/model';
import { patronInfo } from '@nara.platform/dock';
import { reactAlert } from '@nara.platform/accent';
import $ from 'jquery';
import { InternalMediaConnection } from '../../../../lecture/model/InternalMediaConnection';

const isSingleUpload = true;
// externalId: string = 'SKCC.HUG03@sk.com';
const externalId: string = patronInfo.getPatronEmail() || '';
const uploadUrl: string = 'https://panopto.mysuni.sk.com/pt/s3_upload_once';
const cookie: string = '';
let uploadResult: any[] = [];

let uploadFiles: any[] = [];
const sessionNames: any[] = [];
let ing: boolean = false;
let value: string = '';

let $drop: any = null;

let $progressBar: any = null;

export function contentUploader() {
  const { collegesForPanopto, setCollegeForPanopto } = CollegeService.instance;
  const { cubeSdo } = CreateCubeService.instance;

  if (collegesForPanopto && collegesForPanopto.length === 1) {
    setCollegeForPanopto(collegesForPanopto[0]);
  }

  if (
    cubeSdo &&
    cubeSdo.materialSdo?.mediaSdo.mediaType === MediaType.InternalMedia
  ) {
    $drop = $('#drop');
    $progressBar = $('#progressBar');

    $drop
      .on('dragenter', (e: any) => {
        //드래그 요소가 들어왔을떄
        $(e.target).addClass('drag-over');
      })
      .on('dragleave', (e: any) => {
        //드래그 요소가 나갔을때
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
        if (isSingleUpload) len = 1;
        for (let i = 0; i < len; i++) {
          const file = files[i];

          if (isSingleUpload) {
            uploadFiles = [];
          }

          const size = uploadFiles.push(file);
          preview(file, size - 1);
        }
      });

    const uploadStatus = {
      total: 0,
      count: 0,
    };

    $('#btnSubmit').on('click', (e: any) => {
      if (!ing) {
        let nextStep = true;
        $('input[name=sessionNames]').each((i: number, item: any) => {
          if (item.value === '') {
            alert('세션명을 입력해주세요.');
            nextStep = false;
          } else {
            sessionNames.push(item.value);
          }
        });
        if (nextStep) {
          value = '파일을 올리고 있습니다.';

          $.each(uploadFiles, (i: any, file: any) => {
            if (file.upload !== 'disable') {
              uploadStatus.total++;
            }
          });
          eachUpload();
        }
      }
    });
    $progressBar = $('#progressBar');

    $('#thumbnails').on('click', '.close', (e: any) => {
      const $target = $(e.target);
      const idx: number = Number($target.attr('data-idx'));
      uploadFiles[idx].upload = 'disable';
      $target.parent().remove();
    });
  }
}

function eachUpload() {
  const file = uploadFiles.shift();

  const sessionName = sessionNames.shift();
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
      ing = false;
      $('#btnSubmit').val('업로드');
      $progressBar = 0;
      uploadResult = [];
    }, 300);
    return;
  }
  if (file.upload === 'disable') {
    eachUpload();
    return;
  }
  const formData = new FormData();
  formData.append('uploadfile', file, file.name);
  formData.append('sessionNames', sessionName);
  //    formData.append('folderId', this.state.folderId);
  formData.append('externalId', externalId);
  formData.append('cookie', cookie);
  const $selfProgress = file.target.find('progress'); //File 객체에 저장해둔 프리뷰 DOM의 progress 요소를 찾는다.

  $.ajax({
    url: uploadUrl,
    data: formData,
    type: 'post',
    contentType: false,
    processData: false,
    xhr() {
      //XMLHttpRequest 재정의 가능
      // @ts-ignore
      const xhr = $.ajaxSettings.xhr();
      xhr.upload.onprogress = (e: any) => {
        //progress 이벤트 리스너 추가
        const percent = (e.loaded * 100) / e.total;
        $selfProgress.val(percent); //개별 파일의 프로그레스바 진행
      };
      return xhr;
    },
    success(ret: any) {
      // setTimeout(clazzThis.eachUpload, 500); //다음 파일 업로드
      setData(ret);
      reactAlert({ title: '알림', message: '업로드가 완료되었습니다.' });

      if (ret.boolResult) {
        uploadResult.push(ret.obj.list);
      }
    },
  });
}

function preview(file: File, idx: number) {
  const reader = new FileReader();

  reader.onload = ((f: any, idx: number) => (e: any) => {
    const $div = $(
      '<div class="thumb">\n' +
        '세션명:<input type="text" name="sessionNames" value="" placeholder="세션명"> <p class="file_name">파일명: ' +
        f.name +
        ' </p>\n' +
        '<a class="close" data-idx="' +
        idx +
        '">x</a>\n' +
        '<progress value="0" max="100" ></progress>\n' +
        '</div>'
    );

    if (isSingleUpload) {
      $('#thumbnails').html('');
    }

    $('#thumbnails').append($div);
    f.target = $div;
  })(file, idx);

  reader.readAsDataURL(file);
}

function setData(ret: any) {
  console.log(ret);
  const { cubeSdo, changeCubeSdoProps } = CreateCubeService.instance;
  const internalMedias =
    cubeSdo.materialSdo?.mediaSdo.meidaContents?.internalMedias;

  if (ret.boolResult && ret.obj && ret.obj.list) {
    const internalMediaList: InternalMediaConnection[] = [];
    if (Array.isArray(ret.obj.list)) {
      Promise.resolve()
        .then(() => {
          ret.obj.list.map((list: any) => {
            const internalMedia: InternalMediaConnection = {
              panoptoSessionId: list.id,
              viewUrl: list.viewerUrl.replace('Viewer', 'Embed'),
              thumbUrl: list.viewerUrl.replace('Viewer', 'Embed'),
              name: list.name,
              startTime: list.startTime,
              folderName: list.folderName,
              duration: list.duration,
              folderId: list.folderId,
              quizIds: [],
            };
            internalMediaList.push(internalMedia);
          });
        })
        .then(() => {
          let newInternalMedias: InternalMediaConnection[];
          if (internalMedias) {
            console.log(internalMedias);
            newInternalMedias = [...internalMedias];

            changeCubeSdoProps(
              'materialSdo.mediaSdo.meidaContents.internalMedias',
              internalMediaList.concat(newInternalMedias)
            );
          }
          // mediaService.setUploadedPanoptos(internalMediaList);
        });
    }
  }
}
